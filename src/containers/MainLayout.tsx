import * as React from 'react';
import { connect } from 'react-redux';
import { Season } from '../api/models/season.model';
import { fetchSeasonData } from '../api/api';
import { RootState } from '../store/root-reducer';
import RoundsTable from '../components/rounds/RoundsTable';

/**
 * Maps Redux store updates to component props.
 * Any time the store is updated, `mapStateToProps` will be called.
 */
const mapStateToProps = (state: RootState) => ({
  season: state.season.season,
  isLoading: state.season.isLoading,
  error: state.season.error
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
  isLoading: boolean;
  error: string | null;
  fetchSeasonData: () => void;
}

class MainLayout extends React.Component<Props> {

  componentDidMount() {
    // Call api to fetch season data
    this.props.fetchSeasonData();
  }

  render() {
    const { season, error } = this.props;

    const matchesDefined = season && season.matchesByRound.length > 0;
    let matchesTable = null;
    if (matchesDefined) {
      matchesTable = <RoundsTable/>;
    }

    return (
      <div className="App">
        <div className="App-header"/>
        {error ? error : matchesDefined ? matchesTable : 'Loading...'}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
