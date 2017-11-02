// tslint:disable:no-any

/**
 * Model class which holds information about team.
 */
export class Team {
  id: string;
  name: string;

  constructor(props: any = {}) {
    this.id = props.id || null;
    this.name = props.name || null;
  }
}
