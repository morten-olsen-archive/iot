import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { useModels } from '../../../hooks/models';
import { useDownload } from '../../../hooks/export';
import { Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import Folder from './Folder';
import {useEnvironment} from '../../../hooks/environment';

interface Props {
  selectedModel?: editor.ITextModel;
  selectModel: (model: editor.ITextModel) => void;
  cwd: string;
}

const FilesWrapper = styled.View`
  flex: 1;
`;

const Sidebar: React.FC<Props> = ({ selectedModel, selectModel, cwd }) => {
  const models = useModels();
  const { running } = useEnvironment();
  const download = useDownload(cwd, running!);
  const [adding, setAdding] = useState(false);
  const [addPath, setAddPath] = useState(cwd + '/');

  const addFile = useCallback(() => {
    setAdding(false);
    editor.createModel('', 'typescript', Uri.parse(`file://${addPath}`));
  }, [addPath]);

  return (
    <>
      <Row
        left={
          <>
            <IconCell onPress={() => setAdding(true)} name="plus-circle" />
          </>
        }
        title="Files"
        description={cwd}
      />
      <FilesWrapper>
        <Folder
          models={models}
          location={cwd}
          selectedModel={selectedModel}
          selectModel={selectModel}
        />
      </FilesWrapper>
      <Row
        left={
          <>
            {running && <IconCell onPress={() => { download(cwd, running); }} name="download" />}
          </>
        }
      />
      <Modal visible={adding} onClose={() => setAdding(false)} title="Add file">
        <input
          placeholder="Path"
          value={addPath}
          onChange={(e) => setAddPath(e.target.value)}
        />
        <button onClick={addFile}>Add</button>
      </Modal>
    </>
  );
};

export default Sidebar;
