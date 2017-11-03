import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store/root-reducer';
import { RoundStandings } from '../../api/models';
import { RoundSelector } from '../../components/_shared/RoundSelector';
import { StandingsTable } from '../../components/standings/StandingsTable';
import { StandingTypeSelector } from '../../components/standings/partials/StandingTypeSelector';
import { StandingType } from '../../utils/standing-type.enum';
import { SeasonSelector } from '../../components/_shared/SeasonSelector';
import { SELECT_ALL_ROUNDS } from '../../utils/constants';

const mapStateToProps = (state: RootState) => ({
  standingsByRound: state.seasonState.season.standingsByRound,
  roundNumbers: state.seasonState.season.roundNumbers,
  selectedRoundNumber: state.seasonState.selectedRoundNumber
});

export interface Props {
  standingsByRound: RoundStandings[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  handleRoundSelect: (round: number) => Function;
}

export interface State {
  selectedRoundNumber: number;
  selectedStandingType: StandingType;
}

/**
 * Container which renders standings table with filters.
 */
class StandingsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    // Select last round by default
    const lastRoundNumber = props.standingsByRound[props.standingsByRound.length - 1].round;

    this.state = {
      selectedRoundNumber: lastRoundNumber,
      selectedStandingType: StandingType.Overall
    };
  }

  handleRoundNumberChange = (roundNumber: number): void => {
    this.setState({
      selectedRoundNumber: roundNumber
    });
  }

  handleStandingTypeChange = (standingType: StandingType): void => {
    this.setState({
      selectedStandingType: standingType
    });
  }

  render() {
    const { standingsByRound, roundNumbers } = this.props;
    const { selectedRoundNumber, selectedStandingType } = this.state;

    let selectedRound = null;
    if (selectedRoundNumber === SELECT_ALL_ROUNDS) {
      selectedRound = standingsByRound[standingsByRound.length - 1];
    } else {
      selectedRound = standingsByRound.find(round => round.round === selectedRoundNumber);
    }

    const selectedStandings = selectedRound && selectedRound.standings || [];

    return (
      <div>
        <Form style={{ marginBottom: '36px' }}>
          <Form.Group widths="equal">
            <SeasonSelector/>
            <RoundSelector
              roundNumbers={roundNumbers}
              selectedRoundNumber={selectedRoundNumber}
              onChange={this.handleRoundNumberChange}
            />
            <StandingTypeSelector
              selectedStandingType={selectedStandingType}
              onChange={this.handleStandingTypeChange}
            />
          </Form.Group>
        </Form>

        <StandingsTable
          standings={selectedStandings}
          standingType={selectedStandingType}
        />
      </div>
    );
  }

}

// Connects a React component to a Redux store
export default connect(mapStateToProps)(StandingsPage);
