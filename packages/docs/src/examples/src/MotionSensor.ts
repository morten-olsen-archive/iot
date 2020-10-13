import Unit, { Changes, iql } from '@morten-olsen/iot';

class MotionSensorUnit extends Unit {
  private _timerId?: any;

  onChange = async (changes: Changes, key: iql) => {
    if (key('motionSensors.0.motionDetected').became(false).$) {
      this._timerId = setTimeout(async () => {
        await this.change({
          'lights.0.on': false,
        });
      }, 15 * 60 * 1000);
    }

    if (key('motionSensors.0.motionDetected').became(true).$) {
      if (this._timerId) {
        clearTimeout(this._timerId);
      }
      await this.change({
        'lights.0.on': true,
      });
    }
  };
}

export default MotionSensorUnit;
