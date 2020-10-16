import React, { useContext, useState, useCallback } from 'react';
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import DocumentsContext from '../../contexts/Documents';
import EnvironmentContext from '../../contexts/Environment';
import { Modal, Row, IconCell } from '@morten-olsen/iot-ui';
import Folder from './Folder';

interface Props {
  selectedDocument?: editor.ITextModel;
  selectDocument: (document: editor.ITextModel) => void;
  cwd: string;
}

const Sidebar: React.FC<Props> = ({
  selectedDocument,
  selectDocument,
  cwd,
}) => {
  const { stop, running } = useContext(EnvironmentContext);
  const { main, setMain, documents, compile } = useContext(DocumentsContext);
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
        right={
          <>
            <IconCell name="play-circle" onPress={compile} />
            {running && (
              <IconCell color="red" name="stop-circle" onPress={stop} />
            )}
          </>
        }
        title="Files"
        description={cwd}
      />
      <Folder
        files={documents}
        location={cwd}
        selectedFile={selectedDocument ? selectedDocument.uri.path : ''}
        selectDocument={selectDocument}
        mainFile={main}
        selectMain={setMain}
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
