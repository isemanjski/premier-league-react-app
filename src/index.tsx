import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import Standings from './components/standings/Standings';
import RoundsTable from './components/rounds/RoundsTable';
import MainLayout from './containers/MainLayout';

// Import Semantic UI CSS
import 'semantic-ui-css/semantic.min.css';

// Import own styles
import './assets/styles/main.css';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Standings}/>
        <Route path="standings" component={Standings}/>
        <Route path="results" component={RoundsTable}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
