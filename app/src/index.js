import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Titlebar } from './components/Titlebar.js';
import { Menu } from './components/Menu.js';
import { Content } from './components/Content.js';
import { Controls } from './components/Controls.js';

class App extends Component {

  render() {

    return (
      <div className="app">
        <Titlebar />
        <div className="grid-2col-2row">
          <Menu />
          <Content />
          <Controls />
        </div>
      </div>
    );

  }

}

ReactDOM.render(<App />, document.getElementById('root'));
