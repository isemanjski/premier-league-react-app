// tslint:disable:no-any
import { Team } from './team.model';
import { Statistics } from './statistics.model';
import { isNotNil } from '../../utils/helpers';
import { Match } from './match.model';

export class Standing {
  team: Team;
  position: number;
  homePosition: number;
  awayPosition: number;
  prevPosition: number;
  prevHomePosition: number;
  prevAwayPosition: number;
  overall: Statistics;
  home: Statistics;
  away: Statistics;
  playedMatches: Match[];
  prevStanding: Standing;

  constructor(props: any = {}) {
    this.team = props.team || null;
    this.position = isNotNil(props.position) ? props.position : null;
    this.homePosition = isNotNil(props.homePosition) ? props.homePosition : null;
    this.awayPosition = isNotNil(props.awayPosition) ? props.awayPosition : null;
    this.prevPosition = isNotNil(props.prevPosition) ? props.prevPosition : null;
    this.prevHomePosition = isNotNil(props.prevHomePosition) ? props.prevHomePosition : null;
    this.prevAwayPosition = isNotNil(props.prevAwayPosition) ? props.prevAwayPosition : null;
    this.overall = props.overall || new Statistics();
    this.home = props.home || new Statistics();
    this.away = props.away || new Statistics();
    this.playedMatches = props.playedMatches || [];
    this.prevStanding = props.prevStanding || null;
  }
}
