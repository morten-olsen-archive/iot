import React, { createContext, useState } from 'react';
import FileSystem from '../types/FileSystem';
import WebFileSystem from '../web-files/FileSystem';

interface FileSystemsContextValue {
  fileSystems: {
    [name: string]: {
      fs: FileSystem;
    };
  };
}

const FileSystemsContext = createContext<FileSystemsContextValue>(undefined as any);

const FileSystemsProvider: React.FC = ({ children }) => {
  const [fileSystems] = useState({
    web: {
      fs: new WebFileSystem(),
    },
  });


  return (
    <FileSystemsContext.Provider value={{ fileSystems }}>
      {children}
    </FileSystemsContext.Provider>
  );
};

export { FileSystemsProvider };

export default FileSystemsContext;
