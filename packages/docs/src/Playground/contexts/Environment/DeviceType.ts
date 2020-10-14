import { ReactComponentElement } from 'react';
import { ChangeRequest } from '@morten-olsen/iot';

interface DeviceType {
  name: string;
  createState: (baseKey: string) => ChangeRequest;
  createChannels: (baseKey: string) => { [name: string]: string };
  component: ReactComponentElement<any, any>;
}

export default DeviceType;
