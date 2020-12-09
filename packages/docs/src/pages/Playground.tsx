import React from 'react';
import { EnvironmentProvider } from '../context/EnvironmentContext';
import { HomeProvider } from '../context/HomeContext';
import { FilesProvider } from '../context/FilesContext';
import Playground from '../components/Playground';

const PlaygroundPage = () => (
  <FilesProvider fileSystem="web">
    <HomeProvider selected="/homes/demo.home.json">
      <EnvironmentProvider>
        <Playground cwd="/" />
      </EnvironmentProvider>
    </HomeProvider>
  </FilesProvider>
);

export default PlaygroundPage;
