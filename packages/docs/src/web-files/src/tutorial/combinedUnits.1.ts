import Multiplex from '@morten-olsen/iot-multiplex';
import onOffButton from './onOffButton';
import motionSensor from './motionSensor';

const multiplex = new Multiplex({
  onOffButton,
  motionSensor,
});

export default multiplex;
