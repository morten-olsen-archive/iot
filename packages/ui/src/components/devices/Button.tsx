import React from 'react';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import Device from '../Device';

interface Props {
  channels: {
    name: string;
    pressed: string;
  };
}

const Button: React.FC<Props> = ({ channels }) => {
  const keys = useKeys(channels);
  const change = useChange();

  return (
    <Device
      name={keys.name!.current as any}
      icon="kebab-horizontal"
      color="green"
      active={!!keys.pressed?.current}
      onPressIn={() => change({ [channels.pressed]: true })}
      onPressOut={() => change({ [channels.pressed]: false })}
    />
  );
};

export default Button;
