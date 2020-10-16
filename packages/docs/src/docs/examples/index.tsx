import React from 'react';
import Example from '../../components/Example';
import Editor from '../../components/Editor';
import Markdown from '../../components/Markdown';
import { HueLight, Page, Button, DeviceGroup } from '@morten-olsen/iot-ui';
import { light0, motionSensor1, button0, button1 } from './devices';

const Introduction: React.FC = () => {
  return (
    <Page>
      <Markdown>## On/off buttons</Markdown>
      <Example initial={{ ...light0, ...button0, ...button1 }}>
        <Editor file="examples/OnOffButtonUnit.ts">
          <DeviceGroup>
            <Button
              channels={{
                name: 'buttons.0.name',
                pressed: 'buttons.0.pressed',
              }}
            />
            <Button
              channels={{
                name: 'buttons.1.name',
                pressed: 'buttons.1.pressed',
              }}
            />
            <HueLight channels={{ name: 'lights.0.name', on: 'lights.0.on' }} />
          </DeviceGroup>
        </Editor>
      </Example>
      <Markdown>## Random light color</Markdown>
      <Example initial={{ ...light0 }}>
        <Editor file="examples/RandomColorUnit.ts">
          <DeviceGroup>
            <HueLight channels={{ name: 'lights.0.name', on: 'lights.0.on' }} />
          </DeviceGroup>
        </Editor>
      </Example>
      <Markdown>## Motion sensor light control</Markdown>
      <Example initial={{ ...light0, ...motionSensor1 }}>
        <Editor showTime file="examples/MotionSensor.ts">
          <DeviceGroup>
            <Button
              channels={{
                name: 'motionSensors.0.name',
                pressed: 'motionSensors.0.motionDetected',
              }}
            />
            <HueLight channels={{ name: 'lights.0.name', on: 'lights.0.on' }} />
          </DeviceGroup>
        </Editor>
      </Example>
    </Page>
  );
};

export default Introduction;
