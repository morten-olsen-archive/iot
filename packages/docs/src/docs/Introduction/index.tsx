import React from 'react';
import Example from '../../components/Example';
import Editor from '../../components/Editor';
import { HueLight, Page, Button, DeviceGroup } from '@morten-olsen/iot-ui';
import Markdown from '../../components/Markdown';
import { light0, button0, button1 } from './devices';
import intro from 'raw-loader!./intro.md';
import onOffExample from 'raw-loader!./on-off-example.md';
import next from 'raw-loader!./next.md';

const Introduction: React.FC = () => {
  return (
    <Page>
      <Markdown>{intro}</Markdown>
      <Example initial={{ ...light0 }}>
        <Editor file="examples/RandomColorUnit.ts">
          <DeviceGroup>
            <HueLight channels={{ name: 'lights.0.name', on: 'lights.0.on' }} />
          </DeviceGroup>
        </Editor>
      </Example>
      <Markdown>{onOffExample}</Markdown>
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
      <Markdown>{next}</Markdown>
    </Page>
  );
};

export default Introduction;
