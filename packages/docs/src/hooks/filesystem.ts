import { useContext, useMemo } from 'react';
import FilesContext from '../context/FilesContext';

export const useFileSystem = () => {
  const { fileSystem } = useContext(FilesContext);
  return fileSystem;
};

export const useFile = (location: string) => {
  const fileSystem = useFileSystem();
  const file = useMemo(() => fileSystem.getFile(location), [
    fileSystem,
    location,
  ]);
  return file;
};
