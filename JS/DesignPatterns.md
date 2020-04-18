---
title: JS 与 设计模式
toc: true
date: 2018-07-03 11:43:02
tags: [JS, 设计模式]
categories: 踏踏实实
---
# 单例模式
产生一个类的唯一实例。对于前端，方法返回唯一的对象。

<!-- more -->
```javascript
// 包装器
var singleton = function (fn) {
  let result
  // 闭包，result 会一直存在
  return function () {
    // 桥接模式
    return result || ( result = fn.apply(this, arguments))
  }
}
// 创建生成 mask 的方法
var createMask = singleton( function () {
  return document.body.appendChild( document.createElement('div') )
} )
```

# 简单工厂模式
由一个方法决定到底要创建哪个类的实例，这些实例通常都拥有相同的接口。

主要用在所实例化的类型在编译阶段并不能确定，而是在执行阶段决定。

一般是通过传不同的参数，生成不同的对象，拥有相同的方法（同名...）

# 观察者模式(发布者-订阅者)
订阅者等待发布者发布消息

```javascript
Events = function () {
  let listen, obj, remove, trigger, __this
  obj = {}
  __this = this
  listen = function (key, eventfn) { // key：订阅方式
    let stack   // stack 存储订阅人收到发布后要执行的方法
    // 同一种订阅方式可能会有多个订阅者，需要用数组存起来
    let _ref = obj[key]
    stack = _ref != null ? _ref : obj[key] = []
    return stack.push( eventfn )
  }
  trigger = function () { // 发布消息
    let fn, stack, _i, , key
    // 获取第一个参数为 key
    let key = Array.prototype.shift.call( arguments )
    let _ref = obj[key]
    stack = _ref != null ? _ref : obj[key] = []
    for (_i = 0; _i < stack.length; _i++) {
      fn = stack[ _i ]
      if ( fn.apply( __this, arguments ) === false ) {
        return false
      }
    }
    return {listen, one, remove, trigger}
  }
}

let adultTv = Event()
adultTv.listen( 'play', data => {})

adultTv.trigger( 'play', {name: ''})
```

# 适配器模式


# 代理模式
把对一个对象的访问，交给另一个代理对象来操作
