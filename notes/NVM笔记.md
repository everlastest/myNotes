# NVM

## 介绍

用于管理nodejs的版本控制工具

## 下载

> 注意：下载NVM前必须卸载nodejs

### 卸载nodejs

1. 打开系统应用与功能
2. 找到nodejs
3. 卸载nodejs
4. 寻找并删除相应文件
5. 删除环境变量

### 下载NVM

**windows**

[下载链接](https://github.com/coreybutler/nvm-windows/releases)

windows电脑下载nvm-setup.zip

**mac**

下载链接https://github.com/nvm-sh/nvm

配置环境变量

```Apache
vim .zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

source ~/.zshrc
```

**成功提示**

控制台输入：nvm v

```Apache
C:\Windows\system32>nvm v
1.1.9
```

### **添加镜像（可选）**

找到setting.txt文件添加镜像源，如下两行：

> 注意：写错的话会出现查不到版本，安装不了nodejs

```undefined
node_mirror: https://registry.npm.taobao.org/mirrors/node/
npm_mirror: https://registry.npm.taobao.org/mirrors/npm/
```

## 使用

### 命令

```Apache
nvm off                     // 禁用node.js版本管理(不卸载任何东西)
nvm on                      // 启用node.js版本管理
nvm install <version>       // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
nvm uninstall <version>     // 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
nvm ls                      // 显示所有安装的node.js版本
nvm list available          // 显示可以安装的所有node.js的版本
nvm use <version>           // 切换到使用指定的nodejs版本
nvm v                       // 显示nvm版本
nvm install stable          // 安装最新稳定版
```

### 安装node

成功后会在nvm所在文件夹下出现如下版本：

### 使用node

![image-20220711130856248](./assets/image-20220711130856248.png)使用node

nvm use命令可能会报错，只需要以管理员身份进入终端即可解决

## npm使用

```undefined
// 查看npm当前镜像源
npm config get registry  
// 设置npm镜像源为淘宝镜像
npm config set registry https://registry.npm.taobao.org/
```

