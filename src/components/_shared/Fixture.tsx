import * as React from 'react';
import { Match } from '../../api/models';
import { Emblem } from './Emblem';

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
        <span className="pl-fixture__team pl-fixture__team--left">
          <span className="pl-fixture__team-name">{match.homeTeam.name}</span>
          <span className="pl-fixture__team-emblem"><Emblem team={match.homeTeam} size="normal"/></span>
        </span>
        <span className="pl-fixture__score">
          {match.homeTeamGoals}<span className="pl-fixture__score-dash">-</span>{match.awayTeamGoals}
        </span>
        <span className="pl-fixture__team pl-fixture__team--right">
          <span className="pl-fixture__team-emblem"><Emblem team={match.awayTeam} size="normal"/></span>
          <span className="pl-fixture__team-name">{match.awayTeam.name}</span>
        </span>
      </span>
    </div>
  );
};
