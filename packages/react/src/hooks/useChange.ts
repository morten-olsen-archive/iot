import { useContext } from 'react';
import UnitContext from '../contexts/Unit';

const useChange = () => {
  const { change } = useContext(UnitContext);
  return change;
};

export default useChange;
