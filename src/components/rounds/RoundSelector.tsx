import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, DropdownProps } from 'semantic-ui-react';

interface Props {
  roundNumbers: number[];
  selectedRoundNumber: number;
  onSelect: Function;
}

const RoundSelector: React.StatelessComponent<Props> = (props: Props) => {
  const selectOptions = props.roundNumbers.map(roundNumber => {
    return ({
      key: roundNumber,
      text: `Round ${roundNumber}`,
      value: roundNumber
    });
  });

  const handleChange = (event: SyntheticEvent<HTMLSelectElement>, data: DropdownProps) => {
    props.onSelect(data.value);
  };

  return (
    <Form.Select
      label="Filter by round"
      selection={true}
      value={props.selectedRoundNumber}
      options={selectOptions}
      onChange={handleChange}
      className="pl-dropdown"
    />
  );
};

export default RoundSelector;
