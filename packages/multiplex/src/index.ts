import Unit, { Changes } from '@morten-olsen/iot';

class Multiplex extends Unit {
  private _units: { [name: string]: Unit };

  constructor(units: { [name: string]: Unit }) {
    super();
    this._units = units;
  }

  onSetup = async () => {
    await Promise.all(
      Object.entries(this._units).map(([name, u]) =>
        u.setup(
          this.store,
          {
            setValues: this.change,
            getConfig: this._createGetConfig(name),
            setConfig: this._createSetConfig(name),
          },
          this.config
        )
      )
    );
  };

  private _createGetConfig = (name: string) => async <T = any>() => {
    const config = await this.getConfig();
    return config[name] || ({} as T);
  };

  private _createSetConfig = (name: string) => async <T = any>(
    newConfig: T
  ) => {
    const config = (await this.getConfig()) || {};
    await this.setConfig({
      ...config,
      [name]: newConfig,
    });
  };

  onChange = async (changes: Changes) => {
    await Promise.all(
      Object.values(this._units).map((u) => u.handleChanges(changes))
    );
  };
}

export default Multiplex;
