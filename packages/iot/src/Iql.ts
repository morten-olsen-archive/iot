import Changes from './Changes';

type Filter = any;

class Iql {
  private _changes: Changes;
  private _key: string = undefined as any;
  private _filters: Filter[];

  constructor(changes: Changes, filters: Filter[], key: string) {
    this._key = key;
    this._changes = changes;
    this._filters = filters;
  }

  get $() {
    for (let i = 0; i < this._filters.length; i++) {
      if (!this._filters[i]()) {
        return false;
      }
    }
    return true;
  }

  key = (key: string) => {
    return new Iql(this._changes, this._filters, key);
  };

  and = () => {
    return this;
  };

  became = (value: any) => {
    if (!this._key) {
      throw new Error('No key selected');
    }
    const filters = [
      ...this._filters,
      () => this._changes[this._key]?.current === value,
    ];
    return new Iql(this._changes, filters, this._key);
  };

  was = (value: any) => {
    if (!this._key) {
      throw new Error('No key selected');
    }
    const filters = [
      ...this._filters,
      () => this._changes[this._key]?.previous === value,
    ];
    return new Iql(this._changes, filters, this._key);
  };
}

export default Iql;
