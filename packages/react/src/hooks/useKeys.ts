import { useContext, useMemo, useCallback } from 'react';
import { Store, KeyValue, AllowedValues } from '@morten-olsen/iot';
import UnitContext from '../contexts/Unit';
import useChange from './useChange';

type GroupFunction = (values: (undefined | KeyValue)[]) => KeyValue;

const maxFn: GroupFunction = (values) =>
  values.reduce<KeyValue>(
    (output, current) => ({
      ...output,
      current: Math.max(current?.current as number, output.current as number),
    }),
    { current: undefined, previous: undefined, changed: 0, action: '' }
  );

const minFn: GroupFunction = (values) =>
  values.reduce<KeyValue>(
    (output, current) => ({
      ...output,
      current: Math.min(current?.current as number, output.current as number),
    }),
    { current: undefined, previous: undefined, changed: 0, action: '' }
  );

const avgFn: GroupFunction = (values) => {
  const numbers = values
    .map((v) => v?.current as number)
    .filter((v) => typeof v === 'number');
  const total = numbers.reduce((output, current) => output + current, 0);
  const result = numbers.length > 0 ? total / numbers.length : undefined;
  return {
    changed: 0,
    action: '',
    previous: undefined,
    current: result,
  };
};

const anyFn: GroupFunction = (values) => ({
  changed: 0,
  action: '',
  previous: undefined,
  current: !!values.find((v) => v?.current),
});

const allFn: GroupFunction = (values) => ({
  changed: 0,
  action: '',
  previous: undefined,
  current: !!values.find((v) => v && !v.current),
});

const groupTypes: { [name: string]: GroupFunction } = {
  max: maxFn,
  min: minFn,
  avg: avgFn,
  any: anyFn,
  all: allFn,
};

interface GroupKey {
  keys: string[];
  type: keyof typeof groupTypes | GroupFunction;
}

const useKeys = (keys: {
  [key: string]: string | GroupKey | undefined;
}): [Store, (input: { [key: string]: AllowedValues }) => Promise<void>] => {
  const { store } = useContext(UnitContext);
  const change = useChange();
  const result = useMemo(
    () =>
      Object.entries(keys).reduce((output, [key, value]) => {
        if (!value) {
          return output;
        } else if (typeof value === 'string') {
          return { ...output, [key]: store[value] };
        }
        const values = value.keys.map((itemKey) => store[itemKey]);
        const groupFunction =
          typeof value.type === 'string'
            ? groupTypes[value.type]
            : (value.type as GroupFunction);
        return {
          ...output,
          [key]: groupFunction(values),
        };
      }, {} as Store),
    [keys, store]
  );

  const changeKeys = useCallback(
    (input: { [name: string]: AllowedValues }) => {
      const updatedObj = Object.entries(input).reduce(
        (output, [key, value]) => {
          const def = keys[key];
          if (typeof def === 'string') {
            return { ...output, [def]: value };
          }
          const values = def?.keys.reduce(
            (innerOutput, innerKey) => ({
              ...innerOutput,
              [innerKey]: value,
            }),
            {} as { [name: string]: AllowedValues }
          );
          return { ...output, ...values };
        },
        {} as { [name: string]: AllowedValues }
      );
      return change(updatedObj);
    },
    [keys, change]
  );

  return [result, changeKeys];
};

export { GroupKey, GroupFunction };

export default useKeys;
