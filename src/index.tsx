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

// Import Semantic UI styles
import 'semantic-ui-css/semantic.min.css';
// Import own styles
import './assets/styles/main.css';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={StandingsPage}/>
        <Route path="standings" component={StandingsPage}/>
        <Route path="results" component={ResultsPage}/>
        <Route path="teams/:teamId" component={TeamPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
