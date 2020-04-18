/*var name = 'zach'

while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //obama
*/
let name = 'zach'

while (true) {
    let name = 'obama'
    console.log(name)  //obama
    break
}

console.log(name)  //zach
/*
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10*/

var a = [];
for(let i =0; i<10; i++){
	a[i] = function(){
		console.log(i);
	};
}
a[6]();



/*class Animal {
    constructor(){
        this.type = 'animal'
        console.log(this.type)
    }
    says(say){
        setTimeout(function(){
        	//this-->setTimeout方法对象
        	console.log(this)
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}*/
class Animal{
	constructor(){
		this.type = 'animal'
	}
	says(say){
		setTimeout(()=>{
			console.log(this.type + ' say hi')
		},1000)
	}
}

 var animal = new Animal()
 animal.says('hi')  //undefined says hi

 console.log(`flaskdjf
 	fjssldkfj
 	`)

let cat = 'cat'
let dog = 'dog'
let zoo = {cat,dog}
console.log(zoo)

let dog0 = {type:'animal',many:2}
let {type,many} = dog0
console.log(type,many);

console.log(`
	`);

function defaultFn(type = 'defaultVal'){
	console.log(type)
}

defaultFn()

function restFn(...types){
	console.log(types)
}
restFn(1,2,3)
restFn(1,2,3,4,5,6)



