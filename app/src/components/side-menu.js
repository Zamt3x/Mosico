import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
class Menu extends React.Component {
  render() {
    return (
      <div className="side-menu">
        <div className="logo" />
        <HashRouter>
          <ul className="links-container">
            <NavLink className="link" to="/upload">
              Welcome
            </NavLink>
            <NavLink className="link" to="/genius">
              Genius
            </NavLink>
          </ul>
        </HashRouter>
      </div>
    );
  }
}
module.exports = { Menu };
