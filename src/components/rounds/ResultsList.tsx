import * as React from 'react';
import { Match } from '../../api/models';
import { Fixture } from '../_shared/Fixture';
import { SELECT_ALL_TEAMS } from '../../utils/constants';

export interface Props {
  matches: Match[];
  selectedRoundNumber: number;
  selectedTeamId: string;
}

export const ResultsList: React.StatelessComponent<Props> = (props: Props) => {
  const { matches, selectedRoundNumber, selectedTeamId } = props;

  if (selectedRoundNumber === null) {
    return null;
  }

  const filteredMatches = matches.slice().filter(match => {
    if (!selectedTeamId || selectedTeamId === SELECT_ALL_TEAMS) {
      return match;
    } else {
      return match.awayTeam.id === selectedTeamId || match.homeTeam.id === selectedTeamId;
    }
  });

  const matchList = filteredMatches.map((match: Match, index: number) => {
    return (
      <li key={index} className="pl-results-list-item">
        <Fixture match={match}/>
      </li>
    );
  });

  return (
    <div className="pl-results-list-container">
      <div className="pl-results-list-title">Round {selectedRoundNumber}</div>
      <ul className="pl-results-list">{matchList}</ul>
    </div>
  );
};
