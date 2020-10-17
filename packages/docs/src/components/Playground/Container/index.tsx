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
  flex: 1;
`;

const SidebarWrapper = styled.View`
  width: 250px;
  height: 100%;
  overflow: hidden;
`;

const EditorWrapper = styled.View`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const PreviewWrapper = styled.View`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const Container: React.FC<Props> = ({ cwd }) => {
  const [selectedModel, setSelectedModel] = useState<
    editor.ITextModel | undefined
  >(undefined);

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar
          cwd={cwd}
          selectModel={setSelectedModel}
          selectedModel={selectedModel}
        />
      </SidebarWrapper>
      <EditorWrapper>
        {selectedModel && (
          <Editor key={selectedModel.uri.path} model={selectedModel} />
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
