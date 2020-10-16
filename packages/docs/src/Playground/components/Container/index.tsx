import React, { useState } from 'react';
import styled from 'styled-components/native';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import Editor from '../Editor';
import Sidebar from '../Sidebar';
import Environment from '../Environment';
import TimeWarp from '../TimeWarp';

interface Props {
  cwd: string;
}

const Wrapper = styled.View`
  flex-direction: row;
  height: 100vh;
`;

const SidebarWrapper = styled.View`
  width: 250px;
`;

const EditorWrapper = styled.View`
  flex: 1;
`;

const PreviewWrapper = styled.View`
  flex: 1;
`;

const Container: React.FC<Props> = ({ cwd }) => {
  const [selectedDocument, setSelectedDocument] = useState<
    editor.ITextModel | undefined
  >(undefined);

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar
          cwd={cwd}
          selectedDocument={selectedDocument}
          selectDocument={setSelectedDocument}
        />
      </SidebarWrapper>
      <EditorWrapper>
        {selectedDocument && (
          <Editor key={selectedDocument.uri.path} model={selectedDocument} />
        )}
      </EditorWrapper>
      <PreviewWrapper>
        <Environment />
        <TimeWarp />
      </PreviewWrapper>
    </Wrapper>
  );
};

export default Container;
