---
title: ESLint
date: 2018-06-08 16:24:56
tags: ESLint
categories: 技工蓝翔
toc: true
---
# 基础配置
1. Configuration Comments
	* 使用JavaScript注释把配置信息直接嵌入到代码源文件中
2. Configuration Files
	* 使用.eslintrc.*文件为整个目录（主目录）和它的子目录指定配置信息。

<!-- more -->
## parserOptions
解析器属性设置
```javascript
"parserOptions": {
	"ecmaVersion": 6,  				//默认为5，可以设置6、7、8、9或年份
	"sourceType": "module",  		//默认script ，module（模块）
	"ecmaFeatures": {  				//额外的语言特效
		"globalReturn": false,  	//允许全局的return
		"impliedStrice": false,  	//启用全局strict mode
		"jsx": false  				//启用JSX
	}
}
```

## parser
解析器，默认Espree作为解析器
```
"parser": "esprima"
```

* 兼容的解析器
	* esprima
	* Babel-ESLint 		对Babel解析器的包装
	* typescript-eslint-parser 		把ts转换为ESTree兼容的解析器。通过ESLint来解析ts文件

## evn
一个环境定义了一组预定义的全局变量，可用的环境

```javascript
"evn": {
	"browser": true,  			// 浏览器环境
	"node": true,  				// nodeJS环境
	"commonjs": true,  			// CommonJS环境（用于Browserify/WebPack打包的只在浏览器中运行的代码）
	"shared-node-browser": true,  		// Node.js和Browser通用
	"es6": true, 				// 启用除了modules以外的所有ECMAScript6特性
	"worker": true,  			// WebWorkers
	"amd": true,  				// 将require()和define()定义为想amd一样的全局变量
	"mocha": true,  			// Mocha测试
	"jasmine": true,  			// Jasmine版本1.3和2.0的测试
	"jest": true,  				// Jest测试
	"phantomjs": true,  		// PhantomJS
	"protractor": true,  		// Protractor
	"qunit": true,  			// QUnit
	"jquery": true,  			// jQuery
	"prototypejs": true,  		// Prototype.js
	"shelljs": true,  			// ShellJS
	"meteor": true,  			// Meteor
	"mongo": true,  			// MongoDB
	"applescript": true,  		// AppleScript
	"nashorn": true,  			// Java 8 Nashorn
	"serviceworker": true,  	// Service Worker
	"atomtest": true,  			// Atom
	"embertest": true,  		// Ember
	"webextensions": true,  	// WebExtensions
	"greasemonkey": true,  		// GreaseMonkey
}
```

* 可同时定义多个
* 在注释中这样使用 `/* eslint-env node, mocha */`
* 在特定插件中使用某种环境
	```javascript
	{
		"plugins": ["example"],
		"env": {
			"example/custom": true
		}
	}
	```

## globals
如果想在一个源文件里使用全局变量，推荐在ESLint中定义这些全局变量

```javascript
"globals": {
	"var1": true,
	"var2": false   设置变量为只读
}
```

* 在注释中配置全局变量： `/* global var1, var2:false */`
* 注意：要启用no-global-assign规则来禁止对只读全局变量进行修改


## plugins

```javascript
"plugins": [
	"plugin1",  可以省略 eslint-plugin- 前缀
	"eslint-plugin-plugin2",
	"elsint-plugin-react"   react的JSX语法插件
]
```

## rules使用
* 规则值：
	* "off" / 0 -- 关闭规则
	* "warn" / 1 -- 开启规则，使用警告级别错误
	* "error" / 2 -- 开启规则，使用错误级别错误
* 注释中配置：`/* eslint eqeqeq: "off", curly: 2 */`
* 如果规则有额外配置，使用数组指定 `/* eslint quotes: ["error", "double"] */`
* 配置定义在插件中的规则，使用 `"plugin-name/rule-name": "error"` 的形式
* 禁止规则出现警告
	* 禁止某段代码块
	```javascript
	/* eslint-disable no-alert, no-console*/
	alert('foo');
	/* eslint-enable */
	```
	* 禁止整个文件，将 `/* eslint-disable */` 放在文件顶部
	* 禁止某行 `// eslint-disable-line`，`// eslint-disable-next-line`

