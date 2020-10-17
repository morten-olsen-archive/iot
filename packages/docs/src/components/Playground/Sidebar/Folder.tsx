import React, { useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { Row, IconCell } from '@morten-olsen/iot-ui';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import File from './File';

interface Props {
  location: string;
  models: editor.ITextModel[];
  selectedModel?: editor.ITextModel;
  selectModel: (model: editor.ITextModel) => void;
}

interface FolderProps {
  branch: Branch;
  selectedModel?: editor.ITextModel;
  selectModel: (model: editor.ITextModel) => void;
}

interface Branch {
  name: string;
  directories: {
    [name: string]: Branch;
  };
  files: editor.ITextModel[];
}

const Spacer = styled.View`
  width: 15px;
`;

const cd = (location: string, branch: Branch) => {
  const locationParts = location.split('/').filter((a) => a);
  return locationParts.reduce((output, current) => {
    return output.directories[current] || { directories: {}, files: [] };
  }, branch);
};

const buildTree = (models: editor.ITextModel[]) => {
  const tree = models.reduce(
    (output, model) => {
      const location = model.uri.path.split('/').filter((a) => !!a);
      location.pop();
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
      scope.files.push(model);
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
  selectModel,
  selectedModel,
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
          {branch.files.map((model) => (
            <File
              model={model}
              isSelected={model === selectedModel}
              key={model.uri.path}
              select={() => selectModel(model)}
            />
          ))}
          {Object.values(branch.directories).map((dir) => (
            <Folder
              key={dir.name}
              selectModel={selectModel}
              branch={dir}
              selectedModel={selectedModel}
            />
          ))}
        </Row>
      )}
    </>
  );
};

const Tree: React.FC<Props> = ({
  location,
  selectModel,
  selectedModel,
  models,
}) => {
  const tree = useMemo(() => buildTree(models), [models]);
  const branch = useMemo(() => cd(location, tree), [tree, location]);

  return (
    <>
      <Folder
        key={branch.name}
        branch={branch}
        selectedModel={selectedModel}
        selectModel={selectModel}
      />
    </>
  );
};

export default Tree;
