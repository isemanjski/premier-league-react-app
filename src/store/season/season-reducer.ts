import {
  Action,
  LOAD_SEASON_DATA_ERROR,
  LOAD_SEASON_DATA_START,
  LOAD_SEASON_DATA_SUCCESS,
  SELECT_ROUND_IN_SEASON
} from './season-actions';
import { Season } from '../../api/models/season.model';
import { mapSeasonDataToModel } from '../../api/mappings/season-model-mapper';

// Store state
export type State = {
  readonly season: Season;
  readonly selectedRoundNumber: number | null;
  readonly isLoading: boolean;
  readonly error: string | null;
};

// Initial store state
const initialState: State = {
  season: new Season(),
  selectedRoundNumber: null,
  isLoading: false,
  error: null
};

// Reducer
export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD_SEASON_DATA_START:
      return { ...state, isLoading: true, error: null };
    case LOAD_SEASON_DATA_SUCCESS:
      const seasonModel = mapSeasonDataToModel(action.payload);
      const lastRoundNumber = seasonModel.matchesByRound[seasonModel.matchesByRound.length - 1].round;
      return { ...state, isLoading: false, season: seasonModel, selectedRoundNumber: lastRoundNumber };
    case LOAD_SEASON_DATA_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case SELECT_ROUND_IN_SEASON:
      return { ...state, selectedRoundNumber: action.payload };
    default:
      return state;
  }
};
