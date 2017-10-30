import * as React from 'react';
import { Standing, StandingByType } from '../../api/models';
import { StandingType } from '../../constants/standing-type.enum';
import StandingForm from './TeamForm';

interface Props {
  standing: Standing;
  standingType: StandingType;
}

const StandingRow: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, standingType } = props;
  const standingByType = standing[standingType] as StandingByType;

  return (
    <tr>
      <td>{standingByType.position}</td>
      <td>{standing.team.name}</td>
      <td>{standingByType.played}</td>
      <td>{standingByType.won}</td>
      <td>{standingByType.drawn}</td>
      <td>{standingByType.lost}</td>
      <td>{standingByType.goalsScored}</td>
      <td>{standingByType.goalsConceded}</td>
      <td>{standingByType.goalDifference}</td>
      <td><StandingForm standing={standing} standingType={standingType}/></td>
      <td>{standingByType.points}</td>
    </tr>
  );
};

export default StandingRow;
