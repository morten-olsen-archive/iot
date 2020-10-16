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
import Button from '@morten-olsen/iot-ui/dist/components/Button';
import DevelopmentContext from '../../context/Development';
import typings from './typings';

interface Props {
  file: string;
  children?: ReactNode;
  showTime?: boolean;
}

const Wrapper = styled.View`
  flex-direction: row;
  background: #fff;
  padding: 25px;
  background: #212a3d;
`;

const EditorWrapper = styled.View`
  flex: 1;
`;

const Preview = styled.View`
  flex: 1;
`;

const Editor: React.FC<Props> = ({ file, children, showTime }) => {
  const model = useMemo(
    () => monaco.editor.getModel(monaco.Uri.parse(`file:///${file}`))!,
    [file]
  );
  const [code, setCode] = useState('');
  const developmentUnit = useContext(DevelopmentContext);

  useEffect(() => {
    setCode(model.getValue());
    developmentUnit.createUnit(file, model.getValue());
  }, []);

  const willMount = useCallback((instance: any) => {
  }, []);

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    model,
  };

  return (
    <Wrapper>
      <EditorWrapper>
        <MonacoEditor
          width={'100%'}
          height={400}
          language="typescript"
          theme="vs-dark"
          editorWillMount={willMount}
          options={options}
          onChange={(evt) => {
            setCode(evt);
          }}
        />
        <Button
          title="Run"
          icon="flame"
          onPress={() => developmentUnit.createUnit(file, code)}
        />
      </EditorWrapper>
      {children && (
        <Preview>
          {showTime && (
            <Button
              title="+1 min"
              icon="clock"
              onPress={() => developmentUnit.warp(60 * 1000)}
            />
          )}
          {children}
        </Preview>
      )}
    </Wrapper>
  );
};

export default Editor;
