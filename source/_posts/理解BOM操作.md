---
title: 理解BOM操作
date: 2017-11-28 14:29:40
tags:
    - BOM
    - JavaScript
categories:
    - 前端
---

# window对象 - 浏览器的一个实例

特点：
1.浏览器窗口的接口
2.Global对象

在全局作用域上声明的所有变量和函数，都会变成window对象的成员

# 窗口框架

top对象：指向最外层的框架
parent对象：指向当前框架的直接上层框架
self对象：始终指向window

# API

## 位置

``screenLeft`` / ``screenTop``

(移动)``moveTo`` / ``moveBy``

## 大小

### 窗口

``innerWidth`` / ``outerWidth``

### 视口

``clientWidth`` / ``clientHeight``

### 调整

``resizeTo`` / ``resizeBy``

<!--more-->

## 导航和打开

```
var wraxWin = window.open(URL, frameName, "height, top, resizable");
wraxWin.close(); //关闭新打开的窗口
```

## 系统对话框

``alert``：警告
``confirm``：确认或取消
``prompt``：提示和输入

## location对象 - 与当前窗口中加载的文档有关的信息

location既是window的属性，也是document的属性

有以下接口

``hash``
``host``
``hostname``
``href``
``pathname``
``port``
``protocol``
``search``

``assign``：立即打开新URL并生成一条历史记录
``replace``：重定向，禁用“后退”
``reload``：加ture时强制重载

## navigator对象

检测浏览器类型和插件

## screen对象

显示器信息

## history对象

``go()``
``back()``
``forward()``
