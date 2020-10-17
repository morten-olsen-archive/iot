import { useContext } from 'react';
import EnvironmentContext from '../context/EnvironmentContext';

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  return context;
};

export const useRunning = () => {
  const { running } = useEnvironment();
  return running;
};
