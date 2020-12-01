module.exports = {
    publicPath: './',
    // baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/admin':{
                target:'http://119.29.40.206:8081/admin',
                changeOrigin:true,
                pathRewrite:{
                    '^/admin':''
                }
            }
        }
    }
}