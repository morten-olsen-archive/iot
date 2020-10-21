import Unit, { Changes } from '@morten-olsen/iot';

class Jwt extends Unit {
  private _unit: Unit;

  constructor(unit: Unit) {
    super();
    this._unit = unit;
  }

  onSetup = async () => {
    this._unit.setup(
      this.store,
      {
        setValues: this.setValues,
      },
      this.config
    );
  };

  setValues: Unit['change'] = async (changes, options) => {
    if (!options || !options.jwt) {
      throw new Error('No JWT provided');
    }
    await this.getJwtData(options.jwt);

    await this.change(changes, options);
  };

  onChange = async (changes: Changes) => {
    this._unit.handleChanges(changes);
  };
}

export default Jwt;
