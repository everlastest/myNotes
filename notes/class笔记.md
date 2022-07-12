# class基础结构

```js
class Person {
	constructor(name) {
		this.name = name
	}
    getName(){
        console.log(this.name)
    }
}
```

## super

- 情况一：super作为函数调用时，代表父类的构造函数。
- 情况二：super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class Person {
	constructor(name) {
		this.name = name
	}
    //普通方法其实都挂载到父类原型对象上了
    getName(){
        console.log(this.name)
    }
}
class Student extends Person {
    constructor(name,grade) {
        super(name) //作为函数调用，代表父类构造函数
        this.grade = grade
    }
    getName(){
        super.getName() //普通方法中，指向父类原型对象
        //super.getPerson() 报错
    }
    static getPerson(){
        super.getPerson() //静态方法指向父类
    }
    
}
```

## static

类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承。 如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”。

- 静态方法调用直接在类上进行，而在类的实例上不可被调用。

- 静态方法通常用于创建 实用/工具 函数。

```js
class Person {
    static person = "张三"
	constructor(name) {
		this.name = name
        console.log(person) // person is not defined
        console.log(this.person)// undefined
        console.log(Person.person)// '张三'
	}
    getName(){
        console.log(this.name)
        console.log(person) // person is not defined
        console.log(this.person)// undefined
        console.log(Person.person)// '张三'
    }
    static getPerson(){
        console.log('person')
    }
	static getName(){
        this.getPerson()//在static方法中调用另外一个静态方法可以用this
    }
}
let p = new Person("李四")
p.getName()
p.getPerson()// p.getPerson is not a function
Person.getPerson()
Person.getName()//'person'
```

- 从另一个静态方法为了在同一个类的另一个静态方法中调用一个静态方法，你可以使用 this 关键字。
- 从类的构造函数和其他方法静态方法不能直接在非静态方法中使用 this 关键字来访问，你需要使用类名来调用它们。

## new.target

new.target属性允许你检测函数或构造方法是否通过是通过new运算符被调用的。

- 在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。
- 在普通的函数调用中，new.target 的值是undefined。

```js
class S {
    constructor() {
        console.log(new.target)
    }
}
class A {
    constructor() {
        console.log(new.target)
        console.log(new.target.name)
    }
}
class B extends A{
    constructor() {
        super()
        console.log(new.target.name)
    }
    getName(){
        console.log(new.target)//undefined
    }
}
let s = new S()//class S { constructor() { console.log(new.target) } }
let a = new A()//A
let b = new B()//B B
b.getName()//undefined
```

new.target 最大的作用就是让构造器知道当前到底 new 的是哪个类。

## constructor

构造方法是创建和初始化使用类创建的一个对象的一种特殊方法。

```js
class A {
    constructor(name) {
        this.name = name
    }
}
class B extends A {
    constructor(name, age) {
        super(name)//不写super会报错
        this.age = age
    }
    //person类似于计算属性
    get person() {
        return this.name
    }
    //修改person的值时可以使用
    set person(name) {
        this.name = name
    }
}

let b = new B("张三",18)
console.log(b)// {"name":"张三","age":18}
console.log(b.person)// '张三'
b.person = "李四"
console.log(b.person)// '李四'
```

如果没有显式定义，会默认添加一个空的constructor方法。对于基类，默认构造方法如下:

```js
constructor() {}
```

对于派生类，默认构造方法如下:

```js
constructor(...args) {
  super(...args);
}
```

