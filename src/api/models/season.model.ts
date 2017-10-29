import { Round } from './round.model';

// tslint:disable:no-any
export class Season {
  matchesByRound: Round[];

  constructor(props: any = {}) {
    this.matchesByRound = props.matchesByRound || [];
  }
}
