// tslint:disable:no-any

import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, SelectProps } from 'semantic-ui-react';
import { StandingType } from '../../constants/standing-type.enum';

interface Props {
  selectedStandingType: StandingType;
  onChange: Function;
}

interface State {
  selectOptions: any[];
}

const standingTypes = [StandingType.Overall, StandingType.Home, StandingType.Away];

class StandingTypeSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const selectOptions = standingTypes.map(standingType => {
      return ({
        key: standingType,
        text: standingType.charAt(0).toUpperCase() + standingType.slice(1),
        value: standingType
      });
    });

    this.state = {
      selectOptions: selectOptions
    };
  }

  handleChange = (event: SyntheticEvent<HTMLSelectElement>, data: SelectProps) => {
    this.props.onChange(data.value as StandingType);
  }

  render() {
    return (
      <Form.Select
        label="Filter by Home or Away"
        selection={true}
        value={this.props.selectedStandingType}
        options={this.state.selectOptions}
        onChange={this.handleChange}
        className="pl-dropdown"
      />
    );
  }
};

export default StandingTypeSelector;
