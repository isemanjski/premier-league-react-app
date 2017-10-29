import { getRandomInt } from '../utils/helpers';
import { actionCreators as actions } from '../store/season';

const SERVER_BASE_URL = 'https://s3.eu-central-1.amazonaws.com/js-assignment';

/**
 * Check validity of received response status.
 * If response status is not in valid range throw an error containing status text.
 *
 * @param {Response} response - Response object received from server.
 * @returns {any} If status is valid then actual response, otherwise error with status text.
 */
function checkStatus(response: Response): Response | Error {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Error(response.statusText);
  }
}

/**
 * Parses response as JSON.
 *
 * @param {Response} response - Response object received from server.
 * @returns {Promise<any>} Promise object with JSON value.
 */
function parseJSON(response: Response): Promise<{}> {
  return response.json();
}

/**
 * Fetches season data from server.
 *
 * @returns {(dispatch: Function) => void} A function that accepts `dispatch` so it can be called asynchronously.
 */
const fetchSeasonDataFromServer = () => {
  return (dispatch: Function): void => {
    dispatch(actions.loadSeasonDataStart());

    fetch(`${SERVER_BASE_URL}/data.json`)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(actions.loadSeasonDataSuccess(json)))
      .catch((error: Response) => dispatch(actions.loadSeasonDataError(error.statusText)));
  };
};

/**
 * Simulates fetching data from server by using setTimeout.
 * Produces error in with probability of 0.1.
 *
 * @returns {(dispatch: Function) => void} A function that accepts `dispatch` so it can be called asynchronously.
 */
const fetchSeasonDataFromFile = () => {
  return (dispatch: Function): void => {
    const dataFromFile = require('./fixture/data.json');
    const randomDelayInSeconds = getRandomInt(1, 5);
    const randomError = getRandomInt(0, 100) < 10;

    dispatch(actions.loadSeasonDataStart());

    setTimeout(
      () => {
        if (randomError) {
          dispatch(actions.loadSeasonDataError('Error loading season data'));
        } else {
          dispatch(actions.loadSeasonDataSuccess(dataFromFile));
        }
      },
      randomDelayInSeconds * 1000);
  };
};

/**
 * Fetches season data.
 *
 * Its actually an action creator which returns a function instead of an action.
 *
 * @returns {(dispatch: Function) => void} A function that accepts `dispatch` so it can be called asynchronously
 */
export function fetchSeasonData() {
  if (process.env.NODE_ENV === 'production') {
    return fetchSeasonDataFromServer();
  } else {
    return fetchSeasonDataFromFile();
  }
}
