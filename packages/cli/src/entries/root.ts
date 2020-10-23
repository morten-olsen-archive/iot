import Root from '@morten-olsen/iot-root';

declare var __UNIT_LOCATION: string;

const { default: unit } = require(__UNIT_LOCATION);

const run = async () => {
  const root = new Root(unit);
  await root.initialize({
    jwksUri: process.env.JWKS_URI,
  });
};

run();
