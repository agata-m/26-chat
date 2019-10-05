const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');


const plugins = [
    new HtmlWebpackPlugin ({
        template: 'client/index.html',
        filename: 'index.html',
        inject: 'body'
    })
];

module.exports = (env) => {
    const environment = env || 'production';
    
    if (env === 'production') {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }

    return {
        mode: environment,
        entry: './client/index.js',
        plugins,
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app.bundle.js'
        },
        
        devServer: {
            proxy: {
                '/socket.io': {
                    target: 'http://localhost:3000',
                    ws: true
                }
            }
        }
    }
};