import Unit, { Changes, ChangeRequest } from '@morten-olsen/iot';
import io from 'socket.io-client';

class SocketClient {
  private _unit: Unit;
  private _socket: any;

  constructor(unit: Unit, host: string) {
    this._unit = unit;
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

  change = async (changes: ChangeRequest) => {
    this._socket.emit('setValues', changes);
  };

  setJwt = async (jwt: string) => {
    this._socket.emit('setJwt', {
      requestId: 'any',
      jwt,
    });
  };
}

export default SocketClient;
