import Unit, { Changes } from '@morten-olsen/iot';

class Multiplex extends Unit {
  private _units: Unit[];

  constructor(units: Unit[]) {
    super();
    this._units = units;
  }

  onSetup = async () => {
    await Promise.all(
      this._units.map((u) =>
        u.setup(
          this.store,
          {
            setValues: this.change,
          },
          this.config
        )
      )
    );
  };

  onChange = async (changes: Changes) => {
    await Promise.all(this._units.map((u) => u.handleChanges(changes)));
  };
}

export default Multiplex;
