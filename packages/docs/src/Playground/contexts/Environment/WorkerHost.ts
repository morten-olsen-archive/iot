import Unit, { Changes } from '@morten-olsen/iot';

class WorkerHost extends Unit {
  private _worker?: Worker;

  compile = async (
    main: string,
    files: { [path: string]: string },
    timeWarp: number
  ) => {
    this.terminate();
    const WorkerClient = await import('worker-loader!./WorkerClient');
    const worker = new WorkerClient.default() as Worker;
    worker.postMessage({
      type: 'setup',
      payload: {
        main,
        files,
        store: this.store,
        timeWarp,
      },
    });

    worker.onmessage = this.handleMessage;
    this._worker = worker;
  };

  handleMessage = ({ data }: any) => {
    const { type, payload } = data;

    if (type === 'change') {
      this.change(payload);
    }
  };

  onChange = async (changes: Changes) => {
    if (this._worker) {
      this._worker.postMessage({ type: 'change', payload: changes });
    }
  };

  warpTime = (time: number) => {
    if (this._worker) {
      this._worker.postMessage({ type: 'warp', payload: time });
    }
  };

  terminate = () => {
    if (this._worker) {
      this._worker.terminate();
    }
  };
}

export default WorkerHost;
