import Unit, { Changes, iql } from '@morten-olsen/iot';

class MotionSensorUnit extends Unit {
  private timerId?: any;

  onChange = async (_changes: Changes, key: iql) => {
    if (key('motionSensors.0.motion').became(false).$) {
      this.clearTimer();
      this.timerId = setTimeout(async () => {
        await this.change({
          'lights.0.on': false,
        });
      }, 15 * 60 * 1000);
    }

    if (key('motionSensors.0.motion').became(true).$) {
      this.clearTimer();
      await this.change({
        'lights.0.on': true,
      });
    }
  };

  clearTimer = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  };
}

export default new MotionSensorUnit();
