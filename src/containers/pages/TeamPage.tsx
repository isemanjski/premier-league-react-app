// tslint:disable:no-any
import * as React from 'react';
import { connect } from 'react-redux';
import { Params } from 'react-router/lib/Router';
import { Divider } from 'semantic-ui-react';
import { RootState } from '../../store/root-reducer';
import { RoundMatches, Team } from '../../api/models';
import { NotFoundPage } from './NotFoundPage';
import { TeamHeader } from '../../components/team/TeamHeader';
import { TeamResults } from '../../components/team/TeamResults';
import { TeamTopStats } from '../../components/team/TeamTopStats';

const mapStateToProps = (state: RootState) => ({
  matchesByRound: state.seasonState.season.matchesByRound,
  teams: state.seasonState.season.teams
});

export interface Props {
  matchesByRound: RoundMatches[];
  teams: Team[];
  params: Params;
}

class TeamPage extends React.Component<Props> {

  render() {
    const { teams, matchesByRound } = this.props;
    const { teamId } = this.props.params;

    const selectedTeam = teams.find(team => team.id === teamId);

    if (!selectedTeam) {
      return (
        <NotFoundPage text={'Team Not Found'}/>
      );
    } else {
      return (
        <div className="pl-team-page">
          <div>
            <TeamHeader team={selectedTeam} matchesByRound={matchesByRound}/>
          </div>
          <div>
            <Divider horizontal={true}>STATS</Divider>
            <TeamTopStats team={selectedTeam} matchesByRound={matchesByRound}/>
            <Divider horizontal={true}>MATCHES</Divider>
            <TeamResults team={selectedTeam} matchesByRound={matchesByRound}/>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(TeamPage);
