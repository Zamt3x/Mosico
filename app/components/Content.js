import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Local from './pages/Local';
import Lyrics from './pages/Lyrics';

const Content = () => {

  return (
    <div className="content-container scrollbar">
      <Switch>
        <Route path="/local" component={Local} />
        <Route path="/lyrics" component={Lyrics} />
        <Redirect from="/" to="/local"></Redirect>
      </Switch>
    </div>
  );

}

export default Content;