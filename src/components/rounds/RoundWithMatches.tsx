import * as React from 'react';
import { Match } from '../../api/models';

export interface Props {
  round: number;
  matches: Match[];
}

const RoundWithMatches: React.StatelessComponent<Props> = (props: Props) => {
  const { round, matches } = props;

  if (round === null) {
    return null;
  }

  const matchList = matches.map((match: Match, index: number) => {
    return (
      <li key={index} style={{ listStyle: 'none', marginBottom: '10px' }}>
        <div style={{ float: 'left', marginRight: '10px' }}>
          <div>{match.homeTeam.name}</div>
          <div>{match.awayTeam.name}</div>
        </div>
        <div>
          <div>{match.homeTeamGoals}</div>
          <div>{match.awayTeamGoals}</div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <div>ROUND {round}</div>
      <ul style={{ margin: 0, padding: 0 }}>{matchList}</ul>
    </div>
  );
};

export default RoundWithMatches;
