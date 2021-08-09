---
title: hexo+next搭建个人博客的过程
date: 2017-09-22 13:25:38
tags:
    - hexo
    - 博客
    - 建站
categories:
    - 前端
---
一直想搭一个个人技术以及生活体会的博客，刚接触前端开发的时候一脸懵逼，很多东西都不知道原理，稀里糊涂地跟着教程用hexo搭起来了，还遇到过各种各样的问题。后来经过wordpress、放在服务器上，再用到jekyll放在github上，最后回归hexo，不得不说相比于其他方式而言，hexo真的简单、方便，也纯粹很多，因为我就是想用这个平台分享一些内容而已，并不打算在博客上过多地折腾技术。

本文总结了简书、知乎上的许多教程，最终归纳成一套比较简单的搭建流程，仅供参考。

相信有一定基础的开发者基本上都有自己的github，也会建仓库了，所以在这里不作赘述，关于如何把项目托管到github上，可参考这篇文章：[如何在github上搭建自己写的网页](http://liub.site/2017/05/22/%E5%A6%82%E4%BD%95%E5%9C%A8github%E4%B8%8A%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E5%86%99%E7%9A%84%E7%BD%91%E9%A1%B5/)

所以就从建立一个仓库说起

<!--more-->

***

### 创建仓库

这个仓库是专门用来放博客文件的

![QQ截图20170922133703.png](http://upload-images.jianshu.io/upload_images/5503852-9ca893eedf494fd3.png)

仓库名称必须是``github用户名.github.io``

由于我已经建好了，所以提示仓库名称已存在

***

### 生成密钥

密钥在这里的作用是可以将本地内容直接上传到github上，而不需要输入密码

把仓库克隆到本地（通过``git clone``方法或者用github桌面客户端都可以）

然后在本地点击鼠标右键``git bash here``

输入：

```
$ ssh-keygen -t rsa -C "Github的注册邮箱地址"
```

然后一路``enter``过来就可以了，此时密钥已经生成完毕，位置一般会在``/c/Users/Administrator/.ssh/id_rsa``，如果找不到的话可能那个文件是被隐藏了

打开``id_rsa``,把里面的所有内容复制到剪贴板

在github网站上点击右上角头像的``setting``

![QQ截图20170922134718.png](http://upload-images.jianshu.io/upload_images/5503852-5ceefa032cab78c8.png)

进入菜单后选择``SSH and GPG keys``

![QQ截图20170922135031.png](http://upload-images.jianshu.io/upload_images/5503852-91095939e15c004e.png)

把内容粘贴在这里

标题随便写点什么，比如``myblog``

***

### 安装node

点击进入[node.js官网](https://nodejs.org/en/)

按照一般套路安装即可

现在就可以在命令行使用``npm``了

***

### 安装hexo

还是刚才的``git bash here``打开的命令行

输入
```
$ npm install -g -hexo-cli
```

安装好hexo后输入

```
$ hexo
```

出现下图，则说明安装成功，其实很多工具都是这样，装完之后输入能出现类似这样的目录结构，就说明已经装上了

![QQ截图20170922135155.png](http://upload-images.jianshu.io/upload_images/5503852-c5245eeb00b4dfcb.png)

***

### 初始化博客

在终端输入

```
$ hexo init <folder>
```

``folder``为你想储存博客文件的文件夹名称，注意输入的时候省略``< >''

比如我输入了

```
$ hexo init myblog
```

然后在仓库目录下就生成了了名为``myblog``的文件夹

接着输入

```
$ cd <folder>
```

定位到博客文件夹，这里的``folder``同上，还是你的文件夹名称

然后输入

```
$ npm install
```

安装hexo项目的依赖包

***

### 配置博客

现在博客目录长这样

![QQ截图20170922140138.png](http://upload-images.jianshu.io/upload_images/5503852-9a4881023eae2901.png)

需要认识的几个文件是

```
node_modules //存放项目依赖包的文件夹，不用管
source //文章和页面的位置，整理文章和页面时会用到
themes //主题文件的位置，配置主题的时候会用到
_config.yml //博客配置，初始化博客时会用到
```

打开``_config.yml``文件，可以看到现在博客的一些基本配置，这里有几个地方需要手动改一下

#### 修改网站相关信息

```
title: ...//填博客名称
subtitle: ...//博客描述
description: ...//个人介绍
author: ...//作者名字
language: zh-CN //语言配置，中文就这样填
timezone: Asia/Shanghai //时间配置
```

注意：每一项的填写，后面都要保留一个空格，和写``Vue``的习惯差不多

#### 配置统一资源定位符（个人域名）

```
url: http://liub.com
```

#### 配置部署

```
deploy:
    type: git
    repo: //下面会提到
    branch: master
```

repo后面跟着的内容我踩了不少坑，后面才发现其实还是要看自己的情况，不能想当然照着别人的教程填，这个内容去自己的仓库那里复制就可以了，如图

![QQ截图20170922141745.png](http://upload-images.jianshu.io/upload_images/5503852-cc8ef308e85311e4.png)

把这一串东西复制到``repo：``后面

现在，博客就基本上配置完毕了

***

### 发表一篇文章

回到刚才的``git``命令行，输入

```
$ hexo new "我的第一篇文章"
```

然后就可以在本地博客文件夹``source/_post``下看到我们新建的``markdown``文件

文章是需要用``markdown``的语法写的，具体可参考[markdown入门指南](http://www.jianshu.com/p/1e402922ee32/)

![QQ截图20170922142349.png](http://upload-images.jianshu.io/upload_images/5503852-6fa71c6a4fca14b4.png)

``ctrl+s``保存后，我们在命令行输入

```
hexo server
//也可以写成hexo s 
```

如下图 

![QQ截图20170922142757.png](http://upload-images.jianshu.io/upload_images/5503852-c8ade5770e31a4d2.png)

hexo为我们在本地生成了一个网站，我们在浏览器中输入网址``localhost:4000``就可以查看博客的效果了

当然，在本地``source/_post``手动新建文件的方式来写文章也是可以的，但是要遵守刚才的格式规范

***

### 把博客发布到github服务器上

只要在终端执行这样的命令即可

```
$ hexo generate
$ hexo deploy
```

这个过程也可以采用简写的形式

```
$ hexo d -g
```

如果提示说``Deployer not found: git``不存在，那么需要先输入

```
$ npm install hexo-deployer-git --save
```

再执行刚才的命令

这时候博客已经部署到网上了，在浏览器中输入网址即可，如我的博客是: [Kevin031.github.io](liub.site)

在发布之前，最好先清除一下缓存

```
$ hexo clean
```

这样可以保证我们能第一时间在服务器上看到效果

### 结合github action实现自动部署

1. 需要将博客hexo源码上传到github仓库

2. `ssh-keygen -t rsa`创建公钥和私钥，私钥存到仓库的`SECRETS`下，命名为`HEXO_DEPLOY_PRI`(后面会用到)，同时存到`{USER}.github.io`仓库下的`DEPLOY KEYS`下，命名为`HEXO_DEPLOY_PRI`

3. 在hexo源码仓库下创建action，yml文件大致如下

```yml
# workflow name
name: Hexo Blog CI

# master branch on push, auto run
on: 
  push:
    branches:
      - master
      
jobs:
  build: 
    runs-on: ubuntu-latest 
        
    steps:
    # check it to your workflow can access it
    # from: https://github.com/actions/checkout
    - name: Checkout Repository master branch
      uses: actions/checkout@master 
      
    # from: https://github.com/actions/setup-node  
    - name: Setup Node.js 12.x 
      uses: actions/setup-node@master
      with:
        node-version: "12.x"
    
    - name: Setup Hexo Dependencies
      env:
        NEXT_VERSION: v5.1.2
      run: |
        npm install hexo-cli -g
        npm install
        git config --global user.name 'Kevin031'
        git config --global user.email 'kevin019@163.com'
        # git clone --branch ${NEXT_VERSION} --depth=10 https://github.com/iissnan/hexo-theme-next themes/next
        # git checkout -b ${NEXT_VERSION}
        # cp -f ./_config.next.yml ./themes/next/_config.yml

    - name: Setup Deploy Private Key
      env:
        HEXO_DEPLOY_PRIVATE_KEY: ${{ secrets.HEXO_DEPLOY_PRI }}
      run: |
        mkdir -p ~/.ssh/
        echo "$HEXO_DEPLOY_PRIVATE_KEY" > ~/.ssh/id_rsa 
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        
    - name: Setup Git Infomation
      run: | 
        git config --global user.name 'Kevin031' 
        git config --global user.email 'kevin019@163.com'
    - name: Deploy Hexo 
      run: |
        hexo clean
        hexo generate 
        hexo deploy
```

其中`git`相关配置和`HEXO_DEPLOY_PRI`需要替换成自己设置的值

如果主题是从别的github仓库clone下来的，如果出现版本不一致的情况，执行后可能会出问题，我这里直接把本地的next主题上传到仓库了

如果`git status`未找到主题文件，需要执行

```shell
git rm --cached themes/next
git add themes/next
```

4. 提交代码到`master`分支，action会自动执行，这样就实现提交代码触发正式内容更新了

***

### 后续更新

把博客地址从github.io改为个人域名

hexo更换主题（next）及配置

hexo增加标签、分类和关于页面

next主题个性化修改




