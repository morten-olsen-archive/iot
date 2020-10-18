import React from 'react';
import { EnvironmentProvider } from '../context/EnvironmentContext';
import { HomeProvider } from '../context/HomeContext';
import Playground from '../components/Playground';

const PlaygroundPage = () => (
  <HomeProvider homeKey="demo">
    <EnvironmentProvider>
      <Playground cwd="/tutorial" />
    </EnvironmentProvider>
  </HomeProvider>
);

export default PlaygroundPage;
