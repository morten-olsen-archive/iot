import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import Device from '../../Device';

interface Props {
  room: string;
  channels: {
    name: string;
    pressed: string;
  };
}

interface SwitchProps {
  onPress: (name: string) => void;
}

const SwitchInner = styled.View`
  border: solid 1px #ccc;
  margin: 1px;
  flex-direction: row;
  border-radius: 7px;
  margin-left: 10px;
  height: 40px;
`;

const Button = styled.TouchableOpacity`
  width: 25px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonSmall = styled.TouchableOpacity`
  width: 18px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Seperator = styled.View`
  width: 1px;
  background: #ccc;
  height: 100%;
`;

const Text = styled.Text`
  color: #888;
`;

const Switch: React.FC<SwitchProps> = ({ onPress }) => (
  <SwitchInner>
    <Button onPress={() => onPress('off')}>
      <Text>o</Text>
    </Button>
    <Seperator />
    <ButtonSmall onPress={() => onPress('decrease')}>
      <Feather name="sun" color="#888" size={6} />
    </ButtonSmall>
    <Seperator />
    <ButtonSmall onPress={() => onPress('increase')}>
      <Feather name="sun" color="#888" size={10} />
    </ButtonSmall>
    <Seperator />
    <Button onPress={() => onPress('on')}>
      <Text>l</Text>
    </Button>
  </SwitchInner>
);

const HueLightSwitch: React.FC<Props> = ({ room, channels }) => {
  const keys = useKeys(channels);
  const change = useChange();
  const onPress = useCallback(
    (name: string) => {
      change({ [channels.pressed]: name });
      change({ [channels.pressed]: undefined });
    },
    [change, channels.pressed]
  );
  return (
    <Device
      name={(keys.name?.current as string) || 'Unknown dimmer switch'}
      actions={<Switch onPress={onPress} />}
      room={room}
    />
  );
};

export { Props };

export default HueLightSwitch;
