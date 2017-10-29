// tslint:disable:no-any

export const LOAD_SEASON_DATA_START = 'LOAD_SEASON_DATA_START';
export const LOAD_SEASON_DATA_SUCCESS = 'LOAD_SEASON_DATA_SUCCESS';
export const LOAD_SEASON_DATA_ERROR = 'LOAD_SEASON_DATA_ERROR';
export const SELECT_ROUND_IN_SEASON = 'SELECT_ROUND_IN_SEASON';

export type Actions = {
  LOAD_SEASON_DATA_START: { type: typeof LOAD_SEASON_DATA_START},
  LOAD_SEASON_DATA_SUCCESS: { type: typeof LOAD_SEASON_DATA_SUCCESS, payload: any },
  LOAD_SEASON_DATA_ERROR: { type: typeof LOAD_SEASON_DATA_ERROR, payload: string }
  SELECT_ROUND_IN_SEASON: { type: typeof SELECT_ROUND_IN_SEASON, payload: number }
};

export type Action = Actions[keyof Actions];

// Action Creators
export const actionCreators = {
  loadSeasonDataStart: () => ({
    type: LOAD_SEASON_DATA_START
  }),
  loadSeasonDataSuccess: (payload: any) => ({
    type: LOAD_SEASON_DATA_SUCCESS,
    payload
  }),
  loadSeasonDataError: (payload: string) => ({
    type: LOAD_SEASON_DATA_ERROR,
    payload
  }),
  selectRoundInSeason: (payload: number) => ({
    type: SELECT_ROUND_IN_SEASON,
    payload
  })
};
