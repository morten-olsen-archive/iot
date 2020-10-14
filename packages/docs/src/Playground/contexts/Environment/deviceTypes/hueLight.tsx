import React from 'react';
import DeviceType from '../DeviceType';

const hueLight: DeviceType = {
  name: 'Philips Hue Light',
  createState: (baseKey) => ({
    [`${baseKey}.name`]: 'some light',
    [`${baseKey}.on`]: false,
  }),
  createChannels: () => ({}),
  component: () => <></>,  
};

export default hueLight;
