import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import Unit, { ChangeRequest } from '@morten-olsen/iot';
import { UnitProvider } from '@morten-olsen/iot-react';
import Initial from '@morten-olsen/iot-initial';
import Master from '@morten-olsen/iot-master';
import Multiplex from '@morten-olsen/iot-multiplex';
import DeviceType from './DeviceType';
import Device from './Device';
import WorkerHost from './WorkerHost';

import hueLight from './deviceTypes/hueLight';

interface EnvironmentContextValue {
  ready: boolean;
  deviceTypes: { [name: string]: DeviceType };
  devices: Device[];
  addDevice: (device: Device) => void;
  replaceDevice: (index: number, device: Device) => void;
  removeDevice: (index: number) => void;
  compile: (
    documents: { [path: string]: string },
    main: string
  ) => Promise<void>;
}

interface ProviderProps {
  initialDevices?: Device[];
  children: ReactNode;
}

const deviceTypes: EnvironmentContextValue['deviceTypes'] = {
  hueLight,
};

const EnvironmentContext = createContext<EnvironmentContextValue>(
  undefined as any
);

const EnvironmentProvider: React.FC<ProviderProps> = ({
  initialDevices = [],
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const initialState = useMemo(
    () =>
      devices.reduce((output, current) => {
        const deviceType = deviceTypes[current.type];
        const values = deviceType.createState(
          current.baseKey,
          current.config,
        );
        return { ...output, ...values };
      }, {} as ChangeRequest),
    [devices]
  );
  const workerHost = useMemo(() => new WorkerHost(), []);

  const setup = useCallback(
    async (unit: Unit) => {
      const multiplex = new Multiplex([unit, workerHost]);
      const initial = new Initial(multiplex, initialState);
      const master = new Master(initial);
      await master.initialize();
      setReady(true);
    },
    [initialState, workerHost]
  );

  const compile = useCallback(
    async (documents: { [path: string]: string }, main: string) => {
      await workerHost.compile(main, documents);
    },
    [workerHost]
  );

  const addDevice = useCallback((device: Device) => {
    setDevices((current) => [...current, device]);
  }, []);

  const replaceDevice = useCallback((index: number, device: Device) => {
    setDevices((current) => {
      const clone = [...current];
      clone[index] = device;
      return clone;
    });
  }, []);

  const removeDevice = useCallback((index: number) => {
    setDevices((current) => {
      const clone = [...current];
      delete clone[index];
      return clone;
    });
  }, []);

  return (
    <UnitProvider loader={<></>} setup={setup}>
      <EnvironmentContext.Provider
        value={{
          deviceTypes,
          ready,
          devices,
          compile,
          addDevice,
          removeDevice,
          replaceDevice,
        }}
      >
        {children}
      </EnvironmentContext.Provider>
    </UnitProvider>
  );
};

export { EnvironmentProvider };

export default EnvironmentContext;
