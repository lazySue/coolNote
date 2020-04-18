---
title: wepy基础
date: 2018-05-20 16:40:01
tags: [wepy, 笔记]
categories: 微信小程序
toc: true
---

```javascript
export default class extends wepy.app {
    config = {
        "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    onLaunch() {
        console.log(this);
    }
}
```

<!-- more -->
# 页面和组件 （page也是组件）
```javascript
export default class Page extends wepy.page {
    customData = {}  // 自定义数据
    customFunction ()　{}  //自定义方法
    config = {};  // 只在Page实例中存在的配置数据，对应于原生的page.json文件
    data = {};  // 页面所需数据均需在这里声明，可用于模板数据绑定
    components = {counter1(hmtl使用名称): Counter(引入的组件)};  // 声明页面中所引用的组件，或声明组件中所引用的子组件
    mixins = [];  // 声明页面所引用的Mixin实例
    computed = {};  // 声明计算属性（详见后文介绍）
    watch = {};  // 声明数据watcher（详见后文介绍）
    methods = {};  // 声明页面wxml中标签的事件处理函数。
    // 注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明
    events = {};  // 监听的事件，声明组件之间的事件处理函数(broadcast(p->c), emit(c->p), invoke(组件对组件的调用))
    onLoad () {}  // 在Page和Component共用的生命周期函数
    onShow () {}  // 只在Page中存在的页面生命周期函数
    // Other properties
}
```
# 组件的循环渲染
```html
<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>
```
# computed计算属性
可被当做绑定数据使用，`this.computed`,`{ {computed} }`
```javascript
computed: {
    key: fn(){}
}
```
# watcher监听器
```javascript
watch:{
    key: fn(){} // key需要与data中的属性同名，监听data.key的改变
}
```
# props传值
* 静态传值
```javascript
props:{
    title: string
}
```
```html
<child title="mytitle" ></child>
```
* 动态传值
  * 使用.sync 父组件数据绑定到子组件
  * props的twoWay: true ，子组件数据绑定至父组件

```html
<child :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></child>
```
```javascript
props:{
    title: String,
    syncTitle:{
        type: String,
        default:''
    },
    twoWayTitle: {
        type:Number,
        default: '',
        twoWay: true
    }
}
this.$apply() // 来通知改变
```
# 组件通信交互
```javascript
this.$invoke('组件A', '组件A的方法','args');
```

# 组件自定义事件处理函数
* .user为组件绑定事件  @customEvent.user="Fn"
  * 子组件中通过$emit发出的customEvent事件会被监听到，并执行.user绑定的Fn
  * 相当于父组件的events中的监听
* .default: 绑定冒泡
* .stop:  绑定捕获

# Mixin混合
注入后组件可共用mixin中的数据，方法（先执行组件，再执行mixin）

# interceptor拦截器
对原生API的请求进行拦截
```javascript
app{
    constructor(){
        this.intercept('request', {
            config(){},     // 请求前
            success(){},    // 请求成功后
            fail(){},       // 请求失败后
            complete(){}    // 请求完成（finally）
        })
    }
}
```
# 数据绑定
原生方法
```javascript
this.setData({title:'title'})
// wepyB绑定
this.title = 'title';
// 在异步中需要调用this.$apply();
```
# 优化
```javascript
wepy.request('xxxx').then((d)=>cl(d));
```
