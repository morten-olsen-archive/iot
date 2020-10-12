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
import { nanoid } from 'nanoid';
import MonacoEditor from 'react-monaco-editor';
import DevelopmentContext from '../../context/Development';
import typings from './typings';

interface Props {
  code: string;
  name: string;
  children?: ReactNode;
}

const Wrapper = styled.View`
  flex-direction: row;
  background: #fff;
  padding: 25px;
`;

const EditorWrapper = styled.View`
  flex: 1;
`;

const Preview = styled.View`
  flex: 1;
`;

const Editor: React.FC<Props> = ({ name, code, children }) => {
  const id = useMemo(() => nanoid(), []);
  const [value, setValue] = useState(code);
  const developmentUnit = useContext(DevelopmentContext);

  useEffect(() => {
    developmentUnit.createUnit(name, code);
  }, []);

  const willMount = useCallback((instance: any) => {
    instance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // compiler options
    instance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2018,
      allowNonTsExtensions: true,
    });
    Object.entries(typings).forEach(([file, defs]) => {
      instance.languages.typescript.typescriptDefaults.addExtraLib(
        defs,
        `file:///node_modules/@types/${file}`
      );
    });
  }, []);

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    model:
      monaco.editor.getModel(monaco.Uri.parse(`file:///${id}.tsx`)) ||
      monaco.editor.createModel(
        code,
        'typescript',
        monaco.Uri.parse(`file:///${id}.tsx`)
      ),
  };

  return (
    <Wrapper>
      <EditorWrapper>
        <MonacoEditor
          value={value}
          width={'100%'}
          height={300}
          language="typescript"
          theme="vs-light"
          editorWillMount={willMount}
          options={options}
          onChange={(evt) => {
            setValue(evt);
          }}
        />
        <button onClick={() => developmentUnit.createUnit(name, value)}>
          Run
        </button>
      </EditorWrapper>
      {children && <Preview>{children}</Preview>}
    </Wrapper>
  );
};

export default Editor;
