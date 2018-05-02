import React from 'react';
import { remote, dialog } from 'electron';
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="top-bar">
      <i className="material-icons btn">more_horiz</i>
      <i className="material-icons btn">crop_square</i>
      <i className="material-icons btn close">close</i>
    </div>;
  }
}
module.exports = { TopBar };
