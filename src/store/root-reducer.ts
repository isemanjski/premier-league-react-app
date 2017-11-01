import { combineReducers } from 'redux';
import { reducer as seasonReducer, State as SeasonState } from './season';
import { routerReducer } from 'react-router-redux';

export interface RootState {
  seasonState: SeasonState;
}

export const rootReducer = combineReducers<RootState>({
  routing: routerReducer,
  seasonState: seasonReducer
});
