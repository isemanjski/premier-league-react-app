// tslint:disable:no-any
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, SelectProps } from 'semantic-ui-react';
import { Team } from '../../api/models';
import { SELECT_ALL_TEAMS } from '../../utils/constants';

interface Props {
  teams: Team[];
  selectedTeamId: string;
  onChange: Function;
}

interface State {
  selectOptions: any[];
}

const ALL_TEAMS_KEY = 'all-teams';
const ALL_TEAMS_NAME = 'All Teams';
const ALL_TEAMS_VALUE = SELECT_ALL_TEAMS;

/**
 * Component which renders dropdown for selecting team.
 */
export class TeamSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const selectOptions = props.teams.map(team => {
      return ({
        key: team.id,
        text: team.name,
        value: team.id
      });
    });

    // Prepend "All Teams" to selectOptions
    selectOptions.unshift({
      key: ALL_TEAMS_KEY,
      text: ALL_TEAMS_NAME,
      value: ALL_TEAMS_VALUE
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
        label="Filter by Team"
        selectOnBlur={false}
        value={this.props.selectedTeamId}
        options={this.state.selectOptions}
        onChange={this.handleChange}
        className="pl-dropdown"
      />
    );
  }
}
