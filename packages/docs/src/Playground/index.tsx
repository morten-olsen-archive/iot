import React from 'react';
import { EnvironmentProvider } from './contexts/Environment';
import { DocumentsProvider } from './contexts/Documents';
import Container from './components/Container';

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

const Playground: React.FC = () => {
  return (
    <EnvironmentProvider initialDevices={devices}>
      <DocumentsProvider main="/examples/RandomColorUnit.ts">
        <Container cwd="/examples" />
      </DocumentsProvider>
    </EnvironmentProvider>
  );
};

export default Playground;
