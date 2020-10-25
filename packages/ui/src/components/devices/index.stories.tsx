import React from 'react';
import { Normal as HueDimmerSwitch } from './HueLightSwitch/index.stories';
import { Normal as HueLight, WithHue, On } from './HueLight/index.stories';
import { Normal as HueMotionSensor } from './HueMotionSensor/index.stories';
import { Normal as Thermostat, Hot, Cold } from './Thermostat/index.stories';
import DeviceGroup from '../DeviceGroup';

export const All = () => (
  <DeviceGroup>
    <HueLight />
    <WithHue />
    <On />
    <HueDimmerSwitch />
    <HueMotionSensor />
    <Thermostat />
    <Hot />
    <Cold />
  </DeviceGroup>
);

export default {
  title: 'Devices/All',
};
