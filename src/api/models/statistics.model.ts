// tslint:disable:no-any
import { isNotNil } from '../../utils/helpers';

export class StandingByType {
  position: number;
  prevPosition: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
  points: number;

  constructor(props: any = {}) {
    this.position = props.position || null;
    this.prevPosition = props.prevPosition || null;
    this.played = isNotNil(props.played) ? props.played : 0;
    this.won = isNotNil(props.won) ? props.won : 0;
    this.drawn = isNotNil(props.drawn) ? props.drawn : 0;
    this.lost = isNotNil(props.lost) ? props.lost : 0;
    this.goalsScored = isNotNil(props.goalsScored) ? props.goalsScored : 0;
    this.goalsConceded = isNotNil(props.goalsConceded) ? props.goalsConceded : 0;
    this.goalDifference = isNotNil(props.goalDifference) ? props.goalDifference : 0;
    this.points = isNotNil(props.points) ? props.points : 0;
  }
}
