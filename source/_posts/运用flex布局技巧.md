---
title: 运用flex布局技巧
date: 2017-09-22 10:38:16
tags:
    - CSS
    - flex
categories: 
    - 前端
---

2009年，W3C提出了flex布局，特点有

· 简便
· 完整
· 响应式

兼容性如下：

![](http://upload-images.jianshu.io/upload_images/5503852-4ab96a2358312df8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不过这意味着大部分IE浏览器（IE11以下）都不能兼容了

# 介绍

Flex(Flexible Box),意思为"弹性布局"
任何一容器都可以指定为Flex布局,甚至行内元素也可以

```
.box {
    display: flex;
}
.box {
    display: inline-flex;
}
/*webkit内核*/
.box {
    display: -webkit-flex;   /*Safari*/
    display: flex;
}
```

但是由于支持的情况各不相同，我们还是需要对属性做兼容性处理如加上-webkit-前缀等。

失效特性

· float
· clear
· vertical-align

<!--more-->

***

# 理解

容器采用flex布局后，就被成为flex容器（flex container），它的所有子元素就成为容器成员，被称为flex项目（flex item），对flex布局直观的理解如下：

![](http://upload-images.jianshu.io/upload_images/5503852-10aea32297be2d8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

容器默认存在两根轴： 水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end，交叉轴同理。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

# flex属性
``flex-direction``
``flex-wrap``
``flex-flow``
``justify-content``
``align-items``
``align-content``

## 容器属性

### flex-direction
用于改变flex容器的轴线,默认值为row

``row``(default)
``row-reverse``(就和后缀一样,为main axies反向排列)
``column``(改变轴线为cross axies,为cross axies方向排列)
``column-reverse``(同理改变轴线,cross axies方向反向排列)

```
.box {
    flex-direction:  column-reverse | column | row | row-reverse;
}
```

![](http://upload-images.jianshu.io/upload_images/5503852-e8e9ea39bb273412.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### justify-content
用于定义flex容器中flex item在主轴上的对齐方式

``flex-start``(default,从axies start开始紧靠排列)
``flex-end``(axies end端紧靠排列)
``center``(展现如其名,axies中间)
``space-between``(相当于将空间等分,每份空间中flex-start排列)
``space-around``(空间等分,每份空间中center排列)

### align-items
定义flex items在交叉轴上如何对齐

``flex-start``(default)
``flex-end``
``center``
以上三种也就不赘述啦
``stretch``(如同属性名一样,将元素在轴向上伸展开来,注意在固定了height的情况下不会拉伸)
``baseline``(定位线为item中第一行文字的底部线,根据该线进行定位,也就是基线对齐,取距离start最长的基线对齐)

其中基线定义会根据情况不同而变化,通常情况下为第一项的底线(文字底部/图片底部),无内容的``flex item``为``flex item``底部``border``线.

### flex-wrap
直到现在为止,每个Flex 容器只有一条Flex Line,使用flex-wrap,我们能创建一个拥有多条Flex Line的Flex 容器

``nowrap``(default)不换行

``wrap``换行，第一行在上方

![](http://upload-images.jianshu.io/upload_images/5503852-d4c27422febf7051.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

``wrap-reverse``换行，第一行在下方
设置为wrap时,假如我们一行空间不够,我们的flex item在空间不足时会进行换行.创建新的一行.
设置为wrap-reverse时,在wrap换行效果的同时,将会反向展现

### align-content
定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用

``stretch(default)``
``flex-start``
``flex-end``
``center``
``space-between``
``space-around``

看到他们其实大概就知道是怎么回事啦,这里也就不多说了,其实想象一下就知道了,主要是用于设置行/列位置的属性

![](http://upload-images.jianshu.io/upload_images/5503852-cd56bde0436f2b40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### flex-flow
= ``flex-direction`` + ``flex-wrap``
用于快速设置上述两个属性，默认为``row nowrap``

项目(item)属性
``order``
``flex-grow``
``flex-shrink``
``flex-basis``
``flex``
``align-self``

## 项目属性

以下6个属性设置在项目上
``order``
``flex-grow``
``flex-shrink``
``flex-basis``
``flex``
``align-self``

### order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
.item {
    order: <integer>;
}
```

### flex-grow属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
.item {
    flex-grow: <number>;/*default 0*/
}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项大一倍。

### flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
.item {
    flex-shrink: <number>;/*default 1*/
}
```

如果所有项目的flex-shrink属性都为1， 当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

![](http://upload-images.jianshu.io/upload_images/5503852-74da9660b084c6b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### flex-basis属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间，它的默认值为auto，即项目的本来大小。

```
.item {
    flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值，比如350px，则项目将占据350px的固定空间。

### flex属性

flex属性是``flex-grow`` ``flex-shrink``和``flex-basis``的简写，默认值为0 1 auto。后两个属性可选。

```
item {
    flex: none | [<'flex-grow'><'flex-shrink'>?|<'flex-basis'>]
}
```

该属性有两个快捷值： auto（1 1 auto）和none（0 0 auto）。
建议优先试用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值

### align-self属性

align-self属性允许单个项目与其他项目不一样的对齐方式，可覆盖align-item属性，默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于srretch。

![](http://upload-images.jianshu.io/upload_images/5503852-3236b91e556d5f61.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

## 运用

布局的传统解决方案，基于盒状模型，依赖 display属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。而Flex布局可以简便、完整、响应式地实现各种页面布局。

![](http://upload-images.jianshu.io/upload_images/5503852-1f95c1508623b331.png?imageMogr2/auto-orient/strip) 