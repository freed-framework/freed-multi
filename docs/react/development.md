---
order: 1
english: Development
---

## 环境

```
node = 4+
```

### API 规范

- 基础UI组件(有对应的DOM元素,如Button Checkbox等)API应尽量与原生一致。
- API设计参考知名开源组件 (如:ant-design-mobile)。
- 组件为单独目录,目录名即组件名:以 `-` 分割, 例如 `date-picker`，并包含主文件`index.jsx`。


### 组件实现
- 遵从Airbnb React/JSX Style Guide
- 使用ES6语法
- 参考知名开源组件的组件实现
- 尽量基于知名开源组件开发,而不是从0开发
- 组件目录结构
```
  - demo
    basic.jsx
    basic.md
  - image

  - style
    index.scss

  Button.jsx
  index.jsx
  index.md
```

- `components/button/Button.jsx`

```js
import React from 'react';

class Button extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  onClick = () => {};
  render() {
    return <a onClick={this.onClick}>;
  }
}

export default Button;
```

### 组件引用

```bash
$ npm install jingoal-silk --save
```
```js
import Button from 'jingoal-silk/lib/button';
ReactDOM.render(<Button>Start</Button>, mountNode);
```

### 组件开发

- 从 srcCamp 上拉代码

```bash
$ sc init --server=https://sc.eff.com mobile-silk
$ cd mobile-silk
$ sc track mobile-silk

```
- 脚手架初始化组件
```bash
$ npm install -g yo
$ npm install -g generator-silk-component
$ cd components
$ yo silk-component

```
- 优先编写组件md,设计组件API并发起讨论


- 本地运行
```bash
$ npm run dev
```

- 提交代码

```bash
$ sc add .
$ sc commit -m "描述"
$ sc export
//提交 CL, 指定相应人员 review, 根据反馈进一步修改提交。
$ sc send user1 user2 houyl ...
//审核通过后,提交
$ sc submit
```
