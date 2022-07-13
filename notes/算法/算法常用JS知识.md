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