import Store from './Store';
import Changes from './Changes';
import Api, { ChangeRequest } from './Api';
import Iql from './Iql';

abstract class Unit {
  private _store?: Store;
  private _api?: Api;

  setup = async (store: Store, api: Api) => {
    this._store = store;
    this._api = api;
    if (this.onSetup) {
      await this.onSetup();
    }
  };

  onSetup?: () => Promise<void>;

  protected get store() {
    if (!this._store) {
      throw new Error('Calling store before setup');
    }
    return this._store;
  }

  private get api() {
    if (!this._api) {
      throw new Error('Calling api before setup');
    }
    return this._api;
  }

  public handleChanges = async (changes: Changes) => {
    const newValues = Object.entries(changes).reduce(
      (output, [key, value]) => ({
        ...output,
        [key]: {
          current: value.current,
          previous: this.store[key] ? this.store[key].current : undefined,
          changed: new Date().getTime(),
        },
      }),
      {}
    );

    this._store = {
      ...this._store,
      ...newValues,
    };

    const iql = (key: string) => new Iql(changes, [], key);

    this.onChange(changes, iql);
  };

  abstract onChange: (
    changes: Changes,
    key: (key: string) => Iql
  ) => Promise<void>;

  protected change = async (changes: ChangeRequest) => {
    await this.api.setValues(changes);
  };
}

export default Unit;
