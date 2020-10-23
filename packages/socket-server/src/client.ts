import Unit, { Changes } from '@morten-olsen/iot';
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
      config: this.config,
    });
  };

  onChange = async (changes: Changes) => {
    this._socket.emit('change', changes);
  };

  onSetValues = ({ changes, options }: any) => {
    this.change(changes, options);
  };
}

export default Client;
