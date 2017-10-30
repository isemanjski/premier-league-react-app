// tslint:disable:no-any
import { Standing } from './standing.model';
import { isNotNil } from '../../utils/helpers';

export class RoundStandings {
  round: number;
  standings: Standing[];

  constructor(props: any = {}) {
    this.round = isNotNil(props.round) ? props.round : null;
    this.standings = props.standings || [];
  }
}
