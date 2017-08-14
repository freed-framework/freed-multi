# freed-multi

*react + mobx + ant-design-mobile*

## 注意事项
 1. 页面入口为entry.js,规则: /src/pages/{页面名字}/entry.js
 1. svg图片放在src/svg-folder(icon图标)
 1. 边框1px统一使用 style/border-1px.scss
 1. 提交前执行eslint <code>npm run lint</code>
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


