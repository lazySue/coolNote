# Proxy
用于修改某些操作的默认行为，可以理解为：拦截、代理

###语法糖
```
var proxy = new Proxy(target, handler)
```
>**target**: 拦截的目标对象<br>
>**handler**: 要拦截的操作；如果handler为空对象，则proxy实例等同于直接操作原target对象
>>*使用proxy来代替直接对target的操作*

###eg1
```
var obj = new Proxy({}, {
  	get: function (target, key, receiver) {
    	console.log(`getting ${key}!`);
    	return Reflect.get(target, key, receiver);
  	},
  	set: function (target, key, value, receiver) {
    	console.log(`setting ${key}!`);
    	return Reflect.set(target, key, value, receiver);
  	}
})
obj.count = 1
// setting count!
++obj.count
//  getting count!
//  setting count!
```
>例子中Proxy拦截了get，set操作（重载了点运算符）

###eg2
```
var person = {
  name: 'ZHANGSAN'
}
var proxy = new Proxy(person, {
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError('Property ' + property + 'dose not exist.')
    }
  }
});
```

###使用技巧
>将Proxy对象，设置到object.proxy属性上，从而可以在object对象上调用
>>`var object = { proxy: new Proxy(target, handler) };`
>
>Proxy实例作为其他对象的原型对象
>
>>```
>var proxy = new Proxy({}, {
>  get: function(target, property) {
>    return 35;
>  }
>});
>let obj = Object.create(proxy);
>obj.time // 35
>```

##常用的Proxy的拦截操作
* **get(target, propKey, receiver)**
> * 函数链式调用
>
>```
var pipe = (function () {
	return function (value) {
    	var funcStack = [];
    	var oproxy = new Proxy({} , {
      	get : function (pipeObject, fnName) {
        	if (fnName === 'get') {
        		// reduce 接收一个函数作为累加器，处理数组中的值
          	return funcStack.reduce(function (val, fn) {
            		return fn(val);
          	},value);
        	}
        	funcStack.push(window[fnName]);
        	return oproxy;
      	}
    });
    return oproxy;
 	}
}());
var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get; // 63
>```
>
> * 可用做get属性时不存在警报

* **set(target, propKey, value, receiver)**
	* 可用作set值时，属性值的范围设置
	* receiver: 原始操作行为所在的那个对象，一般情况下是proxy实例本身
* **has(target, propKey)**：拦截`propKey in proxy`
* **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`
* **apply(target, object, args)**：拦截proxy作为函数调用的操作，入`proxy(...args)`,`proxy.call(object, ...args)`,`proxy.apply(...)`
* **construct(target, args)**：拦截proxy作为构造函数调用的操作，`new proxy(...args)`




