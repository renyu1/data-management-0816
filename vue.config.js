const path = require(`path`)
module.exports = {
    indexPath: path.resolve(__dirname, `./views/index.html`),
    productionSourceMap: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false

    },
    devServer: {
        port: 3002,
        // proxy: null
        proxy: {
            '/': {
                target: 'http://192.168.100.15:3001',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/': '',//重写,
                }
            }
        }
    }
}
