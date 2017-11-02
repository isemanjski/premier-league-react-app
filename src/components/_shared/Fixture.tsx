import * as React from 'react';
import { Link } from 'react-router';
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
          <span className="pl-fixture__team-name">
            <Link to={`/teams/${match.homeTeam.id}`} className="team-name">{match.homeTeam.name}</Link>
          </span>
          <span className="pl-fixture__team-emblem"><Emblem team={match.homeTeam} size="normal"/></span>
        </span>
        <span className="pl-fixture__score">
          {match.homeTeamGoals}<span className="pl-fixture__score-dash">-</span>{match.awayTeamGoals}
        </span>
        <span className="pl-fixture__team pl-fixture__team--right">
          <span className="pl-fixture__team-emblem"><Emblem team={match.awayTeam} size="normal"/></span>
          <span className="pl-fixture__team-name">
            <Link to={`/teams/${match.awayTeam.id}`} className="team-name">{match.awayTeam.name}</Link>
          </span>
        </span>
      </span>
    </div>
  );
};
