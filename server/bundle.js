var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config');
var path = require('path');
var fs = require('fs');

var mainPath = path.resolve(__dirname, '..', 'src', 'main.js');

module.exports = function () {

    // First we fire up Webpack and pass in the configuration we
    // created
    var bundleStart = null;
    var compiler = Webpack(webpackConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {

        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying:
        // http://localhost:3000/(public) -> http://localhost:8080/(public)
        publicPath: webpackConfig.output.publicPath,

        // Configure hot replacement
        hot: true,

        // The rest is terminal configurations
        quiet: false,
        // noInfo: true,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    bundler.listen(8080, 'localhost', function (err, result) {
        if(err){
            return console.log(err);
        }
        console.log('Bundling project, please wait...');
    });

};