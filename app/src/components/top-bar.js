import React from 'react';
import { remote } from 'electron';
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }
  toggleWindowMaximize() {
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
            this.toggleWindowMaximize();
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
