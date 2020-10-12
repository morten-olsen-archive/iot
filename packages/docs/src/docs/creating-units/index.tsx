import React from 'react';
import Markdown from '../../components/Markdown';
import whatAreUnits from 'raw-loader!./what-are-units.md';

const CreatingUnits = () => (
  <Markdown>{whatAreUnits}</Markdown>
);

export default CreatingUnits;
