import { ReactComponentElement } from 'react';
import { ChangeRequest } from '@morten-olsen/iot';

interface DeviceType {
  name: string;
  config: {
    name: string;
    key: string;
    type: String | Number | Boolean;
  };
  createState: (baseKey: string, config: any) => ChangeRequest;
  createChannels: (baseKey: string) => { [name: string]: string };
  component: ReactComponentElement<any, any>;
}

export default DeviceType;
