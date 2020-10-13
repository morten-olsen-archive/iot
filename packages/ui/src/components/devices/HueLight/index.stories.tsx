import React from 'react';
import HueLight from './index';

export const Normal = () => (
  <HueLight channels={{ name: 'lights.0.name', on: 'lights.0.on' }} />
);

export default {
  title: 'Components/Light',
};
