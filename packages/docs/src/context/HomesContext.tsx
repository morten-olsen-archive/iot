import React, { createContext, useState, useEffect } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

interface HomesContextValue {
  homes: {
    [location: string]: {
      data: {
        name: string;
        devices: any[];
      };
      disableEdit?: boolean;
      model: editor.ITextModel;
    };
  };
}

const HomesContext = createContext<HomesContextValue>({ homes: {} });

const HomesProvider: React.FC = ({ children }) => {
  const [homes, setHomes] = useState<HomesContextValue['homes']>({});

  const updateModel = (model: editor.ITextModel) => {
    if (!model.uri.path.endsWith('.home.json')) {
      return;
    }
    try {
      setHomes((current) => ({
        ...current,
        [model.uri.path]: {
          model,
          data: JSON.parse(model.getValue() as any),
        },
      }));
    } catch (err) {}
  };

  useEffect(() => {
    editor.getModels().forEach(updateModel);
    let updateListener: undefined | any;
    const createListener = editor.onDidCreateModel((model) => {
      updateModel(model);
      updateListener = model.onDidChangeContent(() => {
        updateModel(model);
      });
    });

    const disposeListener = editor.onWillDisposeModel((model) => {
      setHomes((current) => {
        const newList = { ...current };
        delete newList[model.uri.path];
        return newList;
      });
    });

    return () => {
      disposeListener.dispose();
      createListener.dispose();
      if (updateListener) {
        updateListener.dispose();
      }
    };
  }, []);

  return (
    <HomesContext.Provider value={{ homes }}>{children}</HomesContext.Provider>
  );
};

export { HomesProvider };

export default HomesContext;
