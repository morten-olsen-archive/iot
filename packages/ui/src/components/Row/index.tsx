import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import Cell from './Cell';
import Icon from './Icon';
import { Overline, Body1, Body2 } from '../../typography';
import { Theme } from '../../theme';
import { nodeOrText } from '../../utils/components';

interface Props {
  left?: ReactNode;
  right?: ReactNode;
  unread?: boolean;
  overline?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  onPress?: () => void;
  children?: ReactNode;
  selected?: boolean;
  background?: boolean;
  compact?: boolean;
}

const Unread = styled.View`
  width: 8px;
  height: 8px;
  background: #3498db;
  border-radius: 4px;
  margin: 5px;
`;

const Touch = styled.TouchableOpacity``;

const Wrapper = styled(Cell)<{
  selected?: boolean;
  theme: Theme;
  compact?: boolean;
}>`
  flex-direction: row;
  ${({ compact }) => (compact ? 'padding-top: 0;' : '')}
  ${({ compact }) => (compact ? 'padding-bottom: 0;' : '')}
  border-radius: ${({ theme }) => theme.sizes.corner}px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.backgroundSelected : 'transparent'};
`;

const Main = styled(Cell)`
  align-items: flex-start;
  flex: 1;
`;

const Row: React.FC<Props> = ({
  left,
  right,
  overline,
  title,
  description,
  children,
  onPress,
  background,
  unread,
  selected,
  compact,
}) => {
  const comp = (
    <Wrapper background={background} selected={selected} compact={!!compact}>
      {unread && <Unread />}
      {left}
      <Main>
        {overline && nodeOrText(overline, Overline)}
        {title && nodeOrText(title, Body1)}
        {description && nodeOrText(description, Body2)}
        {children && nodeOrText(children, Body1)}
      </Main>
      {right}
    </Wrapper>
  );

  if (onPress) {
    return <Touch onPress={onPress}>{comp}</Touch>;
  }

  return comp;
};

export { Props, Cell, Icon };

export default Row;
