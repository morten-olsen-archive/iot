import DeviceType from '../DeviceType';
import { devices } from '@morten-olsen/iot-ui';

const motionSensor: DeviceType = {
  name: 'Philips Hue Motion Sensor',
  config: {
    name: {
      name: 'Name',
      type: String,
    },
  },
  createState: (baseKey, config) => ({
    [`${baseKey}.name`]: config.name,
    [`${baseKey}.motion`]: false,
  }),
  createChannels: (baseKey) => ({
    name: `${baseKey}.name`,
    motion: `${baseKey}.motion`,
  }),
  component: devices.HueMotionSensor,
};

export default motionSensor;
