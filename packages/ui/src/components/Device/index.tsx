import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { Theme } from '../../theme';
import { Subtitle1, Subtitle2 } from '../../typography';
import Checkbox from '../Checkbox';

interface Props {
  icon: string;
  color: string;
  name: string;
  active: boolean;
  onActiveChange?: (state: boolean) => void;
  size?: number;
  onPressIn: () => void;
  onPressOut?: () => void;
}

const Touch = styled.TouchableOpacity``;

const Wrapper = styled.View<{ theme: Theme }>`
  flex-direction: row;
  background: #2f3b52;
  border-radius: 5px;
  width: 250px;
  margin: 10px;
  height: 100px;
  shadow-color: #000;
  shadow-opacity: .6;
  shadow-offset: 0;
  shadow-radius: 15px;
`;

const Ear = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Lines = styled.View``;

const Icon = styled.View`
  padding-left: 30px;
  padding-right: 10px;
`;

const Device: React.FC<Props> = ({
  name,
  icon,
  color,
  onPressIn,
  onPressOut,
  active,
  onActiveChange,
}) => {
  return (
    <Wrapper>
        <Ear>
          <Checkbox value={active} onChange={onActiveChange} />
        </Ear>
        <Content>
          <Icon>
            <Touch onPressIn={onPressIn} onPressOut={onPressOut}>
              <Octicons name={icon} color={color || '#fff"'} size={40} />
            </Touch>
          </Icon>
          <Lines>
            <Subtitle1>{name}</Subtitle1>
            <Subtitle2>Ready to light</Subtitle2>
          </Lines>
        </Content>
    </Wrapper>
  );
};

export { Props };

export default Device;
