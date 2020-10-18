import { useContext } from 'react';
import HomesContext from '../context/HomesContext';

export const useHomes = () => {
  const context = useContext(HomesContext);
  return context;
};
