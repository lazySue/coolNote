# 新基础类型
## 元组：允许表示一个已知元素数量和类型的数组。
    let x: [string, number] // 已知数组长度为2，且0为string，1为number；另数组元素类型可为string, number,
    x = ['hello', 10] // ok
    x = [10, 'hello'] // error
## 枚举：默认从0开始编号；若手动指定第一个下标后，将从指定开始编号。
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green
    enum Color2 {Red = 1, Green, Blue}
    let colorName: string = Color2[2] // colorName => 'Green'
    
# 接口
    为类型命名，为代码定义契约
## ① 可选属性：使用?表示属性为非必须
    interface SquareConfig {
        color?: String;
        width?: number;
    }
    function createSquare(config: SquareConfig) {}
## ② 只读属性：interface Point {readonly x: number}
    ReadonlyArray<T> 只读数组，将改变数组的方法去掉了
## ③ 额外的属性检查
    当实现接口时给出了额外的属性，会让 TS 认为代码可能有 bug，可以绕开这些检查
    1. 使用类型断言
        let mySquare = createSquare({width: 100, opacity: 0.5} as Square)
    2. 添加一个字符串索引签名，前提是能够确定这个对象可能具有某些作为特殊用途使用的额外属性。
        interface SquareConfig {
            color?: string;
            width?: number;
            [propName: string]: any; // 可以有任意数量的属性，只要不是已明确声明的即可。
        }
    3. 将参数复制给另一个变量
        let squareOptions = {colour: 'red', width: 100};
        let mySquare = createSquare(squareOptions)
## ④ 函数类型
    使用接口表示函数类型，只有参数列表和返回值类型的函数定义
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc = function(source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    }
## ⑤ 可索引的类型
    与函数类型差不多，它具有一个索引签名，描述了对象索引的类型，和相应的索引返回值类型。
    interface StringArray {
        [index: number]: string;
    }
    let myArray: StringArray;
    myArray = ['bob', 'fred'];
    let myStr: string = myArray[0]
    TS支持两种索引签名：字符串和数字。数字索引的返回值必须是字符串索引返回值类型的子类型。当使用 number 来索引时，js 会将它转换成 string 再去索引。
## ⑥ 类 类型
    与 Java 中接口的基本作用一样，可以用它来明确强制一个类去符合某种契约。
    接口描述了类的公共部分，无法定义类的静态部分。
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date); // 描述一个方法
    }
    class Clock implements ClockInterface {
        currentTime: Date;
        setTime(d: Date) { // 实现这个方法
            this.currentTime = d;
        }
        constructor(h: number, m: number) {}
    }
## ⑦ 继承接口
    接口可以相互继承，继承多个
## ⑧ 混合类型
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }
    function getCounter(): Counter{
        let counter = <Counter>function (start: number) {};
        counter.interval = 123;
        counter.reset = function() {};
        return counter;
    }
    let c = getCounter()
    c(10);
    c.reset();
    c.interval = 5;
## ⑨ 接口继承类
    继承到类中存在的成员的声明，不包括实现；
    会继承类的 private 和 protected 成员；
    这个接口只能被类或者子类实现。

# 类
    在 TS 中，成员默认为 public。
    protected成员在子类中仍然可以访问，但是不能在类外使用。
    readonly 只能在声明时或构造函数里被初始化。
    在构造函数中使用了参数属性(public,private,protected,readonly)表示声明了一个类成员。
## ① 继承 extends
    在子类中使用 super 表示父类，在子类构造函数中访问 this 之前必须先调用 super();
## ② 存取器
    控制对对象成员的访问
    get name(): string {return this._name}
    set name(newName: string) {}
## ③ 静态成员 static
    使用类名访问。
## ④ 抽象类
    做为其他派生类的基类使用。一般不会直接被实例化。抽象类可以包含成员的实现细节。
    abstract class Animal {
        abstract makeSound(): void; // 只定义，不能有具体实现
        move(): void {
            console.log('roaming the earch...')
        }
    }
    抽象类中的抽象方法必须在派生类中实现。

# 函数
## ① 可选参数 默认参数
    可选参数必须跟在必须参数后面。
    function buildName(firstName: string, lastName?: string)
    参数默认值
    function buildName(firstName: string, lastName = 'smith')
## ② 剩余参数
    function buildName(firstName: string, ...restOfName: string[])
