import { reducer, State as SeasonState } from './season-reducer';
import * as types from './season-actions';
import { Season } from '../../api/models/season.model';

// tslint:disable:no-any
const data: any[] = [
  {
    round: 1,
    matches: [
      {
        'Team 1': 3,
        'Team 2': 1
      }
    ]
  }
];

describe('season reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(<SeasonState> {
      season: new Season(),
      selectedRoundNumber: null,
      sessionDataLoading: false,
      sessionDataError: null
    });
  });

  it('should handle LOAD_SEASON_DATA_START', () => {
    const state = reducer({} as SeasonState, {
      type: types.LOAD_SEASON_DATA_START
    });

    expect(state).toEqual(<SeasonState> {
      sessionDataLoading: true,
      sessionDataError: null
    });
  });

  it('should handle LOAD_SEASON_DATA_SUCCESS', () => {
    const state = reducer({} as SeasonState, {
      type: types.LOAD_SEASON_DATA_SUCCESS,
      payload: data
    });

    expect(state.sessionDataLoading).toEqual(false);
    expect(state.selectedRoundNumber).toEqual(1);
    expect(state.season.teams.length).toEqual(2);
    expect(state.season.matchesByRound[0].matches[0].awayTeamGoals).toEqual(1);
    expect(state.season.matchesByRound[0].matches[0].awayTeamPoints).toEqual(0);
    expect(state.season.standingsByRound[0].standings[0].overall.played).toEqual(1);
    expect(state.season.standingsByRound[0].standings[0].overall.goalsScored).toEqual(3);
  });

  it('should handle LOAD_SEASON_DATA_ERROR', () => {
    const state = reducer({} as SeasonState, {
      type: types.LOAD_SEASON_DATA_ERROR,
      payload: 'Error message'
    });

    expect(state).toEqual(<SeasonState> {
      sessionDataLoading: false,
      sessionDataError: 'Error message'
    });
  });

});
