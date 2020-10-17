import React from 'react';
import styled from 'styled-components/native';
import { ButtonText, Cell } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';

interface Props {
  amount: number;
  label: string;
}

const Touch = styled.TouchableOpacity``;

const WarpButton: React.FC<Props> = ({ label, amount }) => {
  const { warpTime } = useEnvironment();

  return (
    <Touch onPress={() => warpTime(amount)}>
      <Cell>
        <ButtonText>{label}</ButtonText>
      </Cell>
    </Touch>
  );
};

export default WarpButton;
