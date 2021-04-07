---
date: 2021-04-07
title: 现代浏览器ObserverAPI
tags:
 - WebAPI
 - ObserverAPI 
describe: 浏览器Observer简单实例以及案例
---

## 现代浏览器ObserverAPI

- `Intersection Observer`,交叉观察者.
- `Mutation Observer`,变动观察者.
- `Resize Observer`,视图观察者.
- `Performance Observer`,性能观察者.

### IntersectionObserver

todo...

### MutationObserver

[`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)接口提供了监视对DOM树所做更改的能力.

观察Dom属性,子节点以及后代节点的变化

```javascript
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```



### ResizeObserver

Resize Observer API提供了一种高性能的机制，通过该机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知.

观察窗口变化

```javascript
      const myObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          console.log('大小位置', entry.contentRect)
          console.log('监听的DOM', entry.target)
        })
      })
      myObserver.observe(document.body)
```



### Performance Observer

todo...



### Observer案例

MutationObserver + ResizeObserver 实现顶部菜单的自动折叠[Demo](https://www.antdv.com/components/menu-cn/#components-menu-demo-top-navigation) [源码](https://github.com/vueComponent/ant-design-vue/blob/0bdaf14d1e6119cf794161ff5be21a681e68ae53/components/vc-menu/DOMWrap.jsx)

MutationObserver 找出游戏[KOLOR](https://kolor.moro.es/)答案 [文章](https://benhuang.info/2019/02/20/hacking-the-color-picker-game-mutationobserver/)

ResizeObserver 实现Vue响应式组件[源码](https://github.com/kelin2025/vue-responsive-components)