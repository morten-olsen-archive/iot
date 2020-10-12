import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Document from '../pages/Document';

const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/document/:name">
        <Document />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
