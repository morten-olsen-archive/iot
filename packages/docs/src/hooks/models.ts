import { useContext } from 'react';
import ModelsContext from '../context/ModelsContext';

export const useModels = () => {
  const { models } = useContext(ModelsContext);
  return models;
};
