import * as React from 'react';
import * as enzyme from 'enzyme';
import { TeamHeader } from './TeamHeader';
import { Team } from '../../api/models';

const team1: Team = new Team({ id: 'team-1', name: 'Team 1' });

it('renders the correct team name', () => {
  const component = enzyme.shallow(<TeamHeader team={team1}/>);
  expect(component.find('.team-name').text()).toEqual('Team 1');
});
