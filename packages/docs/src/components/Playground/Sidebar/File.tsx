import React, { useMemo } from 'react';
import path from 'path';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import { useEnvironment } from '../../../hooks/environment';

interface Props {
  model: editor.ITextModel;
  isSelected?: boolean;
  select?: () => void;
}

const File: React.FC<Props> = ({ model, isSelected, select }) => {
  const { running, compile, stop } = useEnvironment();
  const fileName = useMemo(() => path.basename(model.uri.path), [model]);
  const isRunning = running === model.uri.path;

  return (
    <Row
      compact
      left={
        <IconCell
          color={isRunning ? 'red' : '#ddd'}
          name={!isRunning ? 'play-circle' : 'stop-circle'}
          onPress={!isRunning ? () => compile(model.uri.path) : stop}
        />
      }
      right={
        <IconCell
          name="trash"
          onPress={() => confirm('Are you sure?') && model.dispose()}
        />
      }
      title={fileName}
      selected={isSelected}
      onPress={select}
    />
  );
};

export default File;
