import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Color from 'color';
import { Feather } from '@expo/vector-icons';
import { useKeys, useChange } from '@morten-olsen/iot-react';
import { Body1, Overline } from '../../../typography';
import Device from '../../Device';

interface Props {
  room: string;
  channels: {
    name: string;
    targetTemperatur: string;
    currentTemperatur: string;
  };
}

interface SensorProps {
  target?: number;
  current?: number;
}

const ThermostatOuter = styled.View`
  border-radius: 50%;
  background: #fff;
  height: 40px;
  width: 40px;
  padding-left: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;


const ThermostatView: React.FC<SensorProps> = ({ target, current }) => (
  <ThermostatOuter>
    <Body1>{current}°</Body1>
  </ThermostatOuter>
);

const getBackground = (current: number, target: number) => {
  if (current === target) {
    return undefined;
  } else if (current > target) {
    return Color('#e74c3c');
  } else {
    return Color('#C2E0F9');
  }
};

const Thermostat: React.FC<Props> = ({ room, channels }) => {
  const keys = useKeys(channels);
  const change = useChange();
  const current = keys.currentTemperatur?.current as number || 0;
  const target = keys.targetTemperatur?.current as number || 0;

  const background = getBackground(current, target);

  return (
    <Device
      background={background}
      name={(keys.name?.current as string) || 'Unknown thermostat'}
      actions={<ThermostatView current={current} target={target} />}
      room={room}
    />
  );
};

export { Props };

export default Thermostat;

