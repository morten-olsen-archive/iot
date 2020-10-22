import http from 'http';
import Multiplex from '@morten-olsen/iot-multiplex';
import SocketServer from '@morten-olsen/iot-socket-server';
import TestUnit from './TestUnit';

const server = http.createServer();

const test = new TestUnit('root');
const socketServer = new SocketServer(server);
const multiplex = new Multiplex([socketServer, test]);

server.listen(3000);

export default multiplex;
