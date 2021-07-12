---
title: 容易忽视JavaScript原理「不定期更新」
date: 2020-03-30 22:22:17
tags:
  -- JavaScript
categories:
  -- 前端
---

参考资料：
1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
2. JavaScript高级程序设计

### 1. ``New``操作符到底做了什么

``new``操作符是面向对象编程的基础

```
function Car (make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}

const carA = new Car('Tesla', 'Model X', 2018)

console.log(carA.make) // Tesla
```

MDN上对其的解释为

1. 创建一个空对象``{}``
2. 链接该对象「本质是设置该对象的构造函数」到另一个对象
3. 将步骤``1``新创建的对象作为``this``的上下文
4. 如果该「构造函数」没有返回对象，则返回``this``

挺抽象的，面试经常问到，而我一直记不住这几个步骤，直到发现其实这一过程其实可以手动模拟，实现过程如下

```
function create (Constructor) {
  // step 1
  this.obj = {}
  // step 2
  Object.setPrototypeOf(this.obj, Constructor.prototype)
  // step 3
  var args = Array.prototype.slice.call(arguments, 1)
  this.result = Constructor.apply(obj, args)
  // step 4
  return result instanceof Object ? result : this.obj
}

var carA = create(Car, 'Tesla', 'Model X', 2018)

console.log(create)
// Tesla
```

这样是不是清晰多了。

上文的``Car``就是构造函数，也就是``ES6``对象语法中的``constructor``方法。

需要注意的是第``3``点，改变``obj``的原型指向，涉及到了「原型链」的知识点，一个对象除了本身的属性，还包含了原型的属性和方法，因此``new``操作符做的是让新对象「属性 + 原型」都能从构造函数中获得。

另外很多人容易把第``4``步忘了，这个需要注意一下。

---

### 2. ``bind``方法的实现

``React``开发经常出现的一个问题

```
class Page extends React.Component {
  handler () {
    console.log(this) // window
  }

  render () {
    return <div>
      <button onClick={this.handler}>Click me</button>
    </div>
  }
}
```

显然，调用``handler``方法的时候``this``丢失了，至于它为什么丢失，我猜测是由于这里有个语法糖

对象中的``handler () {}``相当于``handler: function () {}``

``React``可能在绑定事件的过程中把匿名函数``function () {}``绑上去了

``React``官方的建议是在构造函数中绑定一下``this``

```
constructor () {
  this.handler = this.handler.bind(this)
}
```

这就是``bind``的作用，``bind``是``ES5``提出来的，此前有``apply``和``call``方法，这两者用法如下

```
function add (c, d) {
  console.log(this.a + this.b + c + d)
}

add(3, 4) // NaN

var obj = {
  a: 1,
  b: 2
} 
add.call(obj, 3, 4) // 10
add.apply(obj, [3, 4]) // 10
```

而``bind``的用法如下

```
var func = add.bind(obj, 3)

func(4) // 10
```

似乎更简洁一些，显而易见，它构造了一个新的方法，并将``this``的上下文指向传进去的对象，同时设置了默认参数，这个构造出来的方法还可以接收新的参数，一并执行前者的逻辑

为了更好地理解这一过程，我们可以手动实现一下

```
function mybind (obj) {
  // 首先需要明确此方法必须由函数来调用
  if (typeof this !== 'function') {
    throw new TypeError('What is trying to be bound is not callable)
  }
  var _this = this
  // 排除第一个参数，即接收的对象，剩下的是后来传进来的参数，就传到新的方法上
  var args = Array.prototype.slice(arguments, 1)
  var bound = function () {
    // 调用的时候，首先将this指向obj，接着优先用包装函数bind的参数去填充参数列表，然后填充新传入的参数
    return _this.call(obj, Array.prototype.slice.call(args.concat(arguments)))
  }
  return bound
}
```

``bind``除了处理丢失``this``的情况，还常用于函数柯里化，这里顺带一提

```
function add () {
  var sum = 0 // 闭包
  var func = function () {
    var args = Array.prototype.slice.call(arguments)
    sum = args.reduce(function (a, b) {
      console.log(a, b, a + b)
      return a + b
    }, sum)
    if (args.length === 0) {
      return sum
    } else {
      return func
    }
  }
  return func.bind(null, ...arguments)
}

add(1)(2)(3)(4) // 10
add(1, 2)(3)(4) // 10
add(1, 2, 3)(4) // 10
```