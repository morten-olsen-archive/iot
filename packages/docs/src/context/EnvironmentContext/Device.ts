interface Device {
  key: string;
  home: string;
  type: string;
  baseKey: string;
  room: string;
  config: {
    [key: string]: any;
  };
}

export default Device;
