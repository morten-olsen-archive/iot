import React from 'react';
import HueLightSwitch from './index';

export const Normal = () => (
  <HueLightSwitch
    room="Kitchen"
    channels={{ name: 'switches.0.name', pressed: 'switches.0.pressed' }}
  />
);

export default {
  title: 'Devices/Hue Dimmer Switch',
  component: HueLightSwitch,
};
