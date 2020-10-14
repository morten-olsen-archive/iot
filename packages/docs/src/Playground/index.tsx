import React from 'react';
import { EnvironmentProvider } from './contexts/Environment';
import { DocumentsProvider } from './contexts/Documents';
import Store from '../components/Store';
import Container from './components/Container';
import randomColorUnit from '!!raw-loader!../examples/src/RandomColorUnit';

const Playground: React.FC = () => {
  return (
    <EnvironmentProvider initialDevices={[{ type: 'hueLight', baseKey: 'foo', room: 'test', config: { name: 'ass' } }]}>
      <DocumentsProvider main="/index.ts" initialDocuments={{'./index.ts': randomColorUnit, './foo.ts': ''}}>
        <Container />
      </DocumentsProvider>
    </EnvironmentProvider>
  );
};

export default Playground;
