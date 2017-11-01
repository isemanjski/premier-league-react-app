import * as React from 'react';
import { Match } from '../../api/models';
import { Fixture } from '../_shared/Fixture';

export interface Props {
  round: number;
  matches: Match[];
}

export const ResultsList: React.StatelessComponent<Props> = (props: Props) => {
  const { round, matches } = props;

  if (round === null) {
    return null;
  }

  const matchList = matches.map((match: Match, index: number) => {
    return (
      <li key={index} className="pl-results-list-item">
        <Fixture match={match}/>
      </li>
    );
  });

  return (
    <div className="pl-results-list-container">
      <ul className="pl-results-list">{matchList}</ul>
    </div>
  );
};
