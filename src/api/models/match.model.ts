// tslint:disable:no-any
export class Match {
  homeTeamName: string;
  homeTeamGoals: number;
  awayTeamName: string;
  awayTeamGoals: number;

  constructor(props: any = {}) {
    this.homeTeamName = props.homeTeamName || null;
    this.homeTeamGoals = props.homeTeamGoals;
    this.awayTeamName = props.awayTeamName || null;
    this.awayTeamGoals = props.awayTeamGoals;
  }
}
