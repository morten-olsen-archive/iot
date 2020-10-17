import { ChangeRequest } from '@morten-olsen/iot';

interface DeviceType {
  name: string;
  config: {
    [key: string]: {
      name: string;
      type: StringConstructor | Number | Boolean;
    };
  };
  createState: (baseKey: string, config: any) => ChangeRequest;
  createChannels: (baseKey: string) => { [name: string]: string };
  component: any;
}

export default DeviceType;
