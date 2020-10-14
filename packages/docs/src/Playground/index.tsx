import React from 'react';
import { EnvironmentProvider } from './contexts/Environment';
import Store from '../components/Store';
import Editor from './components/Editor';

const Playground: React.FC = () => {
  return (
    <EnvironmentProvider initialDevices={[{ type: 'hueLight', baseKey: 'foo' }]}>
      <Editor />
      <Store />
    </EnvironmentProvider>
  );
};

export default Playground;
