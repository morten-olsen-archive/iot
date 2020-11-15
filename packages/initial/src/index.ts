import Unit, { Changes, ChangeRequest } from '@morten-olsen/iot';

class Initial extends Unit {
  private _unit: Unit;
  private _setup: boolean = false;
  private _initial: ChangeRequest;

  constructor(unit: Unit, initial: ChangeRequest) {
    super();
    this._unit = unit;
    this._initial = initial;
  }

  onSetup = async () => {
    await this.change(this._initial);
    this._unit.setup(
      this.store,
      {
        setValues: this.change,
        getConfig: this.getConfig,
        setConfig: this.setConfig,
      },
      this.config
    );
    this._setup = true;
  };

  onChange = async (changes: Changes) => {
    if (!this._setup) {
      return;
    }
    this._unit.handleChanges(changes);
  };
}

export default Initial;
