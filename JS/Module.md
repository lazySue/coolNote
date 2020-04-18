---
title: JS 模块
tags:
  - ES6
  - Module
  - CommonJS
  - AMD
  - requireJS
  - js模块化
categories: 踏踏实实
toc: true
date: 2018-06-26 15:57:06
---
# Module
## 概念
JS 的模块加载方案在 ES6 之前就有 CommonJS 和 AMD 等。CommonJS 用于服务器(node)，AMD 用于浏览器(requireJS)，而 ES6 模块能在服务器与浏览器通用。

ES6 Module 属于编译时加载；在编译时就确定模块的依赖关系，及输入输出变量；并只从模块中加载需要的方法。
CommonJS 和 AMD 属于运行时加载；如CommonJS 的模块加载是生成一个模块对象（只有运行时才能获取对象），然后再从这个对象上读取需要的方法

<!-- more -->
## export
对于 ES6 一个模块就是一个独立的文件，文件中的所有变量，外部无法获取；需要使用`export`关键字输出变量，提供给外部读取。

单纯的export 为命名导出，<mark>在导入时必须使用相应对象的名称进行导入</mark>

```javascript
var first = 'aaa'
var last = 'bbb'
var year = '2018'
var fn = function () {}

export {first, last, year}
export {first as firstName}
export {fn}
export let a = 1, b = 2, c, d
export function test () {}
export class ClassA {}
```
在`export`中输出的接口，是变量的引用，而不是具体的值。所以如果导出一个值，可以被多个模块导入共享。

### export default
本质上，`export default` 就是输出一个叫做 `default` 的变量，系统允许为它取任意的名字。
这样一个模块便只能有一个 default 的导出，<mark>在导入时可以直接使用任何名称来获取默认的导出</mark>。

```javascript
export default fn
export {fn as default}
export default function () {}
export default function fn2() {}
// ===> 对应 import 可以写
import fn from 'fn2'
import {default as fn} from 'fn2'


export default 1
export default year
// 错误
export default var a = 1

// 在import中想同时导入默认和其他变量

```


## import
使用了`export`定义了模块导出的部分后，其他 JS 就可以通过`import`加载这个模块。

```javascript
	// 导入默认
	import defaultExport from "module-name";
	// 导入整个模块 忽略default
	import * as name from "module-name";
	// 按名称，或别名导入
	import { export, export2 as alias, ...} from "module-name";
	// 导入默认，和其他
	import defaultExport, { export, ... } from "module-name";
	import defaultExport, * as name from "module-name";
	// 不导入模块中的任何内容，只运行模块中的全局代码
	import "module-name";
```
* <mark>注意</mark>：
	* 多次重复执行同一句`import`，只会执行一次。
	* `import` 和 `export` 不能在条件判断中执行，只能放在模块最外层。

### import export 复合
```javascript
export {es6 as default} from 'module'
// =>
import es6 from 'module'
export default es6
```

### 模块继承
```javascript
export * from parent
export var child = 1
```
新模块将继承 parent 中的所有但不包括 default 输出。


### import()
在 ES 中一个提案，建议引入 `import()`，完成动态异步加载。`import()`可以用在任何地方。
```javascript
import(getModuleSrc()).then(module)
```

# CommonJS
基本参照阮一峰的博客，给自己做个学习笔记，方便随时查阅

标准 js 规范是应用于浏览器的。而 commonJS 则是将 js 应用于非浏览器的规范。

