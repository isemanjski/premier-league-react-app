import { StatisticsType } from '../../constants/statistics-type.enum';
import { Match, RoundMatches, RoundStandings, Season, Standing, Statistics, Team } from '../models';
import { POINTS_FOR_DRAW, POINTS_FOR_LOSING, POINTS_FOR_WINNING } from '../../constants/constants';

const SIDE_HOME = 'home';
const SIDE_AWAY = 'away';

// tslint:disable:no-any
/**
 * Helper function which maps data received from server to model classes used in application.
 *
 * Example of data:
 * <code>
 * {
 *   "round": 1,
 *   "matches": [
 *      {
 *        "Hull City": 2,
 *        "Leicester City": 1
 *      },
 *      {
 *       "Burnley": 0,
 *       "Swansea": 1
 *      },
 *  ...
 * </code>
 *
 * @param {any} data - Unformatted data from server.
 * @returns {Season} Model object with mapped data.
 */
export const mapSeasonDataToModel = (data: any): Season => {
  let teams: Team[] = [];
  const roundNumbers: number[] = [];
  const matchesByRound: RoundMatches[] = [];
  const standingsByRound: RoundStandings[] = [];

  if (data) {
    data.forEach((roundData: any, index: number) => {
      // Resolve round number
      const round: number = Number(roundData.round);
      roundNumbers.push(round);

      // Resolve all teams from 1st round (under assumption that all teams participate in each round)
      if (index === 0) {
        teams = resolveTeamsFromRoundData(roundData.matches);
      }

      // Resolve matches for current round
      const matches: Match[] = (roundData.matches || []).map((matchData: any) => {
        return resolveMatchFromMatchData(teams, matchData);
      });

      // Populate list of matches grouped by round
      matchesByRound.push(new RoundMatches({ round, matches }));

      // Create instance of object holding list of standings for one round
      const roundStandings = new RoundStandings({ round });

      // Get instance of object holding list of standings from last round, if there is any
      const lastRoundStandings = standingsByRound[standingsByRound.length - 1];

      // Calculate standings for each team using results from matches for current round
      matches.forEach(match => {
        calculateStandingsFromMatch(match, roundStandings, lastRoundStandings ? lastRoundStandings.standings : []);
      });

      // Sort standings by total points
      roundStandings.standings.sort(positionSorter(StatisticsType.Overall));
      // Update position of each team using index inside sorted array
      roundStandings.standings.forEach((s: Standing, i: number) => s.position = i + 1);

      // Calculate home position by copying standings array and sorting it by home points
      const standingsSortedByHomePoints = roundStandings.standings.slice().sort(positionSorter(StatisticsType.Home));
      // Update home position of each team using index inside sorted array
      standingsSortedByHomePoints.forEach((s: Standing, i: number) => {
        const teamStanding = findStandingForTeam(s.team, roundStandings.standings);
        if (teamStanding) {
          teamStanding.homePosition = i + 1;
        }
      });

      // Calculate away position by copying standings array and sorting it by away points
      const standingsSortedByAwayPoints = roundStandings.standings.slice().sort(positionSorter(StatisticsType.Away));
      // Update away position of each team using index inside sorted array
      standingsSortedByAwayPoints.forEach((s: Standing, i: number) => {
        const teamStanding = findStandingForTeam(s.team, roundStandings.standings);
        if (teamStanding) {
          teamStanding.awayPosition = i + 1;
        }
      });

      standingsByRound.push(roundStandings);
    });
  }

  return new Season({ teams, roundNumbers, matchesByRound, standingsByRound });
};

/**
 * Helper function which resolves list of teams from selected data.
 *
 * Extracting teams under assumption that all teams participate in each round,
 * so in any subsequent rounds there should be same teams.
 *
 * @param matchListData - Unformatted data of matches in one round.
 * @returns {Team[]} List of teams ordered by name.
 */
export const resolveTeamsFromRoundData = (matchListData: any[] = []): Team[] => {
  const teams: Team[] = [];

  matchListData.forEach((matchData: any) => {
    const matchParticipants = Object.keys(matchData);
    teams.push(new Team({ id: generateTeamIdFromName(matchParticipants[0]), name: matchParticipants[0] }));
    teams.push(new Team({ id: generateTeamIdFromName(matchParticipants[1]), name: matchParticipants[1] }));
  });

  // Sort teams by name ascending
  return teams.sort((team1, team2) => team1.name.localeCompare(team2.name));
};

