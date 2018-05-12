## 日志——用vue实现在线简历生成器全步骤记录

在github上新建一个仓库；

clone到本地；

在本地打开终端，`cd`到当前目录；

输入`npm init -y`创建一个package.json（可自行修改）；

输入`npm install -g vue-cli`下载安装[vue-cli命令行工具](https://github.com/vuejs/vue-cli)；

输入`vue init <template-name> <project-name>`，这里就输入`vue init webpack .`即可；

一路回车；

要你选择Runtime + Compiler或者Runtime-only，前者适合浏览器环境（Compiler就是把HTML变成JS再把JS反馈到页面中），后者适合nodejs环境，这里选择前者；

`Install vue-router?`选择n，因为手动安装更容易理解；

`Use ESLint to lint your code?`选择n，因为ESLint有许多奇奇怪怪的规则；


