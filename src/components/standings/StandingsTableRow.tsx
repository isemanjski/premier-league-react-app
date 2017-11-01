import * as React from 'react';
import { Standing, StandingByType } from '../../api/models';
import { StandingType } from '../../utils/standing-type.enum';
import { TeamForm } from './partials/TeamForm';
import { Position } from './partials/Position';

interface Props {
  standing: Standing;
  standingType: StandingType;
}

export const StandingsTableRow: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;
  const stat = standing[standingType] as StandingByType;

  return (
    <tr>
      <td className="pl-pos-column text-center">
        <Position standing={standing} standingType={standingType}/>
      </td>
      <td className="pl-team-column">{standing.team.name}</td>
      <td className="pl-number-column text-center">{stat.played}</td>
      <td className="pl-number-column text-center">{stat.won}</td>
      <td className="pl-number-column text-center">{stat.drawn}</td>
      <td className="pl-number-column text-center">{stat.lost}</td>
      <td className="pl-number-column text-center d-sm-none">{stat.goalsScored}</td>
      <td className="pl-number-column text-center d-sm-none">{stat.goalsConceded}</td>
      <td className="pl-number-column text-center d-sm-none">
        {stat.goalDifference > 0 ? `+${stat.goalDifference}` : stat.goalDifference}
      </td>
      <td className="d-md-none pl-team-form-width">
        <TeamForm standing={standing} standingType={standingType}/>
      </td>
      <td className="pl-number-column text-center text-bold">{stat.points}</td>
    </tr>
  );
};