> CommonJS API将通过定义处理许多常见应用程序需求的API来填补这一空白，最终提供与Python，Ruby和Java一样丰富的标准库。其目的是让应用程序开发人员能够使用CommonJS API编写应用程序，然后在不同的JavaScript解释器和主机环境中运行该应用程序。通过CommonJS兼容系统，您可以使用JavaScript编写：
> * 服务器端JavaScript应用程序
> * 命令行工具
> * 基于桌面GUI的应用程序
> * 混合应用程序（Titanium，Adobe AIR）
> --------- [CommonJS 官网](http://www.commonjs.org/)

<!-- more -->

## module
CommonJS 规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，`module.exports`是对外的接口。加载某个模块，就是加载该模块的`module.exports`。

CommonJS 模块的特点：
> * 所有代码都运行在模块作用域，不会污染全局作用域
> * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果被缓存，以后再加载就直接读取缓存结果。想要让模块再次运行，必须清除缓存。
> * 模块加载的顺序，按照其在代码中出现的顺序。
> * CommonJS 加载模块是同步的
>>  * Node 只要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式。

Node 内部提供一个`Module`构建函数。所有模块都是`Module`的实例。
每个模块内部都有一个`module`对象，代表当前模块。
> * module.id 模块的识别符，通常是带有绝对路径的模块文件名
> * module.filename 模块的文件名，带有绝对路径
> * module.loaded 返回一个布尔值，表示模块是否已经完成加载
> * module.parent 返回一个对象，表示调用该模块的模块
> * module.children 返回一个数组，表示该模块要用到的模块
> * module.exports 表示模块对外输出的值


### module.exports
表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量。

```javascript
var EventEmitter = require('events').EventEmitter
module.exports = new EventEmitter()

setTimeout(() => {
  module.exports.emit('ready')
}, 1000)
// 上面的模块会在加载后1秒，发出 ready 事件。其他文件监听该事件，可以写成
var a = require('./a')
a.on('ready', () => {
  console.log('module a is ready')
})
```
### exports 变量
为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports 。
* 注意：
  * 不能直接将 exports 变量指向一个值，这样等于将 exports 重新赋值。
  * 如果一个模块的对外接口就是一个单一的值，不能使用 exports 输出，只能使用 module.exports 输出。

## require
require 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。

* 注意
  * require 返回的是一个对象

### require 加载规则
require 命令加载文件时，默认加载`.js`文件

* 加载文件
  1. 以'/'开头，表示加载一个位于绝对路径的模块文件
  2. 以'./'开头，表示加载一个位于相对路径（相对于当前执行脚本的位置）的模块文件
  3. 不以'/'或'./'开头，表示加载一个默认提供的核心模块，或者位于各级node_modules 目录的已安装模块
  4. 如果指定的模块文件没有找到，Node 会尝试为文件名添加'.js', '.json', '.node'，再去搜索

* 加载目录
  - require 发现需要加载一个目录时，会自动查看目录的 package.json 文件，然后加载 main 字段指定的入口文件。如果没有 main 字段，或者没有 package.json 文件，则会加载该目录下的 index.js 文件或 index.node 文件。

* 模块的缓存
  - 第一次加载某个模块时，Node 会缓存该模块。再加载时，直接从缓存读取该模块的 module.exports 属性。
  - 所有缓存的模块保存在 require.cache 中，删除缓存：
  ```javascript
  delete require.cache[moduleName]
  ```

# AMD

AMD 规范是非同步加载模块，允许指定回调函数。在浏览器环境，要从服务器端加载模块，这是就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。

## 使用
AMD 规范使用 define 方法定义模块：
```javascript
define(['needs'], function (lib) {
  function foo() {
    lib.log('hello world!')
  }
  return { // 返回的模块内容
    foo: foo
  }
})
```
<!-- more -->
## require.js
页面在加载 js 时，浏览器会停止网页渲染，加载的文件越多，网页失去响应的时间就会越长；而 js 文件之间存在依赖关系，因此必须严格保证加载顺序。

```html
<script src="js/require.js" data-main="js/main" defer async="true" ></script>
```
* async 表明文件需要异步加载，避免网页失去响应。IE 不支持这个属性，只支持 defer 。
* data-main 指定网页程序的主模块，会第一个被 require.js 加载

### require()

```javascript
// main.js
require(['moduleA', 'moduleB', ...], function(moduleA, moduleB, ...){})
```

### require.config()

```javascript
require.config({
  baseUrl: "",
  paths: {
    "jquery": "lib/jquery.min"
  }
})
```

# 参考资料
* [ES6 入门](http://es6.ruanyifeng.com/#docs/module)
* [MDN web docs - import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
* [MDN web docs - export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
* [JavaScript 标准参考教程 - CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html)
* [CommonJS 官网](http://www.commonjs.org/)
* [CommonJS in browser](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)
* [require.js](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
