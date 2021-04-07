---
date: 2021-04-06
title: Vue内置组件keep-alive
tags:
  - Vue
  - VueComponent
describe: Vue内置组件keep-alive
---

# Vue原生组件 KeepAlive

### [基本使用](https://cn.vuejs.org/v2/api/#keep-alive)

### 案例:手动管理keep-alive缓存的路由组件

栗子:比如在标签栏导航场景下的文章详情页这种 `/article/1` `/article/2`，他们的路由不同但对应的组件却是一样的，即他们的组件 name 就是一样的,keep-alive的 include 只能根据组件名来进行缓存,而我们通常希望控制的是路由实例的缓存.

解决方案:标签关闭时,手动移除keep-alive缓存的实例.[Demo](https://jsfiddle.net/Runki/pc5ka9j1/110/)

