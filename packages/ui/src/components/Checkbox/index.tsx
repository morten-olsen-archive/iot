import React from 'react';
import styled from 'styled-components/native';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Touch = styled.TouchableOpacity`
`;

const Wrapper = styled.View`
  width: 30px;
  height: 16px;
`;

const Background = styled.View`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #20293c;
  position: absolute;
  top: 3px;
`;

const Ball = styled.View<{
  enabled?: boolean;
}>`
  background: ${({ enabled }) => enabled ? '#1f8efa' : '#72879d'};
  height: 16px;
  width: 16px;
  border-radius: 8px;
  position: absolute;
  top: 0;
  ${({ enabled }) => enabled ? 'right: 0;' : ''}
`;


const Checkbox: React.FC<Props> = ({ value, onChange }) => (
  <Touch onPress={() => onChange && onChange(!value)}>
    <Wrapper>
      <Background />
      <Ball enabled={value} />
    </Wrapper>
  </Touch>
);

export {
  Props,
};

export default Checkbox;
