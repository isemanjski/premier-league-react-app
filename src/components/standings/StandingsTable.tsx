import * as React from 'react';
import { Standing } from '../../api/models';
import { StandingType } from '../../constants/standing-type.enum';
import StandingRow from './StandingRow';

interface Props {
  standings: Standing[];
  standingType: StandingType;
}

const StandingsTable: React.StatelessComponent<Props> = (props: Props) => {
  const { standings, standingType } = props;

  // Sort standings array with number of points in selected standings type ('overall', 'home' or 'away') - descending
  const sortedStandings = standings.slice().sort((s1: Standing, s2: Standing) => {
    return (s2[standingType].points - s1[standingType].points);
  });

  const tableRows = sortedStandings.map(standing => (
    <StandingRow key={standing[standingType].position} standing={standing} standingType={standingType}/>
  ));

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
