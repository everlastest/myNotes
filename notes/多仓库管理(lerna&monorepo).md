## lerna是啥

Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。

> 将大型代码仓库分割成多个独立版本化的 软件包（package）对于代码共享来说非常有用。但是，如果某些更改 跨越了多个代码仓库的话将变得很 *麻烦* 并且难以跟踪，并且， 跨越多个代码仓库的测试将迅速变得非常复杂。
>
> 为了解决这些（以及许多其它）问题，某些项目会将 代码仓库分割成多个软件包（package），并将每个软件包存放到独立的代码仓库中。但是，例如 Babel、 React、Angular、Ember、Meteor、Jest 等项目以及许多其他项目则是在 一个代码仓库中包含了多个软件包（package）并进行开发。
一个大型仓库中分成了PC端和移动端2个软件包和一些公用的包，仓库中包含多个node_modules和package.json文件用于管理，而Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化

## 命令

- lerna init

常见一个新的 lerna 仓库（repo）或将现有的仓库升级为适配当前 版本的 Lerna。

**参数**

`--independent`/`-i` – 使用独立的 版本控制模式。

- lerna bootstrap

在当前 Lerna 仓库中执行引导流程（bootstrap）。安装所有依赖项并连接任何交叉依赖。

此命令至关重要，因为它让你可以 在 `require()` 中直接通过软件包的名称进行加载，就好像此软件包已经存在于 你的 `node_modules` 目录下一样。

- lerna import \<pathToRepo>

将本地路径 \<pathToRepo> 中的软件包导入（import） packages/\<directory-name> 中并提交 commit。

- lerna publish

为已经更新过的软件包创建一个新版本。提示 输入新版本号并更新 git 和 npm 上的所有软件包。

**参数**

`--npm-tag [tagname]` — 使用给定的 npm dist-tag （默认为 latest）发布到 npm。

`--canary`/`-c` – 创建一个 canary 版本。

`--skip-git` – 不要运行任何 git 命令。

`--force-publish [packages]` — 强制发布 指定的一个或多个软件包（以逗号分隔）或使用 `*` 表示所有软件包（对于修改过的软件包跳过 git diff 检查）。

- lerna changed

检查自上次发布以来哪些软件包被修改过。

- lerna diff [package?]

列出所有或某个软件包自上次发布以来的修改情况。

- lerna run [script]

在每一个包含 [script] 脚本的软件包中运行此 [npm 脚本](https://docs.npmjs.com/misc/scripts)。

- lerna ls

列出当前 Lerna 仓库中的所有公共软件包（public packages）。

## Multirepo

传统的项目开发模式，比如 `create-react-app`、`vue-cli` 等框架模板脚手架生成的项目。

- 优点：
  - 各模块管理自由度高；
  - 各模块仓库体积一般不会太大；

- 缺点：
  - 仓库分散不好找，分支管理混乱；
  - 版本更新频繁，公共模块版本发生变化，需要对所有模块进行依赖更新；

## Monorepo

- 优点：
  - 统一的规范、构建工具；
  - 方便版本管理和依赖，模块之间的引用调试都变得非常方便；
  - Multirepo 的缺点就是它的优点。

- 缺点：
  - 随着应用扩展，仓库体积将变大。

## lerna + yarn workspace 应用场景

1. 作为业务组件库的工程环境搭建。 实现单个业务组件作为单独的 `npm 包` 进行管理和发布，无需将各个业务组件分开建立在多个 Git 仓库中，且它们的技术栈、构建工具、规范等都可以保持一致。

1. 作为日常业务项目工程管理。 比如有一个低代码业务需求，低代码核心工作区的交互都相同，不同的是业务场景（外层壳子和一些定制功能），低代码相关的模块都可以复用，我们只需在这个仓库内不断去扩展业务需求即可，达到核心代码的复用（当然，可能会想到将低代码核心作为线上包）。
