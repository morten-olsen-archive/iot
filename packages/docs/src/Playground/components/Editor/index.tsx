import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import MonacoEditor from 'react-monaco-editor';
import typings from './typings';

interface Props {
  model: monaco.editor.ITextModel;
}

const Wrapper = styled.View`
  flex-direction: row;
  background: #fff;
  padding: 25px;
  background: #212a3d;
`;

const Editor: React.FC<Props> = ({ model }) => {
  const willMount = useCallback((instance: any) => {
    instance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    instance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2018,
      allowNonTsExtensions: true,
    });
    Object.entries(typings).forEach(([path, defs]) => {
      instance.languages.typescript.typescriptDefaults.addExtraLib(
        defs,
        `file:///node_modules/@types/${path}`
      );
    });
  }, []);

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
        editorWillMount={willMount}
        options={options}
      />
    </Wrapper>
  );
};

export default Editor;
