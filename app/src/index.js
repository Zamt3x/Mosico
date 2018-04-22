import { Playbar, Menu } from './components';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
  <div className="grid-2col-2row">
    <Menu />
    <Playbar />
  </div>,
  document.getElementById('root')
);
