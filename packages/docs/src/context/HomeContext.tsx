import React, { createContext, useMemo, ReactNode } from 'react';
import { useHomes } from '../hooks/homes';
import Device from '../context/EnvironmentContext/Device';

interface HomeContextValue {
  homeKey: string;
  name: string;
  devices: Device[];
}

interface ProviderProps {
  homeKey: string;
  children: ReactNode;
}

const HomeContext = createContext<HomeContextValue>({
  homeKey: '',
  name: '',
  devices: [],
});

const HomeProvider: React.FC<ProviderProps> = ({ homeKey, children }) => {
  const homes = useHomes();
  const name = useMemo(() => homes.homes[homeKey], [homeKey, homes.homes]);
  const devices = useMemo(
    () => homes.devices.filter((d) => d.home === homeKey),
    [homeKey, homes.devices]
  );

  return (
    <HomeContext.Provider value={{ homeKey, name, devices }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContextValue, ProviderProps };

export default HomeContext;
