import Unit, { Changes } from '@morten-olsen/iot';

class DevelopmentUnit extends Unit {
  private _workers: { [name: string]: WorkerUnit } = {};

  public createUnit = async (name: string, code: string) => {
    const WorkerUnit = await import('worker-loader!./WorkerUnit');
    if (this._workers[name]) {
      this._workers[name].terminate();
    }
    const worker = new WorkerUnit.default();
    worker.postMessage({
      type: 'setup',
      code,
      store: this.store,
    });
    worker.onmessage = ({ data }: any) => {
      if (data.type === 'change') {
        this.change(data.changes);
      }
    };
    this._workers[name] = worker;
  };

  onChange = async (changes: Changes) => {
    await Promise.all(
      Object.values(this._workers).map((u) =>
        u.postMessage({ type: 'update', changes })
      )
    );
  };
}

export default DevelopmentUnit;
