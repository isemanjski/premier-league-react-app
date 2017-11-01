// tslint:disable:no-any

import * as React from 'react';
import { Form } from 'semantic-ui-react';

const seasonYears = ['2016/17'];

interface Props {
}

interface State {
  selectOptions: any[];
}

class SeasonSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const selectOptions = seasonYears.map(seasonYear => {
      return ({
        key: seasonYear,
        text: seasonYear,
        value: seasonYear
      });
    });

    this.state = {
      selectOptions: selectOptions
    };
  }

  render() {
    return (
      <Form.Select
        label="Filter by Season"
        selection={true}
        value={seasonYears[0]}
        options={this.state.selectOptions}
        className="pl-dropdown"
      />
    );
  }
}

export default SeasonSelector;
