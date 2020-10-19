import React from 'react';
import styled from 'styled-components/native';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import MonacoEditor from 'react-monaco-editor';
import typings from './typings';

interface Props {
  model: monaco.editor.ITextModel;
}

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2018,
  allowNonTsExtensions: true,
});
Object.entries(typings).forEach(([path, defs]) => {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    defs,
    `file:///node_modules/@types/${path}`
  );
});

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
`;

const Editor: React.FC<Props> = ({ model }) => {
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    model,
  };

  return (
    <Wrapper key={model.id}>
      <MonacoEditor
        width={'100%'}
        height={'100%'}
        language="typescript"
        theme="vs-light"
        options={options}
      />
    </Wrapper>
  );
};

export default Editor;
