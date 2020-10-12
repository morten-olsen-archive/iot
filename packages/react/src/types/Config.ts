import Device from './Device';

interface Config {
  server?: {
    hostname: string;
  };
  groups: {
    name: string;
    devices: Device[];
  }[];
}

export default Config;
