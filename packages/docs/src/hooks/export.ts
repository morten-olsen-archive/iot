import { useFileSystem } from '../hooks/filesystem';
import JSZip from 'jszip';
import path from 'path';

export const generateZip = (
  files: { [path: string]: string },
  cwd: string,
  main: string
) => {
  const mainLocation = path.relative(cwd, main);
  const packageJson = {
    name: 'iot-playground',
    version: '1.0.0',
    main: path.join('./src', mainLocation),
    scripts: {
      start: 'iot-cli start',
    },
    dependencies: {
      '@morten-olsen/iot': '1.0.0',
      '@morten-olsen/iot-multiplex': '1.0.0',
    },
    devDependencies: {
      '@morten-olsen/iot-cli': '1.0.0',
    },
  };

  const zip = new JSZip();
  zip.folder('playground');
  zip.folder('playground/src');
  zip.file('playground/package.json', JSON.stringify(packageJson, null, '  '));
  Object.entries(files).forEach(([location, content]) =>
    zip.file(
      path.join('playground', './src', path.relative(cwd, location)),
      content
    )
  );
  return zip;
};

export const useDownload = (cwd: string, main: string) => {
  const fileSystem = useFileSystem();

  return async () => {
    const files = fileSystem.getFiles();
    const zip = generateZip(files, cwd, main);
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'playground.zip';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
};
