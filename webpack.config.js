module.exports = {
  //entry: "./src/index.jsx",
  entry: "./example/src/index.jsx",
  output: {
    path: './example/js',
    //filename: 'index.js'
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
