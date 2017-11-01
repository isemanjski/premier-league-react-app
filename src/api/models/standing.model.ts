// tslint:disable:no-any
import { Team } from './team.model';
import { StandingByType } from './statistics.model';
import { isNotNil } from '../../utils/helpers';
import { Match } from './match.model';

export class Standing {
  team: Team;
  overallPosition: number;
  homePosition: number;
  awayPosition: number;
  overall: StandingByType;
  home: StandingByType;
  away: StandingByType;
  playedMatches: Match[];
  prevStanding: Standing;

  constructor(props: any = {}) {
    this.team = props.team || null;
    this.overallPosition = isNotNil(props.overallPosition) ? props.overallPosition : null;
    this.homePosition = isNotNil(props.homePosition) ? props.homePosition : null;
    this.awayPosition = isNotNil(props.awayPosition) ? props.awayPosition : null;
    this.overall = props.overall || new StandingByType();
    this.home = props.home || new StandingByType();
    this.away = props.away || new StandingByType();
    this.playedMatches = props.playedMatches || [];
    this.prevStanding = props.prevStanding || null;
  }
}
