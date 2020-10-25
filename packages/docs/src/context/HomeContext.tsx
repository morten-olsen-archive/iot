import React, {
  createContext,
  useMemo,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import { useHomes } from '../hooks/homes';
import Device from '../context/EnvironmentContext/Device';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CreateDevice = PartialBy<Omit<Device, 'home'>, 'key'>;

interface HomeContextValue {
  selectHome: (homeKey: string) => void;
  homeKey: string;
  name: string;
  allowEdit: boolean;
  devices: Device[];
  setDevice: (device: CreateDevice) => Promise<void>;
  removeDevice: (key: string) => Promise<void>;
}

interface ProviderProps {
  homeKey: string;
  children: ReactNode;
  allowEdit?: boolean;
}

const noProvider = () => {
  throw new Error('No provider');
};

const HomeContext = createContext<HomeContextValue>({
  homeKey: '',
  name: '',
  allowEdit: false,
  devices: [],
  setDevice: noProvider,
  removeDevice: noProvider,
  selectHome: noProvider,
});

const HomeProvider: React.FC<ProviderProps> = ({
  homeKey,
  children,
  allowEdit,
}) => {
  const [localHomeKey, setLocalHomeKey] = useState(homeKey);
  const homes = useHomes();
  const name = useMemo(() => homes.homes[localHomeKey], [
    localHomeKey,
    homes.homes,
  ]);
  const devices = useMemo(
    () => homes.devices.filter((d) => d.home === localHomeKey),
    [localHomeKey, homes.devices]
  );

  const setDevice = useCallback(
    async (device: CreateDevice) => {
      await homes.setDevice({
        key: nanoid(),
        home: localHomeKey,
        ...device,
      });
    },
    [homes, localHomeKey]
  );

  const removeDevice = useCallback(
    async (key: string) => homes.removeDevice(key),
    [homes]
  );

  return (
    <HomeContext.Provider
      value={{
        homeKey,
        name,
        devices,
        allowEdit: allowEdit ?? localHomeKey !== 'demo',
        setDevice,
        removeDevice,
        selectHome: setLocalHomeKey,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContextValue, ProviderProps };

export default HomeContext;
