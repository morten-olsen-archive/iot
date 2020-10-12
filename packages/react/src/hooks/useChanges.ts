import { useContext, useEffect } from 'react';
import { Changes } from '@morten-olsen/iot';
import UnitContext from '../contexts/Unit';

const useChange = (fn: (changes: Changes) => void) => {
  const { onChange, offChange } = useContext(UnitContext);

  useEffect(() => {
    const nFn = fn;
    onChange(nFn);
    return () => {
      offChange(nFn);
    };
  }, [fn, onChange, offChange]);
};

export default useChange;
