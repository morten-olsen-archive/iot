import { useContext } from 'react';
import HomeContext from '../context/HomeContext';

export const useHome = () => {
  const context = useContext(HomeContext);
  return context;
};

export const useHomeKey = () => {
  const home = useHome();
  return home.homeKey;
};

export const useHomeName = () => {
  const home = useHome();
  return home.name;
};

export const useDevices = () => {
  const home = useHome();
  return home.devices;
};
