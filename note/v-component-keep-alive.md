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

解决方案:标签关闭时,手动移除keep-alive缓存的实例.[在线Demo](https://jsfiddle.net/Runki/pc5ka9j1/115/)

核心代码

```javascript
const AppMain = Vue.component('app-main',{
  name:'AppMain',
  template:'<keep-alive :include="cachedPage"><router-view :key="key" ref="page" v-on="hooks" /></keep-alive>',
  props:['cachedPage'],
  data:function(){
    this.cache = {};
  	return {}
  },
  computed: {
    key() {
      return this.$route.path;
    },
    // 监听子页面钩子
    hooks() {
      return PAGE_HOOKS.reduce((events, hook) => {
        events["hook:" + hook] = () => this.pageHook(hook);
        return events;
      }, {});
    }
  },
  mounted() {
    this.$refs.alive = this._vnode.componentInstance;
  },
  // 销毁后清理
  destroyed() {
    this.cache = null;
    this.$refs.alive = null;
  },
  methods:{
    // 移除缓存
    remove(key) {
      const $alive = this.$refs.alive;
      if (!$alive) return;

      const cacheItem = this.cache[key];
      const { cache, keys } = $alive;

      // 销毁缓存组件实例，清理 RouterAlive 缓存记录
      if (cacheItem) {
        cacheItem.vm.$destroy();
        cacheItem.vm = null;
        this.cache[key] = null;
      }

      // 清理 keepAlive 缓存记录
      Object.entries(cache).find(([id, item]) => {
        if (item && item.data.key === key) {
          // 销毁组件实例
          item.componentInstance && item.componentInstance.$destroy();
          cache[id] = null;
          console.log('keys',keys,id)
					remove(keys, id)
          return true;
        }
      });
    },
     pageHook(hook) {
      const handler = this[`pageHook:${hook}`];
      if (typeof handler === "function") handler();
     },
     // 页面创建
     "pageHook:created"() {
     	 this.cache[this.key] = {
        fullPath: this.$route.fullPath
      };
     },
     // 页面挂载
     "pageHook:mounted"() {
       this.cache[this.key].vm = this.$refs.page;
     },
     // 页面激活
     "pageHook:activated"() {
       //console.log('pageHook:activated')
     },
     // 页面失活
     "pageHook:deactivated"() {
       //console.log('pageHook:deactivated')
     },
     async "pageHook:destroyed"() {
       await this.$nextTick();
       if (!this.cache) return;
       // 清理已销毁页面的缓存信息
       Object.entries(this.cache).forEach(([key, item]) => {
         const { vm } = item || {};
         if (vm && vm._isDestroyed) {
           this.remove(key);
         }
       });
     }
  }
})
```

获取keep-alive组件实例

```javascript
mounted() {
    this.$refs.alive = this._vnode.componentInstance;
}
```

以路由路径作为cache的索引

```javascript
     "pageHook:created"() {
       this.cache[this.key] = {
        fullPath: this.$route.fullPath
       };
      }
```

 将路由实例写入cache的缓存

```javascript
     "pageHook:mounted"() {
       this.cache[this.key].vm = this.$refs.page;
     }
```

路由实例若被销毁则清理已销毁页面的缓存信息

```javascript
     async "pageHook:destroyed"() {
       await this.$nextTick();
       if (!this.cache) return;
       // 清理已销毁页面的缓存信息
       Object.entries(this.cache).forEach(([key, item]) => {
         const { vm } = item || {};
         if (vm && vm._isDestroyed) {
           this.remove(key);
         }
       });
     }
```

手动移除缓存

```javascript
    remove(key) {
      const $alive = this.$refs.alive;
      if (!$alive) return;

      const cacheItem = this.cache[key];
      const { cache, keys } = $alive;

      // 销毁缓存组件实例，清理 RouterAlive 缓存记录
      if (cacheItem) {
        cacheItem.vm.$destroy();
        cacheItem.vm = null;
        this.cache[key] = null;
      }

      // 清理 keepAlive 缓存记录
      Object.entries(cache).find(([id, item]) => {
        if (item && item.data.key === key) {
          // 销毁组件实例
          item.componentInstance && item.componentInstance.$destroy();
          cache[id] = null;
		  remove(keys, id)
          return true;
        }
      });
    }
```

