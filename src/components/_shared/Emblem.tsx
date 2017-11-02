import * as React from 'react';
import { Image } from 'semantic-ui-react';
import { Team } from '../../api/models';

export interface Props {
  team: Team;
  size?: 'mini' | 'normal' | 'large';
}

export const Emblem: React.StatelessComponent<Props> = (props: Props) => {
  const { team, size } = props;

  return (
    <Image
      src={process.env.PUBLIC_URL + '/assets/team-sprites.svg#' + team.id}
      alt={team.name}
      height={size === 'mini' ? 45 : size === 'large' ? 85 : 55}
      verticalAlign="middle"
    />
  );
};
