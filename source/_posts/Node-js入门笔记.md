---
title: Node.js入门笔记
date: 2017-10-25 15:39:06
tags:
    - Node.js
    - JavaScript
---

## 第一个Node.js应用

1. 引入require模块

```
var http = require("http");
```

2. 创建服务器

使用的是``http.createServer()``方法,并使用``listen``方法绑定8888端口

3. 接收请求和响应请求

函数通过``request`` ``response``参数来接收和响应数据

## 阻塞/非阻塞代码实例

阻塞代码实例：
```
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
```

非阻塞代码实例：
```
var fs = require("fs");
fss.readFile('input.txt', function(){
    if (err, data) {
        return console.error(err);
    }
    console.log(data.toString);
});
```

## 事件循环

类似于观察者模式

1. 引入events模块，创建eventEmitter对象

```
var events = require('events');
var eventEmitter = new events.EventEmitter();
```

2. 绑定事件及事件处理程序

```
eventEmitter.on('eventName', eventHandler);
```

3. 触发事件

```
eventEmitter.emit('eventName');
```
