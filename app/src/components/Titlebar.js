import React from 'react';
import { remote } from 'electron';

const Titlebar = () => {

  const minimize = () => remote.getCurrentWindow().minimize();
  const close = () => remote.getCurrentWindow().close();

  return (
    <div className="titlebar">
      <i className="material-icons btn" onClick={minimize}>remove</i>
      <i className="material-icons btn">settings</i>
      <i className="material-icons btn btn-close" onClick={close}>close</i>
    </div>
  );

}

module.exports = { Titlebar };
