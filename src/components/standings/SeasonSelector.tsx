import * as React from 'react';
import { Form } from 'semantic-ui-react';

const SeasonSelector: React.StatelessComponent = () => {
  const seasonYears = ['2016/2017'];

  const selectOptions = seasonYears.map(seasonYear => {
    return ({
      key: seasonYear,
      text: seasonYear,
      value: seasonYear
    });
  });

  return (
    <Form.Select
      label="Filter by Season"
      selection={true}
      value={seasonYears[0]}
      options={selectOptions}
      className="pl-dropdown"
    />
  );
};

export default SeasonSelector;
