---
title: Hexo博客搭建
published: 2025-08-25
description: ''
image: ''
tags: [博客搭建]
category: '教程'
draft: false 
lang: ''
---

# Hexo 博客搭建

## 本博客就是基于Hexo搭建的，并且已经托管到Cloudflare并使用了优选域名，如图所示

![Itdog测速，非常绿](https://github.com/TheLittleQuteGDH/gdhblog.github.io/blob/main/img/hexo%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2/1.PNG?raw=true)

## 准备工作

一台电脑（建议能开代理）



## 开始搭建[Hexo博客](https://hexo.io)

#### 1、请先创建一个用于搭建Hexo的**空文件夹**，我这里就举例子取名为Hexo文件夹，接着请到NodeJS和Git官网下载nodejs和git这两个程序并安装

由于Git在国内下载较慢，所以建议使用国内下载链接：

**（[国内下载链接1](https://www.alipan.com/s/kozZGKHWYZR/folder/68a558e5789c117ebde048f2a7c484d8bb8d4225)）（[国内下载链接2（版本较旧）](https://xiaoyuboi.lanzoum.com/b0c5k65ih)）**

Nodejs的官网：[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)

Git的官网（请打开科学上网进行下载）：[https://git-scm.com/](https://git-scm.com/)

#### 2、打开Hexo文件夹，右键选择Open Git Bash Here，依次运行以下代码，没有报错即为成功，代码摘抄自[Hexo官网](https://hexo.io)

```
npm install hexo-cli -g
hexo init blog
cd blog
npm install
```

#### 3、接下来运行代码“hexo s”（或“hexo server”）

将生成的链接复制到浏览器，查看hexo博客框架是否安装成功，如果你看到的是以下浏览器的界面，恭喜你，你已经安装成功了

如图所示，将localhost:4000复制进入浏览器查看Hexo博客效果

![运行hexo s](https://github.com/TheLittleQuteGDH/gdhblog.github.io/blob/main/img/hexo%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2/2.PNG?raw=true)

![初始化界面](https://github.com/TheLittleQuteGDH/gdhblog.github.io/blob/main/img/hexo%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2/3.PNG?raw=true)

#### 4、插入一篇新文章

生成新文章请运行以下代码（双引号请切换英文模式输入，用中文会报错）

```
hexo new "文章的名字"
```

新的文章会在blog\source\_posts出现，你可以使用自己的MD编辑器编辑文章，我用的是[Typora](https://www.typora.net/)

编辑完成后请运行hexo g生成新网页（可以先运行以一下hexo s查看文章效果，每次编辑完成后先运行hexo g生成最新网页），你的Blog目录下会生成一个新的public文件

如果运行了hexo s发现博客页面没有改变，可运行hexo clean清理一下缓存



```
这里是Hexo代码整理哦
hexo new "文章的名字"  # 生成新的博客文章
hexo g # 生成网页
hexo s #生成本地网址预览博客
hexo clean #清理缓存
```



#### 5、加入主题

默认的Hexo博客主题似乎不太好看，请转到[https://hexo.io/themes/](https://hexo.io/themes/)寻找你心仪的主题哦，点进去有安装方法（可能需要科学上网）Github打不开请打开科学上网或使用[瓦特工具箱（加速器）](https://steampp.net/)哦



## 到这里你已经拥有博客框架了，那么本期教程就结束了，886~

托管到Cloudflare请查看[将Hexo免费托管到Cloudflare](https://blog.thelittlequtegdh.dpdns.org/posts/将hexo免费托管到cloudflare)
