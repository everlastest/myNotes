#### 简介

Web APIs是浏览器提供的一套操作浏览器功能和页面元素的API（BOM和DOM）。

结合内置对象的思想来学习

#### DOM

文档对象模型，直接用接口就行

- 文档：一个页面就是一个文档，DOM中使用document表示
- 元素：也米娜中的所有标签都是元素，DOM中使用element表示
- 节点：网页中的所有内容都是节点（标签、属性、文本、注释），DOM中是由node表示

#### 获取元素

- 根据id获取：

  ```js
  var timer = document.getElementById('time')
  console.dir(timer)//更好的查看里面的属性和方法
  ```

- 根据标签获取：

  - 返回数组形式

  ```js
  var lis = document.getElementsByTagName('li')
  console.log(lis[0]);
  ```

- 根据类名获取

  ```js
  var boxes = document.getElementsByClassName('box')
  ```

- 根据指定选择器返回第一个元素对象

  ```js
  var firstbox= document.querySelector('.box')
  var nav= document.querySelector('#nav')
  var li= document.querySelector('li')
  ```

- 根据指定选择器返回所有对象

  ```js
  var lis= document.querySelectorAll('li')
  ```

- 获取html和body元素

  ```
  var body=document.body;
  var html=document.documentElement;
  ```

#### 事件

- 三要素：事件源、事件类型、事件处理程序

  - 事件源：事件被触发的对象 谁 按钮
  - 事件类型：如何触发什么事件 鼠标点击 键盘按下
  - 事件处理程序：通过一个函数赋值的方式 完成

  ```js
  var btn = document.getElementById('btn');
  btn.onclick = function(){
  	alert('点秋香');
  }
  ```

- 步骤

  - 执行事件步骤

  - 获取事件源

    `var div = document.querySelector('div');`

  - 绑定事件

    `div.onclick`

  - 添加事件处理程序

    `btn.onclick = function(){
    	console.log('nihao');
    }`

#### 改变元素内容

- `element.innerText`

  从起始位置到终止位置的内容，但它去除html标签，同时空格和换行也会去掉

- `element.innerHTML`

  起始位置到终止位置的全部内容，包括html标签，同时保留空格和换行

#### 改变元素属性

```js
//获取元素
var ldh = document.getElementById('ldh');
var zxy = document.getElementById('zxy');
var img = document.querySelector('img');
zxy.onclick = function(){
	img.src = 'imgs/zxy.jpg';
    img.title = '张学友';
}
ldh.onclick = function(){
	img.src = 'imgs/ldh.jpg';
    img.title = '刘德华';
}
```

改变视频播放速度：`document.querySelector("video").playbackRate=4`

或`document.getElementsByTagName('video')[0].playbackRate=0.3`

失效选择`document.querySelector('bwp-video').playbackRate= 4`

改变视频失去焦点就自动暂停

```js
var autoplay = setInterval(function () {
    var video = document.getElementsByTagName('video')[0]
    video.play()
}, 1000)
//暂停
clearaInterval(autoplay);
```



#### 改变元素样式

```js
//1.获取元素
var div document.querySelector('div');
//2.注册事件 处理程序
div.onclick = function () {
	this.style.backgroundColor = 'pink';//驼峰命名法
}
```

- 修改样式相当于行内样式

#### **修改className**

写两个类名定义不同CSS样式，通过添加类名来改变样式

适用于大范围的内容

```js
var test = document.queySelector('div');
test.onclick = function(){
	this.className = 'change';//不保留
	this.className = 'first change';//保留
}
```

#### 排他思想

给一群按钮设置样式时，先干掉其他人的样式，再设置我的样式

![image-20220308201602856](C:\Users\86132\AppData\Roaming\Typora\typora-user-images\image-20220308201602856.png)

获得属性的值

- element.属性

  `console.log(div.id)`

- element.getAttribute('属性')

  `console.log(div.getAttribute('id'))`

  自己添加的属性称为自定义属性index

  `console.log(div.getAttribute('index'))`

#### 三种创建元素方法比较

- document.write()

  ```js
  var btn = document.querySelector('button');
  btn.onclick= function(){
      document.write('<div>123</div>');
  }
  ```

  是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘

- innerHTML

  ```js
  var inner = document.querySelector('.inner');
  inner.innerHTML = '<a href="#">百度</a>'
  ```

  添加大量元素需要字符串拼接，慢

  可以采取数组形式拼接，结构稍微复杂

  ```js
  var inner = document.querySelector('.inner');
  var arr = [];
  for(var i = 0;i<=100;i++){
      arr.push('<a href="#">百度</a>');
  }
  inner.innerHTML = arr.join('');
  ```

- document.createElement()

  ```js
  var create = document.querySelector('.create');
  var a = document.createElement('a');
  create.appendChild(a);
  ```

  - 优点：添加大量重复元素是效率高

#### 注册事件

两种方式：传统方式、方法监听注册

- 传统注册方式

  - 利用on开头的事件onclick
  - `<button onclick="alert('nihao')"></button>`
  - `button.onclick=function(){}`
  - 特点：注册事件的唯一性
  - 同一个元素的同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数

- 方法监听注册方式
  - addEventListener()//h5以上
  - attachEvent()//ie9以前
  - 特点：同一个元素同一个事件可以注册多个监听器
  - 按注册顺序一次执行

  ```js
  var btns=querySelectorAll('button');
  butns[0].addEventListener('click',function(){
      alart('nihao');
  })
  ```

#### DOM事件流

事件流描述的是从页面中接收事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程几DOM事件流

三阶段：

