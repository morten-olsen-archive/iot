import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import EnvironmentContext from './Environment';

interface DocumentsContextValue {
  documents: editor.ITextModel[];
  compile: () => Promise<void>;
  main: string;
  setMain: (path: string) => void;
}

interface EnvironmentProps {
  main: string;
  children: ReactNode;
  autoRun?: boolean;
}

const DocumentsContext = createContext<DocumentsContextValue>(undefined as any);

const DocumentsProvider: React.FC<EnvironmentProps> = ({
  children,
  main,
  autoRun,
}) => {
  const { compile } = useContext(EnvironmentContext);
  const [localMain, setLocalMain] = useState(main);
  const [documents, setDocuments] = useState<editor.ITextModel[]>(
    editor.getModels()
  );

  const compileCode = useCallback(async () => {
    const code = documents.reduce((output, current) => {
      const path = current.uri.path;
      return {
        ...output,
        [path]: current.getValue(),
      };
    }, {} as { [path: string]: string });
    await compile(code, localMain);
  }, [documents, compile, localMain]);

  useEffect(() => {
    if (autoRun) {
      compileCode();
    }
  }, [autoRun]);

  useEffect(() => {
    const createListener = editor.onDidCreateModel((model) => {
      setDocuments(editor.getModels());
      console.log('new doc', model.uri.path);
    });
    const disposeListener = editor.onWillDisposeModel(() => {
      setDocuments(editor.getModels());
    });

    return () => {
      createListener.dispose();
      disposeListener.dispose();
    };
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        compile: compileCode,
        main: localMain,
        setMain: setLocalMain,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export { DocumentsProvider };

export default DocumentsContext;
