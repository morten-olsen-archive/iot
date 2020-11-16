import Unit, { Changes } from '@morten-olsen/iot';

interface Options {
  allow?: RegExp[];
  disallow?: RegExp[];
}

class Filter extends Unit {
  private _unit: Unit;
  private _options: Options;

  constructor(unit: Unit, options: Options) {
    super();
    this._unit = unit;
    this._options = options;
  }

  onSetup = async () => {
    this._unit.setup(
      this.store,
      {
        setValues: this.change,
        getConfig: this.getConfig,
        setConfig: this.setConfig,
      },
      this.config
    );
  };

  onChange = async (changes: Changes) => {
    let keys = Object.keys(changes);
    if (this._options.allow) {
      keys = keys.filter((k) => !!this._options.allow!.find((f) => f.test(k)));
    }
    if (this._options.disallow) {
      keys = keys.filter(
        (k) => !this._options.disallow!.find((f) => f.test(k))
      );
    }
    const filteredChanges = keys.reduce(
      (output, key) => ({
        ...output,
        [key]: changes[key],
      }),
      {} as Changes
    );

    this._unit.handleChanges(filteredChanges);
  };
}

export default Filter;
