import React from 'react';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import { Icon } from '../Row';
import Device from '../Device';

interface Props {
  room?: string;
  onRemove?: () => void;
  channels: {
    name: string;
    pressed: string;
  };
}

const Button: React.FC<Props> = ({ channels, room, onRemove }) => {
  const keys = useKeys(channels);
  const change = useChange();

  return (
    <Device
      room={room}
      onRemove={onRemove}
      actions={
        <Icon
          name="target"
          onPressIn={() => change({ [channels.pressed]: true })}
          onPressOut={() => change({ [channels.pressed]: false })}
        />
      }
      name={keys.name?.current as any}
    />
  );
};

export default Button;
