import React, { useEffect } from 'react';
import { useFileSystem } from '../hooks/filesystem';
import { useEnvironment } from '../hooks/environment';

interface RevertFileProps {
  location: string;
  version: string;
}

export const RevertFile: React.FC<RevertFileProps> = ({
  location,
  version,
}) => {
  const fileSystem = useFileSystem();
  useEffect(() => {
    fileSystem.restoreFile(location, version);
  }, [fileSystem, location, version]);

  return <></>;
};

export const Stop: React.FC = () => {
  const { stop } = useEnvironment();

  useEffect(() => {
    stop();
  }, [stop]);

  return <></>;
};

interface RunFileProps {
  location: string;
}

export const RunFile: React.FC<RunFileProps> = ({ location }) => {
  const { compile } = useEnvironment();

  useEffect(() => {
    compile(location);
  }, [compile, location]);

  return <></>;
};
