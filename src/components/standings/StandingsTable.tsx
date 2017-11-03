import * as React from 'react';
import { Standing } from '../../api/models';
import { StandingType } from '../../utils/standing-type.enum';
import { StandingsTableRow } from './StandingsTableRow';
import { StandingsTableHeader } from './StandingsTableHeader';
import { positionSorter } from '../../api/mappings/season-model-mapper';

interface Props {
  standings: Standing[];
  standingType: StandingType;
}

/**
 * Component which renders standings table with information about team's position, points, goals, etc.
 */
export const StandingsTable: React.StatelessComponent<Props> = (props: Props) => {
  const { standings, standingType } = props;

  const sortedStandings = standings.slice().sort(positionSorter(standingType));

  const tableRows = sortedStandings.map(standing => (
    <StandingsTableRow key={standing[standingType].position} standing={standing} standingType={standingType}/>
  ));

  return (
    <table className="pl-standings-table">
      <thead>
      <tr>
        <StandingsTableHeader fullText="Position" shortText="Pos" className="pl-pos-column text-center"/>
        <StandingsTableHeader fullText="Team" className="pl-team-column team-column"/>
        <StandingsTableHeader fullText="Played" shortText="Pl" className="pl-number-column text-center"/>
        <StandingsTableHeader fullText="Won" shortText="W" className="pl-number-column text-center"/>
        <StandingsTableHeader fullText="Drawn" shortText="D" className="pl-number-column text-center"/>
        <StandingsTableHeader fullText="Lost" shortText="L" className="pl-number-column text-center"/>
        <StandingsTableHeader className="pl-number-column text-center d-sm-none">
          <abbr title="Goals For">GF</abbr>
        </StandingsTableHeader>
        <StandingsTableHeader className="pl-number-column text-center d-sm-none">
          <abbr title="Goals Against">GA</abbr>
        </StandingsTableHeader>
        <StandingsTableHeader className="pl-number-column text-center d-sm-none">
          <abbr title="Goal Difference">GD</abbr>
        </StandingsTableHeader>
        <StandingsTableHeader className="text-center d-md-none">Form</StandingsTableHeader>
        <StandingsTableHeader fullText="Points" shortText="Pts" className="pl-number-column text-center"/>
      </tr>
      </thead>
      <tbody>
      {tableRows}
      </tbody>
    </table>
  );
};
