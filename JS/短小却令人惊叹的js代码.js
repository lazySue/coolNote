// 短小却令人惊叹的JS代码

var uid = +new Date()

// 数组去重
function dedupe(arr) {
	return Array.from(new Set(arr))
}



// 评级组件
function getRate(rate) {
	console.log("★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)); 
}

// 随机6位数字 
var ran = Math.floor(Math.random() * 999999)

// 快速取整 
console.log(~~47.11)
console.log(20.15 | 0)
console.log((-20.15) ^ 0)
console.log((-20.15) << 0)

// 随机字符串 
var ran2 = Math.random().toString(16).substring(2)

// 整数交换数值 
var a, b
a ^= b
b ^= a
a ^= b

// 一串字符串中每个字母出现的次数
var arrString = 'abcdaabc';
arrString.split('').reduce((prev, cur) => {
	prev[cur] ? prev[cur] ++ : prev[cur] = 1
	return prev
})