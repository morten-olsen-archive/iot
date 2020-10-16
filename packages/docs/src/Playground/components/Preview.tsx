import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import styled from 'styled-components/native';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import MonacoEditor from 'react-monaco-editor';
import typings from '../components/Editor';
import DocumentContext from '../contexts/Documents';
import EnvironmentContext from '../contexts/Environment';
import { Row, IconCell } from '@morten-olsen/iot-ui';

interface Props {
  file: string;
  autorun?: boolean;
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
`;

const Editor: React.FC<Props> = ({ file, autorun }) => {
  const model = useMemo(
    () => monaco.editor.getModels().find((m) => m.uri.path === file),
    [file]
  );
  const { compile } = useContext(DocumentContext);
  const { running, stop } = useContext(EnvironmentContext);
  useEffect(() => {
    if (autorun && model) {
      compile(model.uri.path);
    }
  }, [autorun, model, compile]);

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    model,
    readOnly: true,
    codeLens: false,
    minimap: {
      enabled: false,
    },
    contextmenu: false,
    scrollbar: {
      useShadows: false,
    },
    scrollBeyondLastLine: false,
  };

  return (
    <Wrapper>
      <Row
      title={model && model.uri.path}
      left={model && (
        <>
        {running !== file && <IconCell name="play-circle" onPress={() => compile(model.uri.path)} />}
          {running === file && <IconCell name="stop-circle" color="red" onPress={() => stop()} />}
        </>
      )}
      />
      <MonacoEditor
        width={'100%'}
        height={300}
        language="typescript"
        theme="vs-light"
        options={options}
      />
    </Wrapper>
  );
};

export default Editor;
