import Unit, { Changes, ChangeRequest } from '@morten-olsen/iot';

class Master extends Unit {
  private _unit: Unit;

  constructor(unit: Unit) {
    super();
    this._unit = unit;
  }

  initialize = async () => {
    await this.setup(
      {},
      {
        setValues: this.process,
      }
    );
    this._unit.setup(this.store, {
      setValues: this.process,
    });
  };

  process = async (changeRequest: ChangeRequest) => {
    const changes: Changes = Object.entries(changeRequest)
      .filter(([key, value]) => this.store[key]?.current !== value)
      .reduce((output, [key, value]) => {
        return {
          ...output,
          [key]: {
            ...output[key],
            changed: new Date().getTime(),
            current: value,
            previous: this.store[key]?.current,
          },
        };
      }, {} as Changes);

    this.handleChanges(changes);
  };

  onChange = async (changes: Changes) => {
    this._unit.handleChanges(changes);
  };
}

export default Master;
