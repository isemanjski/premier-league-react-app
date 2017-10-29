import { reducer, State as SeasonState } from './season-reducer';
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
    expect(reducer(undefined, {} as any)).toEqual(<SeasonState> {
      season: new Season(),
      selectedRoundNumber: null,
      isLoading: false,
      error: null
    });
  });

  it('should handle LOAD_SEASON_DATA_START', () => {
    expect(
      reducer({} as SeasonState, {
        type: types.LOAD_SEASON_DATA_START
      })
    ).toEqual(<SeasonState> {
      isLoading: true,
      error: null
    });
  });

  it('should handle LOAD_SEASON_DATA_SUCCESS', () => {
    expect(
      reducer({} as SeasonState, {
        type: types.LOAD_SEASON_DATA_SUCCESS,
        payload: data
      })
    ).toEqual(<SeasonState> {
      isLoading: false,
      season: expectedModel,
      selectedRoundNumber: 1
    });
  });

  it('should handle LOAD_SEASON_DATA_ERROR', () => {
    expect(
      reducer({} as SeasonState, {
        type: types.LOAD_SEASON_DATA_ERROR,
        payload: 'Error message'
      })
    ).toEqual(<SeasonState> {
      isLoading: false,
      error: 'Error message'
    });
  });

  it('should handle SELECT_ROUND_IN_SEASON', () => {
    expect(
      reducer({} as SeasonState, {
        type: types.SELECT_ROUND_IN_SEASON,
        payload: 1
      })
    ).toEqual(<SeasonState> {
      selectedRoundNumber: 1
    });
  });

});
