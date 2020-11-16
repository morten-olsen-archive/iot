import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';

abstract class FileSystem {
  abstract onSetup: () => Promise<void>;
  abstract onModelCreated: (file: editor.ITextModel) => Promise<void>;
  abstract onModelChanged: (file: editor.ITextModel) => Promise<void>;
  abstract onModelDispose: (file: editor.ITextModel) => Promise<void>;
  abstract restoreFile: (location: string, version: string) => Promise<void>;

  private _changeListener?: ReturnType<typeof editor.onDidCreateModel>;

  private _onModelCreate = (model: editor.ITextModel) => {
    this.onModelCreated(model);
    const changeListener = model.onDidChangeContent(() => {
      this._onModelChange(model);
    });
    const disposeListener = model.onWillDispose(() => {
      changeListener.dispose();
      disposeListener.dispose();
      this._onModelDispose(model);
    });
  };

  private _onModelDispose = (model: editor.ITextModel) => {
    if (!this._changeListener) {
      return;
    }
    this.onModelDispose(model);
  };

  private _onModelChange = (model: editor.ITextModel) => {
    if (!this._changeListener) {
      return;
    }
    this.onModelChanged(model);
  };

  public setFile = (location: string, content: string) => {
    const correctedLocation = `file://${location}`;
    const current = editor.getModel(Uri.parse(correctedLocation));
    if (current && !current.isDisposed()) {
      current.setValue(content);
    } else {
      editor.createModel(content, 'typescript', Uri.parse(correctedLocation));
    }
  };

  public setup = async () => {
    await this.onSetup();
    this._changeListener = editor.onDidCreateModel(this._onModelCreate);
  };

  public teardown = () => {
    if (this._changeListener) {
      this._changeListener.dispose();
      this._changeListener = undefined;
    }
    const models = editor.getModels();
    models.forEach((m) => m.dispose());
  };

  public getFiles = () => {
    const models = editor.getModels();
    return models.reduce(
      (output, current) => ({
        ...output,
        [current.uri.path]: current.getValue(),
      }),
      {} as { [location: string]: string }
    );
  };
}

export default FileSystem;
