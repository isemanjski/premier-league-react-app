import * as React from 'react';
import { RoundMatches } from '../../api/models';
import { SELECT_ALL_ROUNDS } from '../../utils/constants';
import { RoundResults } from './RoundResults';

export interface Props {
  matchesByRound: RoundMatches[];
  selectedRoundNumber: number;
  selectedTeamId: string;
}

/**
 * Helper method to create one instance of {@link RoundResults} component with provided properties.
 */
export const createRoundResults = (round: RoundMatches, teamId: string) => {
  return (
    <div key={round.round} style={{ marginBottom: '20px' }}>
      <RoundResults
        matches={round.matches}
        selectedRoundNumber={round.round}
        selectedTeamId={teamId}
      />
    </div>
  );
};

/**
 * Component which contains list of {@link RoundResults} components.
 */
export const RoundResultsList: React.StatelessComponent<Props> = (props: Props) => {
  const { matchesByRound, selectedRoundNumber, selectedTeamId } = props;

  // tslint:disable-next-line
  let contentList: any[] = [];
  if (selectedRoundNumber === SELECT_ALL_ROUNDS) {
    contentList = matchesByRound.map(round => {
      return createRoundResults(round, selectedTeamId);
    });
  } else {
    const selectedRound = matchesByRound.find(round => round.round === selectedRoundNumber);
    if (selectedRound) {
      contentList = [createRoundResults(selectedRound, selectedTeamId)];
    }
  }

  return (
    <div>
      {contentList}
    </div>
  );
};
