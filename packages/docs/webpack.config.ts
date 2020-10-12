import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const moduleDir = (pkg: string) =>
  path.dirname(require.resolve(path.join(pkg, 'package.json')));

const createWebpackConfig = () => {
  const dev = process.env.NODE_ENV !== 'production';
  const config: Configuration = {
    mode: dev ? 'development' : 'production',
    entry: [path.join(__dirname, 'src', 'index')],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-svg-web',
        '@expo/vector-icons': 'expo-web',
      },
    },
    output: {
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new MonacoWebpackPlugin({
        languages: ['json', 'typescript'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader',
        },
        {
          test: /\.(j|t)sx?$/,
          loader: 'babel-loader',
          include: [
            path.join(__dirname, './src'),
            moduleDir('react-native-markdown-display'),
          ],
          options: {
            sourceType: 'unambiguous',
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              'react-hot-loader/babel',
              'babel-plugin-i18next-extract',
            ],
          },
        },
      ],
    },
  };

  if (dev) {
    config.entry = ['react-hot-loader/patch', ...(config.entry as string[])];

    (config as any).devServer = {
      hot: true,
    };
  }

  return config;
};

export default createWebpackConfig;
