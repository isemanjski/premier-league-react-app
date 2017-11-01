import * as React from 'react';
import { Match } from '../../api/models';

export interface Props {
  match: Match;
  size?: 'small';
}

export const Fixture: React.StatelessComponent<Props> = (props: Props) => {
  const { match, size } = props;

  const classNames = ['pl-fixture', size === 'small' ? 'pl-fixture--small' : null].join(' ');

  return (
    <div className={classNames}>
      <span className="pl-fixture__teams">
        <span className="pl-fixture__team">
          <span className="teamName">{match.homeTeam.name}</span>
        </span>
        <span className="pl-fixture__score">
          {match.homeTeamGoals}<span className="pl-fixture__score-dash">-</span>{match.awayTeamGoals}
        </span>
        <span className="pl-fixture__team">
          <span className="teamName">{match.awayTeam.name}</span>
        </span>
      </span>
    </div>
  );
};
