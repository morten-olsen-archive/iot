import React from 'react';
import { Row, IconCell } from '@morten-olsen/iot-ui';

interface Props {
  name: string;
  isSelected: boolean;
  isMain: boolean;
  makeMain: () => void;
  select: () => void;
}

const File: React.FC<Props> = ({
  name,
  isMain,
  isSelected,
  makeMain,
  select,
}) => (
  <Row
    compact
    left={
      <IconCell
        color={isMain ? '#000' : '#ddd'}
        name="play-circle"
        onPress={makeMain}
      />
    }
    title={name}
    selected={isSelected}
    onPress={select}
  />
);

export default File;
