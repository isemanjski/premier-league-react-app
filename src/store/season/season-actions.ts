// tslint:disable:no-any

export const LOAD_SEASON_DATA_START = 'LOAD_SEASON_DATA_START';
export const LOAD_SEASON_DATA_SUCCESS = 'LOAD_SEASON_DATA_SUCCESS';
export const LOAD_SEASON_DATA_ERROR = 'LOAD_SEASON_DATA_ERROR';

export type Actions = {
  LOAD_SEASON_DATA_START: { type: typeof LOAD_SEASON_DATA_START},
  LOAD_SEASON_DATA_SUCCESS: { type: typeof LOAD_SEASON_DATA_SUCCESS, payload: any },
  LOAD_SEASON_DATA_ERROR: { type: typeof LOAD_SEASON_DATA_ERROR, payload: string }
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
  })
};
