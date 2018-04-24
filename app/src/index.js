import { Playbar, Menu, MainPage } from './components';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
  <div className="grid-2col-2row">
    <Menu />
    <MainPage />
    <Playbar />
  </div>,
  document.getElementById('root')
);
