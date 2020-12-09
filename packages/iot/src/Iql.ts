import Changes from './Changes';

type Filter = any;

interface CloneParams {
  key?: string;
  negative?: boolean;
  filters?: Filter[];
}

class Iql {
  private _changes: Changes;
  private _key: string = undefined as any;
  private _filters: Filter[];
  private _self?: string;
  private _negative = false;

  constructor(
    changes: Changes,
    filters: Filter[],
    key: string,
    self?: string,
    negative: boolean = false
  ) {
    this._key = key;
    this._changes = changes;
    this._filters = filters;
    this._self = self;
    this._negative = negative;
  }

  get $() {
    for (let i = 0; i < this._filters.length; i++) {
      if (!this._filters[i]()) {
        return false;
      }
    }
    return true;
  }

  clone = (params: CloneParams = {}) => {
    return new Iql(
      this._changes,
      params.filters || this._filters,
      params.key ?? this._key,
      this._self,
      params.negative ?? this._negative
    );
  };

  key = (key: string) => {
    return this.clone({ key });
  };

  and = () => {
    return this;
  };

  not = () => {
    return this.clone({ negative: !this._negative });
  };

  became = (value: any) => {
    if (!this._key) {
      throw new Error('No key selected');
    }
    const filters = [
      ...this._filters,
      () =>
        this._changes[this._key] &&
        (this._changes[this._key].current === value) === !this._negative,
    ];
    this._negative = false;
    return this.clone({ filters });
  };

  was = (value: any) => {
    if (!this._key) {
      throw new Error('No key selected');
    }
    const filters = [
      ...this._filters,
      () =>
        this._changes[this._key] &&
        (this._changes[this._key].previous === value) !== this._negative,
    ];
    this._negative = false;
    return this.clone({ filters });
  };

  setBy = (value: any) => {
    if (!this._key) {
      throw new Error('No key selected');
    }

    const filters = [
      ...this._filters,
      () =>
        this._changes[this._key] &&
        (this._changes[this._key].actor === value) !== this._negative,
    ];
    this._negative = false;
    return this.clone({ filters });
  };

  setBySelf = () => {
    return this.setBy(this._self);
  };
}

export default Iql;
