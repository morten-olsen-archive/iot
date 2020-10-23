import Multiplex from '@morten-olsen/iot-multiplex';
import onOffButton from './OnOffButton';
import motionSensor from './MotionSensor';

const multiplex = new Multiplex([onOffButton, motionSensor]);

export default multiplex;
