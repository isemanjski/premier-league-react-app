import {
  calculatePoints,
  calculateStandingsFromMatch,
  findTeamByName,
  generateTeamIdFromName,
  mapSeasonDataToModel,
  resolveTeamsFromRoundData
} from './season-model-mapper';
import { Match, RoundStandings, Standing, StandingByType, Team } from '../models';

// tslint:disable:no-any
const data: any[] = [
  {
    'round': 1,
    'matches': [
      {
        'Team 1': 1,
        'Team 4': 1
      },
      {
        'Team 3': 0,
        'Team 2': 4
      }
    ]
  },
  {
    'round': 2,
    'matches': [
      {
        'Team 1': 0,
        'Team 3': 4
      },
      {
        'Team 2': 2,
        'Team 4': 1
      }
    ]
  }
];

const team1: Team = { id: 'team-1', name: 'Team 1' };
const team2: Team = { id: 'team-2', name: 'Team 2' };

describe('mapSeasonDataToModel', () => {

  it('correctly maps server data', () => {
    const model = mapSeasonDataToModel(data);

    expect(model.matchesByRound.length).toEqual(2);
    expect(model.matchesByRound[0].round).toEqual(1);
    expect(model.matchesByRound[1].matches.length).toEqual(2);
    expect(model.matchesByRound[1].matches[0].homeTeam.name).toEqual('Team 1');
    expect(model.matchesByRound[1].matches[0].homeTeamGoals).toEqual(0);
    expect(model.matchesByRound[1].matches[0].awayTeam.name).toEqual('Team 3');
    expect(model.matchesByRound[1].matches[0].awayTeamGoals).toEqual(4);
  });

});

describe('generateTeamIdFromName', () => {

  it('generates id from name', () => {
    expect(generateTeamIdFromName('Infobip Team Is The Best')).toEqual('infobip-team-is-the-best');
  });

});

describe('resolveTeamsFromRoundData', () => {

  it('should extract teams from server data', () => {
    const teams: Team[] = resolveTeamsFromRoundData(data[0].matches);

    expect(teams.length).toEqual(4);
    expect(teams[0].name).toEqual('Team 1');
    expect(teams[3].id).toEqual('team-4');
  });

  it('should sort teams', () => {
    const teams: Team[] = resolveTeamsFromRoundData(data[0].matches);

    expect(teams.length).toEqual(4);
    expect(teams[0].name).toEqual('Team 1');
    expect(teams[1].name).toEqual('Team 2');
    expect(teams[2].name).toEqual('Team 3');
    expect(teams[3].id).toEqual('team-4');
  });

});

describe('findTeamByName', () => {

  it('returns undefined if team is not found', () => {
    const teams: Team[] = [team1];
    expect(findTeamByName(teams, 'Team 0')).toBe(undefined);
  });

  it('finds existing team', () => {
    const teams: Team[] = [team1, team2];
    expect(findTeamByName(teams, 'Team 2')).toEqual({ id: 'team-2', name: 'Team 2' });
  });

});

describe('calculatePoints', () => {

  it('should calculate 3 points for winning result', () => {
    expect(calculatePoints(2, 1)).toEqual(3);
  });

  it('should calculate 0 points for loss result', () => {
    expect(calculatePoints(1, 2)).toEqual(0);
  });

  it('should calculate 1 points for draw result', () => {
    expect(calculatePoints(1, 1)).toEqual(1);
  });

});

describe('calculateStandingsFromMatch', () => {
  const match: Match = <Match> {
    awayTeam: team1,
    awayTeamGoals: 1,
    awayTeamPoints: 0,
    homeTeam: team2,
    homeTeamGoals: 2,
    homeTeamPoints: 3
  };

  const roundStandings: RoundStandings = <RoundStandings> {
    round: 2,
    standings: []
  };

  const lastRoundStandings: Standing[] = [
    <Standing> {
      team: team1,
      overallPosition: 2,
      homePosition: 1,
      awayPosition: 3,
      overall: {
        position: 2,
        played: 3,
        won: 2,
        drawn: 1,
        lost: 0,
        goalsScored: 10,
        goalsConceded: 2,
        goalDifference: 8,
        points: 32
      },
      home: new StandingByType(),
      away: new StandingByType()
    },
    <Standing> {
      team: team2,
      overallPosition: 5,
      homePosition: 2,
      awayPosition: 1,
      overall: {
        position: 5,
        played: 3,
        won: 0,
        drawn: 1,
        lost: 2,
        goalsScored: 4,
        goalsConceded: 6,
        goalDifference: -2,
        points: 1
      },
      home: new StandingByType(),
      away: new StandingByType()
    }
  ];

  it('should calculate correct standings from match and previous standing', () => {
    calculateStandingsFromMatch(match, roundStandings, lastRoundStandings);
    expect(roundStandings.standings.length).toEqual(2);
    expect(roundStandings.standings[0].team.id).toEqual(team2.id);
    expect(roundStandings.standings[0].overall.won).toEqual(1);
    expect(roundStandings.standings[0].overall.drawn).toEqual(1);
    expect(roundStandings.standings[0].overall.lost).toEqual(2);
    expect(roundStandings.standings[0].overall.goalsScored).toEqual(6);
    expect(roundStandings.standings[0].overall.goalsConceded).toEqual(7);
    expect(roundStandings.standings[0].overall.goalDifference).toEqual(-1);
    expect(roundStandings.standings[0].playedMatches[0].awayTeamGoals).toEqual(1);
    expect(roundStandings.standings[0].playedMatches[0].homeTeamGoals).toEqual(2);
  });

});
