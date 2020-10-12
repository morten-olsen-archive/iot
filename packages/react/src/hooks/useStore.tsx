import { useContext } from 'react';
import UnitContext from '../contexts/Unit';

const useStore = () => {
  const { store } = useContext(UnitContext);
  return store;
};

export default useStore;
