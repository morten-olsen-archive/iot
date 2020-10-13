import styled from 'styled-components/native';
import { Theme } from '../../theme';

const Page = styled.View<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.background};
  background: #242e42;
  padding: 50px;
`;

export default Page;
