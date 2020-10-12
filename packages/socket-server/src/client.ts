import Unit, { ChangeRequest, Changes } from '@morten-olsen/iot';
import { Socket } from 'socket.io';

class Client extends Unit {
  private _socket: Socket;

  constructor(socket: Socket) {
    super();
    this._socket = socket;
  }

  onSetup = async () => {
    this._socket.on('setValues', this.onSetValues);
    this._socket.emit('init', {
      store: this.store,
    });
  };

  onChange = async (changes: Changes) => {
    this._socket.emit('change', changes);
  };

  onSetValues = (changes: ChangeRequest) => {
    this.change(changes);
  };
}

export default Client;
