import React from 'react';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import { Icon } from '../../Row';
import Device from '../../Device';

interface Props {
  room?: string;
  onRemove?: () => void;
  channels: {
    name: string;
    on: string;
  };
}

const HueLight: React.FC<Props> = ({ channels, room, onRemove }) => {
  const keys = useKeys(channels);
  const change = useChange();

  return (
    <Device
      room={room}
      name={keys.name?.current as any}
      onRemove={onRemove}
      actions={
        <Icon
          name={keys.on?.current ? 'sun' : 'moon'}
          color={keys.on?.current ? '#f39c12' : 'black'}
          onPress={() => change({ [channels.on]: true })}
        />
      }
    />
  );
};

export { Props };

export default HueLight;
