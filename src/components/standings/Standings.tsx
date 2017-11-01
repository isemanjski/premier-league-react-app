import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Form, Header } from 'semantic-ui-react';
import { RootState } from '../../store/root-reducer';
import { actionCreators } from '../../store/season';
import { RoundStandings } from '../../api/models';
import RoundSelector from '../rounds/RoundSelector';
import StandingsTable from './StandingsTable';
import StandingsTypeSelector from './StandingTypeSelector';
import { StandingType } from '../../constants/standing-type.enum';
import SeasonSelector from './SeasonSelector';

const mapStateToProps = (state: RootState) => ({
  standingsByRound: state.season.season.standingsByRound,
  roundNumbers: state.season.season.roundNumbers,
  selectedRoundNumber: state.season.selectedRoundNumber
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleRoundSelect: (round: number) => dispatch(actionCreators.selectRoundInSeason(round))
});

export interface Props {
  standingsByRound: RoundStandings[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  handleRoundSelect: (round: number) => Function;
}

export interface State {
  selectedStandingType: StandingType;
}

class Standings extends React.Component<Props, State> {

  state = {
    selectedStandingType: StandingType.Overall
  };

  handleStandingTypeSelect = (standingType: StandingType): void => {
    this.setState({
      selectedStandingType: standingType
    });
  }

  render() {
    const selectedRound = this.props.standingsByRound.find(round => round.round === this.props.selectedRoundNumber);
    const selectedStandings = selectedRound && selectedRound.standings || [];

    return (
      <div>
        <Header as="h2">Standings</Header>
        <Divider/>

        <Form>
          <Form.Group widths="equal">
            <SeasonSelector />
            <RoundSelector
              roundNumbers={this.props.roundNumbers}
              selectedRoundNumber={this.props.selectedRoundNumber}
              onSelect={this.props.handleRoundSelect}
            />
            <StandingsTypeSelector
              selectedStandingType={this.state.selectedStandingType}
              onSelect={this.handleStandingTypeSelect}
            />
          </Form.Group>
        </Form>

        <StandingsTable
          standings={selectedStandings}
          standingType={this.state.selectedStandingType}
        />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Standings);
