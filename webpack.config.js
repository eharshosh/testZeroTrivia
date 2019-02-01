const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: "./public/lib/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/static"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".less"]
  },

  module: {
    rules: [      
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      // less loader
      { 
        test: /\.less$/, 
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]    
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './public/index.html', to: '.' }], {})
  ]
};

