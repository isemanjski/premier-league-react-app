// tslint:disable:no-any
import { Standing } from './standing.model';
import { isNotNil } from '../../utils/helpers';

/**
 * Model class that holds list of standings for one round.
 */
export class RoundStandings {
  round: number;
  standings: Standing[];

  constructor(props: any = {}) {
    this.round = isNotNil(props.round) ? props.round : null;
    this.standings = props.standings || [];
  }
}
