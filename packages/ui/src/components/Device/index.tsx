import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import Color from 'color';
import Row, { Icon } from '../Row';
import { Theme } from '../../theme';

interface Props {
  actions: ReactNode;
  name: string;
  room?: string;
  type?: string;
  glow?: boolean;
  onRemove?: () => void;
  background?: Color;
}

const Wrapper = styled.View<{
  theme: Theme;
  background?: Color;
  glow?: boolean;
}>`
  flex-direction: row;
  background: ${({ background, theme }) =>
    background?.hex() || theme.colors.backgroundShade1};
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  overflow: hidden;
  shadow-color: ${({ background }) => background?.hex() || '#000'};
  shadow-opacity: ${({ glow }) => (glow ? '1' : '0.2')};
  shadow-offset: 0;
  shadow-radius: 20px;
`;

const Device: React.FC<Props> = ({
  actions,
  name,
  room,
  onRemove,
  type,
  background,
  glow,
}) => {
  return (
    <Wrapper background={background} glow={glow}>
      <Row
        background={background?.hex()}
        title={name}
        overline={room}
        description={type}
        right={
          <>
            {actions}
            {onRemove && (
              <Icon name="trash" color="#e74c3c" onPress={onRemove} />
            )}
          </>
        }
      />
    </Wrapper>
  );
};

export { Props };

export default Device;
