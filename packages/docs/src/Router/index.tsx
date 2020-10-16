import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Playground from '../Playground';

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Playground />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
