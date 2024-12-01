import path from "path";

module.exports = {
  entry: './src/index.js', // Entry point of your React application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // For JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader for JS files
        },
      },
      {
        test: /\.jsx$/, // For React JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader for JSX files
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
};
