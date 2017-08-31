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
 1. html rootdiv height为100% 如需滑动内部处理，不使用webview自带滑动
 1. 需要添加configPage.json文件在 src/ 下，用于原生读取落地页 <code>{"list": "list/index.html"}</code>
## components
 - NavBar
 
```
    import { NavBar, NavBarContentLayout, setTitle } from 'freed-multi';
    
    <NavBar
        title="test" // 此处可传title
    />
    <NavBarContentLayout>
        // you code
    </NavBarContentLayout>
    
    import { setTitle } from 'freed-multi';
    setTtile('首页');
```
 - SearchNavBar
 - Boxer
 - FixedLayout
 - ListView
 - Tags
 - WhiteAll
 - LazyLoad
## native(原生插件)
 - redirect(url, options) 跳转webview

	```
	    import { Native } from 'freed-multi';
	    
	    Native.redirect('deal/index.html', {
	         paramsCallBack: (data) => {
	              // data 为回传数据
	         }
	    });
	```
   | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | url             |   绝对路径地址 如: list/index.html   | String |  是  |   |  |
   | options         |   参数   | Object |  否  |   |  |
   
   options
   
   | 属性             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | transition      |   跳转动画  | String |  否  | right,bottom,none | right |
   | closeSelf       |   是否关闭当前页   | boolean |  否  |   | false |
   | navigationBarHidden       |   是否隐藏导航栏   | boolean |  否  |   | true |
   | paramsCallBack       |   页面回调，从B页面回来时执行   | function |  否  |   | |
 - goback(data) 返回上一页

	```
	    import { Native } from 'freed-multi';
	    
	    Native.goBack();
	```
   | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | data             |   回传给上一个页面数据   | any |  否  |   |  |
  
 - goBackHandle(callback, isIntercept) 监听安卓物理返回键

   ```
	    import { Native } from 'freed-multi';
	    
	    Native.goBackHandle(() => {
	        if (data !== '') {
	             Native.goBack();
	        }
	    });
	```
	| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | callback             | 点击物理键时触发函数 | function |  是  |   |  |
   | isIntercept             |  是否监听   | boolean |  否  |   | true |
 - popPage(isMe) 推出之后的webview
   
   ```
	    import { Native } from 'freed-multi';
	    
	    Native.notification.listen('demo', () => {
	         // 主要和监听一起用
 	         Native.popPage();
	    });
	```
	| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | isMe             | 是否推出自己 | boolean |  否  |   | false |
 - popAllPage() 推出所有webview 回到原生列表
	```
	    import { Native } from 'freed-multi';
	    
	    Native.popAllPage();
	```
- checkStatus(callback) 检查网络状态
  
  ```
	    import { Native } from 'freed-multi';
	    
	    Native.networkStatus((status) => {
	        status ===  0:无网络, 1: Wifi, 2: 3/4G,
	    });
	```
 - fetchCommonParams(callback) 获取业务参数
  
   ```
	    import { Native } from 'freed-multi';
	    
	    Native.fetchCommonParams((dictionary) => {
	        dictionary.userName // 用户名
	        dictionary.cityName // 城市名
	        dictionary.avatarUrl // 头像链接
	        dictionary.ip // 用户ip地址
	    });
	```
 - handleError(errCode) 处理业务逻辑错误
  
   ```
	    import { Native } from 'freed-multi';
	    
	    Native.handleError('401');
	```
	| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | errCode             | 传给原生的错误码 | string | 是  | '401' | |
 - notification.emit(key, data) notification.listen(key, (data) => {})

   ```
	    import { Native } from 'freed-multi';
	    
	    A页面监听 > Native.notification.listen('a', (data) => {
	        console.log(data)  // 数据
	    });
	    
	    B页面发出通知 > Native.notification.emit('a', '数据')
	```
	| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | key             | 监听key值 | string | 是  |  | |
   | data             | 传输数据 | any | 是  |  | |
 - pay(payType, payInfo, callback) 支付
   
    ```
	    import { Native } from 'freed-multi';
	    
	    Native.pay('alipay', {后端给的支付信息}, (result) => {
	    		if (result === 'success') {
	    			alert('支付成功');
	    		} eles if (result === ''fail){
	    			alert('支付失败');
	    		}
	    })
	```
	| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | payType          | 支付类型 | string | 是  | "weixin": "微信支付"；"alipay": "支付宝" | |
   | payInfo             | 支付信息 | object | 是  |  | |
   | callback             | 支付回调 | function | 是  |  | |
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
 ## utils 
  - http
  - LocalStore
  - isMobile
  - util
    - parseQuerystring(object) 转换url参数
    - getQueryString(key, isDecode) 获取url上参数 isDecode->是否转码