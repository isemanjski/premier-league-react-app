import { Action, LOAD_SEASON_DATA_ERROR, LOAD_SEASON_DATA_START, LOAD_SEASON_DATA_SUCCESS } from './season-actions';
import { Season } from '../../api/models/season.model';
import { mapSeasonDataToModel } from '../../api/mappings/season-model-mapper';

// Store state
export type State = {
  readonly season: Season;
  readonly isLoading: boolean;
  readonly error: string | null;
};

// Initial store state
const initialState: State = {
  season: new Season(),
  isLoading: false,
  error: null
};

// Reducer
// tslint:disable-next-line
export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD_SEASON_DATA_START:
      return { ...state, isLoading: true, error: null };
    case LOAD_SEASON_DATA_SUCCESS:
      return { ...state, isLoading: false, season: mapSeasonDataToModel(action.payload) };
    case LOAD_SEASON_DATA_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
