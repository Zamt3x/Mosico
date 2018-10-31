import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import Titlebar from './components/Titlebar';
import Menu from './components/Menu';
import Content from './components/Content';
import Controls from './components/Controls';
import Modal from './components/Modal';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Modal />
          <Titlebar />
          <div className="grid-2col-2row">
            <Menu />
            <Content />
            <Controls />
          </div>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