## ③ this
    匿名函数的 this 为 window
    可以为函数提供一个显式的 this 参数，出现在参数列表的最前面
## ④ 重载
    函数参数不同类型，不同个数会导致函数的重载

# 泛型
    类型变量，只表示某种类型
## ① 使返回值的类型与传入参数类型相同
    <> 声明类型变量，函数中使用，不止作为参数类型，可定义多个类型变量
    function identity<T>(arg: T): T { return arg; }
    let output = identity<string>('myStr'); // 明确指定 T 是 string，在使用时也可以不用明确指定 identity('myStr')
    T 表示任意类型，不可指定属性
## ② 泛型类型
    let myIdentity: <T>(arg: T) => T      = identity;
    // 变量类型定义                         赋值
    有调用签名的对象定义泛型函数
    let myIdentity: {<T>(arg: T): T}      = identity;
    泛型接口
    interface GenericIndentityFn {
        <T>(arg: T): T;
    }
    function identity<T>(arg: T): T {
        return arg;
    }
    let myIdentity: GenericIndentityFn = identity;
## ③ 泛型类
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }
    类的静态属性不能使用这个泛型类型。
## ④ 泛型约束
    若定义的类型变量是拥有某种属性的接口，则，该类型变量的数据必须拥有其属性。
    类型变量可继承类或接口
    interface Lengthwise {
        length: number;
    }
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

# 枚举
    使用枚举可以定义一些带名字的常量。
    支持数字和基于字符串的枚举
## ① 数字枚举
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    }
    // Direction.Right
    // Up初始化为 1，其余成员会从 1 开始自动增长。若不初始化，则从 0 开始

# Symbol
    表示不可改变且唯一的.
    let sym1 = Symbol();
    可以被用做对象属性的键
    let obj = {[sym1]: 'value', [sym2]() {return 'C'}}

# 迭代器和生成器
## ① 可迭代性
        当一个对象实现了 Symbol.iterator 属性时，认为是可迭代的。
        for..of 用来遍历可迭代的对象。迭代 value。for..in 迭代 key。

# 模块
    【内部模块】==》【命名空间】
    【外部模块】==》【模块】
    【module X {}】==> 【namespace X {}】
    模块在其自身的作用域里执行，而不是在全局作用域；模块是自声明的；在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。
## ① 导出
    - Validation.ts
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    - ZipCodeValidator.ts
    export const numberRegexp = /^[0-9]+$/
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
    export {ZipCodeValidator};
    或 export {ZipCodeValidator as mainValidator};
    - ParseIntBasedZipCodeValidator.ts
    export class ParseIntBasedZipCodeValidator {
        isAcceptable(s: string) {
            return s.length === 5 && parseInt(s).toString() === s;
        }
    }
    // 重新导出
    export {ZipCodeValidator as RegExpBasedZipCodeValidator} from './ZipCodeValidator';
    - AllValidators.ts
    export * from './StringValidator'; // exports interface StringValidator
    export * from './ZipCodeValidator'; // exports class ZipCodeValidator
## ② 导入
    几种 import 
        import {ZipCodeValidator} from './ZipCodeValidator';
        let myValidator = new ZipCodeValidator();
        import {ZipCodeValidator as ZCV} from './ZipCodeValidator';
        import * as validator from './ZipCodeValidator';
        let myValidator = new validator.ZipCodeValidator();
    具有副作用的导入
        设置一些全局状态，或没有任何导出，或用户不关注它的导出
            import './my-module.js';
## ③ 默认导出
    一个模块只能有一个 default 导出。
        JQuery.d.ts
        declare let $: JQuery;
        export default $;
        App.ts
        import $ from 'JQuery';
        $('button.continue').html();
    类和函数声明可以直接被标记为默认导出。可省略名字。
        export default class ZipCodeValidator {}  

        import validator from './ZipCodeValidator';
        let myValidator = new validator();
        导出值
        export default '123';
## ④ export = 和 import = require()
    export = ZipCodeValidator;
    import zip = require('./ZipCodeValidator');
## ⑤ 使用其他 JS 库
    外部模块
        可以使用顶级的 export 声明来为每个模块都定义一个.d.ts 文件，最好写在一个大的.d.ts 中。
        - xxx.d.ts 声明文件
        declare module 'url' {
            export interface Url {}
            export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
        }
        declare module 'path' {
            export function normalize(p: string): string;
            export function join(...paths: any[]): string;
        }
        可以使用 /// <reference path="xxx.d.ts"> 引入模块
        import * as URL from 'url';
        let myURL = URL.parse('http://');
