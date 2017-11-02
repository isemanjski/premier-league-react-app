// tslint:disable:no-any
import { isNotNil } from '../../utils/helpers';
import { Match } from './match.model';

/**
 * Model class that holds list of matches for one round.
 */
export class RoundMatches {
  round: number;
  matches: Match[];

  constructor(props: any = {}) {
    this.round = isNotNil(props.round) ? props.round : null;
    this.matches = props.matches || [];
  }
}
