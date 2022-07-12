# HTML5与CSS3

## 1 HTML5新特性

IE9以上，不考虑兼容性才可以用

### 1.1 语义化

- \<header> 头部
- \<nav> 导航栏
- \<article> 内容
- \<section> 文档某个区域
- \<aside> 侧边栏
- \<footer> 尾部

### 1.2 多媒体标签

- \<audio> 音频

    - mp3 √

    **谷歌把音频和视频自动播放都禁止了**

- \<video> 视频

    格式

    - mp4 √
    - WebM
    - Ogg

    ```html
    <video src="文件地址" control="controls"></video>
    
    <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持Video标签。
    </video>
    ```

    谷歌自动部分必须写muted

    资料：https://www.runoob.com/tags/tag-video.html

**总结**

- 音频标签和视频标签使用方式基本—致
- 浏览器支持情况不同
- 谷歌浏览器把音频和视频自动播放禁止了
- 我们可以给视频标签添加muted属性来静音播放视频，音频不可以(可以通过JavaScript解决)
- 视频标签是重点，我们经常设置自动播放，不使用controls控件，循环和设置大小属性

### 1.3 input新增类型

type

- email
- url
- date
- time
- month
- week
- number
- tel
- search
- color

验证时必须添加form表单域

### 1.4 新增表单属性

- required:required

- placeholder

    修改样式用**伪类**

    ```css
    input::placeholder {
    	color: green;
    }
    ```

- autofocus

- autocomplete 写过的提示（on, off）

- multiple 一次上传多个文件

验证时必须添加form表单域

## 2 CSS3新特性

现状：

- 新增特性有兼容性问题IE9+
- 移动端支持优于PC端
- 不断改进
- 应用广泛
- 新增选择器、盒模型、其他特性

### 2.1 新选择器

#### 2.1.1 属性选择器

**注意**：类、属性和伪类选择器权重都是10

1. 筛选input且必须有value属性的元素 

    ```css
    input[value] {
       
    }
    ```

2. 可以特定属性值  **重点**

    ```css
    input[type=text] {
        
    }
    ```

3. class以某个值开头的元素和以某个值为结尾的

    ```css
    div[class^icon] {
        
    }
    div[class$val] {
        
    }
    ```

4. 还有某个值的

    ```css
    div[class*ax] {
    
    }
    ```

#### 2.1.2 结构伪类选择器

结构伪类选择器主要根据文档结构来选择器元素，常用于根据父级选择器里面的子元素

| 选择符           | 简介                        |
| ---------------- | --------------------------- |
| E:first-child    | 匹配父元素中的第一个子元素E |
| E:last-child     | 匹配父元素中最后一个E元素   |
| E:nth-child(n)   | 匹配父元素中的第n个子元素E  |
| E:first-of-type  | 指定类型E的第一个           |
| E:last-of-type   | 指定类型E的最后一个         |
| E:nth-of-type(n) | 指定类型E的第n个            |

- nth-child(n)
    - 数字、关键字和公式

        ```
        E:nth-child(2) {
        	第六个
        }
        E:nth-child(even) {
        	奇数行
        }
        E:nth-child(-n+5) {
        	第1-5行	
        }
        ```

    **注意** 会把所有盒子都排列序号，之后会去看前面的div

- nth-of-type(n)

    会把指定的元素排上序号

