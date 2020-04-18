---
title: 正则表达式
date: 2018-06-12 17:26:44
tags: [正则表达式]
categories: 技工蓝翔
toc: true
---
本篇不介绍unicode,进制相关内容

# 介绍
* 语法模式
	- `/表达式/修饰符`
	- `new RegExp(表达式, 修饰符)` 参数都为字符串，需考虑转义
	```
	/\w+/  <==>  new RegExp("\\w+")
	```
	- ES6新增
		* new 时允许第一个参数为正则对象可以使用第二个参数，返回的正则对象的修饰符以第二个参数为主

<!-- more -->
* 修饰符
	- **i**： 大小写不敏感
	- **g**： 全局匹配，找到所有的匹配
	- **m**： 多行匹配，除了匹配整个字符串开头和结束外，还分别匹配其中的换行符前后
* ES6后新增的修饰符
	- u：Unicode模式
	- y：粘连（sticky）修饰符，全局匹配；后一次匹配都从上一次匹配成功的下一个位置开始；匹配必须从剩余字符串的第一个位置开始；隐含了头部标识^
	- s：dotAll模式。ES2018引入，使得.可以匹配任意单个字符


# 常用字符
## 非打印字符
换行、回车、制表等符号

字符| 描述
:-----| :---------------------
\f		| 换页符
\n		| 换行符
\r		| 回车符
\s		| 任何空白字符，包括空格、制表、换页等。[\f\n\r\t\v]
\S		| 任何非空白字符，[^\f\n\r\t\v]
\t		| 制表符
\v		| 垂直制表符

## 位置字符
字符| 描述
:-----| :-----------------------------
^			| 匹配输入字符串开始的位置
$			| 匹配输入字符串结尾的位置
\b		| 匹配一个字边界，即字与空格间的位置
\B		| 非字边界匹配

* 边界符的使用： 需要匹配某个单词时/\bword\b/，单词的边界可以为空格，符号，换行等。使用\b来指定匹配单个单词。

## 特殊字符
字符| 描述
:-----| :---------------------
\			| 转义字符
.			| 匹配除换行符（\n）之外的任何<mark>单个</mark>字符
x&#166;y| x或y
[]		| 字符集合，匹配所包含的任意<mark>一个</mark>字符。
[^]		| ^在[]中表示“非”
[0-9]	| 字符范围。匹配范围内的任意<mark>一个</mark>字符。

## 限定符
匹配前面子表达式的次数，N表示多次

字符| 描述
:----| :---------------------
*			| 0-N次
+			| 1-N次
?			| 0/1次
{m}		| m次
{m,}	| m-N次
{m,n}	| m-n次

## 通过\的转义字符
字符| 描述
:-----| :---------------------
\d		| 数字字符。[0-9]
\D		| 非数字字符。[^0-9]
\w		| 包括下划线的任何单词字符。[a-zA-Z0-9_]
\W		| 非单词字符。[^a-zA-Z0-9_]


# RegExp类型
## RegExp实例属性
* global: 是否设置了g修饰符
* ignoreCase: 是否设置了i修饰符
* multilin: 是否设置了m修饰符
* lastIndex: 开始搜索下一个匹配项的字符位置，0
* source: 正则表达式的字符串表示，字面量形式
* ES6新增
	- unicode：是否设置u修饰符
	- sticky：是否设置了y修饰符
	- flags：返回正则表达式的修饰符

## RegExp实例方法
* <span id="exec">exec</span>  返回包含第一个匹配项信息的数组。如果未找到匹配，则返回值为 null。在数组中，第一个项是与整个模式匹配的字符串，其他项是与模式中捕获组匹配的字符串
```javascript
  /e/.exec("The best things in life are free!")
  // => ["e",index:2,input:"The best things in life are free!", groups:undefined]
```
* test  检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。
*  <mark>注意</mark>： exec,test 方法在正则设置为全局模式时，每调用一次，都会在剩下的字符串中搜索匹配，直到匹配不到时重新从字符串头部开始搜索。lastIndex的值也会在调用后增加,直到重头开始。
```javascript
var a = /e/g
a.exec("The best things in life are free!")
a.lastIndex // 6
a.exec("The best things in life are free!")
a.lastIndex //23
a.exec("The best things in life are free!")
a.lastIndex //27
a.test("The best things in life are free!") // true
a.lastIndex //31
a.exec("The best things in life are free!")
a.lastIndex //32
a.exec("The best things in life are free!") // null
a.lastIndex //0
```




