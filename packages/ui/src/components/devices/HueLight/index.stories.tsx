import React from 'react';
import HueLight from './index';

export const Normal = () => (
  <HueLight room="Living Room" channels={{ name: 'lights.0.name', on: 'lights.0.on', hue: 'lights.0.hue' }} />
);

export const WithHue = () => (
  <HueLight room="Living Room" channels={{ name: 'lights.1.name', on: 'lights.1.on', hue: 'lights.1.hue' }} />
);

export const On = () => (
  <HueLight room="Living Room" channels={{ name: 'lights.2.name', on: 'lights.2.on' }} />
);

export default {
  title: 'Devices/Hue Light',
};
