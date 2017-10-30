import * as React from 'react';
import { connect } from 'react-redux';
import { RoundMatches } from '../../api/models/round-matches.model';
import { RootState } from '../../store/root-reducer';
import { actionCreators } from '../../store/season';
import RoundSelector from './RoundSelector';
import RoundWithMatches from './RoundWithMatches';

const mapStateToProps = (state: RootState) => ({
  matchesByRound: state.season.season.matchesByRound,
  roundNumbers: state.season.season.roundNumbers,
  selectedRoundNumber: state.season.selectedRoundNumber
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleRoundSelect: (round: number) => dispatch(actionCreators.selectRoundInSeason(round))
});

export interface Props {
  matchesByRound: RoundMatches[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  handleRoundSelect: (round: number) => Function;
}

const RoundsTable: React.StatelessComponent<Props> = (props: Props) => {
  const selectedRound = props.matchesByRound.find(round => round.round === props.selectedRoundNumber);
  const selectedMatches = selectedRound && selectedRound.matches || [];

  return (
    <div>
      <RoundSelector
        roundNumbers={props.roundNumbers}
        selectedRoundNumber={props.selectedRoundNumber}
        onSelect={props.handleRoundSelect}
      />
      <RoundWithMatches
        round={props.selectedRoundNumber}
        matches={selectedMatches}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundsTable);
