import SocketClient from '@morten-olsen/iot-socket-client';

declare var __UNIT_LOCATION: string;

const { default: unit } = require(__UNIT_LOCATION);
const host = process.env.SOCKET_HOST;

if (!host) {
  throw new Error('SOCKET_HOST not defined');
}

const create = async () => {
  const socketClient = new SocketClient(unit, host);
  return socketClient;
};

const run = async () => {
  await create();
};

run();
