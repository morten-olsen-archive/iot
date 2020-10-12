import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import Margin from '../Margin';
import { Theme } from '../../theme';

const Touch = styled.TouchableOpacity``;

const InnerWrapper = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
  background: #ccf;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  flex-direction: row;
`;

const Wrapper = styled.View<{ theme: Theme }>`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.sizes.corner}px;
`;

interface Props {
  icon: string;
  color: string;
  name: string;
  size?: number;
  onPressIn: () => void;
  onPressOut?: () => void;
}

const Device: React.FC<Props> = ({
  name,
  icon,
  color,
  size = 1,
  onPressIn,
  onPressOut,
}) => {
  return (
    <Margin all half>
      <Wrapper>
        <Margin all half>
          <Touch onPressIn={onPressIn} onPressOut={onPressOut}>
            <InnerWrapper>
              <Octicons name={icon} color={color} size={24 + size * 24} />
            </InnerWrapper>
          </Touch>
          <Margin all half>
            <div>{name}</div>
          </Margin>
        </Margin>
      </Wrapper>
    </Margin>
  );
};

export { Props };

export default Device;
