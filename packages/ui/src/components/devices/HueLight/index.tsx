import React from 'react';
import color from 'color';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import Device from '../../Device';

interface Props {
  channels: {
    name: string;
    on: string;
  };
}

const getColor = ({ on, hue, saturation }: any) => {
  if (!on.current) {
    return '#000';
  }
  return 'red';
};

const HueLight: React.FC<Props> = ({ channels }) => {
  const keys = useKeys(channels);
  const change = useChange();

  return (
    <Device
      name={keys.name?.current as any}
      icon="light-bulb"
      color={getColor(keys)}
      onPressIn={() => change({ [channels.on]: !keys.on!.current })}
    />
  );
};

export default HueLight;
