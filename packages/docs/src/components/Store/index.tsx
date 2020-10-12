import React from 'react';
import { useStore } from '@morten-olsen/iot-react';

const Store: React.FC = () => {
  const store = useStore();

  return <pre>{JSON.stringify(store, null, '  ')}</pre>;
};

export default Store;
