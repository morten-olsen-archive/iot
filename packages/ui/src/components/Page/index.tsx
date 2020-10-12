import styled from 'styled-components/native';
import { Theme } from '../../theme';

const Page = styled.View<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.background};
  padding: 50px;
`;

export default Page;
