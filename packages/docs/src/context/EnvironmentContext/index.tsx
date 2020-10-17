import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useFileSystem } from '../../hooks/filesystem';
import Unit, { ChangeRequest } from '@morten-olsen/iot';
import { UnitProvider } from '@morten-olsen/iot-react';
import Initial from '@morten-olsen/iot-initial';
import Master from '@morten-olsen/iot-master';
import Multiplex from '@morten-olsen/iot-multiplex';
import DeviceType from './DeviceType';
import Device from './Device';
import WorkerHost from './WorkerHost';

import hueLight from './deviceTypes/hueLight';
import button from './deviceTypes/button';
import motionSensor from './deviceTypes/motionSensor';

interface EnvironmentContextValue {
  ready: boolean;
  running?: string;
  deviceTypes: { [name: string]: DeviceType };
  devices: Device[];
  addDevice: (device: Device) => void;
  replaceDevice: (index: number, device: Device) => void;
  timeWarp: number;
  warpTime: (amount: number) => void;
  removeDevice: (index: number) => void;
  compile: (main: string) => Promise<void>;
  stop: () => void;
}

interface ProviderProps {
  initialDevices?: Device[];
  children: ReactNode;
}

const deviceTypes: EnvironmentContextValue['deviceTypes'] = {
  hueLight,
  button,
  motionSensor,
};

const EnvironmentContext = createContext<EnvironmentContextValue>(
  undefined as any
);

const EnvironmentProvider: React.FC<ProviderProps> = ({
  initialDevices = [],
  children,
}) => {
  const fileSystem = useFileSystem();
  const [ready, setReady] = useState(false);
  const [timeWarp, setTimeWarp] = useState(0);
  const [running, setRunning] = useState<string | undefined>(undefined);
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [master, setMaster] = useState<Master | undefined>(undefined);
  const initialState = useMemo(
    () =>
      devices.reduce((output, current) => {
        const deviceType = deviceTypes[current.type];
        const values = deviceType.createState(current.baseKey, current.config);
        return { ...output, ...values };
      }, {} as ChangeRequest),
    [devices]
  );
  const workerHost = useMemo(() => new WorkerHost(), []);

  const setup = useCallback(
    async (unit: Unit) => {
      const multiplex = new Multiplex([unit, workerHost]);
      const initial = new Initial(multiplex, initialState);
      const newMaster = new Master(initial);
      await newMaster.initialize();
      setMaster(newMaster);
      setReady(true);
    },
    [initialState, workerHost]
  );

  const compile = useCallback(
    async (location: string) => {
      const files = fileSystem.getFiles();
      setRunning(location);
      await workerHost.compile(location, files, timeWarp);
    },
    [workerHost, timeWarp, fileSystem]
  );

  const warpTime = useCallback(
    (amount: number) => {
      workerHost.warpTime(amount);
      setTimeWarp((current) => current + amount);
    },
    [workerHost]
  );

  const stop = useCallback(() => {
    workerHost.terminate();
    setRunning(undefined);
  }, [workerHost]);

  const addDevice = useCallback(
    (device: Device) => {
      const type = deviceTypes[device.type];
      setDevices((current) => [...current, device]);
      if (master) {
        const changes = type.createState(device.baseKey, device.config);
        master.process(changes);
      }
    },
    [master]
  );

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
          stop,
          running,
          deviceTypes,
          ready,
          devices,
          compile,
          addDevice,
          removeDevice,
          replaceDevice,
          timeWarp,
          warpTime,
        }}
      >
        {children}
      </EnvironmentContext.Provider>
    </UnitProvider>
  );
};

export { EnvironmentProvider, EnvironmentContextValue };

export default EnvironmentContext;
