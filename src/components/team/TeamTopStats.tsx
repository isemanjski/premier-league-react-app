import * as React from 'react';
import { RoundMatches, Team } from '../../api/models';
import { POINTS_FOR_LOSING, POINTS_FOR_WINNING } from '../../utils/constants';

interface Props {
  team: Team;
  matchesByRound: RoundMatches[];
}

interface TeamStat {
  name: string;
  result: number;
}

export const TeamTopStats: React.StatelessComponent<Props> = (props: Props) => {
  const { team, matchesByRound } = props;

  let matchesPlayed = 0;
  let wins = 0;
  let losses = 0;
  let goals = 0;
  let goalsConceded = 0;
  let cleanSheets = 0;

  // For each round found match that selected teams has participated in and calculate statistics
  matchesByRound.forEach(round => {
    const match = round.matches.find(m => m.homeTeam.id === team.id || m.awayTeam.id === team.id);
    if (match) {
      // Increase match counter
      matchesPlayed += 1;

      // Get match points
      let points = null;
      if (match.homeTeam.id === team.id) {
        points = match.homeTeamPoints;
        goals += match.homeTeamGoals;
        goalsConceded += match.awayTeamGoals;
        cleanSheets += (match.awayTeamGoals === 0) ? 1 : 0;
      } else {
        points = match.awayTeamPoints;
        goals += match.awayTeamGoals;
        goalsConceded += match.homeTeamGoals;
        cleanSheets += (match.homeTeamGoals === 0) ? 1 : 0;
      }

      // Calculate win/loss statistics base on match points
      if (points === POINTS_FOR_WINNING) {
        wins += 1;
      } else if (points === POINTS_FOR_LOSING) {
        losses += 1;
      }
    }
  });

  const teamStats: TeamStat[] = [
    { name: 'Matches Played', result: matchesPlayed },
    { name: 'Wins', result: wins },
    { name: 'Losses', result: losses },
    { name: 'Goals', result: goals },
    { name: 'Goals Conceded', result: goalsConceded },
    { name: 'Clean Sheets', result: cleanSheets }
  ];

  const teamStatElements = teamStats.map((teamStat: TeamStat, index: number) => {
    return (
      <div key={index} className="stat-container">
        <div className="stat-name">{teamStat.name}</div>
        <div className="stat-result">{teamStat.result}</div>
      </div>
    );
  });

  return (
    <div className="pl-team-top-stats">
      {teamStatElements}
    </div>
  );
};
