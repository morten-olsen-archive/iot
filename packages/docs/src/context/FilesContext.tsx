import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useFileSystems } from '../hooks/filesystems';
import FileSystem from '../types/FileSystem';

interface FilesContextValue {
  fileSystem: FileSystem;
}

interface ProviderProps {
  fileSystem: string;
}

const FilesContext = createContext<FilesContextValue>(undefined as any);

const FilesProvider: React.FC<ProviderProps> = ({ children, fileSystem }) => {
  const fileSystems = useFileSystems();
  const [ready, setReady] = useState(false);
  const current = useMemo(() => fileSystems[fileSystem], [
    fileSystem,
    fileSystems,
  ]);

  useEffect(() => {
    if (!current) {
      return;
    }
    const run = async () => {
      await current.fs.setup();
      setReady(true);
    };

    run();

    return () => {
      current.fs.teardown();
    };
  }, [current]);

  if (!ready || !current) {
    return null;
  }


  return (
    <FilesContext.Provider value={{ fileSystem: current.fs }}>
      {children}
    </FilesContext.Provider>
  );
};

export { FilesProvider };

export default FilesContext;