## ⑥ 创建模块结构指导
    尽可能在顶层导出
    如果仅导出单个 class 或 function ，使用 export default
    如果要导出多个对象，把它们放在顶层导出
    明确的列出导入的名字
    使用命名空间导入模式，当你要导出大量内容时
    使用重新导出进行扩展
    模块里不要使用命名空间

# 命名空间
    确保不与其他对象产生命名冲突
## 使用命名空间的验证器
    namespace Validation {
        export interface ...
        export class ...
    }
    // 使用
    new Validation.ClassName()
## 分离到多文件
    - validation.ts
    namespace Validation {
        export interface StringValidator ...
    }
    - lettersOnlyValidator.ts
    /// <reference path="validation.ts" />
    namespace Validation {
        export class lettersOnlyValidator implements StringValidator ...
    }
    - test.ts
    /// <reference path="validation.ts" />
    /// <reference path="lettersOnlyValidator.ts" />
    new Validation.lettersOnlyValidator()
## 使用其他 JS 库
    declare namespace D3 {
        export interface Selectors {}
        export interface Base extends Selectors {}
    }

# 命名空间和模块
    命名空间：位于全局命名空间下的一个普通的带有名字的 JS 对象。
    模块：模块可以声明它的依赖。（推荐）
    陷阱
        对export 的模块使用/// <reference>   ❌  应该使用 import ✅

# 模块解析
    相对 VS 非相对模块导入
        相对导入：以 /，./或../开头的
            相对于本文件，不能解析为一个外部模块声明。自己写模块使用相对导入，确保运行时的相对位置
        非相对：import * as $ from 'JQuery'    import {} from '@angular/core'
            相对于 baseUrl 或通过路径映射进行解析。可以被解析为外部模块声明。使用非相对路径来导入外部依赖。

#声明合并
    接口合并
        接口的非函数成员应该是唯一的，若两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器报错；
        每个同名函数成员会被当成这个函数的重载，后面的接口具有更高优先级。
    命名空间合并
        从其他命名空间合并进来的成员无法访问非导出成员
    全局扩展
        - observable.ts
        export class Observable<T> {}
        declare global {
            interface Array<T> {
                toObservable(): Observable<T>;
            }
        }
        Array.prototype.toObservable = function () {}

# JSX
    基本用法
        1.给文件一个.tsx 扩展名
        2.启用 jsx选项
        TS具有三种 JSX 模式： preserve， react，react-native。
    。。。

# 装饰器
    - tsconfig.json
    {
        compilerOptions: {
            target: 'ES5',
            experimentalDecorators: true
        }
    }
    特殊类型的声明，
# Mixins
    除了传统的面向对象继承方式，还可以通过可重用组件创建类的方式（联合另一个简单类的代码）
    // mixin 1
    class Disposable {
        isDisposed: boolean;
        dispose() {
            this.isDisposed = true;
        }
    }
    // mixin 2
    class Activatable {
        isActive: boolean;
        activate() {
            this.isActive = true;
        }
        deactivate() {
            this.isActive = false;
        }
    }

    // 将类当成接口实现，为将要 mixin 进来的属性方法创建出占位属性。
    class SmartObject implements Disposable, Activatable {
        constructor() {
            setInterval(() => console.log(this.isActive + ': ' + this.isDisposed), 500)
        }
        interact() {
            this.activate();
        }
        isDisposed: boolean = false;
        dispose: () => void;
        isActive: boolean = false;
        activate: () => void;
        deactivate: () => void;
    }
    // 将 mixins 混入定义的类，完成全部实现部分
    applyMixins(SmartObject, [Disposable, Activatable]);
    let smartObj = new SmartObject();
    setTimeout(() => smartObj.interact(), 1000)
    // 帮助函数，遍历 mixins 上的所有属性，并复制到目标上，将之前的占位属性替换成真正的实现。
    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        })
    }

# 三斜线指令
    /// <reference path="" />
    三斜线引用告诉编译器在编译过程中要引入的额外文件。
    三斜线指令仅可放在包含它的文件的最顶端。




