import * as React from 'react';
import { Round } from '../api/models/round.model';

export interface Props {
  matchesByRound: Round[];
}

class Table extends React.Component<Props> {
  render() {
    return (
      <pre>{JSON.stringify(this.props.matchesByRound, null, 2)}</pre>
    );
  }
}

export default Table;
