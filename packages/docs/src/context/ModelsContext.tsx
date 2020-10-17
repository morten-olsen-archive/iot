import React, { createContext, useState, useEffect } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

interface ModelsContextValue {
  models: editor.ITextModel[];
}

const ModelsContext = createContext<ModelsContextValue>({ models: [] });

const ModelsProvider: React.FC = ({ children }) => {
  const [models, setModels] = useState(editor.getModels());

  useEffect(() => {
    setModels(editor.getModels());
    const createListener = editor.onDidCreateModel((model) => {
      setModels((current) => [...current, model]);
    });

    const disposeListener = editor.onWillDisposeModel((model) => {
      setModels((current) => current.filter((c) => c !== model));
    });

    return () => {
      disposeListener.dispose();
      createListener.dispose();
    };
  }, []);

  return (
    <ModelsContext.Provider value={{ models }}>
      {children}
    </ModelsContext.Provider>
  );
};

export { ModelsProvider };

export default ModelsContext;
