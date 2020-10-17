interface Device {
  type: string;
  baseKey: string;
  room: string;
  config: {
    [key: string]: any;
  };
}

export default Device;
