import * as types from './season-actions';
import { actionCreators as actions } from './season-actions';

describe('season actions', () => {

  it('should create an action to begin loading season data', () => {
    const expectedAction = {
      type: types.LOAD_SEASON_DATA_START
    };
    expect(actions.loadSeasonDataStart()).toEqual(expectedAction);
  });

  it('should create an action to return successfully loaded season data', () => {
    const payload = { name: 'Infobip' };
    const expectedAction = {
      type: types.LOAD_SEASON_DATA_SUCCESS,
      payload
    };
    expect(actions.loadSeasonDataSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to return error message', () => {
    const error = 'Not good';
    const expectedAction = {
      type: types.LOAD_SEASON_DATA_ERROR,
      payload: error
    };
    expect(actions.loadSeasonDataError(error)).toEqual(expectedAction);
  });

});
