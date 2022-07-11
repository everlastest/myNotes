## 1 安装

```Apache
npm i -g typescript
```

## 2 简单使用

新建一个ts文件在里面写下下面这行代码

```Apache
console.log('hello,ts')
```

执行：node 文件名.ts

编译成js：tsc 文件名.ts

## 3 基本使用

```TypeScript
let a: number;
a = 10;
// a = 'hello'; 此行代码会报错
// 即使有错误也默认可以编译成js
// 可以编译成任何版本的js

//如果变量声明和赋值时同时进行的，会自动进行类型检测
let c: boolean = true;

/*
function sum(a, b) {
    return a + b
}

console.log(sum(123, 456)) // 579
console.log(sum(123, "456")) // "123456"*/

function sum(a: number, b: number): number {
    return a + b
}

let result = sum(123, 456)
console.log(sum(123, 456))
// console.log(sum(123,'456')) 报错
```

## 4 变量

1. 字面量

```TypeScript
// 也可以直接用字面量
let a: 10
a = 10
// a = 11 报错
```

2. | 连接多个类型

```TypeScript
//可以使用|来连接多个类型（联合类型）
let b: "male" | "female"
b = "male"
b = "female"


let c: boolean | string
c = true
c = 'hello'
```

3. Any

```TypeScript
// 设置any后相当于关闭类型检测，不建议使用，不写默认any
let d: any
d = 10
d = true
d = 'hello'
```

4. Unknown

```TypeScript
//unknown 表示位置类型的值
let e: unknown
e = 10
e = 'hello'
let s: string
s = d
// s = e 会报错
// unknown是一个类型安全的any
// unknown类型的变量，不能直接复制给其他变量
if (typeof e === "string") {
    s = e
}
```

5. 类型断言

```TypeScript
// 类型断言，可以用来告诉解析器变量的实际类型
/*
* 语法：
* 变量 as 类型
* <类型>变量
* */
s = e as string
s = <string>e
```

6. Void

```TypeScript
// void 表示没有返回值
function fn(num): void {

}
```

7. Never

```TypeScript
// never 表示永远都没有值
function fn2(): never {
    throw new Error('报错了！')
}
```

8. 对象

```TypeScript
// {} 用来指定对象中可以包含哪些属性
// 在属性后边加上？，表示属性是可选的
let o: { name: string, age?: number }
o = {name: '孙', age: 18}
```

9. propName

```TypeScript
// [propName:string]:any 表示任意属性
let p: { name: string, [propName: string]: any }
p = {name: '王', age: 18, gender: '男'}
```

10. 函数

```TypeScript
// 设置函数结构的类型声明
// 语法：(形参:类型,形参:类型...) => 返回值
let q: (a: number, b: number) => number
q = function (n1, n2): number {
    return 10
}
```

11. 数组

```TypeScript
//设置数组结构的类型声明
/*
* 语法：
* 类型[]
* Array<类型
*/

// string 表示字符串数组
let r: string[]
r = ['a', 'b', 'c']
let g: Array<number>
g = [1, 2, 3]
```

12. 元组

```TypeScript
// 元组：固定长度的数组
/*
* 语法：[类型，类型，类型]
*/
let h: [string, string]
h = ['1', '2']
```

13. enum枚举

```TypeScript
// enum枚举
enum Gender {
    Male,
    Female
}
let k: { name: string, age: Gender }
k = {
    name: '孙',
    age: Gender.Male
}
```

14. 类型别名

```TypeScript
//类型别名
type myType = 1 | 2 | 3 | 4 | 5;
let t: myType
let t1: myType
```

## 5 编译选项

