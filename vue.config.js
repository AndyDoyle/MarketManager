// http://119.29.40.206:8081
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        port: 8080,  
        proxy: {
            '/':{
                target:'http://119.29.40.206:8081',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/':''
                }
            }
        }
    }
}
