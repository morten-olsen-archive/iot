import Unit, { Changes, ChangeRequest, Store } from '@morten-olsen/iot';
import * as iot from '@morten-olsen/iot';
import typescript from 'typescript';
import TimeWarp from '@morten-olsen/timewarp';
import path from 'path';

interface SetupArgs {
  files: {
    [path: string]: string;
  };
  main: string;
  timeWarp: number;
  store: Store;
}

const libs: { [name: string]: any } = {
  '@morten-olsen/iot': iot,
};

class WorkerUnit {
  private _handlers: { [name: string]: (payload: any) => Promise<void> };
  private _time: TimeWarp;
  private _unit?: Unit;

  constructor() {
    this._time = new TimeWarp();
    this._handlers = {
      setup: this.onSetup,
      warp: this.onWarp,
      change: this.onChange,
    };
  }

  setup = () => {
    onmessage = this.handleMessage;
  };

  handleMessage = ({ data }: any) => {
    const { type, payload } = data;
    const handler = this._handlers[type];
    if (!handler) {
      throw new Error('Unsupported action');
    }
    const run = async () => {
      handler(payload);
    };

    run().catch(console.error);
  };

  change = async (changes: ChangeRequest) => {
    postMessage({ type: 'change', payload: changes }, undefined as any);
  };

  onWarp = async (timeWarp: number) => {
    this._time.warp(timeWarp);
  };

  onChange = async (changes: Changes) => {
    if (this._unit) {
      this._unit.handleChanges(changes);
    }
  };

  onSetup = async ({ main, files, timeWarp, store }: SetupArgs) => {
    this._time.warp(timeWarp);
    const require = (cwd: string) => (location: string) => {
      const module = {
        exports: {} as any,
      };
      if (libs[location]) {
        return libs[location];
      }
      const resolvedLocation = path.join('/', cwd, `${location}.ts`);
      const directory = path.dirname(resolvedLocation);
      const api = {
        setTimeout: this._time.setTimeout,
        clearTimeout: this._time.clearTimeout,
        module,
        exports: module.exports,
        require: require(directory),
      };
      const code = files[resolvedLocation];
      const transpiled = typescript.transpile(code, {
        target: typescript.ScriptTarget.ES2018,
        module: typescript.ModuleKind.CommonJS,
        esModuleInterop: true,
      });
      const fn = new Function(...Object.keys(api), transpiled);
      fn(...Object.values(api));

      return module.exports;
    };

    const UnitClass = require('./')(main).default;
    const unit = new UnitClass() as Unit;
    await unit.setup(store, {
      setValues: this.change,
    });
    this._unit = unit;
  };
}

const worker = new WorkerUnit();
worker.setup();
