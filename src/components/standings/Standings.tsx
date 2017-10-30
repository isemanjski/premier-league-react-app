import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { actionCreators } from '../../store/season';
import { RoundStandings } from '../../api/models';
import RoundSelector from '../rounds/RoundSelector';
import StandingsTable from './StandingsTable';

const mapStateToProps = (state: RootState) => ({
  standingsByRound: state.season.season.standingsByRound,
  roundNumbers: state.season.season.roundNumbers,
  selectedRoundNumber: state.season.selectedRoundNumber
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleOnSelect: (round: number) => dispatch(actionCreators.selectRoundInSeason(round))
});

export interface Props {
  standingsByRound: RoundStandings[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  handleOnSelect: (round: number) => Function;
}

const Standings: React.StatelessComponent<Props> = (props: Props) => {
  const selectedRound = props.standingsByRound.find(round => round.round === props.selectedRoundNumber);
  const selectedStandings = selectedRound && selectedRound.standings || [];

  return (
    <div>
      <RoundSelector
        roundNumbers={props.roundNumbers}
        selectedRoundNumber={props.selectedRoundNumber}
        onSelect={props.handleOnSelect}
      />
      <StandingsTable
        standings={selectedStandings}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Standings);
