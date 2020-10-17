import DeviceType from '../DeviceType';
import { Button } from '@morten-olsen/iot-ui';

const motionSensor: DeviceType = {
  name: 'Generic motion sensor',
  config: {
    name: {
      name: 'Name',
      type: String,
    },
  },
  createState: (baseKey, config) => ({
    [`${baseKey}.name`]: config.name,
    [`${baseKey}.motionDetected`]: false,
  }),
  createChannels: (baseKey) => ({
    name: `${baseKey}.name`,
    pressed: `${baseKey}.motionDetected`,
  }),
  component: Button,
};

export default motionSensor;
