import { AllowedValues } from '@morten-olsen/iot';

interface Device {
  name: string;
  type: string;
  meta?: any;
  channels: {
    [name: string]: AllowedValues;
  };
}

export default Device;
