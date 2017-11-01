// tslint:disable:no-any

import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, SelectProps } from 'semantic-ui-react';
import { SELECT_ALL_ROUNDS } from '../../utils/constants';

interface Props {
  roundNumbers: number[];
  selectedRoundNumber: number;
  onChange: Function;
}

interface State {
  selectOptions: any[];
}

const ALL_ROUNDS_KEY = -1;
const ALL_ROUNDS_NAME = 'All Rounds';
const ALL_ROUNDS_VALUE = SELECT_ALL_ROUNDS;

export class RoundSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const selectOptions = props.roundNumbers.map(roundNumber => {
      return ({
        key: roundNumber,
        text: `Round ${roundNumber}`,
        value: roundNumber
      });
    });

    // Prepend "All Rounds" to selectOptions
    selectOptions.unshift({
      key: ALL_ROUNDS_KEY,
      text: ALL_ROUNDS_NAME,
      value: ALL_ROUNDS_VALUE
    });

    this.state = {
      selectOptions: selectOptions
    };
  }

  handleChange = (event: SyntheticEvent<HTMLSelectElement>, data: SelectProps) => {
    this.props.onChange(data.value);
  }

  render() {
    return (
      <Form.Select
        label="Filter by round"
        selectOnBlur={false}
        value={this.props.selectedRoundNumber}
        options={this.state.selectOptions}
        onChange={this.handleChange}
        className="pl-dropdown"
      />
    );
  }
}
