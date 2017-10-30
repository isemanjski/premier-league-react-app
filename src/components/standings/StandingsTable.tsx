import * as React from 'react';
import { Standing } from '../../api/models';
import { StatisticsType } from '../../constants/statistics-type.enum';
import StandingRow from './StandingRow';

interface Props {
  standings: Standing[];
}

const StandingsTable: React.StatelessComponent<Props> = (props: Props) => {
  const tableRows: JSX.Element[] = [];

  props.standings.forEach(standing => {
    tableRows.push(
      <StandingRow key={standing.position} standing={standing} statisticsType={StatisticsType.Overall}/>
    );
  });

  return (
    <table>
      <thead>
      <tr>
        <th>Position</th>
        <th>Club</th>
        <th>Played</th>
        <th>Won</th>
        <th>Drawn</th>
        <th>Lost</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>Form</th>
        <th>Points</th>
      </tr>
      </thead>
      <tbody>
      {tableRows}
      </tbody>
    </table>
  );
};

export default StandingsTable;
