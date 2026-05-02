export interface FriendLink {
  name: string;
  url: string;
  description: string;
  avatar?: string;
  // avatar 支持三种格式：
  // 1. 外部链接：以 http:// 或 https:// 开头
  // 2. public 目录：以 / 开头，如 /images/avatar.jpg
  // 3. 本地路径：相对于 src 目录，如 assets/images/avatar.jpg
}

export const friendLinks: FriendLink[] = [
  {
name: "哔哩哔哩",
url: "https://www.bilibili.com",
description: "涵盖动画、番剧、游戏、知识、生活等多元优质内容的综合视频平台",
avatar: "https://www.bilibili.com/favicon.ico",
},
{
name: "CM 博客",
url: "https://blog.cmliussss.com/",
description: "专注互联网技术、实用资源分享与生活感悟的个人博客",
avatar: "https://blog.cmliussss.com/img/IMG_0038.png",
},
{
name: "果壳剥壳",
url: "https://ghxi.com",
description: "泛科技主题兴趣平台，以科学有趣的方式传递硬核知识",
avatar: "https://www.ghxi.com/favicon.ico",
},
{
name: "423Down",
url: "https://www.423down.com",
description: "专注分享绿色安全的精品 PC 软件、安卓应用与实用工具",
avatar: "https://www.423down.com/favicon.ico",
},
{
name: "GitHub",
url: "https://github.com",
description: "全球最大的开源代码托管与协作平台",
avatar: "https://github.com/favicon.ico",
},
{
name: "二叉树树的博客",
url: "https://blog.2x.nz",
description: "二叉树树的个人技术博客",
avatar: "https://avatars.githubusercontent.com/u/180811437?v=4",
},
{
name: "Cloudflare",
url: "https://www.cloudflare.com",
description: "免费的网络安全与 CDN 服务",
avatar: "https://www.cloudflare.com/favicon.ico",
}
  // 在这里添加更多友链
];