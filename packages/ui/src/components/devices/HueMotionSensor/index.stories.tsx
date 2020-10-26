import React from 'react';
import HueMotionSensor from './index';

export const Normal = () => (
  <HueMotionSensor
    room="Kitchen"
    channels={{
      name: 'motionSensors.0.name',
      motion: 'motionSensors.0.motion',
    }}
  />
);

export default {
  title: 'Devices/Hue Motion Sensor',
  component: HueMotionSensor,
};
