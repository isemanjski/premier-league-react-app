import { Match } from './match.model';

// tslint:disable:no-any
export class Round {
  round: number;
  matches: Match[];

  constructor(props: any = {}) {
    this.round = props.round;
    this.matches = props.matches || [];
  }
}
