import * as React from 'react';
import { Match } from '../../api/models';

export interface Props {
  match: Match;
}

const Fixture: React.StatelessComponent<Props> = (props: Props) => {
  const { match } = props;

  return (
    <div className="pl-fixture">
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

export default Fixture;
