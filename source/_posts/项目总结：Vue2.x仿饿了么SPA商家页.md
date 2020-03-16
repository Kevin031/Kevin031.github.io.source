---
title: 项目总结：Vue2.x仿饿了么SPA商家页
date: 2017-09-24 13:36:45
tags:
    - 饿了么.vue
    - Vue.js 
    - JavaScript
categories:
    - 前端
---

# 前言

最近学了一个多月Vue，可以独立写一些实例页面了，决定仿一个大一点的项目，为下一步自己开发项目做准备，综合考虑还是选择了网上比较火的饿了么，有些地方也做了技术改良。在这里对里面的技术进行一个简单的总结。

### 技术栈：

``vue2   vue-router2   vue-cli2   vuex   axios   vue-resource   less   flex布局   es6   webpack``

### 用到的库

``better-scroll``

### 实现功能

· 页面按压（鼠标点按）滑动实现上下滚动的效果，采用了移动端的交互逻辑
· 商品页、评论页和商家页分别采用不同的路由模块，点击tab区实现跳转
· 商品页左侧Menu导航条样式指向对应板块，点击滚动到相应位置
· 评论内容可以筛选查看
· 购物车组件包含了展示商品，添加及删除商品，计算总价，非父子组件通信等功能
· 商家实景页面可以左右滑动

