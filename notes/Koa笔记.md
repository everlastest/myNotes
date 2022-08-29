# Koa

## 1 起步

### 1.1 项目初始化

`npm init -y` 生成package.json

### 1.2 安装Koa

```
npm i koa
```

### 1.3 编写服务程序

1. 导入koa包
2. 实例化app对象
3. 编写中间件
4. 启动服务, 监听3000端口

> 注意：如果没有通过`ctx.body`返回给客户端, 最终会得到`Not Found`

```JavaScript
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx) => {
  ctx.body = 'hello Koa2'
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

### 1.4 使用nodemon

自动更新，热重载

```
nodemon index.js
```

## 2 中间件

顾名思义, 中间件就是在什么的中间

> 在请求和响应中间的处理程序

有时候从请求到响应的业务比较复杂, 将这些复杂的业务拆开成一个个功能独立的函数, 就是中间件

对于处理请求来说，在响应发出之前，可以在请求和响应之间做一些操作，并且可以将这个处理结果传递给下一个函数继续处理

### 2.1  使用

```JavaScript
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx, next) => {
  console.log('我来组成身体')
  next()
})
app.use((ctx, next) => {
  console.log('我来组成头部')
  next()
})
app.use((ctx) => {
  console.log('---------')
  ctx.body = '组装完成'
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
输出结果

我来组成身体
我来组成头部
----------
```

### 2.2 链式调用

```
app.use`实际上会返回`this
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app
  .use((ctx, next) => {
    console.log('我来组成身体')next()}).use((ctx, next) => {
    console.log('我来组成头部')next()}).use((ctx) => {
    console.log('---------')
    ctx.body = '组装完成'})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

在use中, 一次只能接受一个函数作为参数

### 2.3 洋葱圈模型

![image-20220711125335454](./assets/image-20220711125335454.png)

```JavaScript
// 1. 导入koa包
const Koa = require('koa')
// 2. 实例化对象
const app = new Koa()
// 3. 编写中间件
app.use((ctx, next) => {
  console.log(1)next()
  console.log(2)
  console.log('---------------')
  ctx.body = 'hello world'
})

app.use((ctx, next) => {
  console.log(3)next()
  console.log(4)
})

app.use((ctx)=>{
  console.log(5)
})
// 4. 监听端口, 启动服务
app.listen(3000)
console.log('server is running on http://localhost:3000')

输出结果：
1 3 5 4 2
```

### 2.4 异步处理

如果中间件中存在一些异步的代码, Koa也提供了统一的处理方式.

首先, 我们要了解async await语法

**async await语法**

async: 声明异步函数

await: 后跟一个promise对象

如果要使用await, 需要在函数声明前加上`async`

## 3 路由

### 3.1 概念

- 建立URL和处理函数之间的对应关系

- 主要作用: 根据不同的Method和URL返回不同的内容

不用路由前的例子：

```TypeScript
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx) => {if (ctx.url == '/') {
    ctx.body = '这是主页'} else if (ctx.url == '/users') {if (ctx.method == 'GET') {
      ctx.body = '这是用户列表页'} else if (ctx.method == 'POST') {
      ctx.body = '创建用户'} else {
      ctx.status = 405 // 不支持的请求方法}} else {
    ctx.status = 404}
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

### 3.2 使用

1. 安装

```Plain
npm i koa-router
```

2. 使用

在koa的基础上

3. 导入`koa-router`包
4. 实例化router对象
5. 使用router处理路由
6. 注册中间件

```JavaScript
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()// 三. 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router()
router.get('/', (ctx) => {
  ctx.body = '这是主页'
})
router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户页'
})
// 四. 注册路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

### 3.3 优化

我们最好将一个模块放到一个单独的文件中. 分离出一个router路由层

创建`src/router/user.route.js`

```JavaScript
// 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router()

router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户页'
})

module.exports = router
```

再导入

```JavaScript
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
const userRouter = require('./router/user.route')
// 四. 注册路由中间件
app.use(userRouter.routes()).use(userRouter.allowedMethods())
// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

可以进一步优化, 使代码更加简洁

给路由设置一个统一的前缀

```JavaScript
// 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.get('/', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/', (ctx) => {
  ctx.body = '创建用户页'
})

module.exports = router
```

## 4 请求参数解析

对于不同的Http请求, 需要使用不同的方式携带参数

- GET请求: 在URL中以键值对传递

- POST/PUT/PATCH/DELET请求: 在请求体中传递

### 4.1 处理URL参数

1. query

- 在GET请求中, 如果以键值对的形式传参, 可以通过`query`得到

- - ```JavaScript
    // GET /users?start=18&end=20 ---- 获取所有的用户信息, 返回一个数组
    router.get('/', (ctx) => {
      // 通过 ctx.query 是ctx.request.query的代理 解析键值对参数
      const { start = 0, end = 0 } = ctx.query
      const res = db.filter((item) => item.age >= start && item.age <= end)// 解析键值对
      // 解析键值对
      res.length == 0 ? ctx.throw(404) : (ctx.body = res)
    })
    ```

2. params

- 在GET请求中, 有些参数可以通过路由传参, 可以通过`params`得到

- - ```JavaScript
    // GET /users/:id ---- 根据id获取单个用户的信息, 返回一个对象
    router.get('/:id', (ctx) => {
      // 解析id参数
      const id = ctx.params.id
      const res = db.filter((item) => item.id == id)
      if (!res[0]) ctx.throw(404)
    
      ctx.body = res[0]
    })
    ```

3. body参数


- - koa-bodyparser
  - koa-body

- 安装koa-body

- - ```Plain
    npm install koa-body
    ```

- **注册**

- - ```JavaScript
    // 注册KoaBody中间件, 解析请求体中的参数, 挂载到ctx.request.body
    const KoaBody = require('koa-body')
    app.use(KoaBody())
    ```

  -  **使用**

通过`ctx.request.body`获取请求体中的数据

## 5 错误处理

对于接口编程, 错误处理是非常重要的环节, 通过提供更友好的提示

1. 提高错误定位的效率

2. 提高代码的稳定性和可靠性

### 5.1 原生的错误处理

一般Koa中的错误分为三类

- 404: 当请求的资源找不到, 或者没有通过`ctx.body`返回时, 由koa自动返回

- 手动抛出: 通过`ctx.throw`手动抛出

- 500: 运行时错误

Koa类是继承Emitter类, 因此可以

- 通过emit提交一个错误

- 通过on进行统一错误处理

```JavaScript
app.on('error', (err, ctx) => {
  console.error(err)
  ctx.body = err
})
```

### 4.2 使用中间件

**安装**

```Plain
npm i koa-json-error
```

**使用**

> 基本使用

```JavaScript
const error = require('koa-json-error')
app.use(error())
```

> 高级使用

```JavaScript
const error = require('koa-json-error')
app.use(
    error({
        format: (err) => {
            return { code: err.status, message: err.message, result: err.stack }
        },
        postFormat: (err, obj) => {
            const { result, ...rest } = obj
            return process.env.NODE_ENV == 'production' ? rest : obj
    },})
)
```