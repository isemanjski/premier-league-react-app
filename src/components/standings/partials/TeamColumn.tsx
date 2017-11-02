import * as React from 'react';
import { Link } from 'react-router';
import { Emblem } from '../../_shared/Emblem';
import { Team } from '../../../api/models';

interface Props {
  team: Team;
}

/**
 * Component which renders team with its emblem and clickable name (which points to team's own profile page).
 */
export const TeamColumn: React.StatelessComponent<Props> = (props: Props) => {
  const { team } = props;

  return (
    <div className="pl-standings-emblem">
      <Emblem team={team} size="mini"/>
      <Link to={`/teams/${team.id}`} className="team-name">{team.name}</Link>
    </div>
  );
};
