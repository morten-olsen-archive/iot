class Timer {
  private _id: number;
  private _timer: number;
  private _startTime: number;
  private _runTime: number;
  private _fn: () => void;
  private _onRun: (timer: Timer) => void;

  constructor(
    id: number;
    currentTime: number,
    fn: () => void,
    time: number,
    onRun: (timer: Timer) => void
  ) {
    this._id = id;
    this._fn = fn;
    this._startTime = currentTime;
    this._onRun = onRun;
    this._runTime = this._startTime + time;
    this._timer = setTimeout(() => {
      this._onRun(this);
      this._fn();
    }, time);
  }

  get id() {
    return this._id;
  }

  get timer() {
    return this._timer;
  }

  get runTime() {
    return this._runTime;
  }

  shouldRun = (time: number) => {
    return this._runTime < time;
  };

  warp = (time: number) => {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._onRun(this);
      this._fn();
    }, this._runTime - time);
  };

  run = () => {
    clearTimeout(this._timer);
    this._onRun(this);
    this._fn();
  };

  cancel = () => {
    this._onRun(this);
    clearTimeout(this._timer);
  };
}

export default Timer;
