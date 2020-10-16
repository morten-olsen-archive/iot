import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const context = (require as any).context('./src', true, /.ts$/);
context.keys().forEach((key: string) => {
  const code = context(key).default;
  console.log('code', code);
  const filename = `file:///examples${key.substring(1)}`;
  if (monaco.editor.getModel(monaco.Uri.parse(filename))) {
    return;
  }
  monaco.editor.createModel(code, 'typescript', monaco.Uri.parse(filename));
});
