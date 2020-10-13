import React from 'react';
import Markdown from '../../components/Markdown';
import { Page } from '@morten-olsen/iot-ui';
import whatAreUnits from 'raw-loader!./what-are-units.md';

const CreatingUnits = () => (
  <Page>
    <Markdown>{whatAreUnits}</Markdown>
  </Page>
);

export default CreatingUnits;
