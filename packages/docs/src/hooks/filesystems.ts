import { useContext } from 'react';
import FileSystemsContext from '../context/FileSystemsContext';

export const useFileSystems = () => {
  const { fileSystems } = useContext(FileSystemsContext);
  return fileSystems;
};

