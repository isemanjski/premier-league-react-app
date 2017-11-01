import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Message } from 'semantic-ui-react';
import { Season } from '../../api/models/index';
import { fetchSeasonData } from '../../api/api';
import { RootState } from '../../store/root-reducer';
import { Header } from '../../components/header/Header';
import { Navigation } from '../../components/navigation/Navigation';

/**
 * Maps Redux store updates to component props.
 * Any time the store is updated, `mapStateToProps` will be called.
 */
const mapStateToProps = (state: RootState) => ({
  season: state.seasonState.season,
  sessionDataLoading: state.seasonState.sessionDataLoading,
  sessionDataError: state.seasonState.sessionDataError
});

/**
 * Maps each action creator to component props.
 * Every action creator is wrapped into a `dispatch` call so they may be invoked directly.
 */
const mapDispatchToProps = (dispatch: Function) => ({
  fetchSeasonData: () => dispatch(fetchSeasonData())
});

interface Props {
  season: Season;
  sessionDataLoading: boolean;
  sessionDataError: string | null;
  fetchSeasonData: () => void;
  children?: React.ReactNode;
}

class MainLayout extends React.Component<Props> {

  componentDidMount() {
    // Call api to fetch season data
    this.props.fetchSeasonData();
  }

  render() {
    const { season, sessionDataLoading, sessionDataError } = this.props;

    const isDataDefined = season && season.matchesByRound.length > 0;
    let content = null;
    if (isDataDefined) {
      content = (
        <div>
          {this.props.children}
        </div>
      );
    }

    return (
      <div>
        <Header/>
        <Navigation/>

        <div className="pl-main-container">
          <Container className="pl-main-container-content">
            <Message hidden={!sessionDataError} negative={true} icon={true}>
              <Message.Content>
                <Message.Header>Error</Message.Header>
                {sessionDataError}
              </Message.Content>
            </Message>

            <Dimmer active={sessionDataLoading} inverted={true}>
              <Loader active={sessionDataLoading}>Loading</Loader>
            </Dimmer>

            {content}
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
