import FileSystem from '../types/FileSystem';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import storage from '../db';

type Layer0Files = {
  [path: string]: {
    [version: string]: string;
  };
};

class WebFileSystem extends FileSystem {
  private _layer0: Layer0Files = {};

  onModelCreated = async (model: editor.ITextModel) => {
    await storage.setup();
    await storage.setFile(model.uri.path, model.getValue());
  };

  onModelChanged = async (model: editor.ITextModel) => {
    await storage.setup();
    await storage.setFile(model.uri.path, model.getValue());
  };

  onModelDispose = async (model: editor.ITextModel) => {
    await storage.setup();
    await storage.deleteFile(model.uri.path);
  };

  public restoreFile = async (location: string, version: string) => {
    if (!this._layer0[location] || !this._layer0[location][version]) {
      throw new Error(`${location} in version ${version} not found`);
    }
    const content = this._layer0[location][version];
    this.setFile(location, content);
  };

  public setupLayer0 = () => {
    const context = (require as any).context('./src', true, /.(ts|json)$/);
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

  public onSetup = async () => {
    this.setupLayer0();
    await this.setupLayer1();
    await this.restoreFile('/homes/demo.home.json', '1');
  };
}

export default WebFileSystem;
