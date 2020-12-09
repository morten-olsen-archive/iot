import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import { useHomes } from '../hooks/homes';
import Device from '../context/EnvironmentContext/Device';

interface HomeContextValue {
  home?: {
    name: string;
    devices: any[];
    disableEdit?: boolean;
  }
  removeDevice: (baseKey: string) => void;
  addDevice: (device: Device) => void;
}

interface ProviderProps {
  selected?: string;
  children: ReactNode;
}

const HomeContext = createContext<HomeContextValue>(undefined as any);

const HomeProvider: React.FC<ProviderProps> = ({ selected, children }) => {
  const { homes } = useHomes();
  const home = useMemo(() => (selected ? homes[selected] : undefined), [
    selected,
    homes,
  ]);

  const setHome = useCallback(
    (newHome: any) => {
      if (!home) {
        return home;
      }
      home.model.setValue(JSON.stringify(newHome, null, '  '));
    },
    [home]
  );

  const addDevice = useCallback(
    (device: Device) => {
      if (!home) {
        return;
      }
      setHome({
        ...home.data,
        devices: [...home.data.devices, device],
      });
    },
    [home, setHome]
  );

  const removeDevice = useCallback(
    (baseKey: string) => {
      if (!home) {
        return;
      }
      setHome({
        ...home.data,
        devices: home.data.devices.filter((d: any) => d.baseKey !== baseKey),
      });
    },
    [home, setHome]
  );

  return (
    <HomeContext.Provider
      value={{
        removeDevice,
        addDevice,
        home: home?.data,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContextValue, ProviderProps };

export default HomeContext;
