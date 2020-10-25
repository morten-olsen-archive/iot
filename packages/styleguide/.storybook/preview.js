import React from 'react';
import { ThemeProvider } from '@morten-olsen/iot-ui';
import { UnitProvider } from '@morten-olsen/iot-react';
import Root from '@morten-olsen/iot-root';
import Initial from '@morten-olsen/iot-initial';

const initialState = {
  'lights.0.name': 'Light 1',
  'lights.0.on': false,
  'lights.1.name': 'Light 2',
  'lights.1.on': true,
  'lights.1.hue': 190,
  'lights.2.name': 'Light 3',
  'lights.2.on': true,
  'switches.0.name': 'Dimmer switch',
  'motionSensors.0.name': 'Motion Sensor',
  'thermostats.0.name': 'Thermostat 1',
  'thermostats.0.target': 21,
  'thermostats.0.current': 29,
  'thermostats.1.name': 'Thermostat 2',
  'thermostats.1.target': 21,
  'thermostats.1.current': 19,
  'thermostats.2.name': 'Thermostat 3',
  'thermostats.2.target': 21,
  'thermostats.2.current': 21,
};

const setup = async (unit) => {
  const initial = new Initial(unit, initialState);
  const root = new Root(initial);
  await root.initialize();
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <UnitProvider setup={setup}>
        <Story />
      </UnitProvider>
    </ThemeProvider>
  ),
];
