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
console.log('type', typings);
Object.entries(typings).forEach(([path, defs]) => {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    defs,
    `file:///node_modules/@types/${path}`
  );
});

const Wrapper = styled.View`
  flex-direction: row;
  background: #fff;
  padding: 25px;
  background: #212a3d;
`;

const Editor: React.FC<Props> = ({ model }) => {
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    model,
  };

  return (
    <Wrapper>
      <MonacoEditor
        width={'100%'}
        height={400}
        language="typescript"
        theme="vs-dark"
        options={options}
      />
    </Wrapper>
  );
};

export default Editor;
