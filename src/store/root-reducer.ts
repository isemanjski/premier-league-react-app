import { combineReducers } from 'redux';
import { reducer as seasonReducer, State as SeasonState } from './season';
import { routerReducer } from 'react-router-redux';

export interface RootState {
  season: SeasonState;
}

export const rootReducer = combineReducers<RootState>({
  routing: routerReducer,
  season: seasonReducer
});
