import Device from '../context/EnvironmentContext/Device';

const devices: Device[] = [
  {
    type: 'hueLight',
    home: 'demo',
    key: 'demo-1',
    baseKey: 'lights.0',
    room: 'Living Room',
    config: {name: 'Light 1'},
  },
  {
    type: 'button',
    home: 'demo',
    key: 'demo-2',
    baseKey: 'buttons.0',
    room: 'Living Room',
    config: {name: 'On Switch'},
  },
  {
    type: 'button',
    home: 'demo',
    key: 'demo-3',
    baseKey: 'buttons.1',
    room: 'Living Room',
    config: {name: 'Off Switch'},
  },
  {
    type: 'motionSensor',
    home: 'demo',
    key: 'demo-4',
    baseKey: 'motionSensors.0',
    room: 'Living Room',
    config: {name: 'Motion Sensor'},
  },
];

export default devices;
