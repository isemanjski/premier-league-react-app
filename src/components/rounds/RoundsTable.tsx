import * as React from 'react';
import { connect } from 'react-redux';
import { Round } from '../../api/models/round.model';
import { RootState } from '../../store/root-reducer';
import { actionCreators } from '../../store/season';
import RoundSelector from './RoundSelector';
import RoundMatches from './RoundMatches';

const mapStateToProps = (state: RootState) => ({
  matchesByRound: state.season.season.matchesByRound,
  selectedRoundNumber: state.season.selectedRoundNumber
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleOnSelect: (round: number) => dispatch(actionCreators.selectRoundInSeason(round))
});

export interface Props {
  matchesByRound: Round[];
  selectedRoundNumber: number;
  handleOnSelect: (round: number) => Function;
}

const RoundsTable: React.StatelessComponent<Props> = (props: Props) => {
  const selectedRoundWithMatches = props.matchesByRound.find(round => round.round === props.selectedRoundNumber);
  const selectedRoundMatches = selectedRoundWithMatches && selectedRoundWithMatches.matches || [];
  const roundNumbers = (props.matchesByRound.map(round => round.round) || []).sort((a, b) => a - b);

  return (
    <div>
      <RoundSelector
        roundNumbers={roundNumbers}
        selectedRoundNumber={props.selectedRoundNumber}
        onSelect={props.handleOnSelect}
      />
      <RoundMatches
        round={props.selectedRoundNumber}
        matches={selectedRoundMatches}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundsTable);
