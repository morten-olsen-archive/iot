import DeviceType from '../DeviceType';
import { HueLight } from '@morten-olsen/iot-ui';

const hueLight: DeviceType = {
  name: 'Philips Hue Light',
  config: {
    name: {
      name: 'Name',
      type: String,
    },
  },
  createState: (baseKey, config) => ({
    [`${baseKey}.name`]: config.name,
    [`${baseKey}.on`]: false,
  }),
  createChannels: (baseKey) => ({
    name: `${baseKey}.name`,
    on: `${baseKey}.on`,
  }),
  component: HueLight,
};

export default hueLight;
