---
title: 将AstroFuwari部署到阿里云ESA的函数与Pages上
published: 2026-08-15
description: '边缘函数与Pages'
image: 'photo/esapages.jpg'
tags: [博客搭建]
category: '教程'
draft: false 
lang: ''
---

### 如标题所示，将AstroFuwari博客部署到阿里云esa的函数与pages上

首先，你需要拥有一个阿里云的账号，国内海外站都可以，我这里是国内站（海外站需要添加国外手机号和银行卡，国内只需要实名）

登录 ESA 控制台，左侧导航选择 **边缘计算和 AI > 函数和 Pages**，首次使用会提醒你开通，免费的开通即可。点击「创建」，切换到「导入 Github 仓库」

在Fuwari项目的根目录创建一个文件，名为esa.jsonc，写入以下内容：

```jsonc
{
  "name": "项目名",
  "installCommand": "npm install -g pnpm && pnpm install",
  "buildCommand": "pnpm run build",
  "assets": {
    "directory": "./dist",
    "notFoundStrategy": "404Page"
  }
}
```

### 为什么要创建文件？

不创建构建时会报错，问了豆包才知道的

> [!NOTE]
>
> 关键说明：
>
> - ESA 构建环境默认预装 npm，需先全局安装 pnpm 再执行依赖安装
> - Fuwari 是多页静态站点，`notFoundStrategy` 必须设为 `404Page`，不可使用 SPA 单页应用模式，否则子页面刷新会异常回退到首页

创建完成之后会要求你绑定自定义域名，这个实际上是将你的域名绑定到阿里云ESA的CDN上面，同样的，根据提示一步步添加Cname解析，在边缘证书里使用**Let's Encrypt免费证书**即可
