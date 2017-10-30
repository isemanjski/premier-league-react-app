// tslint:disable:no-any
import { isNotNil } from '../../utils/helpers';
import { Team } from './team.model';

export class Match {
  homeTeam: Team;
  homeTeamGoals: number;
  homeTeamPoints: number;
  awayTeam: Team;
  awayTeamGoals: number;
  awayTeamPoints: number;

  constructor(props: any = {}) {
    this.homeTeam = props.homeTeam || null;
    this.homeTeamGoals = isNotNil(props.homeTeamGoals) ? props.homeTeamGoals : null;
    this.homeTeamPoints = isNotNil(props.homeTeamPoints) ? props.homeTeamPoints : null;
    this.awayTeam = props.awayTeam || null;
    this.awayTeamGoals = isNotNil(props.awayTeamGoals) ? props.awayTeamGoals : null;
    this.awayTeamPoints = isNotNil(props.awayTeamPoints) ? props.awayTeamPoints : null;
  }
}
