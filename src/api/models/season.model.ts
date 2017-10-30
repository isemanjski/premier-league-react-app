// tslint:disable:no-any
import { RoundMatches } from './round-matches.model';
import { RoundStandings } from './round-standings.model';
import { Team } from './team.model';

export class Season {
  teams: Team[];
  roundNumbers: number[];
  matchesByRound: RoundMatches[];
  standingsByRound: RoundStandings[];

  constructor(props: any = {}) {
    this.teams = props.teams || [];
    this.roundNumbers = props.roundNumbers || [];
    this.matchesByRound = props.matchesByRound || [];
    this.standingsByRound = props.standingsByRound || [];
  }
}
