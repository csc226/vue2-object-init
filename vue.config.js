const path = require('path')
module.exports = {
    // 基本路径   整个文件夹在哪
    publicPath: './',
    // 输出文件目录   文件夹名
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
    assetsDir: "./",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径    index的路劲和名字
    indexPath: './index.html',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: {
        // 配置高于chainWebpack中关于css loader的配置
        // modules: true, // 是否开启支持‘foo.module.css’样式
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        // sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        loaderOptions: { // css预设器配置项
            // less: {
            //   loaderOptions: {
            //   data: `@import "@/assets/less/global.less";`



        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/less/global.less')]
        }
    },
    pwa: {
        // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: false,
        host: '',
        port: 8081,
        https: false,
        hot: true,
        proxy: { //配置跨域
            '/api': {
                // target: 'http://10.232.25.66:9090',
                target: 'http://babyname.aiwriter.cn/generator',
                ws: true,
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': '' //请求的时候使用这个api就可以
                }
            }

        }
        // before: app => {}
    },
    configureWebpack: (config) => {

        if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
            config.mode = 'production';
            config["performance"] = { //打包文件大小配置
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000
            }
        };
        config.devtool = 'source-map'
    },
    // configureWebpack:{
    //     externals: {
    //        'vue': 'Vue',
    //        'jquery' : '$',
    //     }
    //   }
}