import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RoundMatches } from '../../api/models';
import { RootState } from '../../store/root-reducer';
import { RoundSelector } from '../../components/_shared/RoundSelector';
import { ResultsList } from '../../components/rounds/ResultsList';
import { SeasonSelector } from '../../components/_shared/SeasonSelector';

const mapStateToProps = (state: RootState) => ({
  matchesByRound: state.seasonState.season.matchesByRound,
  roundNumbers: state.seasonState.season.roundNumbers,
  selectedRoundNumber: state.seasonState.selectedRoundNumber
});

export interface Props {
  matchesByRound: RoundMatches[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  handleRoundSelect: (round: number) => Function;
}

export interface State {
  selectedRoundNumber: number;
}

class ResultsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedRoundNumber: props.selectedRoundNumber
    };
  }

  handleRoundNumberChange = (roundNumber: number): void => {
    this.setState({
      selectedRoundNumber: roundNumber
    });
  }

  render() {
    const { matchesByRound, roundNumbers } = this.props;
    const { selectedRoundNumber } = this.state;

    const selectedRound = matchesByRound.find(round => round.round === selectedRoundNumber);
    const selectedMatches = selectedRound && selectedRound.matches || [];

    return (
      <div>
        <Form className="pl-results-filter">
          <Form.Group widths="equal">
            <SeasonSelector/>
            <RoundSelector
              roundNumbers={roundNumbers}
              selectedRoundNumber={selectedRoundNumber}
              onChange={this.handleRoundNumberChange}
            />
          </Form.Group>
        </Form>

        <ResultsList
          round={selectedRoundNumber}
          matches={selectedMatches}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResultsPage);
