import DeviceType from '../DeviceType';
import { devices } from '@morten-olsen/iot-ui';

const philipsHueDimmerSwitch: DeviceType = {
  name: 'Philips Hue Dimmer Switch',
  config: {
    name: {
      name: 'Name',
      type: String,
    },
  },
  createState: (baseKey, config) => ({
    [`${baseKey}.name`]: config.name,
    [`${baseKey}.pressed`]: undefined,
  }),
  createChannels: (baseKey) => ({
    name: `${baseKey}.name`,
    pressed: `${baseKey}.pressed`,
  }),
  component: devices.HueDimmerSwitch,
};

export default philipsHueDimmerSwitch;
