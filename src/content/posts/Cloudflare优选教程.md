---
title: CloudFlare优选教程-详细版
published: 2026-05-01
description: ''
image: 'photo/已优选.png'
tags: [优选域名IP]
category: '优选'
draft: false 
lang: 'zh-CN'
---

## Cloudflare优选教程

总所周知，Cloudflare被称为“赛博大善人”，原因是它的大多数服务都是免费的（包括免费的CDN）。但是呢，Cloudflare的服务器建在国外，Ping下来延迟普遍在150ms以上，可谓是非常慢了。但是今天的优选可以有效解决这个问题。

先来看看效果图

未优选：

<img src="photo\未优选.png" alt="未优选ItDog测试" style="zoom:75%;" />



可以看到Cloudflare默认只分配了5个IP，甚至有一个还是局域网IP

已经优选后：

<img src="photo\已优选.png" style="zoom:75%;" />

可以看到是全绿的，解析出来的IP也变得很多了

## 优选前的准备工作：

我们需要准备以下东西

| 一个优选域名（我使用的是CM大佬的[https://cf.090227.xyz](https://cf.090227.xyz/)域名，可以看本文章的记录） |
| :----------------------------------------------------------: |
|                      一个Cloudflare账号                      |
| 两个域名（如果要做CF Tunnel优选需将两个域名都绑定到CF，如果是非Saas优选的只需要一个域名） |
| 一个已绑定国外银行卡的Paypal的账户或单独一张银行卡（开通自定义主机名的时候需要使用，实测可以使用银联卡） |

# 下面先来看看只需一个域名的优选

## Worker优选

Worker优选是最简单的，主要分以下两种情况：

### 1、你的项目部署在Worker

首先，访问并登录你的Cloudflare，然后在左侧的菜单栏中找到**计算**→**Workers 和 Pages**

找一个你已经搭建好的CF Workers，然后点击三个点**查看设置**，再点击设置，找到**域和路由**，接着点击**添加**→再点击**路由**，区域为你的已经绑定到Cloudflare的域名，比如说我在Cloudflare已经绑定了gdh.us.kg，那你在区域那里直接选择gdh.us.kg，路由填写你想要的带gdh.us.kg的域名，如：blog.gdh.us.kg，123.gdh.us.kg，然后点击**添加路由**<u>**这里一定要注意，添加的域名一定要带“/*”**</u>,如下图：

<img src="photo\CW.png" style="zoom:75%;" />

随后，回到你的域名，为你的域名添加一条记录，如果是像我一样，blog.gdh.us.kg，就直接添加一条@的CNAME记录，如果你是像我一样用blog.gdh.us.kg的话，就添加一条blog的CNAME记录，接着目标填上你找的优选域名，比如我找的是youxuan.cf.090227.xyz，需要关闭小黄云，点击保存，打开此域名，发现你已经成功了。![添加DNS记录](photo\添加DNS记录.PNG)

### 2、反代你的原站（摘自试试Cloudflare IP优选！让Cloudflare在国内再也不是减速器！ | 二叉树树的博客](https://blog.2x.nz/posts/cf-fastip/)）

<u>本方法的原理为通过Worker反代你的源站，然后将Worker的入口节点进行优选。此方法不是传统的优选，源站接收到的Hosts头仍然是直接指向源站的解析</u>

创建一个Worker，输入以下的代码：（原站.com写你需要优选的域名，最终访问头写你的访问头，访问头随便写就行。比如说你的原站为gdhslow.dpdns.org，访问头写"fastip"）

```
// 域名前缀映射配置
const domain_mappings = {
  '源站.com': '最终访问头.',
//例如：
//'gitea.072103.xyz': 'gitea.',
//则你设置Worker路由为gitea.*都将会反代到gitea.072103.xyz
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const current_host = url.host;

  // 强制使用 HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.href, 301);
  }

  const host_prefix = getProxyPrefix(current_host);
  if (!host_prefix) {
    return new Response('Proxy prefix not matched', { status: 404 });
  }

  // 查找对应目标域名
  let target_host = null;
  for (const [origin_domain, prefix] of Object.entries(domain_mappings)) {
    if (host_prefix === prefix) {
      target_host = origin_domain;
      break;
    }
  }

  if (!target_host) {
    return new Response('No matching target host for prefix', { status: 404 });
  }

  // 构造目标 URL
  const new_url = new URL(request.url);
  new_url.protocol = 'https:';
  new_url.host = target_host;

  // 创建新请求
  const new_headers = new Headers(request.headers);
  new_headers.set('Host', target_host);
  new_headers.set('Referer', new_url.href);

  try {
    const response = await fetch(new_url.href, {
      method: request.method,
      headers: new_headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual'
    });

    // 复制响应头并添加CORS
    const response_headers = new Headers(response.headers);
    response_headers.set('access-control-allow-origin', '*');
    response_headers.set('access-control-allow-credentials', 'true');
    response_headers.set('cache-control', 'public, max-age=600');
    response_headers.delete('content-security-policy');
    response_headers.delete('content-security-policy-report-only');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response_headers
    });
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 502 });
  }
}

function getProxyPrefix(hostname) {
  for (const prefix of Object.values(domain_mappings)) {
    if (hostname.startsWith(prefix)) {
      return prefix;
    }
  }
  return null;
}

```

创建完Worker后，点击设置，找到**域和路由**，接着点击**添加**→再点击**路由**，区域为你的已经绑定到Cloudflare的域名，比如说我在Cloudflare已经绑定了gdh.us.kg，那你在区域那里直接选择gdh.us.kg，路由填写你想要的随便一个域名，如：blog.gdh.us.kg，123.gdh.us.kg，然后点击**添加路由**<u>**这里一定要注意，添加的域名一定要带“/*”**</u>

接着回到域名DNS记录，我这里是gdh.us.kg，为你的最终访问头fastip添加一条记录，目标填写优选域名cf.090227.xyz，点击添加，就可以了

## Pages优选

Pages的优选会比Worker的优选麻烦一点，建议将Pages转成Worker，详情可以看这条视频：【CF Page一键迁移到Worker？好处都有啥？-哔哩哔哩】 https://www.bilibili.com/video/BV1wBTEzREcb By 二叉树树

如果你嫌弃太麻烦，你可以直接将你绑定到Page的子域名直接更改NS服务器到阿里云\华为云\腾讯云云解析做线路分流解析，但是考虑到有些为二级域名，还绑定不了，所以这里不做详细介绍，详情可以看这篇文章[加速你的项目！详解 Cloudflare Workers & Pages 优选域名设置 | CMLiussss Blog](https://blog.cmliussss.com/p/BestWorkers/) By CMLiussss

## Cloudflare R2存储桶的优选

由于本人没有存储桶实例，所以这里不做教程介绍，详情可以去看看二叉树树的优选教程

[试试Cloudflare IP优选！让Cloudflare在国内再也不是减速器！ | 二叉树树的博客](https://blog.2x.nz/posts/cf-fastip/)

# 接下来的教程需要两个域名，建议将域名都绑定在Cloudflare上

## 传统的Saas优选（确保至少一个域名绑定在CF上）

这个东西我参考过多篇文章，现在来做总结教程

首先，我这里有两个域名，一个gdh.us.kg（作为辅助域名），一个thelittlequtegdh.fun域名（主力域名，给别人展示的域名）

进入你的辅助域名，我这里是gdh.us.kg在你的辅助域名上随便添加一条A记录，目标不重要随便填，<u>一定要打开小黄云</u>，比如说我这里名称叫hy，然后记录类型为A记录，目标填写8.8.8.8，点击保存

<img src="photo\回源.PNG" style="zoom:75%;" />

接着再添加一条记录，名称随便起，记录类型A或CNAME都可以，地址需要填写你的源服务器地址，并打开小黄云，保存

比如说我的源站为files.gdh.us.kg

还需要添加一个记录，名称随便起，我这里叫cdn，类型选择CNAME，然后目标为你的优选域名，我这里为youxuan.cf.090227.xyz，点击保存，我的为cdn.gdh.us.kg

随后在左侧侧边栏点开**SSL/TLS**→**自定义主机名**，这里需要添加一个付款方式才能进来，实测可以用银联卡，在回退源中填写你刚刚的随便添加的域名，比如我的hy.gdh.us.kg，就是目标为8.8.8.8的那个，等到回退源状态变为有效就可以了

<img src="photo\回退源.PNG" alt="回退源添加" style="zoom:75%;" />

接着点击自定义主机名，自定义主机名填写你的主力域名，例如我这里写files.thelittlequtegdh.fun，证书验证方法这里改为HTTP验证，自定义源服务器就填写你刚刚添加的指向源站的服务器，我这里是files.gdh.us.kg，点击确定

<img src="photo\自定义主机名.PNG" alt="自定义主机名操作" style="zoom:75%;" />

随后Cloudflare会让你验证你的TXT记录，回到你的主力域名，给你的主力域名添加一条记录

类型：TXT，名称：_cf-custom-hostname.你的域，注意，如果你的域名为“你的域”，则你需要删除".你的域"，值为Cloudflare给你提供的值，比如说1784f76d-xxxx-xxxx-xxxx-998dfe1a52ea

在等生效的时候，回到你的主力域名，添加一条Cname记录，为你刚刚的自定义主机名，我这里叫files.thelittlequtegdh.fun。则名称为files，类型Cname，目标为你刚刚的添加过优选域名的记录，我的为cdn.gdh.us.kg，如果你的主力域名绑定在Cloudflare，请关闭小黄云，点击保存

等到你的主机名状态和证书状态变为有效后，那么请访问你的域名，应该已经能打开了

<img src="photo\有效状态.PNG" alt="有效" style="zoom:75%;" />

## Cloudflare Tunnel优选（请确保两个域名都绑定在Cloudflare上）

依旧一个备用域名和一个主力域名，这里备用为gdhfiles.dpdns.org，主力域名为gdh.us.kg。

进入你的辅助域名，我这里是gdh.us.kg在你的辅助域名上随便添加一条A记录，目标不重要随便填，<u>一定要打开小黄云</u>，比如说我这里名称叫hy，然后记录类型为A记录，目标填写8.8.8.8，点击保存

在你的辅助域名里添加一个记录，名称随便起，我这里叫cdn，类型选择CNAME，然后目标为你的优选域名，我这里为youxuan.cf.090227.xyz，点击保存，我的为cdn.gdhfiles.dpdns.org

首先，你需要添加一个隧道，回到首页在左侧侧边栏打开Zero Trust，可能这里也需要一个支付方式才能进来，但是这里可以不用添加，回到首页dash.cloudflare.com再进来就不会出现付款方式了，点击网络Networks，点击连接器Connectors，你需要在这里添加一条隧道，我这里就添加了openlist的localhost:5244作为内网。按照它的步骤添加

等到状态变为“正常”后，点击它右边的三个点，点击**配置**

![Tunnel](photo\Tunnel.png)

然后点击“已发布程序路由”，点击“添加已发布程序路由”，添加你的主力域名，我的是openlist.gdh.us.kg，内网依旧localhost:5244，点击添加，接着确认你有两个域名

![已发布程序路由](photo\已发布程序路由.png)

接着回到你的主力域名，打开DNS记录会发现Tunnel默认给你分配了一条指向netdisk-gdh的记录，删掉他，接着创建一条记录，名称为openlist，就是你在添加主力域名时的前缀，然后记录填写你刚刚在辅助域名处添加的优选域名记录，我这里是cdn.gdhfiles.dpdns.org，点击保存

打开你的辅助域名，跟Saas优选一样，打开自定义主机名，然后回退源添加你刚刚随便添加的记录，hy.gdhfiles.dpdns.org，然后点击添加，接着在添加自定义主机名，同样的跟Saas优选一样的步骤，添加完后验证，验证完成，恭喜你，你已经学会了CF Tunnel优选

## 如何让别人访问你的源站域名时自动跳转到已优选域名？

这很简单，添加一条规则就可以

回到你的辅助域名，接着点击**规则**→**概述**，有一条规则叫“重定向到其他域”，点击“从模板创建”

![重定向](photo\重定向.png)

接着添加规则，规则名称随便起，**如果传入请求匹配…**改为通配符模式，请求 URL为你的辅助域名https://openlist.gdhfiles.dpdns.org，然后URL 重定向改为https://openlist.gdh.us.kg，然后点击保存，接着在浏览器访问你的原站地址就会跳转到优选后的地址了

# 参考资料

[试试Cloudflare IP优选！让Cloudflare在国内再也不是减速器！ | 二叉树树的博客](https://blog.2x.nz/posts/cf-fastip/)

[告别龟速！Cloudflare 优选 IP 傻瓜式教程，单域名也能让网站起飞-传家宝VPS - 深度VPS测评 | 高性价比VPS推荐 | 2025海外云服务器排行榜](https://www.legacyvps.com/archives/cloudflare-speed-optimization-preferred-ip-guide-single-domain)

[加速你的项目！详解 Cloudflare Workers & Pages 优选域名设置 | CMLiussss Blog](https://blog.cmliussss.com/p/BestWorkers/)

[CloudFlare优选域名汇总 - CF优选域名](https://cf.090227.xyz/)

