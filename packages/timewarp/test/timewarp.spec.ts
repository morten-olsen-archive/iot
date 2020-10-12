import TimeWarp from '../src/index';

describe('TimeWarp', () => {
  let time: TimeWarp;

  beforeEach(() => {
    time = new TimeWarp();
  });

  afterEach(() => {
    time.clearAll();
  });

  it('should start empty', () => {
    expect(time.length).toBe(0);
  });

  it('should add fns', () => {
    const spy1 = jest.fn();
    time.setTimeout(spy1, 1000);
    expect(time.length).toBe(1);
    expect(spy1).toHaveBeenCalledTimes(0);
  });

  it('should should invoke fn', () => {
    const spy1 = jest.fn();
    time.setTimeout(spy1, 1000);
    expect(time.length).toBe(1);
    time.warp(2000);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(time.length).toBe(0);
  });

  it('should should only invoke fns in timespan', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    time.setTimeout(spy1, 1000);
    time.setTimeout(spy2, 2000);
    time.setTimeout(spy3, 3000);
    time.warp(2500);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(0);
    expect(time.length).toBe(1);
  });

  it('should should only invoke fns in timespan regardless of order', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();
    time.setTimeout(spy1, 3000);
    time.setTimeout(spy2, 2000);
    time.setTimeout(spy3, 1000);
    time.warp(2500);
    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(time.length).toBe(1);
  });

  it('should be able to run nested timers', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn(() => {
      expect(time.length).toBe(1);
      time.setTimeout(spy1, 1000);
      expect(time.length).toBe(2);
    });
    const spy3 = jest.fn();
    const spy4 = jest.fn(() => {
      time.setTimeout(spy3, 1000);
    });
    time.setTimeout(spy2, 1000);
    time.setTimeout(spy4, 2500);
    time.warp(3000);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(0);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(time.length).toBe(1);
  });
});
