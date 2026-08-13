  ## 作者的联系方式
 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

<div class="contact-buttons">
  <a class="btn btn-qq" href="https://wpa.qq.com/msgrd?v=3&amp;uin=你的QQ号&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener">
    <i class="fa-brands fa-qq"></i><span>腾讯QQ</span>
  </a>
  <a class="btn btn-bili" href="https://space.bilibili.com/你的ID" target="_blank" rel="noopener">
    <i class="fa-brands fa-bilibili"></i><span>Bilibili</span>
  </a>
  <a class="btn btn-tg" href="https://t.me/你的用户名" target="_blank" rel="noopener">
    <i class="fa-brands fa-telegram"></i><span>Telegram</span>
  </a>
  <a class="btn btn-gh" href="https://github.com/你的用户名" target="_blank" rel="noopener">
    <i class="fa-brands fa-github"></i><span>GitHub</span>
  </a>
</div>

<style>
.contact-buttons {
  --qq: #12B7F5;
  --bili: #FB7299;
  --tg: #26A5E4;
  --gh: #24292F;
  --btn-border: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 0;
}

.contact-buttons .btn {
  flex: 1 1 120px;
  max-width: 150px;
  min-width: 110px;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: .5px;
  white-space: nowrap;
  border-radius: 0;
  border: 1px solid var(--btn-border);
  box-shadow: 0 2px 0 rgba(0, 0, 0, .08);
  text-shadow: 0 1px 1px rgba(0, 0, 0, .15);
  transition: transform .2s ease, box-shadow .2s ease, filter .2s ease, border-color .2s ease;
}

.btn-qq { background-color: var(--qq); }
.btn-bili { background-color: var(--bili); }
.btn-tg { background-color: var(--tg); }
.btn-gh { background-color: var(--gh); }

.contact-buttons .btn i {
  font-size: 16px;
  line-height: 1;
}

.contact-buttons .btn:hover {
  filter: brightness(.92);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, .15);
}

@media (prefers-color-scheme: dark) {
  .contact-buttons {
    --gh: #30363D;
    --btn-border: rgba(255, 255, 255, .25);
  }

  .contact-buttons .btn-gh {
    border-color: #8b949e;
  }
}
</style>

  ## 本博客使用的CDN

<div style="display: flex; gap: 16px; width: 100%; margin: 16px 0; box-sizing: border-box; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px 20px; transition: border-color .2s; cursor: pointer; box-sizing: border-box;"
       onclick="window.open('https://www.netlify.com','_blank')"
       onmouseover="this.style.borderColor='#00c7b7'"
       onmouseout="this.style.borderColor='#e5e7eb'">
    <div style="display: inline-flex; align-items: center; gap: 6px; background: #10b981; color: #fff; font-size: 12px; padding: 4px 10px; border-radius: 6px; margin-bottom: 14px; letter-spacing: .5px;">
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #fff; display: inline-block;"></span>
      全球节点
    </div>
    <div style="text-align: center; margin: 8px 0 14px;">
      <img src="https://thelittlequtegdh.top/images/Netlify.png"
           alt="Netlify"
           style="max-width: 78%; height: auto; object-fit: contain; display: inline-block;" />
    </div>
    <div style="font-size: 14px; line-height: 1.6; color: #374151;">
      Netlify是一站式网站开发托管平台，集成代码仓库自动构建部署、全球内容分发加速、无服务器函数、表单处理与身份验证。开发者推送代码即可快速上线高性能安全可靠网站，提升开发效率。
    </div>
  </div>

  <div style="flex: 1; min-width: 280px; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px 20px; transition: border-color .2s; cursor: pointer; box-sizing: border-box;"
       onclick="window.open('https://edgeone.ai','_blank')"
       onmouseover="this.style.borderColor='#0066ff'"
       onmouseout="this.style.borderColor='#e5e7eb'">
    <div style="display: inline-flex; align-items: center; gap: 6px; background: #10b981; color: #fff; font-size: 12px; padding: 4px 10px; border-radius: 6px; margin-bottom: 14px; letter-spacing: .5px;">
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #fff; display: inline-block;"></span>
      大陆节点
    </div>
    <div style="text-align: center; margin: 8px 0 14px;">
      <img src="https://thelittlequtegdh.top/images/EO.png"
           alt="Tencent EdgeOne"
           style="max-width: 78%; height: auto; object-fit: contain; display: inline-block;" />
    </div>
    <div style="font-size: 14px; line-height: 1.6; color: #374151;">
      腾讯云EdgeOne是腾讯云打造的新一代边缘安全加速平台，深度融合CDN内容分发与云安全能力。依托全球海量边缘节点，提供静态/动态资源加速、智能调度与高性能传输，并内置DDoS防护、Web应用防火墙、Bot管理等安全能力，一站式解决加速与防护需求，助力业务安全高效运营
    </div>
  </div>

  <div style="flex: 1; min-width: 280px; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px 20px; transition: border-color .2s; cursor: pointer; box-sizing: border-box;"
       onclick="window.open('https://www.cloudflare.com','_blank')"
       onmouseover="this.style.borderColor='#f38020'"
       onmouseout="this.style.borderColor='#e5e7eb'">
    <div style="display: inline-flex; align-items: center; gap: 6px; background: #10b981; color: #fff; font-size: 12px; padding: 4px 10px; border-radius: 6px; margin-bottom: 14px; letter-spacing: .5px;">
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #fff; display: inline-block;"></span>
      全球节点
    </div>
    <div style="text-align: center; margin: 8px 0 14px;">
      <img src="https://thelittlequtegdh.top/images/CF.png"
           alt="Cloudflare"
           style="max-width: 78%; height: auto; object-fit: contain; display: inline-block;" />
    </div>
    <div style="font-size: 14px; line-height: 1.6; color: #374151;">
      Cloudflare 全球分布式边缘网络，覆盖 100+ 国家与地区，为海外访客提供极速静态资源加速、智能缓存与全域安全防护。
    </div>
  </div>
</div>


 ## 本博客的主题：Fuwari



  ### 原版

  ::github{repo="saicaca/fuwari"}

  ### 二叉树树修改过的

  ::github{repo="afoim/fuwari"}

  ### 本人自己用的Fuwari主题

  ::github{repo="TheLittleQuteGDH/FuwariSave"}



  ## 参考文献

  本博客的搭建离不开以下教程

  >[Fuwari静态博客搭建教程-By 二叉树树](https://www.2x.nz/posts/fuwari/)
  >[加速你的项目！详解 Cloudflare Workers & Pages 优选域名设置-By CM大佬](https://blog.cmliussss.com/p/BestWorkers/)
  >[CloudFlare中国大陆地区优选方案汇总-By CM大佬](https://blog.cmliussss.com/p/CloudFlare%E4%BC%98%E9%80%89/#%E6%88%91%E7%BB%B4%E6%8A%A4%E7%9A%84%E4%BC%98%E9%80%89%E5%AE%98%E6%96%B9%E5%9F%9F%E5%90%8D%EF%BC%8C%E6%9F%A5%E7%9C%8B%E6%9B%B4%E5%A4%9A%EF%BC%9Ahttps-cf-090227-xyz)  
  >[CM大佬的优选域名](https://cf.090227.xyz)
