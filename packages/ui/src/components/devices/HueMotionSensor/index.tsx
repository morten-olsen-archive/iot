import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import Device from '../../Device';

interface Props {
  room: string;
  channels: {
    name: string;
    motion: string;
  };
}

interface SensorProps {
  onPress: () => void;
}

const SensorOuter = styled.View`
  border: solid 1px #ccc;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const SensorEye = styled.View`
  background: #ccc;
  border: solid 4px #efefef;
  width: 19px;
  height: 19px;
  border-radius: 50%;
`;

const Button = styled.TouchableOpacity`
`;

const Sensor: React.FC<SensorProps> = ({ onPress }) => (
  <Button onPress={onPress}>
    <SensorOuter>
      <SensorEye />
    </SensorOuter>
  </Button>
);

const HueMotionSensor: React.FC<Props> = ({ room, channels }) => {
  const keys = useKeys(channels);
  const change = useChange();
  const onPress = useCallback(
    () => {
      change({ [channels.motion]: true });
      change({ [channels.motion]: false });
    },
    [change, channels.motion]
  );
  return (
    <Device
      name={(keys.name?.current as string) || 'Unknown motion sensor'}
      actions={<Sensor onPress={onPress} />}
      room={room}
    />
  );
};

export { Props };

export default HueMotionSensor;

