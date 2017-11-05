import * as React from 'react';
import { Link } from 'react-router';
import { Match } from '../../api/models';
import { Emblem } from './Emblem';

interface Props {
  match: Match;
  size?: 'small';
}

/**
 * Component which renders match between two teams and their goals.
 */
export const Fixture: React.StatelessComponent<Props> = (props: Props) => {
  const { match, size } = props;

  const classNames = ['pl-fixture', size === 'small' ? 'pl-fixture--small' : null].join(' ');

  return (
    <div className={classNames}>
      <div className="pl-fixture__teams">
        <div className="pl-fixture__team-container">
          <div className="pl-fixture__team pl-fixture__team--left">
            <div className="pl-fixture__team-name">
              <Link to={`/teams/${match.homeTeam.id}`} className="team-name">{match.homeTeam.name}</Link>
            </div>
            <div className="pl-fixture__team-emblem"><Emblem team={match.homeTeam} size="normal"/></div>
          </div>
        </div>
        <div className="pl-fixture__score-container">
          <div className="pl-fixture__score">
            {match.homeTeamGoals}<span className="pl-fixture__score-dash">-</span>{match.awayTeamGoals}
          </div>
        </div>
        <div className="pl-fixture__team-container">
          <div className="pl-fixture__team pl-fixture__team--right">
            <div className="pl-fixture__team-emblem"><Emblem team={match.awayTeam} size="normal"/></div>
            <div className="pl-fixture__team-name">
              <Link to={`/teams/${match.awayTeam.id}`} className="team-name">{match.awayTeam.name}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