/**
 * Helper function which converts team name to team id.
 * E.g. name 'Manchester United' converts to 'manchester-united'.
 *
 * @param {string} teamName - Name of the team.
 * @returns {string} String with all lowercase letters and with dashes instead of spaces.
 */
export const generateTeamIdFromName = (teamName: string = ''): string => {
  return teamName.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with '-'
};

/**
 * Helper function which resolves match from provided data.
 *
 * @param {Team[]} teams - List of teams.
 * @param matchData - Unformatted data of one match.
 * @returns {Match} Populated instance of match model.
 */
export const resolveMatchFromMatchData = (teams: Team[], matchData: any): Match => {
  // Participants are actually map keys and their goal score is corresponding map value
  const matchParticipants = Object.keys(matchData);

  const homeTeamGoals = matchData[matchParticipants[0]];
  const awayTeamGoals = matchData[matchParticipants[1]];

  return new Match({
    homeTeam: findTeamByName(teams, matchParticipants[0]),
    homeTeamGoals: homeTeamGoals,
    homeTeamPoints: calculatePoints(homeTeamGoals, awayTeamGoals),
    awayTeam: findTeamByName(teams, matchParticipants[1]),
    awayTeamGoals: awayTeamGoals,
    awayTeamPoints: calculatePoints(awayTeamGoals, homeTeamGoals)
  });
};

/**
 * Helper function to find team from provided team name.
 *
 * @param {Team[]} teams - List of teams.
 * @param {string} teamName - Name of team to search by.
 * @returns {Team} Team instance selected by name.
 */
export const findTeamByName = (teams: Team[], teamName: string = ''): Team | undefined => {
  return teams.find(team => team.name === teamName);
};

/**
 * Helper function which calculates number of points for scored goals.
 *
 * @param {number} goalsScored - Number of goals scored.
 * @param {number} goalsReceived - Number of goals received.
 * @returns {number} Number of points depending on goal score difference (win: 3, draw: 1, loss: 0).
 */
export const calculatePoints = (goalsScored: number, goalsReceived: number): number => {
  if (goalsScored > goalsReceived) {
    return POINTS_FOR_WINNING;
  } else if (goalsScored === goalsReceived) {
    return POINTS_FOR_DRAW;
  } else {
    return POINTS_FOR_LOSING;
  }
};

/**
 * Helper function which calculates standing from provided match.
 *
 * @param {Match | undefined} match - Match with corresponding teams and scores.
 * @param {RoundStandings} roundStandings - Instance of object holding list of standings for one round.
 * @param {RoundStandings} lastRoundStandings - Instance of object holding list of standings from last round.
 */
export const calculateStandingsFromMatch = (match: Match | undefined,
                                            roundStandings: RoundStandings,
                                            lastRoundStandings: Standing[]): void => {
  if (match) {
    // Get standing of home team from last round
    const homeTeamPrevStanding = findStandingForTeam(match.homeTeam, lastRoundStandings);

    // Calculate standing for home team using previous standing and current match
    const homeTeamStanding = calculateStanding(match.homeTeam, match, homeTeamPrevStanding, SIDE_HOME, SIDE_AWAY);

    // Get standing of away team from last round
    const awayTeamPrevStanding = findStandingForTeam(match.awayTeam, lastRoundStandings);

    // Calculate standing for away team using previous standing and current match
    const awayTeamStanding = calculateStanding(match.awayTeam, match, awayTeamPrevStanding, SIDE_AWAY, SIDE_HOME);

    // Put newly calculated standing instances to list of standing of current round, later it will be
    // sorted by total points
    roundStandings.standings.push(homeTeamStanding);
    roundStandings.standings.push(awayTeamStanding);
  }
};

/**
 * Finds standing for team from list of standings using team id.
 *
 * @param {Team} team - Team for which to find standing.
 * @param {Standing[]} standings - List of standings.
 * @returns {Standing | null} Standing for team if found, otherwise null.
 */
export const findStandingForTeam = (team: Team, standings: Standing[]): Standing | null => {
  return (standings || []).find(standing => standing.team.id === team.id) || null;
};