- 捕获阶段
- 当前目标阶段
- 冒泡阶段

**注意**

- JS只会执行捕获和冒泡其中的一个阶段

- onclick只会执行冒泡阶段

- addEventListener的第三个参数true为捕获阶段，false为冒泡阶段

  ```html
  <div id="father">
      <div id="son">盒子</div>
  </div>
  ```

  捕获阶段：father->son

  ```js
  var son = document.querySelector('.son');
  son.addEventListener('click',function(){
      alert('son');
  },true);
  var father = document.querySelector('.father');
  father.addEventListener('click',function(){
      alert('father');
  },true);
  ```

  冒泡阶段：son->father

  ```js
  var son = document.querySelector('.son');
  son.addEventListener('click',function(){
      alert('son');
  },false);
  var father = document.querySelector('.father');
  father.addEventListener('click',function(){
      alert('father');
  },false);
  ```

#### 事件对象

event对象代表事件的状态，比如鼠标的位置、鼠标按钮的状态

鼠标触发会得到鼠标的相关信息

键盘触发会得到键盘的相关信息

```js
eventTarget.onclick = function(event){}
eventTarget.addEventlistener('click',function(event){})
```

![image-20220309180015961](C:\Users\86132\AppData\Roaming\Typora\typora-user-images\image-20220309180015961.png)

```js
//e.target返回的是触发事件的对象(点击了哪个元素就返回哪个元素)
//this返回的是注册事件的对象(哪个元素绑定了这个点击事件就返回哪个元素)
var ul =documnet.querySelector('ul');
ul.addEventListener('click',function(e){
	console.log(this);//ul
	console.log(e.target);//li
})
```

阻止默认行为

```js
var a = document.querySelector('a');
a.addEventListener('click',function(e){
	e.preventDefault();//阻止超链接跳转
})
```

#### 阻止冒泡

```js
var son = document.querySelector('.son');
son.addEventListener('click',function(e){
    alert('son');
    e.stopPropagation();//阻止传播
    e.cancelBubble = true;//这个也可以
},false);
var father = document.querySelector('.father');
father.addEventListener('click',function(e){
    alert('father');
},false);
```

#### 事件委托

不是每个子结点单独设置世界监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子结点。

```html
<ul>
	<li>你好</li>
    <li>你好</li>
    <li>你好</li>
    <li>你好</li>
    <li>你好</li>
</ul>
```

```js
var ul = document.querySelector('ul');
ul.addEventListener('click',function(e){
    e.target.style.backgroundColor = 'pink';
})
```

#### BOM

浏览器操作对象

window是顶级对象

包括location，document等对象

window.onload可以在全部加载完成后再加载

```js
window.onload = function(){
     var btn = document.querySelector('button');
     btn.addEventlistener('click',function(){
        alert('dianwo');
     })
}
window.addEventlistener('load',function(){
     var btn = document.querySelector('button');
     btn.addEventlistener('click',function(){
        alert('dianwo');
     })
})
```

#### setTimeout

定时器，延时，单位毫秒

```js
setTimeout(function(){},3000);
var time1=setTimeout(function(){},3000);//标识符
```

停止定时器

```js
var time1=setTimeout(function(){},3000);
clearTimeout(time1);
```

#### setInterval

定时器，重复调用

```js
setInterval(function(){},3000)
```

#### this指向

1. 全局作用域或者普通函数中this指向全局对象window

   ```js
   console.log(this);//window
   function fn(){
   	console.log(this);//window
   }
   setTimeout(function(){
       console.log(this);
   },1000)
   ```

2. 方法调用中谁调用this指向谁

   ```js
   var o = {
       sayHi: function() {
           console.log(this);//this指向的是o这个对象
       }
   }
   o.sayHi();
   var btn =document.querySelector('button');
   btn.onclick = function(){
       console.log(this);//this指向btn
   }
   btn.addEventListener('click',function(){
       console.log(this);//this指向btn    
   })
   ```

3. 构造函数中this指向构造函数的实例

   ```js
   function Fun(){
   	console.log(this);//this指向的是fun实例对象
   }
   var fun = new Fun();
   ```

#### JS执行机制

单线程，同一时间只能做一件事，容易造成阻塞

因此采取异步执行

同步任务放在主线程执行栈，异步任务通过回调函数实现，放在消息队列（任务队列）中，通过**事件循环机制**反复检查任务队列中是否有异步任务，有则回调进执行栈中

#### location对象

属性

![image-20220311134814682](C:\Users\86132\AppData\Roaming\Typora\typora-user-images\image-20220311134814682.png)

可以实现页面跳转

 方法：

- location.assign()

  记录浏览历史，可以实现回退功能

- location.reload()

  刷新界面，强制刷新参数加true

- location.replace()

  不记录浏览历史，无法回退

#### navigator对象

得到浏览器相关信息

#### history对象

和浏览器历史记录进行交互

- history.forward()
- history.back()
- history.go(1)//前进1步

#### 节流阀

当一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。

核心思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数

#### 本地存储

**sessionStorage**

- 生命周期为关闭浏览器窗口

- 在同一个窗口下都可以使用数据

- 键值对形式

  ```js
  sessionStorage.setItem(key,value);
  sessionStorage.getItem(key);
  sessionStorage.removeItem(key);
  sessionStorage.clear();
  ```

**locationStorage**

- 生命周期永久有效，除非手动删除

- 可以多窗口共享数据

- 键值对

  ```javascript
  localStorage.setItem(key,value);
  localStorage.getItem(key);
  localStorage.removeItem(key);
  localStorage.clear();
  ```

  

