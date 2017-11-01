import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RootState } from '../../store/root-reducer';
import { RoundStandings } from '../../api/models';
import RoundSelector from '../rounds/RoundSelector';
import StandingsTable from './StandingsTable';
import StandingsTypeSelector from './StandingTypeSelector';
import { StandingType } from '../../constants/standing-type.enum';
import SeasonSelector from './SeasonSelector';

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

class Standings extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedRoundNumber: props.selectedRoundNumber,
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

    const selectedRound = standingsByRound.find(round => round.round === selectedRoundNumber);
    const selectedStandings = selectedRound && selectedRound.standings || [];

    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <SeasonSelector/>
            <RoundSelector
              roundNumbers={roundNumbers}
              selectedRoundNumber={selectedRoundNumber}
              onChange={this.handleRoundNumberChange}
            />
            <StandingsTypeSelector
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

export default connect(mapStateToProps)(Standings);
