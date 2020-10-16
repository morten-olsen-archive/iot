import React from 'react';
import styled from 'styled-components/native';
import Store from '../../../components/Store';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const Environment: React.FC = () => {
  return (
    <Scroll>
      <Store />
    </Scroll>
  );
};

export default Environment;
