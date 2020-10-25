import React from 'react';
import HueMotionSensor from './index';

export const Hot = () => (
  <HueMotionSensor
    room="Kitchen"
    channels={{ name: 'thermostats.1.name', currentTemperatur: 'thermostats.1.current', targetTemperatur: 'thermostats.1.target' }}
  />
);

export const Cold = () => (
  <HueMotionSensor
    room="Kitchen"
    channels={{ name: 'thermostats.2.name', currentTemperatur: 'thermostats.2.current', targetTemperatur: 'thermostats.2.target' }}
  />
);

export const Normal = () => (
  <HueMotionSensor
    room="Kitchen"
    channels={{ name: 'thermostats.0.name', currentTemperatur: 'thermostats.0.current', targetTemperatur: 'thermostats.0.target' }}
  />
);

export default {
  title: 'Devices/Hue Motion Sensor',
  component: HueMotionSensor,
};
