// tslint:disable:no-any

import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, SelectProps } from 'semantic-ui-react';

interface Props {
  roundNumbers: number[];
  selectedRoundNumber: number;
  onChange: Function;
}

interface State {
  selectOptions: any[];
}

class RoundSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const selectOptions = props.roundNumbers.map(roundNumber => {
      return ({
        key: roundNumber,
        text: `Round ${roundNumber}`,
        value: roundNumber
      });
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

export default RoundSelector;
