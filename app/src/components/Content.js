import React, { Component } from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
import { Local } from './pages/Local.js';
import { Lyrics } from './pages/Lyrics.js';

class Content extends Component {

  render() {

    return (
      <div className="main-content-container scrollbar">
        <HashRouter>
          <Switch>
            <Route path="/local" component={Local} />
            <Route path="/genius" component={Lyrics} />
            <Redirect from="/" to="/local" />
          </Switch>
        </HashRouter>
      </div>
    );

  }

}

module.exports = { Content };