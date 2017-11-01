import * as React from 'react';
import { Form } from 'semantic-ui-react';

const seasons = ['2016/2017'];

const SeasonSelector: React.StatelessComponent = () => {
  const selectOptions = seasons.map(seasonYear => {
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
      value={seasons[0]}
      options={selectOptions}
      className="pl-dropdown"
    />
  );
};

export default SeasonSelector;
