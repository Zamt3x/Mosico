import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './components/side-menu.js';
import { Playbar } from './components/play-bar.js';
import { MainPage } from './components/main-page.js';
import { TopBar } from './components/top-bar.js';

class App extends Component {

  render() {

    return (
      <div className="app">
        <TopBar />
        <div className="grid-2col-2row">
          <Menu />
          <MainPage />
          <Playbar />
        </div>
      </div>
    );

  }

}

ReactDOM.render(<App />, document.getElementById('root'));
