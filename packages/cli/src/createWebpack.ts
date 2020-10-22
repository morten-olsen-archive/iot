import { Configuration, DefinePlugin } from 'webpack';

interface Options {
  entryFile: string;
  unitFile: string;
  outputLocation: string;
}

const createConfig = (options: Options) => {
  const config: Configuration = {
    mode: 'development',
    target: 'node',
    entry: options.entryFile,
    output: {
      path: options.outputLocation,
    },
    plugins: [
      new DefinePlugin({
        __UNIT_LOCATION: JSON.stringify(options.unitFile),
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(t|j)s$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            sourceType: 'unambiguous',
            presets: ['@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      ],
    },
  };

  return config;
};

export default createConfig;
