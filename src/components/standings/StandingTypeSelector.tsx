import * as React from 'react';
import { SyntheticEvent } from 'react';
import { StandingType } from '../../constants/standing-type.enum';

interface Props {
  selectedStandingType: StandingType;
  onSelect: Function;
}

const StandingTypeSelector: React.StatelessComponent<Props> = (props: Props) => {
  const standigTypes = [StandingType.Overall, StandingType.Home, StandingType.Away];

  const optionElements = standigTypes.map(type => (
    <option key={`${type}`} value={`${type}`}>{type}</option>
  ));

  const handleOnChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    props.onSelect(event.currentTarget.value as StandingType);
  };

  return (
    <select value={props.selectedStandingType} onChange={handleOnChange}>
      {optionElements}
    </select>
  );
};

export default StandingTypeSelector;
