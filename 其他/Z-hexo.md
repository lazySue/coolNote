---
title: hexo
date: 2018-06-20 11:02:30
tags: [blog, hexo]
categories: 其他
toc: true
---
Hexo 是一个快速、简洁且高效的博客框架。推荐直接使用md语法书写博客.
本篇基于 hexo 3.7.1 ，hexo-cli 1.1.0 。

# 安装
首先需要全局安装 hexo-cli 依赖，之后就能使用 hexo 命令行进行博客页面的生成、服务启动和部署到网站了。
```bash
npm install -g hexo-cli
```
<!-- more -->

# 建站
创建 hexo 博客项目，并安装项目本地的相关依赖。
```bash
hexo init <folder>   // 创建
cd <folder>
npm install  // 安装依赖
```
在建站过程中需注意是否有相关的依赖没有安装好，否则会影响博客页面的生成。
查看依赖安装情况，使用
```bash
npm list --depth 0
```

## 初始文件说明
项目建立好之后，会生成以下文件/夹
* **_config.yml**
  配置信息
* package.json
* **scaffolds**
  模板文件夹。新建文章时会根据它来建立文件。
* **source**
  原始资源文件夹。除`_posts`外,以下划线`_`开头的文件/夹会被忽略。md 和 HTML 文件会被解析并放到 `public` 文件夹,其他文件被拷贝。
* **themes**
  主题文件夹。可以通过下载不同的主题到此文件夹，并在配置中修改theme 为文件夹名称即可使用下载的主题。

# 配置
在生成博客项目时。_config.yml 中会包含配置的默认值，这里选取部分说明一下。

| 配置              | 描述                     | 默认值/备注                   |
| ----------------- | ------------------------ | --------------------- |
| subtitle          | 副标题                   | 可在主题中显示       |
| author            | 作者名称                 | 可在主题显示作者       |
| root              | 网站根目录               | 如果网站存放在子目录中,如http://www/blog/ ,将 url设置为全部, root 设置为/blog/ |
| permalink         | 文章链接地址格式         | :year/:month/:day/:title/  点击文章后浏览器地址栏链接      |
| new_post_name     | 新建文章的文件名称       | :title.md         |
| default_layout    | 预设模板                 | post                      |
| auto_spacing      | 在中英文间加空格         | false  |
| external_link     | 在新标签中打开链接      | true |
| post_asset_folder | 启动 asset 文件夹        | false 启动后新建文章同事会自动创建文章对应的资源文件夹       |
| highlight         | 代码块设置               | -                       |
| default_category  | 默认分类                 | uncategorized                  |
| per_page          | 文章分页数量             | 10                                |
| pagination_dir    | 分页目录                 | page                               |
| theme             | 主题名称                 | false 禁用 可下载主题至 themes 文件夹中使用 |
| deploy            | 部署设置                 | type:git repository: git@...         |

# 命令行
```bash
hexo new [layout] <title>  // 新建文章
```
* layout: 使用`/scaffolds/`中定义的模板，可以自己在文件夹内添加模板
  * draft: 草稿,创建在 `source/_drafts` 文件夹中，使用publish命令移动到_post 中`hexo publish <文件名>`
  * 草稿不会显示在页面中，可以在命令中加上`--draft`或者把 render_drafts 设置为 true 预览
  * 自定义的其他布局和 post 相同，<mark>都将储存到 source/_posts 文件夹</mark>。
  * page: 创建 page 会在 source 目录下创建对应的目录和 index.md ，<mark>主页上无法看到</mark>，设置浏览器url 可见
* title: 对应配置中的new_post_name

```bash
hexo generate/g  // 生成博客页面文件
  [-d/--deploy]  // 在生成文件后，部署到远端服务
  [-w/--watch]  // 在生成文件后，进入文件监听状态
```
生成博客的静态文件在项目的public文件夹中。

```bash
hexo server/s [-p/--port] [--drafts] // 启动服务器

hexo clean      // 清除缓存db.json public/
hexo deploy     // 部署网站

hexo list       // 网站资料
```

# Front-matter文章头部内容
文章最上方以`---`分隔的区域，指定文章的变量。

| 参数       | 描述               | 默认值/备注  |
| ---------- | ------------------ | ------------ |
| layout     | 布局               | -            |
| title      | 标题               | -            |
| date       | 建立日期           | -            |
| updated    | 更新日期           | -            |
| comments   | 文章评论功能       | true         |
| tags       | 标签(不适用于分页) | 多项使用数组 |
| categories | 分类               | -            |

# 服务器hexo-server
hexo 3.0将服务器独立为个别模块。需要安装依赖，执行以下命令行后即可使用hexo 提供的本地服务
```bash
npm install hexo-server --save
```

# 主题
excerpt_link：展开全文的按钮文字，文章在主页以`<-- more -->` 分隔

## 针对 yilia 主题的自定义修改

* 修改样式
  yilia/source/main.****.css 文件
* 修改文章页面布局
  yilia/layout/_partial/article.ejs
  其他布局类似



# Git部署
需要先安装以下依赖。
```bash
npm install hexo-deployer-git --save
```
在`_config.yml`中修改配置
```yml
deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message]
```

## github pages
创建github pages
1. 创建 repository ，repository name 为githubname.github.io
2. 创建完成之后，只要在仓库中提交 index.html 文件即可浏览 https://githubname.github.io 网站，网站页面就是index 页面。
3. 之后在仓库的设置中可以看到 github pages 一项中显示 你的网站已经发布到这个网址。
4. 在hexo 项目的_config.yml 中设置了deploy.repo 为仓库地址后，hexo 会将public 文件夹中的文件都推送到仓库。


# 参考资料
* [hexo 中文](https://hexo.io/zh-cn/docs/index.html)
* [yilia theme](https://github.com/litten/hexo-theme-yilia)
* [next theme](https://github.com/theme-next/hexo-theme-next)
* [github pages](https://pages.github.com/)
