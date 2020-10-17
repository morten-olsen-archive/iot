import React from 'react';
import styled from 'styled-components/native';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { EnvironmentProvider } from '../context/EnvironmentContext';

const Top = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Wrapper = styled.View`
  height: 100%;
`;

const devices = [
  {
    type: 'hueLight',
    baseKey: 'lights.0',
    room: 'Living Room',
    config: { name: 'Light 1' },
  },
  {
    type: 'button',
    baseKey: 'buttons.0',
    room: 'Living Room',
    config: { name: 'On Switch' },
  },
  {
    type: 'button',
    baseKey: 'buttons.1',
    room: 'Living Room',
    config: { name: 'Off Switch' },
  },
  {
    type: 'motionSensor',
    baseKey: 'motionSensors.0',
    room: 'Living Room',
    config: { name: 'Motion Sensor' },
  },
];

import Playground from '../pages/Playground';
import Document from '../pages/Document';

const DocumentRoute: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <EnvironmentProvider initialDevices={devices}>
      <Route path={`${path}/:name*`}>
        <Document />
      </Route>
    </EnvironmentProvider>
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
