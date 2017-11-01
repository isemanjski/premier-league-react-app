import * as React from 'react';
import MainContainer from './MainContainer';
import Header from '../components/header/Header';
import Navigation from '../components/navigation/Navigation';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <div className="">
          <Header/>
          <Navigation active={'standings'}/>
          <MainContainer/>
        </div>
      </div>
    );
  }
}

export default App;
