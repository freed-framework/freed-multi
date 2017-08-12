# react + mobx + ant-design-mobile
.
## 每个页面入口JS:  entry.js(**多页面入口必须为entry**)
## components封装有nav-bar,search-nav-bar
```
    import NavBar, {setTitle} from 'nav-bar';
    
    <NavBar
        title="test" //此处可传title
    />
    
    import {setTitle} from 'nav-bar';
    setTtile('首页');
```
## 原生方法封装在native中
```
    import Native from 'native';
    Native.goBack();
```
* svg图片放在src/svg-folder
* 边框1px统一使用 style/border-1px.scss
* 提交前执行eslint
<code>
    npm run lint
</code>
