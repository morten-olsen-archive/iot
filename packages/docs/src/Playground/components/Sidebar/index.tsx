import React, { useContext, useMemo } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import DocumentsContext from '../../contexts/Documents';

interface Props {
  selectDocument: (document: editor.ITextModel) => void;
}

const Sidebar: React.FC<Props> = ({ selectDocument }) => {
  const { documents, compile } = useContext(DocumentsContext);
  const fileTree = useMemo(() => {
    return documents.map((d) => ({
      path: d.uri.path,
      model: d,
    }));
  }, [documents]);

  return (
    <div>
      <button onClick={compile}>Compile</button>
      {fileTree.map(({ path, model }) => (
        <button key={path} onClick={() => selectDocument(model)}>{path}</button>
      ))}
    </div>
  );
};

export default Sidebar;
