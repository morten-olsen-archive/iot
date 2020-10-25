import { nanoid } from 'nanoid';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import storage from '../db';
import Device from './EnvironmentContext/Device';
import demo from '../homes/demo';

interface HomesContextValue {
  devices: Device[];
  homes: {
    [key: string]: string;
  };
  setDevice: (device: Device) => Promise<void>;
  removeDevice: (key: string) => Promise<void>;
  addHome: (name: string) => Promise<string>;
  removeHome: (key: string) => Promise<void>;
}

const HomesContext = createContext<HomesContextValue>(undefined as any);

const HomesProvider: React.FC = ({ children }) => {
  const [homes, setHomes] = useState<HomesContextValue['homes']>({});
  const [devices, setDevices] = useState<Device[]>([]);

  const update = async () => {
    const newHomes = await storage.getHomes();
    const newDevices = await storage.getDevices();

    setHomes({
      ...newHomes,
      demo: 'Demo home',
    });
    setDevices([...newDevices, ...demo]);
  };

  const setDevice = useCallback(async (device: Device) => {
    await storage.setDevice(device);
    await update();
  }, []);

  const removeDevice = useCallback(async (key: string) => {
    await storage.removeDevice(key);
    await update();
  }, []);

  const addHome = useCallback(async (name: string) => {
    const key = nanoid();
    await storage.setHome(key, name);
    await update();
    return key;
  }, []);

  const removeHome = useCallback(async (key: string) => {
    await storage.removeHome(key);
    await update();
  }, []);

  useEffect(() => {
    update();
  }, []);

  return (
    <HomesContext.Provider
      value={{
        homes,
        devices,
        setDevice,
        removeDevice,
        addHome,
        removeHome,
      }}
    >
      {children}
    </HomesContext.Provider>
  );
};

export { HomesProvider, HomesContextValue };

export default HomesContext;
