import React from 'react';
import { Upload } from './upload-page.js';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
class MainPage extends React.Component {
  render() {
    const Lyrics = () => <h1>Lyrics</h1>;
    return (
      <div className="main-content-container scrollbar">
        <HashRouter>
          <Switch>
            <Route path="/upload" component={Upload} />
            <Route path="/genius" component={Lyrics} />
            <Redirect from="/" to="/upload" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
module.exports = { MainPage };
