import * as React from 'react';
import { RoundMatches, Team } from '../../api/models';
import { Emblem } from '../_shared/Emblem';

export interface Props {
  team: Team;
  matchesByRound: RoundMatches[];
}

/**
 * Component which displays team emblem and name - used on team page.
 */
export const TeamHeader: React.StatelessComponent<Props> = (props: Props) => {
  const { team } = props;

  return (
    <div className="pl-team-page-header">
      <div className="pl-team-emblem">
        <Emblem team={team} size="large"/>
      </div>
      <div className="pl-team-details">
        <div className="team-name">{team.name}</div>
      </div>
    </div>
  );
};
