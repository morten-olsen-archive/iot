import { useContext, useMemo } from 'react';
import { Store } from '@morten-olsen/iot';
import UnitContext from '../contexts/Unit';

const useKeys = (keys: { [key: string]: string }) => {
  const { store } = useContext(UnitContext);
  const result = useMemo(
    () =>
      Object.entries(keys).reduce(
        (output, [key, value]) => ({ ...output, [key]: store[value] }),
        {} as Store
      ),
    [keys, store]
  );

  return result;
};

export default useKeys;
