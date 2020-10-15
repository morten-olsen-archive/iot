import React from 'react';
import { EnvironmentProvider } from './contexts/Environment';
import { DocumentsProvider } from './contexts/Documents';
import Store from '../components/Store';
import Container from './components/Container';
import randomColorUnit from '!!raw-loader!../examples/src/RandomColorUnit';

const Playground: React.FC = () => {
  return (
    <EnvironmentProvider initialDevices={[{ type: 'hueLight', baseKey: 'foo', room: 'test', config: { name: 'ass' } }]}>
      <DocumentsProvider main="/foo/bar/index" initialDocuments={{'foo/bar/index.ts': randomColorUnit, 'foo/bar/test.ts': ''}}>
        <Container />
      </DocumentsProvider>
    </EnvironmentProvider>
  );
};

export default Playground;
