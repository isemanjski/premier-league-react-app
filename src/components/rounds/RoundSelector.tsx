import * as React from 'react';
import { SyntheticEvent } from 'react';

interface Props {
  roundNumbers: number[];
  selectedRoundNumber: number;
  onSelect: Function;
}

const RoundSelector: React.StatelessComponent<Props> = (props: Props) => {
  const optionElements: JSX.Element[] = [];

  props.roundNumbers.forEach(roundNumber => {
    optionElements.push(
      <option key={`${roundNumber}`} value={`${roundNumber}`}>ROUND {roundNumber}</option>
    );
  });

  const handleOnChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    props.onSelect(Number(event.currentTarget.value));
  };

  return (
    <select defaultValue={`${props.selectedRoundNumber}`} onChange={handleOnChange}>
      {optionElements}
    </select>
  );
};

export default RoundSelector;
