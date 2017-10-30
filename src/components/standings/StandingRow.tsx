import * as React from 'react';
import { Standing, Statistics } from '../../api/models';
import { StatisticsType } from '../../constants/statistics-type.enum';
import StandingForm from './TeamForm';

interface Props {
  standing: Standing;
  statisticsType: StatisticsType;
}

const StandingRow: React.StatelessComponent<Props> = (props: Props) => {
  const { standing, statisticsType } = props;
  const statistics = standing[statisticsType] as Statistics;

  return (
    <tr>
      <td>{standing.position}</td>
      <td>{standing.team.name}</td>
      <td>{statistics.played}</td>
      <td>{statistics.won}</td>
      <td>{statistics.drawn}</td>
      <td>{statistics.lost}</td>
      <td>{statistics.goalsScored}</td>
      <td>{statistics.goalsConceded}</td>
      <td>{statistics.goalDifference}</td>
      <td><StandingForm standing={standing}/></td>
      <td>{statistics.points}</td>
    </tr>
  );
};

export default StandingRow;
