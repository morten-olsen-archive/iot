import React, { useContext } from 'react';
import EnvironmentContext from '../../contexts/Environment';

import RandomColorUnit from '!!raw-loader!../../../examples/src/RandomColorUnit';

const Editor = () => {
  const { compile } = useContext(EnvironmentContext);

  return (
    <button onClick={() => compile({ foo: RandomColorUnit }, 'foo')}>
      Test</button>
  );
};

export default Editor;
