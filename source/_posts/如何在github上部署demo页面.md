---
title: 如何在github上部署demo页面
date: 2017-05-22 22:20:55
tags:
    - git
    - npm
categories:
    - 前端
---

笔者学习前端设计近一年里也写了不少网站，但是苦于自己编写的网站难以展示，就算上传到github上也只能看到文件而已，后来才发现原来github上提供了把网页文件变为网站的工具，即github page，而要使用它也不仅仅是简简单单地上传。
下面简单地总结了从本地的网页文件到在github服务器上展示出来即可以通过网络端打开的过程：
（以下可能会出现一些难点，照着做就可以了，由于笔者是小白，也不清楚具体原理是什么，希望有一天成为大神的时候能轻松驾驭）

# 进入github主页，建立新仓库
<br />![](http://upload-images.jianshu.io/upload_images/5503852-5d17c4a594ee02ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 为你的新仓库取一个名字
<br />在这里笔者以自己的“仿LOL官网”项目为例。
其中标记处添加README描述也勾选上。

![](http://upload-images.jianshu.io/upload_images/5503852-705f34e3ab136181.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<!--more-->

# 建立好仓库后，在仓库中选择settings选项，找到“github pages”选项卡

<br />![](http://upload-images.jianshu.io/upload_images/5503852-507eceb24e25a969.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 在“github pages”选项卡中找到“source”，点击“None”，选择“master branch”，再点击“Save”保存

<br />![](http://upload-images.jianshu.io/upload_images/5503852-f10166b4d1d3900f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在这里我们就可以看到github为我们生成了一个链接，先把它存起来。

<br />![](http://upload-images.jianshu.io/upload_images/5503852-247536c508164bfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击链接进去发现里面什么也没有，接下来我们在本地进行git的操作。

<br />![](http://upload-images.jianshu.io/upload_images/5503852-ee8a3f1d09ff1b43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 下载安装git

下载地址：https://git-scm.com/downloads
安装过程省略

# 在本地新建一个文件夹专门用于存放本地的代码，以上传到远程端

<br />在这里我选择的是在D盘github代码库文件夹中新建一个文件夹来存放我的代码
![](http://upload-images.jianshu.io/upload_images/5503852-ac37ad6ab4cb2452.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 进入建好的文件夹后，右击选择“Git Bash Here”，出现命令行窗口

<br />![](http://upload-images.jianshu.io/upload_images/5503852-fb8408c45c9c5d64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 输入如下命令，用来在当前文件夹中创建 test 文件存放你的github上的仓库文件，克隆仓库文件到当前文件夹中

<br />![](http://upload-images.jianshu.io/upload_images/5503852-70bd9ccc810ad0d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这时候你会发现你的文件夹中多了一个文件夹test，test中的文件就是github仓库中的文件

# 将自己的网页文件复制粘贴至仓库文件中

<br />![](http://upload-images.jianshu.io/upload_images/5503852-50bd103de3c56a93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 依次输入如下命令

<br />![](http://upload-images.jianshu.io/upload_images/5503852-7ffddaeeb32f93c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解释一下以上命令，在**更新代码**的时候也会用到
git status： 列出当前目录所有还没有被git管理的文件和被git管理且被修改但还未提交(git commit)的文件，也就是所有改动文件，红色字体标出。
git add .  (有个点) ：表示添加当前目录下的所有文件和子目录，
然后 再输入一次 git status 如果看见文件都变绿了 ，那么就代表它们已经准备好了被提交（git commit）

# 依次输入如下命令，将你的文件上传至远程 master分支

<br />![](http://upload-images.jianshu.io/upload_images/5503852-4d2fa2f817fd5372.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里要注意一下的就是在输入git push后会让你输入github的账号和密码
<br />![](http://upload-images.jianshu.io/upload_images/5503852-8c8a87e12a7ca487.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/5503852-5d06382a6fd3fdc7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/5503852-10359cde70ad90fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后一步上传完毕后当出现以上字样的时候，说明已经大功告成了~

# 回到第4步中的链接，在后面加上/和网页文件名，即可打开自己制作的网站

<br />部分内容转载自：http://www.cnblogs.com/lijiayi/p/githubpages.html
感谢作者打开了本小白迈向新世界的又一扇大门

# 2017/12/5更新 理解git操作命令

``git init``/``git init <filename>`` 创建新仓库，或者将当前定位的目录作为仓库

``git clone <URL/PATH>`` 创建一个服务器/本地仓库的克隆版本

git的管理方式主要有三部分，工作区、缓存区和HEAD(指向最近一次的提交结果)

从工作目录提交到缓存区：``git add <filename/*>``

从缓存区提交到HEAD（信息）：``git commit -m "备注"``

在工作目录中获取(``fetch``)并合并(``merge``)到远端的改动：``git pull``/``git merge <branch/>master>`` 还需要``git add``将这些文件标记为合并成功

从工作目录提交到HEAD（文件）：``git push origin master``

如果本地目录并没有远端仓库，也可以以这样的方式直接创建：``git remote add origin <server>``