项目地址：![https://github.com/Kevin031/VueDemo-Eleme](https://github.com/Kevin031/VueDemo-Eleme)
Demo： ![http://liub.site/VueDemo-Eleme-Production/index.html](http://liub.site/VueDemo-Eleme-Production/index.html)
*如果觉得对您有帮助，您可以给我个star支持一下，谢谢~*

<!--more-->

### 遇到的问题

1. seller页面的better-scroll不生效

问题分析：better-scroll插件是严格基于DOM的，数据是采用异步传输的，页面刚打开，DOM并没有被渲染，所以，要确保DOM被渲染了，才能试用better-scroll

解决方案：用到mounted钩子函数，搭配this.$nextTick()

ps:mounted的作用是将编译好的html挂载到页面完成后执行的钩子函数，此时可以进行发送ajax请求获取数据的操作，进行数据初始化。mounted在整个实例生命周期内只执行一次

2. goods,ratings,seller组件之间切换时会重新渲染

解决方案：在app.vue内使用keep-alive，保留各组件状态，避免重新渲染

```
<keep-alive>
    <router-view :seller="seller"></router-view>
</keep-alive>
```

3. border-1px的实现

当样式像素一定时,因手机有320px,640px等.各自的缩放比差异,所以设备显示像素就会有1Npx，2Npx.为保设计稿还原度,解决就是用media + scale

公式：``设备上像素 = 样式像素 * 设备像素比``

屏幕宽度： 320px 480px 640px
设备像素比： 1    1.5    2

通过查询它的设备像素比``devicePixelRatio``

在设备像素比为1.5倍时, ``round(1px 1.5 / 0.7) = 1px`` 
在设备像素比为2倍时, ``round(1px 2 / 0.5) = 1px``

所以less代码如下

```
.border-1px (@color) {
    position: relative;
    &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid @color;
        content: '';
    }
}

@media(-webkit-min-devcie-pixel-ratio:1.5),(min-device-pixel-ratio:1.5) {
    .border-1px {
        &:after {
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }
    }
}

@media(-webkit-min-devcie-pixel-ratio:2),(min-device-pixel-ratio:2) {
    .border-1px {
        &:after {
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
    }
}
```

4. 一侧定宽，一侧自适应的双栏布局

```
//左侧固定width: 80px, 右侧自适应
parent: {
    display: flex;
}
child-left: {
    flex: 0 0 80px; //放大比例为0 空间不足时也不缩小 占据80px的固定宽度
}
child-right: {
    flex: 1; //占据剩余空间
}
```

关于flex布局，具体可以看我的另一篇笔记 ![运用flex布局技巧](http://liub.site/2017/09/22/%E8%BF%90%E7%94%A8flex%E5%B8%83%E5%B1%80%E6%8A%80%E5%B7%A7/)

5. 背景模糊效果

``filter: blur(10px);``

注意，在内的子元素包括文字也会被模糊，所以需要设置单独一个层

6. transition过渡动画

``<transition>``是Vue提供的标签，vue2.x定义了transition的过渡状态``name-string``用于自动生成css过渡类名

例如``fade``将自动扩展为``.fade-enter .fade-enter-active``等，默认类名为"v"

```
fade-enter
fade-enter-active
fade-leave
fade-leave-active
```

包含transition过渡的钩子函数

```
before-enter
before-leave
before-appear
enter
leave
appear
after-enter
after-leave
after-appear
enter-cancelled
leave-cancelled (v-show only)
appear-cancelled
```

# 项目结构分析

## 整体结构

```
VueDemo-Eleme
    ├─dist               //打包输出路径,npm run build后才会产出
        ├─img            //图片存放路径
            ├─..
        ├─static         
            ├─data.json  //数据文件
        ├─build.js
        ├─index.html
        ├─style.css
    =============================
    =============================
    ├─node_modules       //项目依赖
    ├─src                //源码路径
        ├─assets         //静态资源
        ├─common         //通用的font文件和css文件
            ├─base.less
            ├─icon.less
            ├─mixin.less
            ├─index.less //css唯一入口
            ├─sell-icon.eot
            ├─sell-icon.svg
            ├─sell.icon.ttf
            ├─sell.icon.woff                        
        ├─components     //组件路径，以下组件文件夹忽略具体vue文件
            ├─cartcontrol
            ├─goods
            ├─header
            ├─iconMap
            ├─myFood
            ├─ratings
            ├─seller
            ├─shopCart
            ├─star
            ├─App.vue    //根组件
            ├─main.js    //入口文件的js逻辑，打包之后被注入到index.html中
    ├─static
        ├─data.json
    ├─.babelrc                      //babel配置
    ├─.gitignore                    //版本文件
    ├─index.html                    //项目预览入口
    ├─index.tmpl.html               //打包用的index模版
    ├─package.json                  //项目信息
    ├─webpack.config.js             //开发阶段打包文件配置
    ├─webpack.production.config.js  //产品阶段打包文件配置
```

## 组件功能 (忽略CSS)

### App

项目入口，根文件

```
<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import axios from 'axios'

const ERR_OK = 0

export default {
  data () {
    return {
      seller: {},
      title: '123'
    };
  },
  created() {
    axios.get('./static/data.json').then((response) => {
      this.seller = response.data.seller;
    });
  },
  components: {
    'v-header': header
  }
}
</script>
```

### cartcontrol

实现添加、删除商品功能

```
<template lang="html">
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" v-on:click.stop.prevent="decreaseCart($event)">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" v-on:click.stop.prevent="addCart($event)">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'

export default {
    props: {
        food: Object
    },
    methods: {
        addCart (event) {
            if (!event._constructed) {   //阻止非Vue事件
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 0);
            }
            this.food.count++;
            // console.log(this.$root.eventHub);
            this.$root.eventHub.$emit('cart.add', event.target); //触发小球动画
        },
        decreaseCart () {
            if (!event._constructed) {   //阻止非Vue事件
                return;
            }
            this.food.count--;
        }
    }
}

</script>
```

### goods

实现商品界面的显示，和左侧导航功能

```
<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" v-on:click="menuClick(index,$event)" v-bind:class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
                    <span class="text">
                        <iconMap v-show="item.type>0" v-bind:iconType="item.type"></iconMap>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" id="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1>{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" v-on:click="foodDetail(food)">
                            <div class="icon">
                                <img  width="57" height="57" v-bind:src="food.icon"/>
                            </div>
                            <div class="content">
                                <h2>{{food.name}}</h2>
                                <p class="description">{{food.description}}</p>
                                <div class="sell-info">
                                    <span class="sellCount">{{'月售'+ food.sellCount +'份'}}</span>
                                    <span class="rating">{{'好评率'+ food.rating +'%'}}</span>
                                </div>
                                <div class="price">
                                    <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                                    <span v-if="food.oldPrice" class="oldPrice">{{'￥' + food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol v-bind:food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopCart v-bind:selectedFoods="selectedFoods" v-bind:minPrice="seller.minPrice" v-bind:deliveryPrice="seller.deliveryPrice"></shopCart>
        <myFood v-if="showMyFood" v-bind:food="selectedFood" rel="myFood"></myFood>
        <transition name="fade-backdrop">
            <div class="backdrop" v-show="showBackdrop" v-on:click="hideBackdrop"></div>
        </transition>
    </div>
</template>

<script>

import axios from 'axios'
import iconMap from '../iconMap/iconMap.vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import shopCart from '../shopCart/shopCart.vue'
import myFood from '../myFood/myFood.vue'
import Vue from 'vue'
import BScroll from 'better-scroll'

const ERR_OK = 0
const eventHub = new Vue()

export default {
    props: {
        seller: Object
    },
    data () {
        return {
            goods: [],
            listHeight: [],
            foodsScrollY: 0,
            selectedFood: '',
            showMyFood: false
        }
    },
    created () {
        axios.get('./static/data.json').then((response) => {
            this.goods = response.data.goods;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            })
        });
        this.$root.eventHub.$on('detail.hide', this.hideBackdrop);
    },
    computed: {
        menuCurrentIndex () {
            for (let i = 0, l = this.listHeight.length; i < l; i++) {
                let topHeight = this.listHeight[i];
                let bottomHeight = this.listHeight[i + 1];
                if(!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
                    return i;
                }
            }
            return 0;
        },
        selectedFoods () {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        },
        showBackdrop () {
            if (this.showMyFood) {
                return true;
            }
            this.showMyFood = false;
            return false;
        }
    },
    methods: {
        _initScroll () {
            this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click:true,
                probeType: 3
                //1：滚动的时候会派发scroll事件，会截流。2：滚动的时候实时派发scroll事件，不会截流。 3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
            });
            //监听滚动事件
            this.foodsScroll.on('scroll', (pos) => {
                this.foodsScrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight () {
            let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let i = 0, l = foodList.length; i < l; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        menuClick (index, event) {
            if (!event._constructed) {
                return;
            }
            this.foodsScroll.scrollTo(0, -this.listHeight[index], 300);
        },
        foodDetail (food) {
            this.selectedFood = food;
            this.$nextTick(() => {
                this.showMyFood = true;
            });
        },
        hideBackdrop () {
            this.showMyFood = false;
        }
    },
    components: {
        iconMap,
        cartcontrol,
        shopCart,
        myFood
    }
}

</script>
```

### header

实现头部的商家信息样式和查看信息的功能

```
<template lang="html">
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img v-bind:src="seller.avatar" width="64" height="64" />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}
                </div>
                <div class="supports" v-if="seller.supports">
                    <div class="supports_desc">
                        <span class="icon" v-bind:class="iconClassMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
            </div>
            <div class="support-count" v-on:click="showDetails()">
                <span class="count">5个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" v-on:click="showDetails()">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <transition name="fade">
            <div v-if="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star v-bind:size="48" v-bind:score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" v-for="item in seller.supports">
                                <span class="icon" v-bind:class="iconClassMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" v-on:click="hideDetails()">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
        <div class="background">
            <img v-bind:src="seller.avatar" width="100%" height="100%" />
        </div>
    </div>
</template>

<script>
    
    import star from '../star/star.vue'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            this.iconClassMap = ['decrease','discount','special','invoice','guarantee'];
        },
        components: {
            star
        },
        data () {
            return {
                detailShow: false
            }
        },
        methods: {
            showDetails() {
                this.detailShow = true;
            },
            hideDetails() {
                this.detailShow = false;
            }
        }
    }

</script>
```

### iconMap 

活动图标组件

```
<template lang="html">
  <span class="iconMap" v-bind:class="iconClassMap[iconType]"></span>
</template>

<script>

export default {
    props: {
        iconType: Number
    },
    created () {
        this.iconClassMap = ['decrease','discount','special','invoice','guarantee']
    }
}

</script>
```

### myFood

点击食物时的详情页

```
<template lang="html">
    <div>
        <transition name="myFood">
            <div class="my-food">
                <img height="350" width="100%" v-bind:src="food.image">
                <div class="title">
                    {{food.name}}
                </div>
                <div class="info">
                    {{'月售'+food.sellCount+'份&nbsp;&nbsp;好评率'+food.rating+'%'}}
                </div>
                <div class="price">
                    {{'￥'+food.price}}
                </div>
                <div class="add" v-on:click="foodAddCart($event)">
                    <span>加入购物车</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            food: Object
        },
        methods: {
            foodAddCart (event) {
                this.$root.eventHub.$emit('detail.hide', event.target);
                this.$set(this.food, 'count', 1);
                this.$root.eventHub.$emit('cart.add', event.target);
            }
        }
    }
</script>
```

### ratings

评论页，还有选择查看对应评论的功能

```
<template lang="html">
    <div class="ratingsWrapper" ref="ratingsWrapper">
        <div class="ratings-content">
            <div class="info">
                <div class="mark">
                    <div class="num">
                        {{seller.score}}
                    </div>
                    <div class="text">综合评分</div>
                    <div class="contrast">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="stars">
                    <div class="stars">
                        <div class="serviceScore">
                            <span class="text">服务态度</span>
                            <star v-bind:size="36" v-bind:score="seller.serviceScore"></star>
                            <span class="num">{{seller.serviceScore}}</span>
                        </div>
                        <div class="foodScore">
                            <span class="text">服务态度</span>
                            <star v-bind:size="36" v-bind:score="seller.foodScore"></star>
                            <span class="num">{{seller.foodScore}}</span>
                        </div>
                        <div class="deliveryTime">
                            <span class="text">送达时间</span>
                            <span class="time">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="evaluation">
                <div class="classify">
                    <span v-for="(item, index) in classifyArr" v-bind:class="{'active':item.active, 'bad':index==2, 'badActive':item.active&&index==2}" class="item" v-on:click="filterEvel(item)">{{item.name}} <span class="count">{{item.count}}</span></span>
                </div>
                <div class="switch" v-on:click="evelflag=!evelflag">
                    <span class="icon-check_circle" v-bind:class="{'on':evelflag}"></span>
                    <span class="text">只看有内容的评价</span>
                </div>
                <div class="evel-list">
                    <ul>
                        <li class="evel" v-for="evel in evelArr">
                            <div class="avatar">
                                <img v-bind:src="evel.avatar" width="28" height="28" />
                            </div>
                            <div class="content">
                                <div class="user">
                                    <span class="name">{{evel.username}}</span>
                                    <span class="rateTime">{{evel.rateTime | time}}</span>
                                </div>
                                <div class="star-wrapper">
                                    <star v-bind:size="24" v-bind:score="evel.score"></star>
                                    <span class="deliveryTime" v-show="evel.deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                                </div>
                                <div class="text">
                                    {{evel.text}}
                                </div>
                                <div class="recommend">
                                    <span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
                                    <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import star from '../star/star.vue'
import axios from 'axios'
import BScroll from 'better-scroll'

export default {
    components: {
        star
    },
    data () {
        return {
            ratings: [],
            seller: {},
            classifyArr: [{
                name: '全部',
                count: 0,
                active: true
            }, {
                name: '推荐',
                count: 0,
                active: false
            }, {
                name: '吐槽',
                count: 0,
                active: false
            }],
            evelflag: true
        }
    },
    created () {
        this._initRatings()
    },
    computed: {
        evelArr () {
            let selectIndex = 0;
            this.classifyArr.forEach((data, index) => {
                if (data.active) {
                    selectIndex = index;
                }
            })
            if (this.scroll) {
                this.$nextTick(() => {
                    this.scroll.refresh;
                })
            }
            return selectIndex ? this.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex - 1 && data.text : data.rateType === selectIndex - 1) :this.ratings.filter((data) => this.evelflag ? data.text : true); //*
        }
    },
    methods: {
        _initRatings () {
            axios.get('./static/data.json').then((res) => {
                this.ratings = res.data.ratings;
                this.seller = res.data.seller;
                this._initClassifyArr();
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            });
        },
        _initClassifyArr () {
            this.classifyArr.forEach((data,index) => {
                if (index) {
                    data.count = this.ratings.filter((temp) => temp.rateType === index - 1).length;
                } else {
                    data.count = this.ratings.length;
                }
            });
        },
        filterEvel (item) {
            this.classifyArr.forEach((data) => {
                data.active = false;
            });
            item.active = true;
        }
    },
    filters: {
        time: function (value) {
            let year = (new Date(value)).toLocaleDateString();
            let month = year.match(/\d{4}\/{1}(\d+)/)[1];
            if (month.length === 1) {
                year = year.replace(/\//,"/0");
            }
            let time = year + " " + (new Date(value)).getHours() + ":" + (new Date(value)).getMinutes();
            time = time.replace(/\//g, "-");
            return time;
        }
    } 
}

</script>
```

### seller

商家信息页

```
<template lang="html">
    <div class="seller-wrapper" ref="sellerWrapper">
        <div class="seller-content">
            <div class="info">
                <div class="title">
                    <div class="text">{{seller.name}}</div>
                    <div class="star-wrapper">
                    <star v-bind:size="36" v-bind:score="seller.score"></star>
                        <span class="rate-count">{{seller.ratingCount}}</span>
                        <span class="sell-count">月售{{seller.sellCount}}单</span>
                    </div>
                    <div class="collect" v-on:click="collectflag=!collectflag">
                        <span class="icon-favorite" v-bind:class="{'active':collectflag}"></span>
                        <span class="text">{{collectflag?'已收藏':'收藏'}}</span>
                    </div>
                </div>
                <div class="remark">
                    <div class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="num">{{seller.minPrice}}</span>元
                        </div>
                    </div>
                    <div class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="num">{{seller.deliveryPrice}}</span>元
                        </div>
                    </div>
                    <div class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="num">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="activities">
                <div class="bulletin">
                    <h1>公告与活动</h1>
                    <div class="content">{{seller.bulletin}}</div>
                </div>
            </div>
            <div class="supports">
                <ul>
                    <li class="item" v-for="item in seller.supports">
                        <iconMap v-bind:iconType="item.type"></iconMap>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="divider"></div>
            <div class="seller-imgs">
                <h1>商家实景</h1>
                <div class="img-wrapper" ref="picsWrapper">
                    <div class="picList" ref="picList">
                        <img v-for="pic in seller.pics" v-bind:src="pic" width="120" height="90">
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="seller-info">
                <h1>商家信息</h1>
                <ul class="info-list">
                    <li class="info" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import BScroll from 'better-scroll'
import star from '../star/star.vue'
import iconMap from '../iconMap/iconMap.vue'

export default {
    components: {
        star: star,
        iconMap: iconMap
    },
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            collectflag: false
        }
    },
    mounted () {
        this.$nextTick(() => {
            this._initSellerScroll();
            this._initPicScroll();
        })
    },
    methods: {
        _initSellerScroll () {
            if (!this.sellerScroll) {
                this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
                    click: true
                });
            } else {
                this.sellerScroll.refresh();
            }
        },
        _initPicScroll () {
            if (this.seller.pics) {
                let picW = 120;
                let margin = 6;
                let w = (picW + margin) * this.seller.pics.length - margin;
                this.$refs.picList.style.width = w + "px";
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picsWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical',
                            click: true
                        })
                    } else {
                        this.picScroll.refresh();
                    }
                });
            }
        }
    }
}
```

### shopCart

底部购物车样式组件

```
<template lang="html">
    <div class="shopCart">
        <div class="content">
            <div class="content-left" v-on:click="listToggle">
                <div class="logo-wrapper" ref="carIcon">
                    <div class="badge" v-show="totalCount">
                        {{totalCount}}
                    </div>
                    <div class="logo" v-bind:class="{'active':totalPrice}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price" v-bind:class="{'active':totalPrice}">
                    ￥{{totalPrice}}
                </div>
                <div class="desc">
                    另需要配送费￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right" v-bind:class="{'enough':totalPrice >= minPrice}">
                {{payDesc}}
            </div>
        </div>
        <div class="ball-container">
            <div v-for="ball in balls">
                <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="transHeight">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" v-on:click="setEmpty()">清空</span>
                </div>
                <div class="list-content" ref="foodlist">
                    <ul>
                        <li class="food" v-for="food in selectedFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price * food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="fade-backdrop">
            <div class="backdrop" v-show="showBackdrop" v-on:click="hideBackdrop"></div>
        </transition>
    </div>
</template>

<script>

import cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'

export default {
    props: {
        selectedFoods: {
            type: Array,
            default: []
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            listShow: false, //购物车折叠状态
            dropBalls: [], //下落的小球
        }
    },
    created () {
        this.$root.eventHub.$on('cart.add', this.drop); //接收小球动画
        this.$root.eventHub.$on('cart.add', this.cartAnimation);
    },
    computed: {
        totalPrice () {
            let total = 0;
            this.selectedFoods.forEach((food) => {
                if (food.count) {
                    total += food.price * food.count;
                }
            });
            return total;
        },
        totalCount () {
            let count = 0;
            this.selectedFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc () {
            let diff = this.minPrice - this.totalPrice;
            if (!this.totalPrice) {
                return `￥${this.minPrice} 起送`;
            } else if (diff > 0) {
                return `还差￥${diff}元`;
            } else {
                return '去结算';
            }
        },
        showBackdrop () {
            if (this.listShow && this.totalPrice) {
                return true;
            }
            this.listShow = false;
            return false;
        }
    },
    methods: {
        cartAnimation () {
            setTimeout (() => {
                this.$refs.carIcon.classList.add('tantantan');
                setTimeout (() => {
                    this.$refs.carIcon.classList.remove('tantantan');
                }, 800);
            }, 400);
        },
        _initScroll () {
            this.foodlistScroll = new BScroll(this.$refs.foodlist, {
                click: true
            });
        },
        hideBackdrop () {
            this.listShow = false;
        },
        listToggle () {
            if (!this.selectedFoods.length) {
                return;
            }
            this.listShow = !this.listShow;
            this.$nextTick(() => {
                if (!this.foodlistScroll) {
                    this._initScroll();
                } else {
                    this.foodlistScroll.refresh();
                }
            });
        },
        drop (ele) {
            //console.log(ele); //获取点击的那个添加按钮
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true; //表示可以有下落动画
                    ball.el = ele;
                    this.dropBalls.push(ball);
                    return; //跳出循环
                }
            }
        },
        beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);
                el.style.display = '';
                el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                el.style.transform = `translate3d(0,${y}px,0)`;
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el, done) {
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        setEmpty () {
            this.selectedFoods.forEach((food) => {
                food.count = 0;
            });
        }
    },
    components: {
        cartcontrol
    }
}

</script>
```

### star 

评分的星星组件

```
<template>
  <div id="star" v-bind:class="starType">
    <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item"></span>
  </div>
</template>

<script>

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType () {
            return 'star-' + this.size;
        },
        itemClasses () {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF); 
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}

</script>
```

## 产品阶段打包配置

新建了一个``webpack.production.config.js``文件来进行产品阶段的打包配置

然后在``package.json``的``scripts``字段设置

```
"scripts": {
    ...
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.production.config.js --progress --hide-modules"
}
```

``webpack.production.config.js``的配置如下

输出文件：
```
output: {
    path: path.resolve(__dirname, './dist'), //path = require('path')
    filename: 'build.js'
}
```

各模块打包：
```
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            less:ExtractTextPlugin.extract({ //提取vue文件中的css编码
                use: ["css-loader", "less-loader"],
                fallback: "vue-style-loader"
            })
        }
    }
},
{
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader?limit=8192&name=img/[hash:8].[name].[ext]' //定义了文件大小最大为8192kb，过大的图片以base64编码表示
},
{
    test: /\.less$/,
    use: ExtractTextPlugin.extract({ //提取less编码，关于ExtractTextPlugin这里的写法有些版本是不一样的，具体参考当前版本
        fallback: "style-loader",
        use: ["less-loader", "css-loader"]
    })
},
{
    text: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: "url-loader",
    options: {
        name: '[name].[ext]?[hash]'
    }
}
```

插件配置

引用以下插件,需要另行安装

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```

```
plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + "/index.tmpl.html"
    }),
    new ExtractTextPlugin({
        filename: "style.css",
        allChunks: true
    })
]
```




