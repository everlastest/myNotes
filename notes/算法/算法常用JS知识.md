# 算法常用JS知识点汇总
## 1 数组模拟栈
```JavaScript
const stack = []
// 入栈
stack.push(item)
// 查看栈顶元素
let peek = stack[stack.length-1]
// 判断栈是否为空
let isEmpty = stack.length===0
// 出栈
stack.pop()
```
## 2 数组模拟队列
```javascript
const queue = []
// 入队列（结尾插入）
queue.push(item)
// 出队列
queue.shift()
// 查看队头元素
let head = queue[0]
// 查看对尾元素
let tail = queue[queue.length-1]
// 判断队列是否为空
let isEmpty = queue.length===0
```
## 3 数组遍历方法
1. forEach

    - 没有返回值
    ```javascript
    const arr = ['1','2','3']
    // 参数分别是item（当前每一项）、index（索引值）、arr（原数组）
    arr.forEach((item,index,arr)=>{
        ...
    })
    ```
2. map
   
    - 创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来
    ```javascript
    const arr = ['1','2','3']
    // 参数分别是item（当前每一项）、index（索引值）、arr（原数组）
    let newArr = arr.map(x => x * 2)
    ```
3. reduce

    - 计算迭代的值

    ```javascript
    const array1 = [1, 2, 3, 4];
    // 0 + 1 + 2 + 3 + 4
    const initialValue = 0;
    // 参数一：方法，方法中又两个参数，其中第一个参数为前一次return的值，第二个参数是当 前数组的值
    // 参数二：初始值，想要遍历第一个元素那必须给一个初始值
    const sumWithInitial = array1.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );

    console.log(sumWithInitial);
    // expected output: 10
    ```
## 4 字符串操作
1. 生成字符数组

```js
let str = "hello world"
const arr1 = str.split("") //'h','e','l','l','o',' ','w','o','r','l','d'
const arr2 = str.split(" ") // 'hello','world'
```
2. 字符串切割

```js
let str = "hello world"
// substring 操作字符串
// 	参数一：起始（包括）
// 	参数二：结尾（不包括）
const str1 = str.substring(0,5) //"hello"
// substr 操作字符串
// 	参数一：起始（包括）
// 	参数二：长度
const str2 = str.substr(0,5) //"hello"
// slice 操作字符串和数组
// 	参数一：起始（包括）
// 	参数二：结尾（不包括）
const str2 = str.slice(0,5) //"hello"
```



## 5 Map

```js
const map = new Map()
// 添加元素
map.put('我','小黑')
// 删除元素
map.delete('我')
// 查找是否存在某元素
map.has('我')
// 查找某个key对应的value
map.get('我')
// map的大小
map.size()
// 清空
map.clear()
```
## 6 set
```js
const set = new Map()
// 添加元素
set.add('我')
// 删除元素
set.delete('我')
// 查找是否存在某元素
set.has('我')
// map的大小
set.size()
// 清空
set.clear()
```

## 7 数组初始化

```js
// length为数组长度，fill的三个参数分别为初始化的值、起始坐标、终止坐标（不包括）
const arr = new Array(length).fill(true,0,length);
```

## 8 数组排序

> 注意：数组排序默认转成字符串，因此要加条件才能进行正确的数字排序

```js
// array.sort()
const arr = [-1, 2, -3, 1];
//compare函数中返回值>0代表更换位置
arr.sort((a, b) => a - b);//从小到大[-3,-1,1,2]
arr.sort((a, b) => b - a);//从大到小[2,1,-1,-3]
const arr1 = ['a','c','b'];
arr.sort();//['a','b','c']
```

