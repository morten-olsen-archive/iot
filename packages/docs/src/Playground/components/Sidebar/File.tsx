import React from 'react';
import { Row, IconCell } from '@morten-olsen/iot-ui';

interface Props {
  name: string;
  isSelected: boolean;
  isRunning: boolean;
  isMain: boolean;
  makeMain: () => void;
  select: () => void;
  stop: () => void;
}

const File: React.FC<Props> = ({
  name,
  isMain,
  isSelected,
  makeMain,
  select,
  stop,
  isRunning,
}) => (
  <Row
    compact
    left={
      <IconCell
        color={isRunning ? 'red' : '#ddd'}
        name={!isRunning ? "play-circle" : "stop-circle"}
        onPress={!isRunning ? makeMain : stop}
      />
    }
    title={name}
    selected={isSelected}
    onPress={select}
  />
);

export default File;
