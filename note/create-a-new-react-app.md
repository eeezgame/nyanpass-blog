---
date: 2021-04-30
title: 记录创建新的React应用的方式
tags:
 - React
 - Webpack
 - Typescript
describe: 记录创建新的React应用的方式
---

## 创建新的React应用

### CDN方式

[案例](https://zh-hans.reactjs.org/docs/add-react-to-a-website.html)

### 工具链 

Create React App

运行命令
```
npx create-react-app my-app
cd my-app
npm start
```

[更多](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains)

### 从零开始配置工具链

#### 起步

运行命令
```
mkdir my-react-app
cd my-react-app
npm init
```

在新的项目目录中,创建以下目录结构

```
.
+-- public
+-- src
```

public目录负责静态资源,src目录负责核心代码

在public目录下新建index.html

```html
<!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="../dist/bundle.js"></script>
</body>

</html>
```

后面将会通过构建的React应用`<script src="../dist/bundle.js"></script>`渲染到页面`<div id="root"></div>`.

#### Babel

运行命令
```
npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0
```

在根目录下新建.babelrc文件,并输入以下内容
```
{
  "presets": ["@babel/env", "@babel/preset-react"]
}
```

#### Webpack

引入Webpack,并配置一个开发环境

运行命令
```
npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2
```

在根目录下创建文件webpack.config.js,它将会导出一个配置对象到Webpack中

webpack.config.js
```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
```


#### React

引入React

```
npm install react react-dom
```

在src目录下新建index.html并输入以下内容

``` JavaScript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
ReactDOM.render(<App />, document.getElementById("root"));
```

在src目录下新建App.js并输入以下内容

```JavaScript
import React, { Component} from "react";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default App;
```

在src目录下新建App.css并输入以下内容
```
.App {
  margin: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}
```

在package.json新增以下内容

```
{
    ...
    "scripts": {
        "start": "webpack-dev-server --mode development"
    },
    ...
}
```

好了,一个简易Babel7+React的配置已完成,可以开始愉快的编程了.
执行以下命令,开启服务.
```
npm run start
```

### 使用Typescript进行开发

采用babel7对ts,tsx进行转换,使用tsc --noEmit进行类型检查

#### bebel
```
npm install --save-dev @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread 
```

#### typescript

引入React类库的类型声明文件
```
npm install --save-dev @types/react @types/react-dom typescript

```

创建tsconfig.json,并输入以下内容

```
{
  "compilerOptions": {
    "target": "es2015",                      
    "module": "commonjs",
    "jsx": "react",
    "strict": true, 
    "esModuleInterop": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### webpack

修改webpack.config.js配置

```

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".ts", ".tsx", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

```

把src的.js后缀改为tsx或ts

在package.json加入类型检查脚本'check'

```
{
  ...
  "scripts": {
    ...
    "check": "tsc --noEmit"
  }
  ...
}

```

执行npm run check可以对src目录下的ts进行类型检查.

好了,一个简易Typescript+Babel7+React的配置已完成,可以开始愉快的编程了.