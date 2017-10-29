import { reducer } from './season-reducer';
import * as types from './season-actions';
import { Season } from '../../api/models/season.model';

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
  }
];

const expectedModel: Season = {
  matchesByRound: [
    {
      'round': 1,
      'matches': [{
        homeTeamName: 'Team 1',
        homeTeamGoals: 1,
        awayTeamName: 'Team 2',
        awayTeamGoals: 1
      }]
    }
  ]
};

describe('season reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      season: new Season(),
      isLoading: false,
      error: null
    });
  });

  it('should handle LOAD_SEASON_DATA_START', () => {
    expect(
      reducer({} as any, {
        type: types.LOAD_SEASON_DATA_START
      })
    ).toEqual({
      isLoading: true,
      error: null
    });
  });

  it('should handle LOAD_SEASON_DATA_SUCCESS', () => {
    expect(
      reducer({} as any, {
        type: types.LOAD_SEASON_DATA_SUCCESS,
        payload: data
      })
    ).toEqual({
      isLoading: false,
      season: expectedModel
    });
  });

  it('should handle LOAD_SEASON_DATA_ERRROR', () => {
    expect(
      reducer({} as any, {
        type: types.LOAD_SEASON_DATA_ERROR,
        payload: 'Error message'
      })
    ).toEqual({
      isLoading: false,
      error: 'Error message'
    });
  });

});
