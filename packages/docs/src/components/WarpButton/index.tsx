import React from 'react';
import styled from 'styled-components/native';
import { Button } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../hooks/environment';

interface Props {
  amount: number;
  label: string;
}

const WarpButton: React.FC<Props> = ({ label, amount }) => {
  const { warpTime } = useEnvironment();

  return (
    <Button title={label} onPress={() => warpTime(amount)} />
  );
};

export default WarpButton;
