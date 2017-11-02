import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { RoundMatches, Team } from '../../api/models';
import { RootState } from '../../store/root-reducer';
import { RoundSelector } from '../../components/_shared/RoundSelector';
import { SeasonSelector } from '../../components/_shared/SeasonSelector';
import { TeamSelector } from '../../components/_shared/TeamSelector';
import { SELECT_ALL_ROUNDS, SELECT_ALL_TEAMS } from '../../utils/constants';
import { RoundResultsList } from '../../components/results/RoundResultsList';

const mapStateToProps = (state: RootState) => ({
  matchesByRound: state.seasonState.season.matchesByRound,
  roundNumbers: state.seasonState.season.roundNumbers,
  selectedRoundNumber: state.seasonState.selectedRoundNumber,
  teams: state.seasonState.season.teams
});

interface Props {
  matchesByRound: RoundMatches[];
  roundNumbers: number[];
  selectedRoundNumber: number;
  teams: Team[];
  handleRoundSelect: (round: number) => Function;
}

interface State {
  selectedRoundNumber: number;
  selectedTeamId: string;
}

/**
 * Container which renders match results table with filters.
 */
class ResultsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedRoundNumber: SELECT_ALL_ROUNDS,
      selectedTeamId: SELECT_ALL_TEAMS
    };
  }

  handleRoundNumberChange = (roundNumber: number): void => {
    this.setState({
      selectedRoundNumber: roundNumber
    });
  }

  handleTeamChange = (selectedTeamId: string): void => {
    this.setState({
      selectedTeamId: selectedTeamId
    });
  }

  render() {
    const { matchesByRound, roundNumbers, teams } = this.props;
    const { selectedRoundNumber, selectedTeamId } = this.state;

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
            <TeamSelector
              teams={teams}
              selectedTeamId={selectedTeamId}
              onChange={this.handleTeamChange}
            />
          </Form.Group>
        </Form>

        <RoundResultsList
          matchesByRound={matchesByRound}
          selectedRoundNumber={selectedRoundNumber}
          selectedTeamId={selectedTeamId}
        />
      </div>
    );
  }
}

// Connects a React component to a Redux store
export default connect(mapStateToProps)(ResultsPage);
