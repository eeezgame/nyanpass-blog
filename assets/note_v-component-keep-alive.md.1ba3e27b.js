import{o as n,c as s,d as a}from"./app.dbd2c2fe.js";const p='{"title":"Vue内置组件keep-alive","description":"","frontmatter":{"date":"2021-04-06","title":"Vue内置组件keep-alive","tags":["Vue","VueComponent"],"describe":"Vue内置组件keep-alive"},"headers":[{"level":3,"title":"基本使用","slug":"基本使用"},{"level":3,"title":"案例:手动管理keep-alive缓存的路由组件","slug":"案例-手动管理keep-alive缓存的路由组件"}],"relativePath":"note/v-component-keep-alive.md","lastUpdated":1619745176692}',t={},o=a('<h1 id="vue原生组件-keepalive"><a class="header-anchor" href="#vue原生组件-keepalive" aria-hidden="true">#</a> Vue原生组件 KeepAlive</h1><h3 id="基本使用"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> <a href="https://cn.vuejs.org/v2/api/#keep-alive" target="_blank" rel="noopener noreferrer">基本使用</a></h3><h3 id="案例-手动管理keep-alive缓存的路由组件"><a class="header-anchor" href="#案例-手动管理keep-alive缓存的路由组件" aria-hidden="true">#</a> 案例:手动管理keep-alive缓存的路由组件</h3><p>栗子:比如在标签栏导航场景下的文章详情页这种 <code>/article/1</code> <code>/article/2</code>，他们的路由不同但对应的组件却是一样的，即他们的组件 name 就是一样的,keep-alive的 include 只能根据组件名来进行缓存,而我们通常希望控制的是路由实例的缓存.</p><p>解决方案:标签关闭时,手动移除keep-alive缓存的实例.<a href="https://jsfiddle.net/Runki/pc5ka9j1/115/" target="_blank" rel="noopener noreferrer">在线Demo</a></p><p>核心代码</p><div class="language-javascript"><pre><code><span class="token keyword">const</span> AppMain <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;app-main&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>\n  name<span class="token operator">:</span><span class="token string">&#39;AppMain&#39;</span><span class="token punctuation">,</span>\n  template<span class="token operator">:</span><span class="token string">&#39;&lt;keep-alive :include=&quot;cachedPage&quot;&gt;&lt;router-view :key=&quot;key&quot; ref=&quot;page&quot; v-on=&quot;hooks&quot; /&gt;&lt;/keep-alive&gt;&#39;</span><span class="token punctuation">,</span>\n  props<span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;cachedPage&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token function-variable function">data</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n  \t<span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  computed<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>path<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token comment">// 监听子页面钩子</span>\n    <span class="token function">hooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token constant">PAGE_HOOKS</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">events<span class="token punctuation">,</span> hook</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        events<span class="token punctuation">[</span><span class="token string">&quot;hook:&quot;</span> <span class="token operator">+</span> hook<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pageHook</span><span class="token punctuation">(</span>hook<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> events<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>alive <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_vnode<span class="token punctuation">.</span>componentInstance<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// 销毁后清理</span>\n  <span class="token function">destroyed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>alive <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span><span class="token punctuation">{</span>\n    <span class="token comment">// 移除缓存</span>\n    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> $alive <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>alive<span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>$alive<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">const</span> cacheItem <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys <span class="token punctuation">}</span> <span class="token operator">=</span> $alive<span class="token punctuation">;</span>\n\n      <span class="token comment">// 销毁缓存组件实例，清理 RouterAlive 缓存记录</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>cacheItem<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        cacheItem<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        cacheItem<span class="token punctuation">.</span>vm <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// 清理 keepAlive 缓存记录</span>\n      Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>cache<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>id<span class="token punctuation">,</span> item<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>data<span class="token punctuation">.</span>key <span class="token operator">===</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 销毁组件实例</span>\n          item<span class="token punctuation">.</span>componentInstance <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>componentInstance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          cache<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;keys&#39;</span><span class="token punctuation">,</span>keys<span class="token punctuation">,</span>id<span class="token punctuation">)</span>\n\t\t\t\t\t<span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> id<span class="token punctuation">)</span>\n          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token function">pageHook</span><span class="token punctuation">(</span><span class="token parameter">hook</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">pageHook:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>hook<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> handler <span class="token operator">===</span> <span class="token string">&quot;function&quot;</span><span class="token punctuation">)</span> <span class="token function">handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token comment">// 页面创建</span>\n     <span class="token string">&quot;pageHook:created&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n     \t <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        fullPath<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>fullPath\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token comment">// 页面挂载</span>\n     <span class="token string">&quot;pageHook:mounted&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>page<span class="token punctuation">;</span>\n     <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token comment">// 页面激活</span>\n     <span class="token string">&quot;pageHook:activated&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token comment">//console.log(&#39;pageHook:activated&#39;)</span>\n     <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token comment">// 页面失活</span>\n     <span class="token string">&quot;pageHook:deactivated&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token comment">//console.log(&#39;pageHook:deactivated&#39;)</span>\n     <span class="token punctuation">}</span><span class="token punctuation">,</span>\n     <span class="token keyword">async</span> <span class="token string">&quot;pageHook:destroyed&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n       <span class="token comment">// 清理已销毁页面的缓存信息</span>\n       Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>key<span class="token punctuation">,</span> item<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n         <span class="token keyword">const</span> <span class="token punctuation">{</span> vm <span class="token punctuation">}</span> <span class="token operator">=</span> item <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n         <span class="token keyword">if</span> <span class="token punctuation">(</span>vm <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n           <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n         <span class="token punctuation">}</span>\n       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>获取keep-alive组件实例</p><div class="language-javascript"><pre><code><span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>alive <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_vnode<span class="token punctuation">.</span>componentInstance<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>以路由路径作为cache的索引</p><div class="language-javascript"><pre><code>     <span class="token string">&quot;pageHook:created&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        fullPath<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>fullPath\n       <span class="token punctuation">}</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n</code></pre></div><p>将路由实例写入cache的缓存</p><div class="language-javascript"><pre><code>     <span class="token string">&quot;pageHook:mounted&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>page<span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n</code></pre></div><p>路由实例若被销毁则清理已销毁页面的缓存信息</p><div class="language-javascript"><pre><code>     <span class="token keyword">async</span> <span class="token string">&quot;pageHook:destroyed&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n       <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n       <span class="token comment">// 清理已销毁页面的缓存信息</span>\n       Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>key<span class="token punctuation">,</span> item<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n         <span class="token keyword">const</span> <span class="token punctuation">{</span> vm <span class="token punctuation">}</span> <span class="token operator">=</span> item <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n         <span class="token keyword">if</span> <span class="token punctuation">(</span>vm <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n           <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>\n         <span class="token punctuation">}</span>\n       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n     <span class="token punctuation">}</span>\n</code></pre></div><p>手动移除缓存</p><div class="language-javascript"><pre><code>    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> $alive <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>alive<span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>$alive<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">const</span> cacheItem <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys <span class="token punctuation">}</span> <span class="token operator">=</span> $alive<span class="token punctuation">;</span>\n\n      <span class="token comment">// 销毁缓存组件实例，清理 RouterAlive 缓存记录</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>cacheItem<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        cacheItem<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        cacheItem<span class="token punctuation">.</span>vm <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// 清理 keepAlive 缓存记录</span>\n      Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>cache<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>id<span class="token punctuation">,</span> item<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>data<span class="token punctuation">.</span>key <span class="token operator">===</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 销毁组件实例</span>\n          item<span class="token punctuation">.</span>componentInstance <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>componentInstance<span class="token punctuation">.</span><span class="token function">$destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          cache<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n\t\t  <span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> id<span class="token punctuation">)</span>\n          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n</code></pre></div>',17);t.render=function(a,p,t,c,e,u){return n(),s("div",null,[o])};export default t;export{p as __pageData};