import styled from 'styled-components/native';
import { Theme } from '../../theme';

const Cell = styled.View<{
  background?: boolean;
  selected?: boolean;
  theme: Theme;
}>`
  padding: ${({ theme }) => theme.paddings.sm / 2}px;
  align-items: center;
`;

export default Cell;
