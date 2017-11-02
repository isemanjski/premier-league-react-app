// tslint:disable:no-any
import { Team } from './team.model';
import { StandingByType } from './statistics.model';
import { Match } from './match.model';

/**
 * Model class representing staining/statistics for each team throughout season.
 */
export class Standing {
  team: Team;
  overall: StandingByType;
  home: StandingByType;
  away: StandingByType;
  playedMatches: Match[];
  prevStanding: Standing;

  constructor(props: any = {}) {
    this.team = props.team || null;
    this.overall = props.overall || new StandingByType();
    this.home = props.home || new StandingByType();
    this.away = props.away || new StandingByType();
    this.playedMatches = props.playedMatches || [];
    this.prevStanding = props.prevStanding || null;
  }
}
