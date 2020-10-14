import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode
} from 'react';
import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import EnvironmentContext from './Environment';

interface DocumentsContextValue {
  documents: editor.ITextModel[];
  addDocument: (path: string, code: string) => void;
  removeDocument: (path: string) => void;
  compile: () => Promise<void>;
};

interface EnvironmentProps {
  main: string;
  initialDocuments: { [path: string]: string };
  children: ReactNode;
}

const DocumentsContext = createContext<DocumentsContextValue>(undefined as any);

const getModel = (path: string, code: string) => {
  console.log(path, code);
  const filePath = `file://${path}`;
  const uri = Uri.parse(filePath);
  const currentDocument = editor.getModel(uri);
  if (currentDocument) {
    return currentDocument;
  }
  return editor.createModel(code, 'typescript', Uri.parse(filePath));
};

const DocumentsProvider: React.FC<EnvironmentProps> = ({
  children,
  initialDocuments,
  main,
}) => {
  const { compile } = useContext(EnvironmentContext);
  const [documents, setDocuments] = useState<editor.ITextModel[]>(
    Object.entries(initialDocuments).map(([path, code]) => getModel(path, code))
  );

  const addDocument = useCallback((path: string, code: string) => {
    const model = getModel(path, code);
    setDocuments((current) => [...current, model]);
  }, []);

  const removeDocument = useCallback(
    (path: string) => {
      const model = documents.find((d) => d.uri.path === path);
      if (model) {
        setDocuments((current) => current.filter((c) => c !== model));
      }
    },
    [documents]
  );

  const compileCode = useCallback(async () => {
    const code = documents.reduce((output, current) => {
      const path = current.uri.path;
      return {
        ...output,
        [path]: current.getValue(),
      };
    }, {} as { [path: string]: string });
    await compile(code, main);
  }, [documents, main, compile]);

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        addDocument,
        removeDocument,
        compile: compileCode,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export { DocumentsProvider };

export default DocumentsContext;
