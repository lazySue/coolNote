---
title: Mock.js
toc: true
date: 2018-06-20 17:49:27
tags: [Mock.js, 前端测试]
categories: 技工蓝翔
---
mock测试 就是在前端测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试。

Mock.js可以生成随机数据，<mark>拦截Ajax请求<mark>。使得前端能独立于后端开发。

# 安装
执行命令行，在项目本地安装，版本为1.0.1
```bash
npm install mockjs --save-dev
```
<!-- more -->

# 使用
Mock 的几种方法：
* mock(url?, type?, template|fn(opts)) 根据数据模板生成随机数据
> - url: string|regexp； 拦截的请求地址
  - type: string；ajax 请求类型。GET、POST、PUT、DELETE等
  - template: object|string；数据模板
  - fn: 生成响应数据的函数
  - opts: 包含 ajax 请求的参数（url,type,body）
```javascript
// 引入mockjs
import Mock from 'mockjs'
// const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
	let articles = [];
	for (let i = 0; i < 100; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 30), //  Random.csentence( min, max )
			thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		articles.push(newArticleObject)
	}
	return {
		articles: articles
	}
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
```
>

* setup(setting) 配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。
> {timeout: '200-600'} | {timeout: 400}

* Random 用于生成各类数据
>  - 占位符引用的是就是 Random 中的方法
   - 可自行扩展
```javascript
Random.extend({
  constellation: function(date) {
    var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations)
  }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }
```
>

* valid(template, data)    校验 data 是否与 template 匹配

## in Vue
在Vue 中配合axios 使用时，请求的过程如下：
1. axios.post
2. axios.interceptors.request
3. Mock
4. axios.interceptors.response
5. axios.post().then()

## 注意
我们在项目中使用时可以创建 mock 文件夹，一个js文件中放一个或多个生成数据的方法（一个方法针对一个请求），再用一个 mock.js 引入这些方法，并设置 mock 函数。开发时在项目的首页引入mock.js，即可获取随机数据进行开发测试。

# 语法规范
Mock 中对于生成随机数据有一定的规范

## 数据模板定义规范（Data Template Definition,DTD）
数据模板中的每个属性由3部分构成：属性名、生成规则、属性值；`'name|rule': value`

* rule
>   1. min-max
    2. count
    3. min-max.dmin-dmax
    4. min-max.dcount
    5. count.dmin-dmax
    6. count.dcount
    7. +step
    - rule 的含义需要依赖属性值的类型才能确定

* value 属性值
> - 属性值可以含有`@占位符`
  - 属性值指定了最终值的初始值和类型
> - String
>>    - `'name|min-max': string`
      通过重复 string 生成一个字符串，重复次数大于等于 min ，小于等于 max
    - `'name|count': string`
      通过重复 string 生成一个字符串，重复次数等于 count
>
> - Number
>>    - `'name|+1': number`
      属性值自动加1，初始值为number
    - `'name|min-max': number`
      生成一个大于等于 min ，小于等于 max 的整数，属性值 number 只是用来确定类型
    - `'name|min-max.dmin-dmax': number`
      生成一个浮点数，整数部分大于等于 min ， 小于等于 max ，小数部分保留 dmin 到 dmax 位
>
> - Boolean
>>    - `'name|1': boolean`
      随机生成一个布尔值，值为true的概率是1/2
    - `'name|min-max': value`
      随机生成一个布尔值，值为value的概率是 min/(min+max)，值为!value 的概率是 max/(min+max)
>
> - Object
>>    - `'name|count': object`
      从属性值object中随机选取count个属性
    - `'name|min-max': object`
      从属性值object中随机选择min到max个属性
>
> - Array
>>    - `'name|1': array`
      从属性值array中随机选取1个元素，作为最终值
    - `'name|+1': array`
      从array中顺序选取1个元素，作为最终值
    - `'name|min-max': array`
      通过重复array生成一个新数组，重复次数大于等于min，小于等于max
    - `'name|count': array`
      通过重复array生成一个新数组，重复次数为count
>
> - Function
>>    - `'name': function`
      执行函数，取其返回值作为最终的属性值，函数的上下文为'name'所在的对象
>
> - RegExp
>>    - `'name': regexp`
      根据正则表达式反向生成可以匹配它的字符串

## 数据占位符定义规范（Data Placeholder Definition,DPD）
* 占位符
  - 在属性值字符串中占个位置，并不出现在最终的数据中
  - `@占位符（参数[, 参数]）`
* Basic 基础占位符
> boolean, natural(min,max)自然数, integer(min,max), float(min,max,小数点minLength,dmax)
>
> character(字符池) 'lower/upper/number/symbol/字符串'
>
> string(字符池,minLength,maxL), range(startL,stopL,间隔)=>array
>
> date(format), time(format), datetime(format)
>
> now('year/month/week/day/hour/minute/second', format)

* Image
> image(size, bg, fg,format,text), dataImage(size,text)

* Color
> color

* Text
> paragraph(min,max), sentence, word, title, cparagraph, csentence, cword, ctitle
> c: 中文

* Name
> first, last, name(middle:boolean), cfirst, clast, cname

* Web
> url, domain, email, ip, tld, protocol

* Address
> region, province, city, county, zip

* Helper
> capitalize, upper, lower, pick, shuffle

* Miscellaneous
> guid, id

# 参考资料
* [Mock.js](http://mockjs.com/)
* API管理平台/在线 mock 服务
  - [eolinker](https://www.eolinker.com/#/)
  - [YAPI](http://yapi.demo.qunar.com/)
  - [DOClever](http://www.doclever.cn/controller/index/index.html)
  - [easy-mock](https://www.easy-mock.com/docs)
