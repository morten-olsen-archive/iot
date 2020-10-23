import { editor, Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import storage from '../db';
import { debounce } from '../utils/debounce';

type Layer0Files = {
  [path: string]: {
    [version: string]: string;
  };
};

class FileSystem {
  private _layer0: Layer0Files = {};
  private _models: editor.ITextModel[] = editor.getModels();

  constructor() {
    editor.onDidCreateModel(this._handleModelCreated);
  }

  public get models() {
    return this._models;
  }

  private _handleModelCreated = (model: editor.ITextModel) => {
    this._models.push(model);
    storage.setup().then(async () => {
      storage.setFile(model.uri.path, model.getValue());
    });
    const debouncedChange = debounce(() => {
      this._handleFileChanged(model);
    }, 1000);
    const changeListener = model.onDidChangeContent(debouncedChange);
    const disposeListener = model.onWillDispose(() => {
      changeListener.dispose();
      disposeListener.dispose();
      this._handleModelDispose(model);
    });
  };

  private _handleFileChanged = (model: editor.ITextModel) => {
    storage.setup().then(async () => {
      storage.setFile(model.uri.path, model.getValue());
    });
  };

  private _handleModelDispose = (model: editor.ITextModel) => {
    this._models = this._models.filter((m) => m !== model);
    storage.setup().then(async () => {
      storage.deleteFile(model.uri.path);
    });
  };

  public getFile = (location: string) => {
    return this._models.find((m) => m.uri.path === location);
  };

  public setFile = (location: string, content: string) => {
    const correctedLocation = `file://${location}`;
    const current = editor.getModel(Uri.parse(correctedLocation));
    if (current && !current.isDisposed()) {
      current.setValue(content);
    } else {
      console.log('Creating model', location);
      editor.createModel(content, 'typescript', Uri.parse(correctedLocation));
    }
  };

  public getFiles = () => {
    return this._models.reduce(
      (output, current) => ({
        ...output,
        [current.uri.path]: current.getValue(),
      }),
      {} as { [location: string]: string }
    );
  };

  public restoreFile = (location: string, version: string) => {
    if (!this._layer0[location] || !this._layer0[location][version]) {
      throw new Error(`${location} in version ${version} not found`);
    }
    const content = this._layer0[location][version];
    this.setFile(location, content);
  };

  public setupLayer0 = () => {
    const context = (require as any).context('./src', true, /.ts$/);
    this._layer0 = context.keys().reduce((output: Layer0Files, key: string) => {
      const content = context(key).default;
      const locationParts = key.substring(1).split('.');
      const ext = locationParts.pop();
      const version = locationParts.pop() || '1';
      const location = [...locationParts, ext].join('.');

      return {
        ...output,
        [location]: {
          ...(output[location] || {}),
          [version]: content,
        },
      };
    }, {} as Layer0Files);
  };

  public setupLayer1 = async () => {
    await storage.setup();
    const dbFiles = await storage.getFiles();
    Object.entries(dbFiles).forEach(([, { location, content }]: any) => {
      this.setFile(location, content);
    });
  };

  public setup = async () => {
    this.setupLayer0();
    await this.setupLayer1();
  };
}

export default FileSystem;
