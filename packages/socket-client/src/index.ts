import Unit, { Changes } from '@morten-olsen/iot';
import io from 'socket.io-client';

class SocketClient {
  private _unit: Unit;
  private _socket: any;
  private _jwt?: string;

  constructor(unit: Unit, host: string, jwt?: string) {
    this._unit = unit;
    this._jwt = jwt;
    const socket = io(host);
    socket.on('init', this.init);
    socket.on('change', this.onChange);
    this._socket = socket;
  }

  init = async ({ store }: any) => {
    await this._unit.setup(store, {
      setValues: this.change,
    });
  };

  onChange = async (changes: Changes) => {
    await this._unit.handleChanges(changes);
  };

  change: Unit['change'] = async (changes, options) => {
    this._socket.emit('setValues', {
      changes,
      options,
    });
  };
}

export default SocketClient;
