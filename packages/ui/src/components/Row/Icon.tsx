import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Cell from './Cell';
import { Theme } from '../../theme';

interface Props {
  name: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  theme: Theme;
  color?: string;
  size?: number;
}

const Wrapper = styled(Cell)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const Touch = styled.TouchableOpacity``;

const Icon: React.FC<Props> = ({ name, onPress, onPressIn, onPressOut, theme, color, size }) => {
  const comp = (
    <Wrapper>
      <Feather name={name} color={color} size={size || theme.sizes.icons} />
    </Wrapper>
  );

  if (onPress || onPressIn || onPressOut) {
    return <Touch onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>{comp}</Touch>;
  }
  return comp;
};

export default withTheme(Icon);