/**
 * Helper function which calculates standing data with multiple statistical information for each team.
 * Uses provided match data to calculate points and goal score for team (depending if team played at home or away).
 *
 * @param {Team} team - Team for which new standing data is calculated.
 * @param {Match} match - Match with corresponding teams and scores.
 * @param {Standing | null} previousStanding - Previous standing data for current team.
 * @param {string} matchSide - Side on which current team is on in the match.
 * @param {string} matchOtherSide - Side on which oposing team is on in the match.
 * @returns {Standing} Newly calculated standing data for team.
 */
export const calculateStanding = (team: Team,
                                  match: Match,
                                  previousStanding: Standing | null,
                                  matchSide: string,
                                  matchOtherSide: string): Standing => {

  const standing = new Standing({ team });
  standing.prevStanding = previousStanding || new Standing();
  standing.prevPosition = standing.prevStanding.position;
  standing.prevHomePosition = standing.prevStanding.homePosition;
  standing.prevAwayPosition = standing.prevStanding.awayPosition;

  const goalsScored = match[`${matchSide}TeamGoals`];
  const goalsReceived = match[`${matchOtherSide}TeamGoals`];
  const points = calculatePoints(goalsScored, goalsReceived);

  const prevOverall = standing.prevStanding.overall;
  standing.overall = new Statistics({
    played: prevOverall.played + 1,
    won: prevOverall.won + (points === POINTS_FOR_WINNING ? 1 : 0),
    drawn: prevOverall.drawn + (points === POINTS_FOR_DRAW ? 1 : 0),
    lost: prevOverall.lost + (points === POINTS_FOR_LOSING ? 1 : 0),
    goalsScored: prevOverall.goalsScored + goalsScored,
    goalsConceded: prevOverall.goalsConceded + goalsReceived,
    goalDifference: prevOverall.goalDifference + goalsScored - goalsReceived,
    points: prevOverall.points + points
  });

  const prevStatistics = standing.prevStanding[`${matchSide}`];
  standing[`${matchSide}`] = new Statistics({
    played: prevStatistics.played + 1,
    won: prevStatistics.won + (points === POINTS_FOR_WINNING ? 1 : 0),
    drawn: prevStatistics.drawn + (points === POINTS_FOR_DRAW ? 1 : 0),
    lost: prevStatistics.lost + (points === POINTS_FOR_LOSING ? 1 : 0),
    goalsScored: prevStatistics.goalsScored + goalsScored,
    goalsConceded: prevStatistics.goalsConceded + goalsReceived,
    goalDifference: prevStatistics.goalDifference + goalsScored - goalsReceived,
    points: prevStatistics.points + points
  });

  standing[`${matchOtherSide}`] = { ...standing.prevStanding[`${matchOtherSide}`] };

  // Remember all matches played until current round - later to be used for display team form
  standing.playedMatches = (standing.prevStanding.playedMatches || []).slice().concat(match);

  return standing;
};

/**
 * Helper function which uses statistics type ('overall', 'home' or 'away') to form sorter function.
 *
 * In the event that two (or more) teams have an equal number of points, the following rules break the tie:
 * 1. Goal difference
 * 2. Goals scored
 *
 * @param {string} statisticsType - Type of statistics - 'overall', 'home' or 'away'.
 * @returns {(s1: Standing, s2: Standing) => number} Function to sort standings by.
 */
export const positionSorter = (statisticsType: string): (s1: Standing, s2: Standing) => number => {
  return (standing1: Standing, standing2: Standing): number => {
    const statistics1 = standing1[statisticsType];
    const statistics2 = standing2[statisticsType];

    // Condition 1: Sort by points - team with more points comes before
    const pointsDiff = statistics1.points - statistics2.points;
    if (pointsDiff !== 0) {
      return -1 * pointsDiff;
    }

    // Condition 2: Sort by goal difference - team with better goal difference comes before
    const goalDifferenceDiff = statistics1.goalDifference - statistics2.goalDifference;
    if (goalDifferenceDiff !== 0) {
      return -1 * goalDifferenceDiff;
    }

    // Condition 3: Sort by goals scored - team with more goals scored comes before
    const goalsScoredDiff = statistics1.goalsScored - statistics2.goalsScored;
    if (goalsScoredDiff !== 0) {
      return -1 * goalsScoredDiff;
    }

    // If no condition was applied then sort by name ascending - happens in the beginning of season
    return standing1.team.name.localeCompare(standing2.team.name);
  };
};
