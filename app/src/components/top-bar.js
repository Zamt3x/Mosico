import React from 'react';
import { remote, dialog } from 'electron';
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }
  windowMaximize() {
    const win = remote.getCurrentWindow();
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  render() {
    return (
      <div className="top-bar">
        <i
          className="material-icons btn"
          onClick={() => {
            remote.getCurrentWindow().minimize();
          }}>
          remove
        </i>
        <i
          className="material-icons btn"
          onClick={() => {
            this.windowMaximize();
          }}>
          crop_square
        </i>
        <i
          className="material-icons btn close"
          onClick={() => {
            remote.getCurrentWindow().close();
          }}>
          close
        </i>
      </div>
    );
  }
}
module.exports = { TopBar };
