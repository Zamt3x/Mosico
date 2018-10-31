import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <div className="logo" />
      <ul className="links-container">
        <li className="link list-heading">Links</li>
        <NavLink className="link" to="/lyrics">Lyrics</NavLink>
        <li className="link list-heading">Music</li>
        <NavLink className="link" to="/local">Local files</NavLink>
        <li className="link list-heading">Playlists</li>
      </ul>
    </div>
  );
}

export default Menu;