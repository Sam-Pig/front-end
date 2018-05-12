## 日志——Vue.js开发在线简历生成器

### 准备工作

* 在github上新建一个仓库vue-resumer-1；

* clone到本地；

* 在本地打开终端，`cd`到当前目录；

* 输入`npm config set registry https://registry.npm.taobao.org/`，设定npm下载途径；

* 输入`npm init -y`创建一个package.json（可自行修改）；

* 输入`npm install -g vue-cli`下载安装[vue-cli命令行工具](https://github.com/vuejs/vue-cli)；

* 输入`vue init <template-name> <project-name>`，这里就输入`vue init webpack .`即可；

* 一路选择Y；

* 提示你选择Runtime + Compiler或者Runtime-only，前者适合浏览器环境（Compiler就是把HTML变成JS再把JS反馈到页面中），后者适合nodejs环境，这里选择前者；

* 提示`Install vue-router?`，选择n，因为手动安装更容易理解；

* 提示`Use ESLint to lint your code?`，选择n，因为ESLint有许多奇奇怪怪的规则，第二次使用时就可以Use了；

* 提示`Setup unit tests with Karma + Mocha?`，选择n，很多公司是不写单元测试的，所以也不选；

* 提示`Setup e2e tests with Nightwatch?`，选择n。

* 提示`vue-cli  Generated "vue-resumer-1".`，告诉你已经生成；

* 输入`npm install`;

* push到github上，添加描述`git commit -am "vue init webpack . && npm install"`；


***


### 初识Vue

* 输入`npm run dev`，创建了[本地服务器](http://localhost:8080/)，可以访问页面；

* 打开VScode，进入本地仓库vue-resumer-1，查看目录结构；

* 找到并打开index.html，发现HTML结构怪异：
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

* 检查http://localhost:8080 页面，发现浏览器里实时文档结构是这样的：
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

* 对比发现，vue自动在HTML的`<body/>`前注入（inject）了一个JS脚本，其`src="/app.js"`；

* 进入`./src/`，发现只有assets、components、App.vue和main.js四个文件（夹）；

* 打开main.js：
```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',//容器
  components: { App },//ES6写法
  template: '<App/>'//HTML文档
})
```

*  **基本认识：index.html是HTML的入口文件，main.js是JS的入口文件，后者会自动注入到前者。**

* 打开App.vue（这是已经修改过的文件）：
```
<template>
  <div id="app">
    <Topbar class="topbar"/>
    <main>
      <Editor class="editor"/>
      <Preview class="preview"/>   
    </main>
  </div>
</template>

<script>
import Topbar from './components/Topbar'//不写后缀也无所谓，因为它会自行查找
import Editor from './components/Editor'
import Preview from './components/Preview'

export default {
  components: {
    Topbar,
    Editor,
    Preview
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar {
  background-color: red;
}
main {
  background-color: blue;
  display: flex;
  flex: 1;
  > .editor {
    width: 20em;
  }
  > .preview {
    flex: 1;
  }
}
</style>
```

* 可以发现`.vue`后缀的文件结构，就是`<template><template/>`、`<script><script/>`、`<style><style/>`三个根标签组成的。

* `<template><template/>`里面是关于文档的总体结构，这里的语法实际上是XML；  
    `<script><script/>`里面是配置要引入的组件；  
    `<style><style/>`里面是设置样式；

* `.vue`结尾的文件，叫做“单文件组件”，除了App.vue之外，都放在了components文件夹里面；

* 可以自己写一个单文件组件，如Topbar.vue，放在components文件夹里，然后通过App.vue里的
```
<script>
    import Topbar from './components/Topbar'
    export default{
        components: {
            "Topbar": Topbar
        }
    }
<script/>
```
来引用，把`<Topbar/>`放在`<template><template/>`中你想要放置的位置，再通过`<style><style/>`来统筹App.vue的总体样式。

* 以上是第一种引用标签的方式，即`import`它，还有一种方式：  
    **全局注册标签**（少用）

* 我们可以在main.js文件`new Vue`之前，注册一个标签：

```
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.component('Jack', {
  template: '<p>I am {{name}}</p>',
  data(){   //data必须是一个function
    return{
      name:'Jack Ma'
    }
  }
})

new Vue({
  el: '#app',
  components: { "App": App },//ES6语法，如果key和value是相同的，可以写成components: { App }
  template: '<App/>'
})
```

* 这样，就可以直接在App.vue的`<template><template/>`里面添加`<Jack/>`了，就相当于是添加了子标签`<p>I am {{name}}</p>`；

* 另外，还可以把components里的单文件组件在main.js里给注册成全局标签：
```
import Hello from './components/HelloWorld'
Vue.component('Hello',Hello)
```
这样，HelloWorld.vue就可以不用在App.vue里`import`就直接放入`<template><template/>`里用了；

* **总结一下：**
1. index.html是HTML的入口文件，main.js是JS的入口文件，后者会自动注入到前者；
2. main.js主要负责`import`全局变量和`new Vue`；
3. App.vue负责`import`各component，整合APP的整体template和设置style；
4. 各component放入components文件里，每一个都是一个单文件组件，可以被App.vue和main.js`import`。

