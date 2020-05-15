const {join} = require('path');
module.exports = {
    devServer:{
        contentBase:join(__dirname,'../dist'),
        hot:true,
        historyApiFallback:true,
    }
};