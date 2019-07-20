## smile-blog-admin

[![Build Status](https://www.travis-ci.org/smileShirmy/smile-blog-admin.svg?branch=master)](https://www.travis-ci.org/smileShirmy/smile-blog-admin)

- 文章、分类、标签、评论、留言、用户等增删改查
- 支持用户无感知token刷新
- 登录校验
- 用户权限控制
- 支持文章和作者多对多关系
- 支持用户头像剪裁上传
- 通过配置文件的方式配置菜单及路由
- UI框架 [ElementUI](https://element.eleme.io)

该项目为后台管理部分，其它部分可点击下面的链接

- 展示前端 [smile-blog-nuxt](https://github.com/smileShirmy/smile-blog-nuxt)
- 管理后台 [smile-blog-admin](https://github.com/smileShirmy/smile-blog-admin)
- 服务端 [smile-blog-koa](https://github.com/smileShirmy/smile-blog-koa)

## screenshot

![文章筛选](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-admin-01.png)

![新增作者](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-admin-02.png)

## Setup

该项目使用 RESTful API，要启动该项目要先启动服务端 [smile-blog-koa](https://github.com/smileShirmy/smile-blog-koa)

```bash
# install
npm install

# development
npm run dev

# production 
npm run build
```