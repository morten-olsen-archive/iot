import React from 'react';
import styled from 'styled-components/native';
import { Row } from '@morten-olsen/iot-ui';
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { FilesProvider } from '../context/FilesContext';
import { EnvironmentProvider } from '../context/EnvironmentContext';
import { HomeProvider } from '../context/HomeContext';

const Top = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Wrapper = styled.View`
  height: 100%;
`;

import Playground from '../pages/Playground';
import Document from '../pages/Document';

const DocumentRoute: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <FilesProvider fileSystem="web">
      <HomeProvider homeKey="demo">
        <EnvironmentProvider>
          <Route path={`${path}/:name*`}>
            <Document />
          </Route>
        </EnvironmentProvider>
      </HomeProvider>
    </FilesProvider>
  );
};

const TopBar = () => {
  const history = useHistory();
  return (
    <Top>
      <Row
        title="Getting started"
        onPress={() => history.push('/document/tutorial/gettin-started.mdx')}
      />
      <Row title="Playground" onPress={() => history.push('/playground')} />
    </Top>
  );
};

const AppRouter: React.FC = () => (
  <Wrapper>
    <Router>
      <TopBar />
      <Switch>
        <Route path="/document">
          <DocumentRoute />
        </Route>
        <Route path="/playground">
          <Playground />
        </Route>
        <Route to="/">
          <Redirect to="/document/tutorial/gettin-started.mdx" />
        </Route>
      </Switch>
    </Router>
  </Wrapper>
);

export default AppRouter;