## settings
在配置文件添加共享设置。提供给每一个将被执行的规则。对插件中的某些属性再做设置。
如：<br>
[html/html-extensions: ['.html', '.wpy']](https://github.com/BenoitZugmeyer/eslint-plugin-html)

## extends
继承配置

* rules 中如果只指定规则级别，则继承后包含基础规则的额外规则；如果包含额外规则，则直接替换基础规则
* `"extends":"eslint:recommended"` ，启用在规则页面标记为✅的核心规则
* `"extends":["pathA", "pathB"]`

## 配置文件使用

* 完整的配置层次结构，由高到低的优先级
	1. 行内配置
		1. `/* eslint-disable*/` 和 `/* eslint-enable */`
		2. `/*global*/`
		3. `/*eslint*/`
		4. `/*eslint-env*/`
	2. 命令行
	3. 项目级配置：
		1. 与检测文件在同一目录下
			1. .eslintrc.js
			2. .eslintrc.yaml
			3. .eslintrc.yml
			4. .eslintrc.json
			5. .eslintrc
			6. package.json -- eslintConfig
		2. 继续在父级目录寻找，直到根目录，或直到发现一个 `"root": true` 的配置

* `"root": true` 在当前根目录中寻找配置

# ESLint 三大通用规则
## eslint-config-google
google标准
## eslint-config-airbnb
- eslint
- eslint-plugin-import
- eslint-plugin-react
- eslint-plugin-jsx-a11y

## eslint-config-standard
前端工程师自定标准
- [standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)
- 细则

| rules                                                                | 描述                                                  | 备注                         |
| -------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------- |
| [semi](http://eslint.cn/docs/4.0.0/rules)                            | 不要使用分号                                          |                              |
| [no-unexpected-multiline](http://eslint.cn/docs/4.0.0/rules)         | 不要使用 (, [, or ` 等作为一行的开始                  |                              |
| [indent](http://eslint.cn/docs/4.0.0/rules/indent)                   | 使用两个空格缩进                                      | 2,"tab"                      |
| [quotes](http://eslint.cn/docs/4.0.0/rules/quotes)                   | 字符串使用单引号，转义除外                            | double,single,backtick       |
| [no-unused-vars](http://eslint.cn/docs/4.0.0/rules/no-unused-vars)   | 不再有冗余变量                                        |                              |
| [keyword-spacing](http://eslint.cn/docs/4.0.0/rules/keyword-spacing) | 关键字后加空格                                        | before:true;after:true       |
| [space-before-function-paren](http://eslint.cn/docs/4.0.0/rules)     | 函数名后加空格                                        |                              |
| [space-infix-ops](http://eslint.cn/docs/4.0.0/rules)                 | 字符串拼接操作符直接留空格                            |                              |
| [comma-spacing](http://eslint.cn/docs/4.0.0/rules)                   | 逗号后面加空格                                        |                              |
| [key-spacing](http://eslint.cn/docs/4.0.0/rules)                     | 键值对中冒号与值留空白                                |                              |
| [func-call-spacing](http://eslint.cn/docs/4.0.0/rules)               | 函数调用时标识符与括号不留间隔                        |                              |
| [block-spacing](http://eslint.cn/docs/4.0.0/rules)                   | 单行代码块两边加空格                                  |                              |
| [eqeqeq](http://eslint.cn/docs/4.0.0/rules)                          | 始终用===代替==                                       |                              |
| [brace-style](http://eslint.cn/docs/4.0.0/rules)                     | else关键字要与花括号保持在同一行                      |                              |
| [curly](http://eslint.cn/docs/4.0.0/rules)                           | 多行if语句的括号不能省                                |                              |
| [handle-callback-err](http://eslint.cn/docs/4.0.0/rules)             | 不要丢掉异常处理中的err参数                           |                              |
| [no-undef](http://eslint.cn/docs/4.0.0/rules)                        | 使用浏览器全局变量时加上window.前缀                   | 除document,console,navigator |
| [no-multiple-empty-lines](http://eslint.cn/docs/4.0.0/rules)         | 不允许连续多行空行                                    |                              |
| [operator-linebreak](http://eslint.cn/docs/4.0.0/rules)              | 对于三元运算符?和: 与他们所负责的代码处于同一行       |                              |
| [one-var](http://eslint.cn/docs/4.0.0/rules)                         | 每个var关键字单独声明一个变量                         |                              |
| [no-cond-assign](http://eslint.cn/docs/4.0.0/rules)                  | 条件语句中赋值语句使用括号包起来                      |                              |
| [camelcase](http://eslint.cn/docs/4.0.0/rules)                       | 对于变量和函数名统一使用驼峰命名法                    |                              |
| [comma-dangle](http://eslint.cn/docs/4.0.0/rules)                    | 不允许有多余的行末逗号                                |                              |
| [comma-style](http://eslint.cn/docs/4.0.0/rules)                     | 始终将逗号置于行末                                    |                              |
| [dot-location](http://eslint.cn/docs/4.0.0/rules)                    | 点操作符须与属性在同一行                              |                              |
| [eol-last](http://eslint.cn/docs/4.0.0/rules)                        | 文件末尾留一空行                                      |                              |
| [new-cap](http://eslint.cn/docs/4.0.0/rules)                         | 构造函数以大写字母开头                                |                              |
| [new-parens](http://eslint.cn/docs/4.0.0/rules)                      | 无参构造函数调用时要带上括号                          |                              |
| [accessor-pairs](http://eslint.cn/docs/4.0.0/rules)                  | 对象中定义了存值器，一定要对应的定义取值器            |                              |
| [constructor-super](http://eslint.cn/docs/4.0.0/rules)               | 子类构造器中一定要调用super                           |                              |
| [no-array-constructor](http://eslint.cn/docs/4.0.0/rules)            | 使用数组字面量而不是构造器                            |                              |
| [no-caller](http://eslint.cn/docs/4.0.0/rules)                       | 避免使用 arguments.callee 和 arguments.caller         |                              |
| [no-class-assign](http://eslint.cn/docs/4.0.0/rules)                 | 避免对类名重新赋值                                    |                              |
| [no-const-assign](http://eslint.cn/docs/4.0.0/rules)                 | 避免修改使用 const 声明的变量                         |                              |
| [no-constant-condition](http://eslint.cn/docs/4.0.0/rules)           | 避免使用常量作为条件表达式的条件（循环语句除外）      |                              |
| [no-control-regex](http://eslint.cn/docs/4.0.0/rules)                | 正则中不要使用控制符                                  |                              |
| [no-debugger](http://eslint.cn/docs/4.0.0/rules)                     | 不要使用 debugger                                     |                              |
| [no-delete-var](http://eslint.cn/docs/4.0.0/rules)                   | 不要对变量使用 delete 操作                            |                              |
| [no-dupe-args](http://eslint.cn/docs/4.0.0/rules)                    | 不要定义冗余的函数参数                                |                              |
| [no-dupe-class-members](http://eslint.cn/docs/4.0.0/rules)           | 类中不要定义冗余的属性                                |                              |
| [no-dupe-keys](http://eslint.cn/docs/4.0.0/rules)                    | 对象字面量中不要定义重复的属性                        |                              |
| [no-duplicate-case](http://eslint.cn/docs/4.0.0/rules)               | switch 语句中不要定义重复的 case 分支                 |                              |
| [no-duplicate-imports](http://eslint.cn/docs/4.0.0/rules)            | 同一模块有多个导入时一次性写完                        |                              |
| [no-empty-character-class](http://eslint.cn/docs/4.0.0/rules)        | 正则中不要使用空字符                                  |                              |
| [no-empty-pattern](http://eslint.cn/docs/4.0.0/rules)                | 不要解构空值                                          |                              |
| [no-eval](http://eslint.cn/docs/4.0.0/rules)                         | 不要使用 eval()                                       |                              |
| [no-ex-assign](http://eslint.cn/docs/4.0.0/rules)                    | catch 中不要对错误重新赋值                            |                              |
| [no-extend-native](http://eslint.cn/docs/4.0.0/rules)                | 不要扩展原生对象                                      |                              |
| [no-extra-bind](http://eslint.cn/docs/4.0.0/rules)                   | 避免多余的函数上下文绑定                              |                              |
| [no-extra-boolean-cast](http://eslint.cn/docs/4.0.0/rules)           | 避免不必要的布尔转换                                  |                              |
| [no-extra-parens](http://eslint.cn/docs/4.0.0/rules)                 | 不要使用多余的括号包裹函数                            |                              |
| [no-fallthrough](http://eslint.cn/docs/4.0.0/rules)                  | switch 一定要使用 break 来将条件分支正常中断          |                              |
| [no-floating-decimal](http://eslint.cn/docs/4.0.0/rules)             | 不要省去小数点前面的0                                 |                              |
| [no-func-assign](http://eslint.cn/docs/4.0.0/rules)                  | 避免对声明过的函数重新赋值                            |                              |
| [no-global-assign](http://eslint.cn/docs/4.0.0/rules)                | 不要对全局只读对象重新赋值                            |                              |
| [no-implied-eval](http://eslint.cn/docs/4.0.0/rules)                 | 注意隐式的 eval()                                     |                              |
| [no-inner-declarations](http://eslint.cn/docs/4.0.0/rules)           | 嵌套的代码块中禁止再定义函数                          |                              |
| [no-invalid-regexp](http://eslint.cn/docs/4.0.0/rules)               | 不要向 RegExp 构造器传入非法的正则表达式              |                              |
| [no-irregular-whitespace](http://eslint.cn/docs/4.0.0/rules)         | 不要使用非法的空白符                                  |                              |
| [no-iterator](http://eslint.cn/docs/4.0.0/rules)                     | 禁止使用`__iterator__`                                |                              |
| [no-label-var](http://eslint.cn/docs/4.0.0/rules)                    | 外部变量不要与对象属性重名                            |                              |
| [no-labels](http://eslint.cn/docs/4.0.0/rules)                       | 不要使用标签语句                                      |                              |
| [no-lone-blocks](http://eslint.cn/docs/4.0.0/rules)                  | 不要书写不必要的嵌套代码块                            |                              |
| [no-mixed-spaces-and-tabs](http://eslint.cn/docs/4.0.0/rules)        | 不要混合使用空格与制表符作为缩进                      |                              |
| [no-multi-spaces](http://eslint.cn/docs/4.0.0/rules)                 | 除了缩进，不要使用多个空格                            |                              |
| [no-multi-str](http://eslint.cn/docs/4.0.0/rules)                    | 不要使用多行字符串                                    |                              |
| [no-new](http://eslint.cn/docs/4.0.0/rules)                          | 创建对象实例后需要赋值给变量                          |                              |
| [no-new-func](http://eslint.cn/docs/4.0.0/rules)                     | 禁止使用 Function 构造器                              |                              |
| [no-new-object](http://eslint.cn/docs/4.0.0/rules)                   | 禁止使用 Object 构造器                                |                              |
| [no-new-require](http://eslint.cn/docs/4.0.0/rules)                  | 禁止使用 new require                                  |                              |
| [no-new-symbol](http://eslint.cn/docs/4.0.0/rules)                   | 禁止使用 Symbol 构造器                                |                              |
| [no-new-wrappers](http://eslint.cn/docs/4.0.0/rules)                 | 禁止使用原始包装器                                    |                              |
| [no-obj-calls](http://eslint.cn/docs/4.0.0/rules)                    | 不要将全局对象的属性作为函数调用                      |                              |
| [no-octal](http://eslint.cn/docs/4.0.0/rules)                        | 不要使用八进制字面量                                  |                              |
| [no-octal-escape](http://eslint.cn/docs/4.0.0/rules)                 | 字符串字面量中也不要使用八进制转义字符                |                              |
| [no-path-concat](http://eslint.cn/docs/4.0.0/rules)                  | 使用 __dirname 和 __filename 时尽量避免使用字符串拼接 |                              |
| [no-proto](http://eslint.cn/docs/4.0.0/rules)                        | 使用 getPrototypeOf 来替代 `__proto__`                |                              |
| [no-redeclare](http://eslint.cn/docs/4.0.0/rules)                    | 不要重复声明变量                                      |                              |
| [no-regex-spaces](http://eslint.cn/docs/4.0.0/rules)                 | 正则中避免使用多个空格                                |                              |
| [no-return-assign](http://eslint.cn/docs/4.0.0/rules)                | return 语句中的赋值必需有括号包裹                     |                              |
| [no-self-assign](http://eslint.cn/docs/4.0.0/rules)                  | 避免将变量赋值给自己                                  |                              |
| [no-self-compare](http://eslint.cn/docs/4.0.0/rules)                 | 避免将变量与自己进行比较操作                          |                              |
| [no-sequences](http://eslint.cn/docs/4.0.0/rules)                    | 避免使用逗号操作符                                    |                              |
| [no-shadow-restricted-names](http://eslint.cn/docs/4.0.0/rules)      | 不要随意更改关键字的值                                |                              |
| [no-sparse-arrays](http://eslint.cn/docs/4.0.0/rules)                | 禁止使用稀疏数组（Sparse arrays）                     |                              |
| [no-tabs](http://eslint.cn/docs/4.0.0/rules)                         | 不要使用制表符                                        |                              |
| [no-template-curly-in-string](http://eslint.cn/docs/4.0.0/rules)     | 正确使用 ES6 中的字符串模板                           |                              |
| [no-this-before-super](http://eslint.cn/docs/4.0.0/rules)            | 使用 this 前请确保 super() 已调用                     |                              |
| [no-throw-literal](http://eslint.cn/docs/4.0.0/rules)                | 用 throw 抛错时，抛出 Error 对象而不是字符串          |                              |
| [no-trailing-spaces](http://eslint.cn/docs/4.0.0/rules)              | 行末不留空格                                          |                              |
| [no-undef-init](http://eslint.cn/docs/4.0.0/rules)                   | 不要使用 undefined 来初始化变量                       |                              |
| [no-unmodified-loop-condition](http://eslint.cn/docs/4.0.0/rules)    | 循环语句中注意更新循环变量                            |                              |
| [no-unneeded-ternary](http://eslint.cn/docs/4.0.0/rules)             | 如果有更好的实现，尽量不要使用三元表达式              |                              |
| [no-unreachable](http://eslint.cn/docs/4.0.0/rules)                  | return，throw，continue 和 break 后不要再跟代码       |                              |
| [no-unsafe-finally](http://eslint.cn/docs/4.0.0/rules)               | finally 代码块中不要再改变程序执行流程                |                              |
| [no-unsafe-negation](http://eslint.cn/docs/4.0.0/rules)              | 关系运算符的左值不要做取反操作                        |                              |
| [no-useless-call](http://eslint.cn/docs/4.0.0/rules)                 | 避免不必要的 .call() 和 .apply()                      |                              |
| [no-useless-computed-key](http://eslint.cn/docs/4.0.0/rules)         | 避免使用不必要的计算值作对象属性                      |                              |
| [no-useless-constructor](http://eslint.cn/docs/4.0.0/rules)          | 禁止多余的构造器                                      |                              |
| [no-useless-escape](http://eslint.cn/docs/4.0.0/rules)               | 禁止不必要的转义                                      |                              |
| [no-useless-rename](http://eslint.cn/docs/4.0.0/rules)               | import, export 和解构操作中，禁止赋值到同名变量       |                              |
| [no-whitespace-before-property](http://eslint.cn/docs/4.0.0/rules)   | 属性前面不要加空格                                    |                              |
| [no-with](http://eslint.cn/docs/4.0.0/rules)                         | 禁止使用 with                                         |                              |
| [object-property-newline](http://eslint.cn/docs/4.0.0/rules)         | 对象属性换行时注意统一代码风格                        |                              |
| [padded-blocks](http://eslint.cn/docs/4.0.0/rules)                   | 代码块中避免多余留白                                  |                              |
| [rest-spread-spacing](http://eslint.cn/docs/4.0.0/rules)             | 展开运算符与它的表达式间不要留空白                    |                              |
| [semi-spacing](http://eslint.cn/docs/4.0.0/rules)                    | 遇到分号时空格要后留前不留                            |                              |
| [space-before-blocks](http://eslint.cn/docs/4.0.0/rules)             | 代码块首尾留空格                                      |                              |
| [space-in-parens](http://eslint.cn/docs/4.0.0/rules)                 | 圆括号间不留空格                                      |                              |
| [space-unary-ops](http://eslint.cn/docs/4.0.0/rules)                 | 一元运算符后面跟一个空格                              |                              |
| [spaced-comment](http://eslint.cn/docs/4.0.0/rules)                  | 注释首尾留空格                                        |                              |
| [template-curly-spacing](http://eslint.cn/docs/4.0.0/rules)          | 模板字符串中变量前后不加空格                          |                              |
| [use-isnan](http://eslint.cn/docs/4.0.0/rules)                       | 检查 NaN 的正确姿势是使用 isNaN()                     |                              |
| [valid-typeof](http://eslint.cn/docs/4.0.0/rules)                    | 用合法的字符串跟 typeof 进行比较操作                  |                              |
| [wrap-iife](http://eslint.cn/docs/4.0.0/rules)                       | 自调用匿名函数 (IIFEs) 使用括号包裹                   |                              |
| [yield-star-spacing](http://eslint.cn/docs/4.0.0/rules)              | yield * 中的 * 前后都要有空格                         |                              |
| [yoda](http://eslint.cn/docs/4.0.0/rules)                            | 请书写优雅的条件语句（avoid Yoda conditions）         |                              |


# eslint in WebPack
* 在 webpack 中如何关闭 eslint？
	- 不要加载'eslint-loader'

# Rules
[Rules 中文](http://eslint.cn/docs/rules/)