## RegExp构造函数属性
在执行exec() 或 test() 之后

长属性 | 段属性 	| 说明
:-------|:-------|:-------------
input			| $_	 	| 最近一次要匹配的字符串
lastMatch		| $&		| 最近一次的匹配项
<span id="lastParen">lastParen</span>		| $+		| 最近一次匹配的捕获组
leftContext	| $\`		| input字符串中lastMatch之前的文本
multiline		| $*		| 是否所有表达式都使用多行模式
rightContext	| $'		| input字符串中lastMatch之后的文本
null					| $num		| 存储匹配的捕获组 1~9
```javascript
var text = 'this has been a short summer'
var p = /(.)hort/g
p.test(text) // true
RegExp.input // "this has been a short summer"
RegExp.lastMatch // short
RegExp.lastParen // s
RegExp.leftContext // "this has been a "
RegExp.rightContext // " summer"
```


# 重点字符
## 圆括号()/捕获组
* **(pattern)**： 匹配pattern并获取这一匹配，<mark>存储供以后使用</mark>
```javascript
/(e)/.exec("The best things in life are free!")
// ["e", "e", index:5, input: "...", groups: undefined]
```

## 数字引用
<mark>\num</mark>：num为正整数。对所获取的匹配的引用。“(.)\1”匹配两个连续的相同字符
```javascript
/y(..)(.)\2\1/.exec('yabccab')
// ["yabccab", "ab", "c", index: 0, input: "...", groups: undefined]
/y((..)\2)\1/.exec('yabababab')
// ["yabababab", "abab", "ab", index: 0...]
```

## 具名组匹配
`(?<name>pattern)`：ES2018引入 ，为每一个匹配组指定一个名字 <br>
```javascript
/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/.exec('2018-6-12')
// ["2018-6-12", "2018", "6", "12", index: 0, input: "2018-6-12",
// groups:{year: "2018", month: "6", day: "12"}]
```
* 注意：replace时使用`$<name\>`获取


# 贪婪与非贪婪模式
* **贪婪**： 在整个表达式匹配成功的前提下，<mark>尽可能多的匹配</mark>
	* 贪婪模式的量词（匹配优先量词）： {m,n}   {m,}  {m}   ?   *   +
* **非贪婪**： 在整个表达式匹配成功的前提下，<mark>尽可能少的匹配</mark>
	* 在匹配优先量词后加上"?"，即变成属于非贪婪模式的量词（忽略优先量词）
```javascript
var a = /\d+/
var b = /\d+?/
a.exec('1234')
// ["1234", index: ...]
b.exec('1234')
// ["1", index: ...]
```


# 断言/匹配/....
* **(?:pattern)**： 非获取匹配：匹配pattern但不获取pattern结果，匹配的pattern不进行存储供以后使用。匹配消耗字符：匹配到的pattern会放入最终匹配结果
	- `patternA(?:patternB)` 匹配A和B，结果为A+B，但是无法用数字定位或[lastParen](#lastParen)获取
```javascript
var a = /(\d{3})(?:[^$])/g
a.exec('12345678')
// ['1234',  '123', index: ...]
a.lastIndex // 4
a.exec('12345678')
// ['5678', '567', index: ...]
```
* **(?=pattern)**： 非获取匹配；正向肯定断言（匹配）。匹配前面子表达式的<mark>后面</mark>是pattern的，匹配结果为前面的子表达式。<mark>匹配不消耗字符</mark>。
	- `patternA(?=patternB)` 匹配A和B，A在B前面，最终结果为A
```javascript
var b = /(\d{3})(?=[^$])/g
b.exec('12345678')
// ['123', '123', index: ...]
```
	- `(?=patternA)(?=patternB)` 同时满足两个条件，但不计入最终匹配结果
* **(?!pattern)**： 非获取匹配；正向否定断言（匹配）。匹配前面子表达式的后面<mark>不是</mark>pattern的，匹配结果为前面的子表达式。<mark>匹配不消耗字符</mark>
	- `patternA(?!patternB)` 匹配A但是不能匹配B，最终结果为A
* **(?<=pattern)**： 非获取匹配；反向肯定断言（匹配）
	- `(?<=patternA)patternB` 匹配A和B，最终结果为B
* **(?<!pattern)**： 非获取匹配；反向否定断言（匹配）
	- `(?<!patternA)patternB` 不匹配A但是匹配B，最终结果为B
* **<mark>匹配不消耗字符</mark>**：
	- 有一些内容不希望出现在结果里，但是不用它又匹配不全，使用这种情况的匹配模式
	- 此种匹配模式匹配的pattern不计入最终结果，也就是不占最终长度。


# String对象方法

## match(RegExp)
本质与RegExp的[exec()](#exec)方法相同。

## search(RegExp)
返回字符串中第一个匹配项的索引；如果没有则返回-1。始终从字符串开头向后查找。

## replace(RegExp/String, String/Function)
* param1
	1. String 只会替换第一个子字符串。
	2. RegExp
		- 若想全局替换，使用正则的全局模式。
		- 在全局正则replace中，执行流程： 每匹配(执行match/exec)一次，将匹配到的字符串($0)或者匹配组中的字符串($1-9)替换为第二个参数，直到匹配结束。
* param2
	1. String 可以使用一些特殊的字符，将正则表达式得到的值插入到结果字符串中。
	2. Function(matchs, pos, originalText)
		* matchs: 包含匹配结果和匹配项
		* pos: 模式匹配项在字符串中的位置
		* originalText: 原始字符串

字符	|	替换文本
:-----	| :---------
&#36;&		| 与 regexp 相匹配的子串。RegExp.lastMatch
&#36;'		| 匹配子字符串之前的字符串。RegExp.leftContext
&#36;&#96;| 匹配子字符串之后的字符串。RegExp.rightContext
&#36;n		| 匹配第n个捕获组的子字符串，n=1~99
\$&#36;	| &#36;

* 例子
```javascript
'1234567890'.replace(/(\d{1,3})(?=(\d{3})+$)/g,function($0, $1, $2, po, te){
	console.log('匹配结果',$0)
	console.log('第一个匹配组',$1)
	console.log('第二个匹配组',$2)
	console.log('匹配的位置',po)
	console.log('原始字符串',te)
	console.log('------------------------')
	return $0+','
})
```

## split(String/RegExp, arrLength)
以param1为分隔，分割字符串，返回数组
- arrLength: 指定数组大小，<= arrLength
```javascript
var colorText = "red,blue,green,yellow";
var colors = colorText.split(/[^,]+/)
// ["", ",", ",", ",", ""]
```

# 一些常用正则
1. 千分位`str.replace(/\d{1,3}(?=(\d{3})+$)/g, "$&,")`
	- 数字千分位是从后往前进行3位分割，也就是这种模式“（匹配的数字+‘,’）+（1-n组3位数字）”
	- （1-n组3位数字）： 剩下的数字为每三位一组的匹配，但是这组匹配不计入最终匹配结果，并不占匹配位数。`(?=(\d{3})+$)`
	- 匹配的数字： 匹配的数字在1-3位之间 `\d{1,3}`
	- 最后，将匹配结果加上逗号
```javascript
var a = /\d{1,3}(?=(\d{3})+$)/g
a.exec('1234567890')
// ['1, '890', index: ...]
a.exec('12345678')
// ['234', '890', index: ...]
```
2. 6位重复数字`/(\d)\1{5}/`
	- \d匹配一位数字
	- \1获取匹配组匹配到的数字，即(\d)中匹配到的数字
	- {5} 匹配到的数字重复5次
3. 连续数字<br>
	`/(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2}\d/`
4. 密码强度，必须包含大小写字母和数字<br>
	`/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/`
5. 手机号<br>
	`/^1[3578]\d{9}$/`
6. 固定电话<br>
	`/^0(\d{2}-\d{8})|(\d{3}-\d{7})$/`
7. 身份证<br>
	`/^\d{6}(19\d{2}|20[01]\d)(0\d|1[0-2])([0-2]\d|3[01])(\d{3}x|\d{4})$/`
8. 将-分隔转换为小驼峰<br>
	`str.replace(/(-|_)[a-zA-Z]/g, function($0){return $0.slice(1).toUpperCase()})`
```javascript
str.replace(/(^[a-zA-Z])|([-_][a-zA-Z])/g, function($0,$1,$2){
	if($1) {return $1.toUpperCase()}
	else {return $2.slice(1).toUpperCase()}
})
```


# 参考资料
* [JS标准参考教程](http://javascript.ruanyifeng.com/stdlib/regexp.html)
* [ES6正则扩展](http://es6.ruanyifeng.com/#docs/regex)
* [正则表达式速查表](http://www.jb51.net/shouce/jquery1.82/regexp.html)
* [HTML字符转义表](https://blog.csdn.net/deathkon/article/details/78435724)
