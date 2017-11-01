import { Action, LOAD_SEASON_DATA_ERROR, LOAD_SEASON_DATA_START, LOAD_SEASON_DATA_SUCCESS } from './season-actions';
import { Season } from '../../api/models';
import { mapSeasonDataToModel } from '../../api/mappings/season-model-mapper';

// Store state
export type State = {
  readonly season: Season;
  readonly sessionDataLoading: boolean;
  readonly sessionDataError: string | Error | null;
  readonly selectedRoundNumber: number | null;
};

// Initial store state
const initialState: State = {
  season: new Season(),
  sessionDataLoading: false,
  sessionDataError: null,
  selectedRoundNumber: null
};

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD_SEASON_DATA_START:
      return { ...state, sessionDataLoading: true, sessionDataError: null };
    case LOAD_SEASON_DATA_SUCCESS:
      const seasonModel = mapSeasonDataToModel(action.payload);

      let lastRoundNumber = null;
      if (seasonModel && seasonModel.matchesByRound && seasonModel.matchesByRound.length) {
        lastRoundNumber = seasonModel.matchesByRound[seasonModel.matchesByRound.length - 1].round;
      }

      return { ...state, season: seasonModel, sessionDataLoading: false, selectedRoundNumber: lastRoundNumber };
    case LOAD_SEASON_DATA_ERROR:
      return { ...state, sessionDataLoading: false, sessionDataError: action.payload };
    default:
      return state;
  }
};
