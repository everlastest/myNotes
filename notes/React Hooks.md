

[Hook API 索引 – React](https://zh-hans.reactjs.org/docs/hooks-reference.html)

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 1 useState

相当于类组件里的state和setState，使函数组件成为有状态组件

```
const [state, setState] = useState(initialState);
```

**含义**

state是变量，setState用于更新state

state的初始值为initialState

**用法**

`setState` 接收一个新的 state 值并将**组件的一次重新渲染**加入队列。

```
setState(newState);
```

在后续的重新渲染中，`useState` 返回的第一个值将始终是更新后最新的 state。

> **注意**
>
> React 会确保 `setState` 函数的标识是稳定的，并且不会在组件重新渲染时发生变化。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `setState`。

```JavaScript
import React, { useState } from "react";

export function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => { setCount(i => i + 1) }}>+1</button>
        </div>
    )
}
```

## 2 useEffect

在组件渲染到屏幕之后执行的一个副作用

默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它在只有某些值改变的时候才执行。

 **用法**

```
useEffect(didUpdate);
```

**执行时机**

与 `componentDidMount`、`componentDidUpdate` 不同的是，传给 `useEffect` 的函数会在浏览器完成布局与绘制**之后**，在一个延迟事件中被调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因为绝大多数操作不应阻塞浏览器对屏幕的更新。

**useLayoutEffect**和useEffect功能很像，但两者执行时机不同

- `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

```JavaScript
import React, { useEffect, useState } from "react";

export function App() {
    const [count, setCount] = useState(0);
    
    useEffect(
        () => {
            console.log("你好");
            const timer = setTimeout(() => {
                setCount(count => count + 1)
            }, 1000)

            return () => {
                clearTimeout(timer)
                console.log("再见");
            }
        }, [count < 5 ? count : 5])
    console.log('render');
    return (
        <div className={"useState"}>
            <p>{count}</p>
        </div>
    )
}
```

<img src="/Users/bytedance/note/myNotes/notes/assets/image-20220817151139052.png" alt="image-20220817151139052" style="zoom: 67%;" /> 

## 3 useContext

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

```JavaScript
import React, { createContext, useEffect, useRef, useState, useContext } from "react";

const CountContext = createContext();

function Counter() {
    let count = useContext(CountContext)
    return (
        <>
            <h2>context count:{count}</h2>
        </>
    )
}

export function App() {
    const [count, setCount] = useState(1);

    const handleClick = () => {
        setCount(count + 1)
        console.log("value:" + count);
    }

    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>+1</button>
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}
```

## 4 useReducer

类似于redux

**用法**

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

init是用于惰性初始化的函数

**例子**

```JavaScript
import React, { useReducer } from "react";

const initialState = { count: 0 };
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

export function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleClick(index) {
        if (index === 1) {
            dispatch({ type: 'decrement' })
        } else {
            dispatch({ type: 'increment' })
        }
    }

    return (
        <div>
            <p>{state.count}</p>
            <button onClick={() => handleClick(1)}>-1</button>
            <button onClick={() => handleClick(0)}>+1</button>
        </div>
    )
}
```

## 5 useRef

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内持续存在。

本质上，`useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”。

**用法**

```
const refContainer = useRef(initialValue);
```

**例子**

```JavaScript
import React, { useEffect, useRef, useState } from "react";

export function App() {
    const [count, setCount] = useState(0);
    const inputRef = useRef();
    useEffect(
        ()=>{
            console.log(inputRef.current.value)
            // ref的current指向绑定的元素
            inputRef.current.value = count
        }
    ,[count])
    const handleClick = () => {
        setCount(count + 1)
        console.log("value:" + count);
    }
    const handleChange = (e) => {
        setCount(e.target.value)
        console.log("value:" + count);
    }
    return (
        <div className={"useState"}>
            <input type="text" ref={inputRef} value={count} onChange={handleChange}/>
            <button onClick={handleClick}>+1</button>
        </div>
    )
}
```

## 6 useMemo

只有当特定值改变时才重新执行函数，而不是每次渲染都重新执行

**用法**

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

 **例子**

```JavaScript
import React, { useState, useMemo } from "react";

export const App = () => {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("");
    const [price, setPrice] = useState(10);
    const handleClick = () => {
        setCount(count + 1);
    }
    // 每次改变上面的任意值都会重新执行一遍
    /*const getTotal = function() {
        console.log("getTotal exec ...")
        return count * price
    }() */
    // 只有当count和price改变时才会执行
    const getTotal = useMemo(()=> {
        console.log("getTotal exec ...")
        return count * price
    },[count,price])
    return (
    <div className={"useState"}>
        <div> <input onChange={(e) => setColor(e.target.value)} /></div>
        <div> <input value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
        <div> {count} <button onClick={handleClick}>+1</button></div>
        <div> {getTotal}</div>
    </div>)
}
```

**memo**

```JavaScript
import React, { useState, useMemo, memo } from "react";

function Child1(props){
    console.log("子组件更新..."); 
    // 父组件渲染后子组件也会跟着渲染
    return (
        <div>
            <h3>子组件1</h3>
            <div>text:{props.name}</div>
            <div>{new Date().getTime()}</div>
        </div>
    )
}
const Child2 = memo((props)=>{
    console.log("子组件更新..."); 
    // 只有当props属性改变，name属性改变时，子组件才会重新渲染
    return (
        <div>
            <h3>子组件2</h3>
            <div>text:{props.name}</div>
            <div>{new Date().getTime()}</div>
        </div>
    )
})

export const App = () => {
    const [text, setText] = useState("");
    const [count,setCount] =useState(0);
    return(
        <>
            <p>{count}</p>
            <button onClick={()=>setCount(count+1)}>+1</button>
            <button onClick={()=>setText(count)}>text</button>
            <Child1 name ={text}/>
            <Child2 name ={text}/>
        </>
    )
}
```