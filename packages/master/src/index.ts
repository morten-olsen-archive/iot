import Unit, { Changes, ChangeRequest } from '@morten-olsen/iot';

interface Options {
  jwksUri?: string;
}

class Master extends Unit {
  private _unit: Unit;
  private _nodeConfig: any = {};

  constructor(unit: Unit) {
    super();
    this._unit = unit;
  }

  initialize = async (options: Options = {}) => {
    await this.setup(
      {},
      {
        setValues: this.process,
        getConfig: this._getConfig,
        setConfig: this._setConfig,
      },
      {
        jwksUri: options.jwksUri,
      }
    );
    this._unit.setup(
      this.store,
      {
        setValues: this.process,
        getConfig: this._getConfig,
        setConfig: this._setConfig,
      },
      this.config
    );
  };

  private _getConfig = async () => {
    return this._nodeConfig;
  };

  private _setConfig = async (config: any) => {
    this._nodeConfig = config;
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
