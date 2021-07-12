---
title: 从零开始实现React基本功能
date: 2020-04-13 23:21:06
tags:
---

最近做了一段时间前后端不分离的项目，真是身心疲惫，想念前端工程化的日子，决定在业余时间动手实现``React``，顺便巩固一下基础知识。

作为现代前端三大``MVVM``框架之一，``React``经常被拿来和``Vue``比较，我个人认为它有以下优势：

1. 面向对象的思想，更贴近原生JS（ES6）的API调用方式

因为写法完全基于JS，一方面对JS的深入学习会更有帮助，另外语法高亮的支持也更友好一些，与``Vue``脚手架相比，``Vue``语法更模糊一些，如this的指向，数据绑定，需要一定的学习成本。

2. 社区生态更活跃

到npm搜``React``相关的库会比``Vue``多一些

3. 单向数据流，更好地理清数据流向相关的逻辑，有利于debug

相比于``Vue``，由于``v-model``封装了双向数据流，因此出现bug的时候调试起来会复杂很多

当然React跟Vue相比也有一个缺点，就是要借助JSX才有比较好的开发体验，这需要借助babel对JS进行编译，这意味着它更适合基于``webpack``的前端工程化项目，在一些前后端不分离的项目中， 就没有办法引入React，就算可以，也麻烦很多，而``Vue``直接对html设定一套编译规则，对已渲染的元素进行依赖收集，所以能很轻松地引入到任何项目中。

### 准备工作

```
// 安装webpack
yarn add webpack webpack-cli webpack-dev-server --dev

// 安装babel
yarn add babel-core babel-loader@^7.0 babel-preset-es2015 babel-preset-stage-0 html-webpack-plugin
```

.babelrc文件

```
```

