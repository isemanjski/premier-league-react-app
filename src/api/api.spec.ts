// tslint:disable:no-any
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as fetchMock from 'fetch-mock';
import * as types from '../store/season/season-actions';
import { checkResponse, fetchSeasonDataFromServer, parseJSON, SERVER_BASE_URL } from './api';

const mockStore = configureMockStore([thunkMiddleware]);

describe('checkResponse', () => {
  it('should return response is status is valid', () => {
    const response = { status: 200 } as Response;
    const value = checkResponse(response);
    expect(value).toEqual(response);
  });

  it('should throw error if status is not valid', () => {
    const response = { status: 404, statusText: 'Not Found' } as Response;
    expect(checkResponse(response)).toEqual(new Error('Not Found'));
  });
});

describe('parseJSON', () => {
  it('should return json response', () => {
    const response = { json: () => Promise.resolve({ name: 'React' }) };
    return expect(parseJSON(response as any)).resolves.toEqual({ name: 'React' });
  });
});

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

describe('fetchSeasonDataFromServer', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates LOAD_SEASON_DATA_SUCCESS when fetching data has been done', () => {
    fetchMock.getOnce(`${SERVER_BASE_URL}/data.json`, {
      body: data,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.LOAD_SEASON_DATA_START },
      { type: types.LOAD_SEASON_DATA_SUCCESS, payload: data }
    ];

    const store = mockStore({ season: {} });

    store.dispatch(fetchSeasonDataFromServer()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

