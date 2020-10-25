import React from 'react';
import styled from 'styled-components/native';
import Color from 'color';
import { Feather } from '@expo/vector-icons';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import { Cell } from '../../Row';
import Device from '../../Device';

interface Props {
  room?: string;
  onRemove?: () => void;
  channels: {
    name: string;
    on: string;
    hue?: string;
    saturation?: string;
    lightness?: string;
  };
}

const Wrapper = styled.TouchableOpacity<{
  color: Color;
  on: boolean;
}>`
  background: ${({ color }) => (color.isDark() ? '#fff' : '#000')};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const HueLight: React.FC<Props> = ({ channels, room, onRemove }) => {
  const keys = useKeys(channels);
  const change = useChange();
  const on = keys.on?.current;
  const hue = keys.hue?.current;
  const saturation = keys.saturation?.current;
  const lightness = keys.lightness?.current;
  const color = Color(
    on
      ? `hsl(${hue || 45}, ${saturation || 100}%, ${lightness || 50}%)`
      : '#000'
  );

  return (
    <Device
      room={room}
      name={keys.name?.current as any}
      background={color}
      glow={!!on}
      onRemove={onRemove}
      actions={
        <Cell>
          <Wrapper
            on={!!on}
            color={color}
            onPress={() => change({ [channels.on]: !keys.on?.current })}
          >
            <Feather
              size={15}
              color={color.isLight() ? '#fff' : '#000'}
              name={keys.on?.current ? 'sun' : 'moon'}
            />
          </Wrapper>
        </Cell>
      }
    />
  );
};

export { Props };

export default HueLight;
