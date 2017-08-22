# freed-multi

*react + mobx + ant-design-mobile*

## 注意事项
 1. 页面入口为entry.js,规则: /src/pages/{页面名字}/entry.js
 1. svg图片放在src/svg-folder(icon图标)
 1. 边框1px统一使用 ~freed-multi/lib/style/border-1px.scss
 1. 字体不能小于24px(设计图750)
 1. 代码书写规范 [Airbnb](https://github.com/airbnb/javascript/tree/master/react)
 1. 提交前执行eslint <code>npm run lint</code>
 1. import顺序 react > ant-mobile > mobx > 第三方库 > freed-multi > components > scss > svg
## components
 - nav-bar
```
    import { NavBar, NavBarContentLayout setTitle } from 'freed-multi';
    
    <NavBar
        title="test" // 此处可传title
    />
    <NavBarContentLayout>
        // you code
    </NavBarContentLayout>
    
    import { setTitle } from 'freed-multi';
    setTtile('首页');
```
 - search-nav-bar
## native(原生插件)
```
    import { Native } from 'freed-multi';
    
    Native.goBack();
```
## style
 - border 1px 处理
```
    @import '~freed-multi/lib/style/border-1px';
   
    @include border-1px(bottom, #e1e1e1);
```
 - 手指按下时的背景色
  - 默认#F3F3F5
 ```
     @import '~freed-multi/lib/style/activeBgColor';
    
     @include activeBgColor(${可传入颜色});
 ```
 - 超出几行 ...显示 
   - 默认一行
 ```
     @import '~freed-multi/lib/style/ellipsis';
   
     @include ellipsis(${可传入行数});
 ```