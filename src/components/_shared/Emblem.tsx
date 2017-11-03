import * as React from 'react';
import { Image } from 'semantic-ui-react';
import { Team } from '../../api/models';

interface Props {
  team: Team;
  size?: 'mini' | 'normal' | 'large';
}

/**
 * Components which renders team emblem from SVG sprite image.
 */
export const Emblem: React.StatelessComponent<Props> = (props: Props) => {
  const { team, size } = props;

  let height = 0;

  switch (size) {
    case 'mini':
      height = 45;
      break;
    case 'large':
      height = 90;
      break;
    default:
      height = 55;
  }

  return (
    <Image
      src={process.env.PUBLIC_URL + '/assets/team-sprites.svg#' + team.id}
      alt=""
      height={height}
      verticalAlign="middle"
    />
  );
};
