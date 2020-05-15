const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}`);
const merge = require('webpack-merge');
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const webapckConfig = {
    entry:{
        app:resolve('./src/web/index.tsx'),
    },
    module:{
        rules:[
            {
                test:/.tsx?$/,
                loader:'awesome-typescript-loader'
            }
        ]
    },
    plugins:[
        new CheckerPlugin(),
        new HtmlWebpackPLugin({
            template:'src/web/index.html',
            target:'index.html'
        })
    ],
    resolve:{
        extensions:['.ts','.tsx','.js','.jsx']
    }
};

module.exports = merge(webapckConfig, _mergeConfig);
