import commander from 'commander';
import path from 'path';
import webpack from 'webpack';
import createWebpack from './createWebpack';

const bundle = (unitLocation: string, entryFile: string, output: string) => {
  const webpackConfig = createWebpack({
    unitFile: path.resolve(unitLocation),
    entryFile: path.join(__dirname, 'entries', entryFile),
    outputLocation: path.resolve('build', output),
  });

  const bundler = webpack(webpackConfig);
  bundler.run((err, stats) => {
    if (err) {
      console.error(err);
    } else if (stats) {
      console.log(stats.toString());
    }
  });
};

const bundleRoot = commander.command('bundle-root <unitFile>');
bundleRoot.action((unitLocation) => {
  bundle(unitLocation, 'root', 'root');
});

const bundleSocket = commander.command('bundle-socket <unitFile>');
bundleSocket.action(async (unitLocation) => {
  bundle(unitLocation, 'socket', 'socket');
});
commander.parse(process.argv);
