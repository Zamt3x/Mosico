import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './components/side-menu.js';
import { Playbar } from './components/play-bar.js';
import { MainPage } from './components/main-page.js';
import { TopBar } from './components/top-bar.js';

ReactDOM.render(
  <div>
    <TopBar />
    <div className="grid-2col-2row">
      <Menu />
      <MainPage />
      <Playbar />
    </div>
  </div>,
  document.getElementById('root')
);
