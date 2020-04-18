---
title: axios
tags:
  - axios
  - http-client
  - WEB
categories: Cool
toc: true
date: 2018-06-28 17:26:35
---

可用于浏览器和 node.js 的基于 Promise 的 HTTP 客户端

# 使用

使用`npm install axios`下载到项目本地，或者 `<script>` 引入

<!-- more -->

```javascript
// 加载模块
import axios from 'axios'

// 默认配置
axios.default.timeout = 6000

// 拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

axios.post('/login').then(res => {})

async function getUser() {
  try {
    const res = await axios.get('/user?id=12345')
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}
```

# axios(config)
直接调用 `axios()` 或 `axios(url,config)` 方法发送请求
```javascript
axios({
  method: 'post',
  url: '/user',
  data: {
    firstName: 'Monkey',
    lastName: 'Luffy'
  }
})
```

## request config
```javascript
{
  url: '/url1',
  method: 'get', //默认 get
  baseURL: 'https:...',
  transformRequest: [ // 在请求数据发送到服务器之前对其进行修改（put, post, patch）
    (data, headers) => {
      // 处理数据
      return data  // 必须返回一个数据
    }
  ],
  transformResponse: [(data) => {return data}],
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  params: {id: 12345}, // 与请求一起发送的 url 参数
  paramsSerializer: params => { // params 序列化
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  data: {}, // 作为请求体发送的数据（put, post, patch）
  timeout: 5000,
  withCredentials: false, // 默认 false，是否跨站点访问
  adapter: config => {}, // 自定义处理请求
  auth: {
    username: '',
    password: ''
  },
  responseType: 'json', // 默认 json ; arraybuffer, blob, document, json, text, stream
  responseEncoding: 'utf8', //默认 utf8 ;
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRT-TOKEN',
  onUploadProgress: (progressEvent) => {},
  onDownloadProgress: (pregressEvent) => {},
  maxContentLength: 2000,
  validateStatus: (status) => {
    return status >= 200 && status < 300; // 默认; 决定 resolve or reject
  },
  maxRedirects: 5, // default; node
  socketPath: null, // default; node
  httpAgent: new http.Agent({keepAlive: true}), // node
  httpsAgent: new https.Agent({keepAlive: true}), // node
  proxy: {
    host: '',
    port: 9000,
    auth: {
      username: '',
      password: ''
    }
  },
  cancelToken: new CancelToken( cancel => {})
}
```

# 各种请求方式
* request(config)
* get(url, config)          像特定资源发出请求
* delete(url, config)       请求服务器删除请求地址所标识的资源
* head(url, config)         向服务器索要与 GET 请求一致的响应，只不过响应体不会被返回。可以在不传输整个响应内容的情况下，就获取包含响应头中的元信息
* options(url, config)      返回服务器针对特定资源所支持的 HTTP 请求方法。也可以利用向 web 服务器发送 `*` 的请求来测试服务器的功能性。
* post(url, data, config)   向指定资源提交数据进行处理请求
* put(url, data, config)    向指定资源位置上传其最新内容
* patch(url, data, config)  对 put 的补充，用来对已知资源进行局部更新。

# 并发处理
* all(iterable)       处理多个请求，返回一个数组
* spread(callback)    将 all 返回的数组 `[res1, res2]` 展开为 `res1, res2`
```javascript
axios.all([axios.get('/url1'), axios.post('/url2')])
  .then(axios.spread((res1, res2) => {
    console.log(res1)
    console.log(res2)
  }))
```

# 实例

```javascript
// 创建实例
const instance = axios.create({
  baseURL: 'https://.....',
  timeout: 5000,
  headers: {}
})
```

# 返回数据
```javascript
{
  data: {},
  status: 200,
  statusText: 'ok',
  headers: {},
  config: {},
  request: {}
}
```
# 默认配置
```javascript
// 全局和实例的默认配置
axios.defaults.baseURL = 'https://'
axios.defaults.timeout = 5000
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
...
// 请求中的 config 会重写默认配置中的 config
```

# 拦截器
```javascript
const reqInterceptor = axios.interceptors.request.use( config => {
  return config
}, err => {
  return Promise.reject(err)
})
const reqInterceptor = axios.interceptors.response.use( response => {
  return response
}, err => {
  return Promise.reject(err)
})
// 删除拦截器
axios.interceptors.request.eject(reqInterceptor)
```

# 取消请求
```javascript
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.post('/url1', {params: 1}, {cancelToken: source.token})
// 取消请求
source.cancel('Operation canceled by the user.')

let cancel
axios.get('/url1', {
  cancelToken: new CancelToken( function executor(c) {
    cancel = c
  })
})
cancel() // 取消请求
```

# 设置重新请求
```javascript
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

axios.interceptors.response.use(response => {}, function axiosRetryInterceptor(err) {
  let config = err.config
  // 判断是否设置重新请求
  if (!config || !config.retry) return Promise.reject(err)
  // 设置重新请求次数
  config.__retryCount = config.__retryCount || 0
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err)
  }
  // 请求次数增加
  config.__retryCount++
  // 设置延时 promise
  let backoff = new Promise( re => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1)
  })
  // 延时后重新发送 axios(config)
  return backoff.then( () => {
    return axios(config)
  })
})
```
# 请求方式使用 application/x-www-form-urlencoded
application/x-www-form-urlencoded 是 Jquery 的 ajax 请求默认方式，好处是浏览器都支持，在请求发送过程中会对数据进行序列号处理，以键值对形式`?key=value&k=v`的方式发送到服务器。

对于浏览器端，在 axios 中可以使用以下方式将 object 转换为键值对字符串
* URLSearchParams 浏览器 API （注意浏览器是否支持）
  ```javascript
  const params = new URLSearchParams()
  params.append('param1', 'value1')
  params.append('param2', 'value2')
  axios.post('/foo', params)
  ```

* ES6
  ```javascript
  import qs from 'qs'
  // const qs = require('qs')
  axios.post('/foo', qs.stringify({bar: 123}))
  ```


#  参考资料
* [axios github](https://github.com/axios/axios)
* [ES6 promise polyfill](https://github.com/stefanpenner/es6-promise)
* [node Qs](https://www.npmjs.com/package/qs)
* [jquery.param](http://api.jquery.com/jquery.param/)
