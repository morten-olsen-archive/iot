import Unit, { Changes } from '@morten-olsen/iot';
import io from 'socket.io';
import { Server } from 'http';
import Client from './client';

class SocketServer extends Unit {
  private _clients: Client[] = [];
  private _server: Server;

  constructor(server: Server) {
    super();
    this._server = server;
  }

  onSetup = async () => {
    const server = io(this._server, {
      origins: '*:*',
      serveClient: false,
    });
    server.origins('*:*');

    server.on('connection', async (socket) => {
      const client = new Client(socket);
      client.setup(this.store, {
        setValues: this.change,
        setConfig: this.setConfig,
        getConfig: this.getConfig,
      });

      socket.on('disconnect', () => {
        this._clients = this._clients.filter((c) => c !== client);
      });

      this._clients.push(client);
    });
  };


  onChange = async (changes: Changes) => {
    await Promise.all(this._clients.map((c) => c.handleChanges(changes)));
  };
}

export default SocketServer;
