---
title: ES6新增Promise对象速查文档
date: 2017-11-28 15:07:37
tags:
    - JavaScript
    - ES6
    - Promise
categories:
    - 前端
---

Promise是ES6中引入的对象，它解决了回调的以下痛点

1.回调过早

Promise自动解决，被then调用

2.次数过多

Promise内部机制决定了回调为**单向不可逆**

3.报错被吞掉

Promise状态被拒绝时``reject(error)``能接收

4.回调没有被调用

用race方法能解决

<!--more-->

# Promise的本质

```
new Promise(function(){
    /*异步操作*/
})
```

这是一个可以包含异步操作的对象

# Primise的状态

``Fulfilled``：成功
``Rejected``：拒绝
``Pending``：进行中

# 状态的变化

每一个操作都有resolve和reject两种反应，导致不同的结果

1.resolve -> pending => Fulfilled
2.reject -> Pending => Rejected

```
var promise = new Promise(function(resolve, reject){
    if(/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
})
```

# 进程

```
Promise.then(function(value){
    // 成功，对应Resolve
}, function(error){
    // 失败，对应Reject
})
```

# 链式

Promise.then(
    // 第一个异步操作
).then(
    // 第二个异步操作，接收上一个操作的返回值
).then(
    // 第三个异步操作，接收上一个操作的返回值
)

# 门

```
Promise.all([promise1, promise2]).then(...);
```

# 竞态

```
Promise.race([p1, p2, p3]);
```

