import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';
import { useFileSystem } from '../../hooks/filesystem';
import Unit, { ChangeRequest } from '@morten-olsen/iot';
import { UnitProvider } from '@morten-olsen/iot-react';
import Initial from '@morten-olsen/iot-initial';
import Root from '@morten-olsen/iot-root';
import Multiplex from '@morten-olsen/iot-multiplex';
import DeviceType from './DeviceType';
import Device from './Device';
import WorkerHost from './WorkerHost';
import { useDevices } from '../../hooks/home';

import hueLight from './deviceTypes/hueLight';
import button from './deviceTypes/button';
import motionSensor from './deviceTypes/motionSensor';
import philipsHueDimmerSwitch from './deviceTypes/hueDimmerSwitch';

interface EnvironmentContextValue {
  ready: boolean;
  running?: string;
  deviceTypes: { [name: string]: DeviceType };
  devices: Device[];
  timeWarp: number;
  warpTime: (amount: number) => void;
  compile: (main: string) => Promise<void>;
  stop: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const deviceTypes: EnvironmentContextValue['deviceTypes'] = {
  hueLight,
  button,
  motionSensor,
  philipsHueDimmerSwitch,
};

const EnvironmentContext = createContext<EnvironmentContextValue>(
  undefined as any
);

const EnvironmentProvider: React.FC<ProviderProps> = ({ children }) => {
  const fileSystem = useFileSystem();
  const [ready, setReady] = useState(false);
  const [timeWarp, setTimeWarp] = useState(0);
  const [running, setRunning] = useState<string | undefined>(undefined);
  const devices = useDevices();
  const [master, setMaster] = useState<Root | undefined>(undefined);
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
      const newMaster = new Root(initial);
      await newMaster.initialize();
      setMaster(newMaster);
      setReady(true);
    },
    [initialState, workerHost]
  );

  useEffect(() => {
    master?.process(initialState);
  }, [master, initialState]);

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
