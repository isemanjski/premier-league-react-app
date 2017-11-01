import * as React from 'react';
import MainContainer from './MainContainer';
import Header from '../components/header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <div className="">
          <Header active={'work'}/>
          <MainContainer/>
        </div>
      </div>
    );
  }
}

export default App;
