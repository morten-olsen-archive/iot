import http from 'http';
import Multiplex from '@morten-olsen/iot-multiplex';
import SocketServer from '@morten-olsen/iot-socket-server';
import TestUnit from './TestUnit';
import JwtUnit from '@morten-olsen/iot-jwt';

const server1 = http.createServer();
const server2 = http.createServer();

const test = new TestUnit('root');
const socketServer1 = new SocketServer(server1);
const socketServer2 = new SocketServer(server2);
const jwt = new JwtUnit(
  socketServer2,
  'https://iot-demo.au.auth0.com/.well-known/jwks.json'
);
const multiplex = new Multiplex([socketServer1, jwt, test]);

server1.listen(3000);
server2.listen(3001);

export default multiplex;
