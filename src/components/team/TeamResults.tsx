import * as React from 'react';
import { RoundMatches, Team } from '../../api/models';
import { RoundResultsList } from '../results/RoundResultsList';
import { SELECT_ALL_ROUNDS } from '../../utils/constants';

export interface Props {
  team: Team;
  matchesByRound: RoundMatches[];
}

export const TeamResults: React.StatelessComponent<Props> = (props: Props) => {
  const { team, matchesByRound } = props;

  return (
    <RoundResultsList
      matchesByRound={matchesByRound}
      selectedRoundNumber={SELECT_ALL_ROUNDS}
      selectedTeamId={team.id}
    />
  );
};
