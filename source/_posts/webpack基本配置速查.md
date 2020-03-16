---
title: webpack基本配置速查
date: 2017-10-15 10:35:59
tags:
    - webpack 
    - JavaScript
categories:
    - 前端
---

webpack，可以说是模块打包机，它可以分析项目结构，找到Javascript模块以及其他浏览器不能直接运行的语言（Scss、Typescript等），将其打包为合适的格式供浏览器使用，此外还可以结合插件抽离CSS和压缩JS代码。

webpack和Gulp/Grunp最大的区别在于：

Gulp/Grunt：指明对某些文件编译、组合的具体步骤
Webpack：把项目作为整体，**通过一个给定的主文件（如index.js）找到项目的依赖文件**，使用loader处理它们，最后打包为一个浏览器可识别的Javascript文件

先来看一个常见的文件,在这里进行逐行解释

```
const webpack = require('webpack); //引用插件或库
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './app/main.js' //唯一入口文件
    },
    output: {
        path: __dirname + '/build', //输出路径
        filename: 'bundle.js' //输出文件名
    },
    devtool: 'eval-source-map', //开发工具，注明原始代码位置和打包信息
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ //对应的插件语法
                fallback: "style-loader", //输出文件时使用的模块
                use: [{
                    loader: "css-loader", //第一个模块
                    options: {
                        modules: true //css模块化
                    }
                }, {
                    loader: "postcss-loader" //第二个模块
                }]
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin("版权所有"), //webpack自带插件，生成版权信息，用webpack调用
        new HtmlWebpackPlugin({ //打包时生成额外html文件的插件，可以加载一个模版
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.IccurrenceOrderPlugin(), //webpack自带插件，为模块标上序号
        new webpack.optimize.UglifyJsPlugin(), //webpack自带插件，js代码压缩
        new ExtractTextPlugin("style.css") //生成额外css文件的名称和路径
    ]
}
```

<!--more-->

##相关概念

### devserver 构建本地服务器

**contenBase** 为根文件夹提供本地服务器
**port** 设置端口，默认为8080
**inline** 为``true``的时候，源文件发生改变的时候自动刷新页面
**historyApiFallback** 为``true``的时候，所有跳转指向index.html，即防跳转

### loader 调用外部的脚本或工具

**test** 处理文件名的正则表达式
**loader** loader的名称
**include/exclude** 手动添加/移除要处理的文件
**query** 提供额外的设置选项

常用loader有

**Babel** 编译ES6、ES7和基于Javascript进行拓展的语言，如JSX、TS，可写在``.babelrc``文件中
**style-loader** 将计算后的样式加入页面中
**css-loader** 使用类似``@import``、``url()``方法实现``require()``

### Plugins 拓展webpack功能，在整个过程中生效

常用plugin有

**html-Webpack-plugin** 依据一个简单的index.html模版生成一个自动引用打包后的JS文件的新index.html
**hot-module-replacement** 热重载插件
**extract-text-webpack-plugin** 分离css和js文件
**webpack.UgkufyJsPlugin** 压缩JS代码
**webpack.OccurenceOrderPlugin** 为组件分配ID





