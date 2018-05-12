## 日志——通过Vue.js开发在线简历生成器学习Vue

### 准备工作

在github上新建一个仓库vue-resumer-1；

clone到本地；

在本地打开终端，`cd`到当前目录；

输入`npm config set registry https://registry.npm.taobao.org/`，设定npm下载途径；

输入`npm init -y`创建一个package.json（可自行修改）；

输入`npm install -g vue-cli`下载安装[vue-cli命令行工具](https://github.com/vuejs/vue-cli)；

输入`vue init <template-name> <project-name>`，这里就输入`vue init webpack .`即可；

一路选择Y；

提示你选择Runtime + Compiler或者Runtime-only，前者适合浏览器环境（Compiler就是把HTML变成JS再把JS反馈到页面中），后者适合nodejs环境，这里选择前者；

提示`Install vue-router?`，选择n，因为手动安装更容易理解；

提示`Use ESLint to lint your code?`，选择n，因为ESLint有许多奇奇怪怪的规则，第二次使用时就可以Use了；

提示`Setup unit tests with Karma + Mocha?`，选择n，很多公司是不写单元测试的，所以也不选；

提示`Setup e2e tests with Nightwatch?`，选择n。

提示`vue-cli  Generated "vue-resumer-1".`，告诉你已经生成；

输入`npm install`;

push到github上，添加描述`git commit -am "vue init webpack . && npm install"`；

***

### 正式开始

输入`npm run dev`，创建了[本地服务器](http://localhost:8080/)，可以访问页面；

打开VScode，进入本地仓库vue-resumer-1，查看目录结构；

找到并进入index.html，发现HTML结构怪异：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>vue-resumer-1</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

检查http://localhost:8080 页面，发现文档结构是这样的：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>vue-resumer-1</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="text/javascript" src="/app.js"></script>
  </body>
</html>
```

对比发现，vue自动在HTML的`<body/>`前添加了一个JS脚本，其`src="/app.js"`；











