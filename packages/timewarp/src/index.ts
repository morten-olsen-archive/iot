import Timer from './Timer';

class Timewarp {
  private _timeId: number = 0;
  private _warp: number = 0;
  private _timers: Timer[] = [];

  constructor(warp: number = 0) {
    this._warp = warp;
  }

  get time() {
    return new Date().getTime() + this._warp;
  }

  get date() {
    return new Date(this.time);
  }

  get length() {
    return this._timers.length;
  }

  warp = (time: number) => {
    let startTime = this.time;
    let timer = this._timers[0];
    while (timer) {
      const distance = timer.runTime - startTime;

      if (distance > time) {
        break;
      }
      this._warp += distance;
      timer.run();
      if (this._timers[0] === timer) {
        throw new Error('Timer did not deregister');
      }
      timer = this._timers[0];
    }
    this._warp += time;
    this._timers.forEach((t) => t.warp(this.time));
  };

  setTimeout = (fn: () => void, time: number) => {
    const id = this._timeId++;
    const timer = new Timer(id, this.time, fn, time, (current) => {
      this._timers = this._timers.filter((t) => t !== current);
    });
    this._timers.push(timer);
    this._timers = this._timers.sort((a, b) => a.runTime - b.runTime);
    return id;
  };

  clearTimeout = (timerId: number) => {
    const timer = this._timers.find((t) => t.id === timerId);
    if (!timer) {
      return;
    }
    timer.cancel();
  };

  clearAll = () => {
    this._timers.forEach((t) => t.cancel());
  };
}

export default Timewarp;
