import * as React from 'react';
import { SyntheticEvent } from 'react';
import { DropdownProps, Form } from 'semantic-ui-react';
import { StandingType } from '../../constants/standing-type.enum';

interface Props {
  selectedStandingType: StandingType;
  onSelect: Function;
}

const standingTypes = [StandingType.Overall, StandingType.Home, StandingType.Away];

const StandingTypeSelector: React.StatelessComponent<Props> = (props: Props) => {
  const selectOptions = standingTypes.map(standingType => {
    return ({
      key: standingType,
      text: standingType.charAt(0).toUpperCase() + standingType.slice(1),
      value: standingType
    });
  });

  const handleChange = (event: SyntheticEvent<HTMLSelectElement>, data: DropdownProps) => {
    props.onSelect(data.value as StandingType);
  };

  return (
    <Form.Select
      label="Filter by Home or Away"
      selection={true}
      value={props.selectedStandingType}
      options={selectOptions}
      onChange={handleChange}
      className="pl-dropdown"
    />
  );
};

export default StandingTypeSelector;
