import * as React from 'react';
import RoundsTable from './RoundsTable';
import { Season } from '../api/models/season.model';

export interface Props {
  season: Season;
  isLoading: boolean;
  error: string | null;
  fetchSeasonData: () => void;
}

class Main extends React.Component<Props> {

  componentDidMount() {
    // Call api to fetch season data
    this.props.fetchSeasonData();
  }

  render() {
    const matchesDefined = this.props.season && this.props.season.matchesByRound.length > 0;
    let matchesTable = null;
    if (matchesDefined) {
      matchesTable = <RoundsTable matchesByRound={this.props.season.matchesByRound}/>;
    }

    return (
      <div className="App">
        <div className="App-header"/>
        {matchesDefined ? matchesTable : 'Loading...'}
        {this.props.error ? this.props.error : ''}
      </div>
    );
  }
}

export default Main;
