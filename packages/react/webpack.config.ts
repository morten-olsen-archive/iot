import { Configuration } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const createWebpackConfig = () => {
  const config: Configuration = {
    mode: "development",
    entry: [path.join(__dirname, "src", "index")],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(j|t)sx?$/,
          loader: "babel-loader",
          options: {
            sourceType: "unambiguous",
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      ],
    },
  };

  return config;
};

export default createWebpackConfig;
