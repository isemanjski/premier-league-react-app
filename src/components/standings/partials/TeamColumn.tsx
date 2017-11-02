import * as React from 'react';
import { Link } from 'react-router';
import { Emblem } from '../../_shared/Emblem';
import { Team } from '../../../api/models';

interface Props {
  team: Team;
}

export const TeamColumn: React.StatelessComponent<Props> = (props: Props) => {
  const { team } = props;

  return (
    <div className="pl-standings-emblem">
      <Emblem team={team} size="mini"/>
      <Link to={`/teams/${team.id}`} className="team-name">{team.name}</Link>
    </div>
  );
};
