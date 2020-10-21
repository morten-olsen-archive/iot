import Unit, { ChangeRequest, Changes } from '@morten-olsen/iot';
import { Socket } from 'socket.io';

class Client extends Unit {
  private _socket: Socket;
  private _jtw?: string;

  constructor(socket: Socket) {
    super();
    this._socket = socket;
  }

  onSetup = async () => {
    this._socket.on('setValues', this.onSetValues);
    this._socket.on('setJwt', this.onSetJwt);
    this._socket.emit('init', {
      store: this.store,
      config: this.config,
    });
  };

  onSetJwt = async ({ jwt, responseId }: any) => {
    this._jtw = jwt;
    this._socket.emit(`response_${responseId}`);
  };

  onChange = async (changes: Changes) => {
    this._socket.emit('change', changes);
  };

  onSetValues = (changes: ChangeRequest) => {
    this.change(changes, {
      jwt: this._jtw,
    });
  };
}

export default Client;
