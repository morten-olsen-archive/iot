import Unit, { Changes } from '@morten-olsen/iot';
import { Socket } from 'socket.io';

class Client extends Unit {
  private _socket: Socket;

  constructor(socket: Socket) {
    super();
    this._socket = socket;
  }

  get id() {
    return 'foo';
  }

  onSetup = async () => {
    this._socket.on('setValues', this.onSetValues);
    this._socket.on('setConfig', this.onSetConfig);
    this._socket.on('getValues', this.onGetConfig);
    this._socket.emit('init', {
      store: this.store,
      config: this.config,
    });
  };

  private onGetConfig = async <T = any>(requestId: string) => {
    const config = await this.getConfig();
    const clientConfig = config[this.id] || ({} as T);
    this._socket.emit(`response_${requestId}`, clientConfig);
  };

  private onSetConfig = async <T = any>(newConfig: T) => {
    const config = (await this.getConfig()) || {};
    await this.setConfig({
      ...config,
      [this.id]: newConfig,
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
