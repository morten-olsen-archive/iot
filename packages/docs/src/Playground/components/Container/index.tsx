import React, { useState } from 'react';
import { editor }from 'monaco-editor/esm/vs/editor/editor.api';
import Editor from '../Editor';
import Sidebar from '../Sidebar';
import Store from '../../../components/Store';

const Container = () => {
  const [selectedDocument, setSelectedDocument] = useState<editor.ITextModel | undefined>(
    undefined,
  );

  return (
    <>
      <Sidebar selectDocument={setSelectedDocument} />
      {selectedDocument && <Editor model={selectedDocument} />}
      <Store />
    </>
  );
};

export default Container;
