import React from 'react';
import { EnvironmentProvider } from '../context/EnvironmentContext';
import Playground from '../components/Playground';

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

const PlaygroundPage = () => (
  <EnvironmentProvider initialDevices={devices}>
    <Playground cwd="/tutorial" />
  </EnvironmentProvider>
);

export default PlaygroundPage;
