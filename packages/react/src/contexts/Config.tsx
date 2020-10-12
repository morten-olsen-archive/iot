import React, { createContext, ReactNode } from 'react';
import Config from '../types/Config';

interface ProviderProps {
  children: ReactNode;
  config: Config;
}

const ConfigContext = createContext<Config>(undefined as any);

const ConfigProvider: React.FC<ProviderProps> = ({ children, config }) => (
  <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
);

export { ConfigProvider };

export default ConfigContext;
