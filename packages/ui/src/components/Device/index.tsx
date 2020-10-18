import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import Row, { Icon } from '../Row';
import { Theme } from '../../theme';

interface Props {
  actions: ReactNode;
  name: string;
  room?: string;
  type?: string;
  onRemove?: () => void;
}

const Wrapper = styled.View<{ theme: Theme }>`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.backgroundShade1};
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: 0;
  shadow-radius: 20px;
`;

const Device: React.FC<Props> = ({ actions, name, room, onRemove, type }) => {
  return (
    <Wrapper>
      <Row
        left={actions}
        title={name}
        overline={room}
        description={type}
        right={onRemove && <Icon name="trash" color="#e74c3c" onPress={onRemove} />}
      />
    </Wrapper>
  );
};

export { Props };

export default Device;
