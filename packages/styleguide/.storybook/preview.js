import React from 'react';
import { ThemeProvider } from '@morten-olsen/iot-ui';
import { UnitProvider } from '@morten-olsen/iot-react';
import Master from '@morten-olsen/iot-master';
import Initial from '@morten-olsen/iot-initial';

const initialState = {
  'lights.0.name': 'Demo light',
  'lights.0.on': false,
};

const setup = async (unit) => {
  const initial = new Initial(unit, initialState);
  const master = new Master(initial);
  await master.initialize();
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
