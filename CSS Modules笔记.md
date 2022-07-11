# CSS Modules

[阮一峰css-modules教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

## 是什么？

CSS Modules功能很单纯，只加入了局部作用域和模块依赖，这恰恰是网页组件最急需的功能。

## 特点

规则少，同时又非常有用，可以保证某个组件的样式，不会影响到其他组件。

## 用法

### 1 局部作用域

CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

产生局部作用域的唯一方法，就是使用一个独一无二的`class`的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

下面是一个React组件`App.js`。

```JavaScript
import React from 'react';
import style from './App.css';

export default () => {return (<h1 className={style.title}>
      Hello World
    </h1>);
};
```

上面代码中，我们将样式文件`App.css`输入到`style`对象，然后引用`style.title`代表一个`class`。

```CSS
.title {
    color: red;
}
```

构建工具会将类名`style.title`编译成一个哈希字符串。

```JavaScript
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>
```

`App.css`也会同时被编译。

```CSS
._3zyde4l1yATCOkgn-DBWEL {
    color: red;
}
```

这样一来，这个类名就变成独一无二了，只对`App`组件有效。

CSS Modules 提供各种插件，支持不同的构建工具。本文使用的是 Webpack 的css-loader插件，因为它对 CSS Modules 的支持最好，而且很容易使用。

```JavaScript
module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'},
  module: {
    loaders: [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
    },
    {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
    },
    ]
  }
};
```

上面代码中，关键的一行是`style-loader!css-loader?modules`，它在`css-loader`后面加了一个查询参数`modules`，表示打开 CSS Modules 功能。

### 2 全局作用域

CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串。

```CSS
.title {
    color: red;
}
:global(.title) {
    color: green;
}
import React from 'react';
import styles from './App.css';

export default () => {
    return (
        <h1 className="title">
          Hello World
        </h1>
    );
};
```

显示声明局部作用域

```CSS
:local(.title) {
    color: red;
}
:global(.title) {
    color: green;
}
```

### 3 定制哈希类名

`css-loader`默认的哈希算法是`[hash:base64]`，这会将`.title`编译成`._3zyde4l1yATCOkgn-DBWEL`这样的字符串。

`webpack.config.js`里面可以定制哈希字符串的格式。

```JavaScript
module: {
  loaders: [ 
    // ...
    {
      test: /\.css$/,
      loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"},]
}
```

### 4 Class组合

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为"组合"（"composition"）。

```CSS
.className {
    background-color: blue;
}
.title {
    composes: className;
    color: red;
}
._2DHwuiHWMnKTOYG45T0x34 {
    color: red;
}
._10B-buq6_BEOTOl9urIjf8 {
    background-color: blue;
}
```