import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer, RootState } from './root-reducer';

const setInitialState = (): RootState => ({} as RootState);

export const store = createStore(
  rootReducer,
  setInitialState(),
  applyMiddleware(thunkMiddleware)
);
