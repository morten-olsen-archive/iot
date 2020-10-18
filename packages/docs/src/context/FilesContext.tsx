import React, { createContext, useMemo, useState, useEffect } from 'react';
import FileSystem from '../files/FileSystem';

interface FilesContextValue {
  fileSystem: FileSystem;
}

const FilesContext = createContext<FilesContextValue>(undefined as any);

const FilesProvider: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false);
  const fileSystem = useMemo(() => new FileSystem(), []);

  useEffect(() => {
    const run = async () => {
      await fileSystem.setup();
      setReady(true);
    };

    run();
  }, [fileSystem]);

  if (!ready) {
    return null;
  }

  return (
    <FilesContext.Provider value={{ fileSystem }}>
      {children}
    </FilesContext.Provider>
  );
};

export { FilesProvider };

export default FilesContext;
