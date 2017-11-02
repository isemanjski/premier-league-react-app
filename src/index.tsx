import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import MainLayout from './containers/layouts/MainLayout';
import StandingsPage from './containers/pages/StandingsPage';
import ResultsPage from './containers/pages/ResultsPage';
import TeamPage from './containers/pages/TeamPage';
import { NotFoundPage } from './containers/pages/NotFoundPage';

// Import Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

// Import own styles
import './assets/styles/main.css';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// tslint:disable:align
// Fix for problem of not scrolling to top of page when changing route
// @see: https://github.com/ReactTraining/react-router/issues/2019
const scrollTop = () => setTimeout(function () {
  window.scrollTo(0, 0);
}, 100);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={StandingsPage}/>
        <Route path="standings" component={StandingsPage} onEnter={scrollTop}/>
        <Route path="results" component={ResultsPage} onEnter={scrollTop}/>
        <Route path="teams/:teamId" component={TeamPage} onEnter={scrollTop}/>
        <Route path="*" component={NotFoundPage} onEnter={scrollTop}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
