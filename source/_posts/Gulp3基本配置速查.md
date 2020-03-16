---
title: Gulp3基本配置速查
date: 2017-11-28 15:25:35
tags:
    - 自动化打包工具
    - glup
categories: 
    - 前端
---

## glup安装

全局：``npm install gulp -g``
开发环境：``npm install gulp --save-dev``

这里最好都装一下

## 项目结构

假设有这么一个项目结构

```
-test
    -dist // 打包目录
        -css
        -js
    -src // 开发目录
        -css
            -test1.css
            -test2.css
        -js
            -test1.js
            -test2.js
        -less
            -test3.less
    gulpfile.js // 配置文件
    index.html // 项目入口
    package.json // 配置信息  
```

首先在package.json文件中添加项目信息

```
{
    "name": "gulp_test",
    "version": "1.0.0"
}
```

而js、css和less中均有和页面相关的代码

## 引入模块和插件

gulp有以下几个比较常用的插件

``gulp-concat`` : 合并文件(js/css)
``gulp-uglify`` : 压缩js文件
``gulp-rename`` : 文件重命名
``gulp-less`` : 编译less
``gulp-clean-css`` : 压缩css
``gulp-livereload`` : 实时自动编译刷新

并提供了以下Api

``gulp.src(filePath/pathArr)``：指向指定路径的所有文件，返回文件流对象，用于读取文件
``gulp.dest(dirPath/pathArr)``：指向指定的所有文件夹，用于向文件夹中输出文件
``gulp.task(name, [deps], fn)``：定义一个任务
``gulp.watch()``：监听文件的变化

所以我们首先要在gulpfile.js中引入gulp模块

```
// gulpfile.js

var gulp = require('gulp');
```

## 打包js

```
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minifyjs', function(){
    //任务代码放在这里
    return gulp.src('src/js/*.js')
        .pipe(concat(built.js)) // 合并到临时文件夹
        .pipe(gulp.dest('dist/js')) // 生成到目标文件夹
        .pipe(rename({suffix: '.min'})) // 重命名
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/js'));
});

//最后记得异步执行

gulp.task('default', ['minifyjs']);

```

在终端输入 ``$gulp`` 打包结束后，将会在dist目录下生成两个文件

```
-dist
    -css
    -js
        -built.js
        -built.min.js
```

## 打包CSS/LESS

```
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

// less处理任务
gulp.task('lessTask', function(){
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

// 依赖lessTask的css处理任务
gulp.task('cssTask', ['lessTask'], function(){
    return gulp.src('src/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['minifyjs', 'cssTask']);
```

## 打包HTML

```
gulp.task('htmlMinify', function(){
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);
```

## 监听与热加载

```
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

// 自动编译(暂时还没搞清楚有什么卵用，可能和热加载配合使用)
gulp.task('watch', ['default'], function(){
    livereload.listen();
    // 监视指定的文件，并指定对应的处理任务
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask', 'lessTask']);
});

// 热加载
connect.server({
    root: 'dist/', //监视的源目标文件路径
    livereload: true, //是否实时刷新
    port: 5000 //端口号
});
```

## 完整代码

```
// 引入glup模块
var gulp = require('gulp');

// 引入插件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

var htmlmin = require('gulp-htmlmin');

var livereload = require('gulp-livereload');

var connect = require('gulp-connect');

/*
* gulp-concat : 合并文件(js/css)
* gulp-uglify : 压缩js文件
* gulp-rename : 文件重命名
* gulp-less : 编译less
* gulp-clean-css : 压缩css
* gulp-livereload : 实时自动编译刷新
*
* gulp.src(filePath/pathArr)：指向指定路径的所有文件, 返回文件流对象，用于读取文件
* gulp.dest(dirPath/pathArr)：指向指定的所有文件夹，用于向文件夹中输出文件
* gulp.task(name, [deps], fn)：定义一个任务
* gulp.watch()：监视文件的变化
*/

// js处理任务
gulp.task('minifyjs', function(){
    // 任务代码放在这里
    return gulp.src('src/js/*.js')
        .pipe(concat('built.js')) //合并到临时文件夹
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// less处理任务
gulp.task('lessTask', function(){
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(livereload());
});

// css处理任务，指定依赖的任务
gulp.task('cssTask', ['lessTask'], function(){
    return gulp.src('src/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// html压缩任务
gulp.task('htmlMinify', function(){
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// 自动编译(暂时还没搞清楚有什么卵用，可能和热加载配合使用)
gulp.task('watch', ['default'], function(){
    livereload.listen();
    // 监视指定的文件，并指定对应的处理任务
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask', 'lessTask']);
});

// 热加载
connect.server({
    root: 'dist/', //监视的源目标文件路径
    livereload: true, //是否实时刷新
    port: 5000 //端口号
});

// 异步执行
gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);
```

## 总结

与webpack对比，gulp主要特点在于

1.指明对某些文件、组合按照一定的步骤进行编译
2.引入具体文件的位置，不需要入口文件
3.每一种类型的文件都可定义独立的任务和依赖的任务，最后异步执行，逻辑清晰

## 2017.12.14更新

有一个可以用来处理html的插件 ``cheerio``

它可以这样用

```
gulp.task('htmlTask', function(){
    return gulp.src('src/index.html')
        .pipe(cheerio(function($){
                $('link').remove();
                $('body').find('script').remove();
                $('head').find('script').attr("href", "js/jquery.min.js");
                $('body').append('<script src="js/main.min.js"></script>');
                $('head').append('<link rel="stylesheet" href="css/style.css">');
            }))
        .pipe(gulp.dest('dist/'));
});
```

但是坑爹的是这个插件处理过后中文全部会转换成实体编码字符，阅读官方文档后发现原来还需要改成以下的形式

```
gulp.task('htmlTask', function(){
    return gulp.src('src/index.html')
        .pipe(cheerio({
            run: function($){
                $('link').remove();
                $('body').find('script').remove();
                $('head').find('script').attr("href", "js/jquery.min.js");
                $('body').append('<script src="js/main.min.js"></script>');
                $('head').append('<link rel="stylesheet" href="css/style.css">');
            },
            parserOptions: {
                decodeEntities: false
            }
        }))
        .pipe(gulp.dest('dist/'));
});
```

实际上遇到问题先去官方文档找方法，比用搜索引擎来得要方便有效，也不易被人误导走了弯路

