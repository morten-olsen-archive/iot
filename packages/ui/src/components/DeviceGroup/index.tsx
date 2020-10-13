import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Theme } from '../../theme';
import Margin from '../Margin';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.View<{ theme: Theme }>`
  flex-direction: row;
`;

const DeviceGroup: React.FC<Props> = ({ children }) => (
  <Margin bottom="lg">
    <Wrapper>{children}</Wrapper>
  </Margin>
);

export default DeviceGroup;
