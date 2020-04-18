redux
=
##基础概念
    APP(1) === store(1)[createStore()] === state(n)[store.getState()];
    state(1) === view(1);
###action
    action 是个对象，包含操作名称和改动的state
      {
        type:'action_name',
        ...data
      }
    改变state的唯一方法就是使用action,将数据运送到store
###action creator
    生成action的函数
    fn actionCreator(action_name,data){
      return {
        type:action_name,
        ...data
      }
    }
###store.dispatch
    view 发出 action 的唯一方法
    接收一个 action 参数
###reducer
    store收到action后，必须给出一个新的state，view才能变化。这种state计算过程就是reducer。
    纯函数，接收action 和 当前的state，返回新的state
###store.subscribe
    设置监听函数
    unsubscribe = createStore(reducer).subscribe(listener);
    unsubscride() 解除监听
###中间件
    在store.dispatch 环节添加功能
    import {applyMiddleware, createStore } from 'redux';
    createStore(reducer,applyMiddleware(中间件));
    reduce-promise 异步中间件  使得store.dispatch接收一个promise作为参数