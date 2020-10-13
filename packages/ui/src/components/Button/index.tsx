import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { LinkText } from '../../typography';

interface Props {
  title: string;
  onPress?: () => void;
  icon?: string;
}

const Touch = styled.TouchableOpacity`
`;

const Wrapper = styled.View`
  background: #1f8efa;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  flex-direction: row;
`;

const IconWrapper = styled.View`
  width: 30px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Button: React.FC<Props> = ({ title, onPress, icon }) => (
  <Touch onPress={() => onPress && onPress()}>
    <Wrapper>
      <IconWrapper>
        {icon && <Octicons name={icon} color="#fff" size={30} />}
      </IconWrapper>
      <Content>
        <LinkText>{title}</LinkText>
      </Content>
      <IconWrapper />
    </Wrapper>
  </Touch>
);

export default Button;
