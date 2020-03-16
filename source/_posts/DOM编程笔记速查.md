---
title: DOM编程笔记速查
date: 2017-11-28 14:55:23
tags:
    - DOM
    - JavaScript
categories:
    - 前端
---

# 查找元素

```
getElementById()
getElementByTagName()
getElementByClassName() // 较新的浏览器才支持
```

# 属性操作

```
getAttribute() // 获取属性
setAttribute() // 修改属性
nodeValue // 节点所包含的文本，但要以这种方式获取：description.childNodes[0].nodeValue
```

# 修改元素 （传统，非DOM）

```
document.write(/* 写在HTML中 */)
innerHTML // 只适用于HTML，XML会忽略这个方法。适合插入一大段的带标签的HTML
```

# 修改元素 （DOM方法）

```
createElement() // 创建节点，但未连接到节点数上
appendChild() // 增加节点，但节点是空白的
createTextNode // 创建文本节点

//用法

var child = document.createElement("p");
child.createTextNode("hello world!");
document.getElementById("test").appendChild(child);
```


