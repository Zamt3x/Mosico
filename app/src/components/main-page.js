import React from 'react';
import { Redirect, HashRouter, Switch, Route } from 'react-router-dom';
class MainPage extends React.Component {
  render() {
    const Welcome = () => <h1>File upload</h1>;
    const Lyrics = () => <h1>Lyrics</h1>;
    return (
      <div className="main-page">
        <HashRouter>
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Route path="/genius" component={Lyrics} />
            <Redirect from="/" to="/welcome" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
module.exports = { MainPage };
