import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import App from './containers/App';

// Import Semantic UI CSS
import 'semantic-ui-css/semantic.min.css';

// Import own styles
import './assets/styles/main.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
