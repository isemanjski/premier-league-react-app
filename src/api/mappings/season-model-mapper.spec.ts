import { mapSeasonDataToModel } from './season-model-mapper';

// tslint:disable:no-any
const data: any[] = [
  {
    'round': 1,
    'matches': [
      {
        'Team 1': 1,
        'Team 2': 1
      }
    ]
  },
  {
    'round': 2,
    'matches': [
      {
        'Team 1': 0,
        'Team 3': 4
      },
      {
        'Team 2': 2,
        'Team 4': 1
      }
    ]
  }
];

it('correctly maps server data', () => {
  const model = mapSeasonDataToModel(data);

  expect(model.matchesByRound.length).toEqual(2);
  expect(model.matchesByRound[0].round).toEqual(1);
  expect(model.matchesByRound[1].matches.length).toEqual(2);
  expect(model.matchesByRound[1].matches[0].homeTeamName).toEqual('Team 1');
  expect(model.matchesByRound[1].matches[0].homeTeamGoals).toEqual(0);
  expect(model.matchesByRound[1].matches[0].awayTeamName).toEqual('Team 3');
  expect(model.matchesByRound[1].matches[0].awayTeamGoals).toEqual(4);
});
