---
layout: darfts
title: JS 知识点
tags:
  - JS
toc: true
categories: 踏踏实实
date: 2018-07-03 11:41:06
---

记录在JS学习中记不住的点

<!-- more -->

# Function.prototype: call(), apply(), bind()
函数通过调用call() 和 apply()来间接调用函数本身，但是会修改这个函数调用的上下文（this）

```javascript
fn.call(thisObj [, param1, param2 ...])

fn.apply(thisObj [, paramsArray])

/**
 * 返回一个新函数，调用新函数时会将原函数当做 thisObj 的函数进行调用
 * 当 bind 中除了thisObj，还传入其他实参时，实参会绑定到 this 上，在调用返回的新函数时，所传参数将减少
 */
fn.bind(thisObj [, param1 ...])

var sum = function (x, y) { return x + y}
var succ = sum.bind(null, 1)
succ(2) // => 3
```
