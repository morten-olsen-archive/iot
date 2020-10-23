import Store from './Store';
import Changes from './Changes';
import Api, { ChangeRequest, ChangeRequestOptions } from './Api';
import Iql from './Iql';
import UnitConfig from './UnitConfig';
import JwksContext from './JwksContext';

abstract class Unit {
  private _actor: string;
  private _store?: Store;
  private _api?: Api;
  private _config: UnitConfig = {};
  private _jwt?: string;
  private _jwksContext?: JwksContext;

  constructor(actor?: string) {
    this._actor = actor || this.constructor.name;
  }

  set jwt(value: string | undefined) {
    this._jwt = value;
  }

  get jwt() {
    return this._jwt;
  }

  setup = async (store: Store, api: Api, config?: UnitConfig) => {
    this._store = store;
    this._api = api;
    this._config = config || {};
    if (this._config.jwksUri) {
      this._jwksContext = new JwksContext(this._config.jwksUri);
    }
    if (this.onSetup) {
      await this.onSetup();
    }
  };

  get config() {
    return this._config;
  }

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

  protected getJwtData = async (token: string) => {
    if (!this._jwksContext) {
      throw new Error('No jwks uri provided');
    }
    const data = await this._jwksContext.getData(token);
    return data;
  };

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

  protected change = async (
    changes: ChangeRequest,
    options: ChangeRequestOptions = {}
  ) => {
    await this.api.setValues(changes, {
      actor: this._actor,
      jwt: this._jwt,
      ...options,
    });
  };
}

export default Unit;
