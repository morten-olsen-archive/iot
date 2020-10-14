import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Document from '../pages/Document';
import Playground from '../Playground';

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/document/:name">
        <Document />
      </Route>
      <Route path="/">
        <Playground />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
