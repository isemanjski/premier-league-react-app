import * as React from 'react';
import { Match, RoundStandings, Team } from '../../api/models';

interface Props {
  team: Team;
  standingsByRound: RoundStandings[];
}

interface TeamStat {
  name: string;
  result: number;
}

export const TeamTopStats: React.StatelessComponent<Props> = (props: Props) => {
  const { team, standingsByRound } = props;

  const lastRoundStandings = standingsByRound[standingsByRound.length - 1];
  const teamStanding = lastRoundStandings.standings.find(standing => standing.team.id === team.id);

  if (!teamStanding) {
    return null;
  }

  const matchesPlayed = teamStanding.overall.played;
  const wins = teamStanding.overall.won;
  const losses = teamStanding.overall.lost;
  const goals = teamStanding.overall.goalsScored;
  const goalsConceded = teamStanding.overall.goalsConceded;

  // tslint:disable:align
  const cleanSheets = teamStanding.playedMatches.reduce((sum: number, match: Match): number => {
    if (match.homeTeam.id === team.id) {
      sum += (match.awayTeamGoals === 0) ? 1 : 0;
    } else {
      sum += (match.homeTeamGoals === 0) ? 1 : 0;
    }
    return sum;
  }, 0);

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
