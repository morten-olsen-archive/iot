import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import File from './File';

interface Props {
  location: string;
  files: editor.ITextModel[];
  selectedFile: string;
  mainFile: string;
  selectDocument: (document: editor.ITextModel) => void;
  selectMain: (path: string) => void;
}

interface FolderProps {
  branch: Branch;
  selectedFile: string;
  mainFile: string;
  selectDocument: (document: editor.ITextModel) => void;
  selectMain: (path: string) => void;
}

interface Branch {
  name: string;
  directories: {
    [name: string]: Branch;
  };
  files: {
    name: string;
    model: editor.ITextModel;
    path: string;
  }[];
}

const Spacer = styled.View`
  width: 15px;
`;

const cd = (location: string, branch: Branch) => {
  const locationParts = location.split('/').filter((a) => a);
  return locationParts.reduce((output, current) => {
    return output.directories[current];
  }, branch);
};

const buildTree = (files: editor.ITextModel[]) => {
  const tree = files.reduce(
    (output, file) => {
      const location = file.uri.path.split('/').filter((a) => !!a);
      const fileName = location.pop();
      const scope = location.reduce((scopeOutput, locationPart) => {
        if (!scopeOutput.directories[locationPart]) {
          scopeOutput.directories[locationPart] = {
            name: locationPart,
            files: [],
            directories: {},
          };
        }
        return scopeOutput.directories[locationPart];
      }, output);
      scope.files.push({
        name: fileName!,
        model: file,
        path: file.uri.path,
      });
      return output;
    },
    {
      name: 'root',
      directories: {},
      files: [],
    } as Branch
  );

  return tree;
};

const Folder: React.FC<FolderProps> = ({
  branch,
  selectedFile,
  mainFile,
  selectDocument,
  selectMain,
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Row
        compact
        title={branch.name}
        left={<IconCell name={visible ? 'minus' : 'plus'} />}
        onPress={() => setVisible(!visible)}
      />
      {visible && (
        <Row left={<Spacer />}>
          {branch.files.map((file) => (
            <File
              name={file.name}
              isMain={file.path === mainFile}
              isSelected={file.path === selectedFile}
              key={file.path}
              select={() => selectDocument(file.model)}
              makeMain={() => selectMain(file.path)}
            />
          ))}
          {Object.values(branch.directories).map((dir) => (
            <Folder
              key={dir.name}
              selectDocument={selectDocument}
              branch={dir}
              selectedFile={selectedFile}
              mainFile={mainFile}
              selectMain={selectMain}
            />
          ))}
        </Row>
      )}
    </>
  );
};

const Tree: React.FC<Props> = ({
  location,
  files,
  selectedFile,
  mainFile,
  selectDocument,
  selectMain,
}) => {
  const tree = useMemo(() => buildTree(files), [files]);
  const branch = useMemo(() => cd(location, tree), [tree, location]);

  return (
    <>
      <Folder
        key={branch.name}
        branch={branch}
        selectedFile={selectedFile}
        mainFile={mainFile}
        selectDocument={selectDocument}
        selectMain={selectMain}
      />
    </>
  );
};

export default Tree;
