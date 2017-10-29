import { combineReducers } from 'redux';
import { reducer as seasonReducer, State as SeasonState } from './season';

export interface RootState {
  season: SeasonState;
}

export const rootReducer = combineReducers<RootState>({
  season: seasonReducer
});
