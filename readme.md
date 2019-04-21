
# Vue 云音乐 WebApp

## 声明：

该项目是从[caijinyc](https://github.com/caijinyc/vue-music-webapp)的项目copy过来的，并在其基础添加了用户资料管理、用户歌单管理、用户动态管理等功能。具体使用说明请参考[vue-music-webapp](https://github.com/caijinyc/vue-music-webapp)。

:musical_keyboard: 基于 Vue(2.5) + vuex + vue-router + vue-axios +better-scroll + Scss + ES6 等开发一款移动端音乐 WebApp，UI 界面参考了安卓版的网易云音乐、flex 布局适配常见移动端。



- 推荐使用手机预览，电脑在 Chrome 调试模式下食用效果更佳，开启调试模式的手机模式后，如果不能滚动，刷新一下页面即可

## 预览

图片虽然压缩过了，但是几张加载一起还是有 3MB 左右，所以请耐心等待一下啦:joy:。感觉不错的可以去上面 :point_up:的地址体验一下呦~

#### 推荐、排行榜、歌手

![推荐、排行、歌手](./doc/img/1.png)

#### 歌单详情、个人中心


#### 播放器、播放列表

![播放器](./doc/img/3.png)

#### 搜索页面

![搜索](./doc/img/4.png)



## 技术栈

**前端**

* `Vue`：用于构建用户界面的 MVVM 框架
* `vue-router`：为单页面应用提供的路由系统，使用了 `Lazy Loading Routes` 技术来实现异步加载优化性能
* `vuex`：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
* `vue-lazyload`：实现图片懒加载，节省用户流量，优化页面加载速度
* `better-scroll`：解决移动端各种滚动场景需求的插件，使移动端滑动体验更加流畅
* `SCSS`：css 预编译处理器
* `ES6`：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

**后端**

* `Node.js`：利用 Express 搭建的本地测试服务器
* `vue-axios`：用来请求后端 API 音乐数据
* `NeteaseCloudMusicApi`：网易云音乐 NodeJS 版 API，提供音乐数据

**其他工具**

* `vue-cli`：Vue 脚手架工具，快速初始化项目代码
* `eslint`：代码风格检查工具，帮助我们规范代码书写（一定要养成良好的代码规范）
* `iconfont` ：阿里巴巴图标库，谁用谁知道
* `fastclick` ：消除 click 移动游览器 300ms 的延

## 实现功能

播放器内核、推荐页面、热榜页面、歌手页面、歌单详情、歌手详情、排行榜详情、搜索页面、播放列表、用户中心等等功能。


## TODO

1. 优化排行榜加载速度
2. 优化重复代码
3. 增加歌曲评论
4. 增加 MV、电台 功能
5. emm，更多功能容我再想想哈

## 感谢

- 感谢 [Binaryify](https://github.com/Binaryify) 对接口文档 [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi) 的不断维护与更新。
- 感谢 [ustbhuangyi](https://github.com/ustbhuangyi) 老师的 [Vue 实战教程](http://coding.imooc.com/class/107.html) ，让我学习到很多 vue 的知识。

## Build Setup
克隆代码到本地之后，需要运行 [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)，来起一个音乐的 API 接口。

如果需要在服务器上搭建的话就需要将 API 放到自己的服务器上面。

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

