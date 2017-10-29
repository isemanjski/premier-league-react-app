import { connect } from 'react-redux';
import { RootState } from '../store/root-reducer';
import { fetchSeasonData } from '../api/api';
import Main from '../components/Main';

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

// Connects a React component to a Redux store.
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
