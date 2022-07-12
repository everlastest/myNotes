# 函数调用中this的指向问题详解

实际情况是这样的：当函数被调用时，除了声明时规定需要接收的形式参数外，函数还会接收两个参数，分别是`this`和`arguments`，因此函数调用方式的不同就会导致`this`的指向不同。

在js中函数的调用模式有4种:

- 方法调用模式
- 函数调用模式
- 构造器调用模式
- apply调用模式

## 一.方法调用模式

当一个函数作为一个对象的属性时，这个函数就被称为方法。

这个方法如果被调用(.方法名()的形式)，且方法中使用了`this`，那么`this`就被绑定到该对象。看下面的例子:

```js
//方法调用模式
console.log('方法调用模式')
let obj = {
    value:0,
    myFn : function (){
        console.log(this)// 指向obj
    }
}
obj.myFn()
```

## 二.函数调用模式

当一个函数不是一个对象的属性时，那么它就是被当作函数调用的。被当作函数调用的时候，函数中如果使用this, this就会指向全局

```js
//函数调用模式
console.log('函数调用模式')
function Fn(){
    let val = 1
    console.log(this)// 指向window
}
Fn()
```

## 三.方法中嵌套函数调用

```js
//函数调用嵌套在方法中呢？
console.log('函数调用嵌套在方法')
let obj1 = {
    value:0,
    myFn : function (){
        console.log(this)// 指向obj1
        let Fn1 = function(){
            console.log(this)// 指向Window
        }
        Fn1()
    }
}
obj1.myFn()
```

## 四.构造函数调用模式

```js
//构造函数调用模式
console.log('构造器调用模式')
function Creator(name,age){
    this.name = name
    this.age = age
    console.log(this)//this指向Creator{name: '小刘', age: 18}
}
let Liu = new Creator("小刘",18)
```

## 五.apply改变this指向

不说了很简单

## 总结

谁调用this，this就指向谁

