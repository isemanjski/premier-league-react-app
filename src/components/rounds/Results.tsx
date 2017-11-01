import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RoundMatches } from '../../api/models';
import { RootState } from '../../store/root-reducer';
import { actionCreators } from '../../store/season';
import RoundSelector from './RoundSelector';
import ResultsList from './ResultsTable';
import SeasonSelector from '../standings/SeasonSelector';

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

const Results: React.StatelessComponent<Props> = (props: Props) => {
  const selectedRound = props.matchesByRound.find(round => round.round === props.selectedRoundNumber);
  const selectedMatches = selectedRound && selectedRound.matches || [];

  return (
    <div>
      <Form className="pl-results-filter">
        <Form.Group widths="equal">
          <SeasonSelector/>
          <RoundSelector
            roundNumbers={props.roundNumbers}
            selectedRoundNumber={props.selectedRoundNumber}
            onSelect={props.handleRoundSelect}
          />
        </Form.Group>
      </Form>

      <ResultsList
        round={props.selectedRoundNumber}
        matches={selectedMatches}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
