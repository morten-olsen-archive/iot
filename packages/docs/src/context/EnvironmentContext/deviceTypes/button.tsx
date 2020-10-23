import DeviceType from '../DeviceType';
import { devices } from '@morten-olsen/iot-ui';

const button: DeviceType = {
  name: 'Generic button',
  config: {
    name: {
      name: 'Name',
      type: String,
    },
  },
  createState: (baseKey, config) => ({
    [`${baseKey}.name`]: config.name,
    [`${baseKey}.pressed`]: false,
  }),
  createChannels: (baseKey) => ({
    name: `${baseKey}.name`,
    pressed: `${baseKey}.pressed`,
  }),
  component: devices.GenericButton,
};

export default button;
