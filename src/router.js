import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={Login} /> */}
        <Route path="/" exact component={IndexPage} />
        {/* <Route path="/index" exact component={IndexPage} /> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
