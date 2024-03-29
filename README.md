# 高级平滑渐变色

```js
                                                        /*
                                            888888      //
                                          88            //
                                          88            //
      88888888      8888    888888  88888888888888      //
    88        88      88  88              88            //
  88                  8888                88            //
  88                  8888                88            //
  88                  88                  88            //
    88        88      88                  88            //
      88888888        88                  88            //
                                                        //
*/////////////////////////////////////////////////////////
//
//     CCPIRA
//     中国计算机编程非正式研究协会
//
//////////////////////////////////////////////////////////
```

> 据不可靠统计，目前使用『高级平滑渐变色』的开发者几乎超过了 0.0001 万！！

- 虽然『高级平滑渐变色』的名字里带着“渐变色”，但是本项目不止可用于渐变色。

## 安装

### 通过网站下载

你可以通过直接下载 [GitHub 上的发行包](https://github.com/E0SelmY4V/changerf/releases) 来安装。

### 通过 npm 下载

你也可以选择使用 npm 等包管理器安装本项目。

```bash
npm i changerf
```

## 引入

### CommonJS

如果你开发 Node.js 之类，你可以这么引入：

```js
const { ChangeRF } = require('changerf');
// Or
var ChangeRF = require('changerf')['default'];
```

### ES6 Module

如果你开发 TS 之类：

```ts
import ChangeRF from 'changerf';
```

### 浏览器

如果你直接在浏览器里写脚本，需要先在 HTML 里引入本项目

```html
<script src="changerf/build/main.js"></script>
```

为了开发方便，你可以再使用三斜杠注释，在你的脚本文件里引入本项目的定义

```js
/// <reference path="changerf/build/global.d.ts" />

console.log(ChangeRF);
```

## 示例

### 生成曲线数组

```ts
let delta = 100; // 曲线的高度
let curve = ChangeRF.crf(delta); // 生成曲线数组
console.log(curve); // 输出以便欣赏数组
```

……更多函数等待你去发现。
我就懒得再写更多示例了。

## 使用感受

- 看起来挺炫酷。
