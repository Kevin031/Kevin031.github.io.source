---
title: Javascript中的数组方法
date: 2017-10-25 14:50:19
tags:
    - JavaScript
    - 数组
categories:
    - 前端
---

# 数组定义

```
//使用Array
var colors = new Array();
var colors = new Array(20);
var colors = new Array("red", "blue", "green");

//直接赋值
var colors = [];
var names = ["red", "blue", "green"];
```

# 数组操作

```
var color = ["red", "blue", "green"];
color[0]; //第一项
colors[2] = "black"; //修改第三项为"black"
color[3] = "brown"; //新增第四项
```

# 数组方法

## isArray

判断一个变量是否为数组

```
Array.isArray(value); //boolean
```

<!--more-->

## join

为数组元素之间插入分隔符，默认为``,``

```
var color = ["red", "blue", "green"];
alert(colors.join(",")); //red,blue,green
alert(colors.join("||")); //red||blue||green
```

## 栈方法 （后进先出）

### push

接收任意数量参数，逐个添加到数组末尾，并返回数组的长度

### pop

从数组末尾移除最后一项，减少length的值，返回被移除的项

```
var colors = [];
var count = colors.push("red","green");
alert(count); //2

var item = color.pop();
alert(item); //green
```

## 队列方法 （先进先出）

### shift

移除数组的第一个项并返回该项，同时数组长度减1

### unshift

在数组的前端添加任意个项并返回新数组的长度

## 重排序方法

### reverse

重排序 从小到大 → 从大到小

### sort

比较得到的字符串，以确定如何排序

可以和比较函数结合使用，实例如下：

```
function compare (value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value > value2) {
        return 1;
    } else {
        return 0;
    }
}

var values = [0,1,5,10,15];
values.soft(compare);
alert(values); //0,1,5,10,15
```

## 操作方法

### concat

基于当前数组中的所有项创建一个新数组

```
var colors = [1, 2, 3]; //1,2,3
var colors2 = colors.concat(4, [5, 6]); //1,2,3,4,5,6
```

### slice

基于当前数组的一个或多个项创造一个新数组，并不影响原数组

slice(起始位置,结束位置)

### splice

删除：splice(起始位置, 项数)

插入：splice(起始位置, 0, 插入项)

替换：splice(起始位置, 1, 替换项)

## 位置方法

indexOf()
lastIndexOf()

## 迭代方法

### every

对数组每一项运行给定函数，若每一项返回true，则返回true

### filter

对数组每一项运行给定函数，返回由true项组成的数组

### foreach

对数组每一项运行给定函数，没有返回值

### map

对数组每一项运行给定函数,返回每次的调用结果组成的数组

### some

对数组每一项运行给定函数，任意一项返回true，则返回true

## 归并方法

``reduce``和``reduceRight``

迭代所有项，构建一个最终返回值

```
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
});
alert(sum); // 15
```