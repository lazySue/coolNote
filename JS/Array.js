/*
 * @Author: your name
 * @Date: 2018-05-29 13:46:46
 * @LastEditTime: 2020-10-20 17:55:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coolNote/JS/Array.js
 */
/**
 * reduce 方法
 * 接收一个函数作为累加器，依次处理数组中的数据，最终返回一个数据。
 */
 // 数组reduce方法
 var reducers = {
   totalInEuros: function (state, item ) {
     return state.euros += item.price * 0.897;
   },
   totalInYen: function (state, item) {
     return state.yens += item.price * 113.852
   }
 }
 /**
  * Object.keys() 返回 所有的key值
  * 返回一个方法，两个方法参数
  * @param  {[type]} reducers [description]
  * @return {[function]}          [description]
  */
 var manageReducers = function (reducers) {
   return function (state, item) {
     return Object.keys(reducers).reduce(
       function (nextState, key ) {
         reducers[key](state, item ); // reducers[key] 为一个有两个参数的方法，执行完方法后
         return state;  // 返回state值
       },
       {}
     );
   };
 }
 var bigTotalPriceReducer = manageReducers(reducers);
 var initialState = {euros: 0, yens: 0};
 var items = [{price: 10}, {price: 120}, {price: 1000}]
 var totals = items.reduce(bigTotalPriceReducer, initialState);

 var pipe = (function () {
   return function (value) {
     var funcStack = [];
     var oproxy = new Proxy({}, {
       get: function (pipeObject, fnName) {
         if (fnName === 'get') {
           return funcStack.reduce(function (val, fn){
             return fn(val);
           }, value);
         }
         funcStack.push(window[fnName]);
         return oproxy;
       }
     });
     return oproxy;
   }
 }());
 var double = n => n*2;
 var pow = n => n*n;
 var reverseInt = n => n.toString().split('').reverse().join('') | 0;


 // -------------------------- demo
 // 求学生总成绩
var result = [
  {
    subject: 'math',
    score: 88
  },
  {
        subject: 'chinese',
        score: 95
  },
  {
      subject: 'english',
      score: 80
  }
]
var sum = result.reduce((prev, cur) => {
  return cur.score + prev;
}, 0)
// 成绩占比
var dis = {
  math: 0.5,
  chinese: 0.3,
  english: 0.2
}
var qsum = result.reduce((prev, cur) => {
  return cur.score * dis[cur.subject] + prev;
},0)

 /**
  *  shift() 从数组中删除第一个元素并返回已删除的元素（如果数组为空，则为undefined）。此方法更改数组的长度。
  * */
 