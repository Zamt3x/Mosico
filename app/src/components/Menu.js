import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';

const Menu = () => {

  return (
    <div className="menu">
      <div className="logo" />
      <HashRouter>
        <ul className="links-container">
          <li className="link list-heading">Links</li>
          <NavLink className="link" to="/genius">
            Genius (lyrics)
            </NavLink>
          <li className="link list-heading">Sources</li>
          <NavLink className="link" to="/upload">
            Local files
            </NavLink>
          <li className="link list-heading">Playlists</li>
        </ul>
      </HashRouter>
    </div>
  );

}

module.exports = { Menu };
