import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

export const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, logger)
  )
);
