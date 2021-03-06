# freed-multi

*react + mobx + ant-design-mobile*

## 注意事项
 1. 页面入口为entry.js,规则: /src/pages/{页面名字}/entry.js
 1. 统一使用flex布局。尽量少用float
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

| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|---------
| title       | 页面标题 | string |  否  |   | '' |
| leftButtonTitle       | 左侧按钮文字 | string |  否  |   | < |
| leftButtonClick       | 返回按钮点击前回调 | function |  否  |   | ()=>{} |
| leftDisable       | 返回按钮禁用状态 | boolean |  否  |   | false |
| helpClick       | 帮助按钮点击,不传则不显示 | function |  否  |   |  |
| showClose       | 关闭按钮是否显示 | boolean |  否  |   | false |
| rightButton | 右侧按钮数组 | object |  否 | | |

rightButton

| 属性             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|---------
| icon       | icon图标或文字 icon图标 import SVG 和ant icon组件使用方法一致 | string |  是  |   |  |
| antType       | ant提供的icon 传入type | string |  否  |   |  |
| click       | 点击函数 | function |  否  |   | ()=>{} |
| disable       | 是否禁用 | boolean |  否  |   | false |
| sup       | 显示icon右上角数字 | number |  否  |   |  |
| key       | 用于修改, 根据key更改button | string |  否  |   |  |

 - SearchNavBar
 ```
     import { SearchNavBar, SearchBarContentLayout } from 'freed-multi';
     
     <SearchNavBar
         defaultValue="test"
     />
     <SearchBarContentLayout>
         // you code
     </SearchBarContentLayout>
 ```
 | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
 |---------------- |----------------|----------|----------|--------------|---------
 | defaultValue       | 默认显示搜索值 | string |  否  |   | '' |
 | placeholder       | placeholder | string |  否  |   | '' |
 | onSubmit       | 点击搜索 | function |  否  |   | ()=>{} |
 | onClear       | 点击清除 | function |  否  |   | ()=>{} |
 | onFocus       | 获取焦点 | function |  否  |   | ()=>{} |
 | onBlur       | 失去焦点 | function |  否  |   | ()=>{} |
 | isChangeDefaultValue       | 是否需要重新传入defaultValue 改变当前值 | boolean |  否  |   | false |
 
 - Boxer
```
  import { Boxer } from 'freed-multi';
  
  <Boxer
      title="test"
  >
        // you code
  </Boxer>
```
 - FixedLayout
```
   import { FixedLayout } from 'freed-multi';
   
   <FixedLayout 
        content={<div>test</div>}
        fixer={<div>底部定位容器</div>}
   />
```
 | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
 |---------------- |----------------|----------|----------|--------------|---------
 | content       | 内容区域 | react node |  否  |   | '' |
 | fixer       | 定位区域 | react node |  否  |   | '' |
 - ListView
 ```
    import { ListView, activeRefresh } from 'freed-multi';
    
    componentDidMount() {
        // 设置listview高度...
        const listView = window.document.getElementById('test-list');

        listView.style.height = {计算出页面剩余高度};
    }
    
    getMoreData() {
        return new Promise((resolve) => {
            http.get('ttttt').then(res => {
                resolve({
                    data: {需要渲染的数据, Array}
                    hasMore: {是否还有更多数据，boolean}
                });
            })
        })
    }
    
    renderItem(rowData) {
        return (
            <div key={rowData.id}>{rowData.text}</div>
        )
    }
    
    <ListView 
        id="test-list"
        renderItemFunc={this.renderItem}
        getMoreDataFunc={this.getMoreData}
        getRefreshDataFunc={this.getRefreshData}
        isLoadMore
        noMoreText="没有更多商品了~"
    />
    
    // 其他点击事件后刷新listview数据
    activeRefresh(() => {
        return new Promise((resolve) => {
            http.get('ttttt').then(res => {
                resolve({
                    data: {需要渲染的数据, Array}
                    hasMore: {是否还有更多数据，boolean}
                });
            })
        })
    });
 ```
| 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|---------
| id       | dom节点ID 用于设置高度 | string |  否  |   | '' |
| renderItemFunc       | 渲染列表单个item | function |  是  |   |  |
| getMoreDataFunc       | 获取数据函数 | function |  是  |   |  |
| getRefreshDataFunc       | 下拉刷新数据 | function |  否  |   | ()=>{} |
| isLoadMore       | 是否启用瀑布流(加载更多) | boolean |  否  |   | false |
| isRefresh       | 是否启用下拉刷新 | boolean |  否  |   | false |
| onScroll       | 列表滚动事件 | function |  否  |   | ()=>{} |
| noMoreText       | 没有更多的时候，底部显示文字 | string |  否  |   | 抱歉，没有更多商品啦~ |
 - Tags
 ```
    import { Tags, Tag } from 'freed-multi';
    
    <Tags>
        <Tag text="aaaa" onClick={() => {alert('test')}} />
        <Tag text="bbbb" />
    </Tags>
 ```
 | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
 |---------------- |----------------|----------|----------|--------------|---------
 | text       | 显示文字 | string |  否  |   | '' |
 | onClick       | 点击回调 | function |  否  |   | ()=>{} |
 - WhiteAll
  ```
     import { WhiteAll } from 'freed-multi';
     
     <WhiteAll>
         // you code
     </WhiteAll>
  ```
 - LazyLoad
 基于[react-lazyload](https://github.com/jasonslyvia/react-lazyload)封装，支持传入该组件props
```
    import { LazyLoad } from 'freed-multi';
    
    <LazyLoad 
         overflow
    >
        <img src="http://www.aaa.com/a.png">
    </LazyLoad>
```
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
 - deepLink(options, success, fail) 跨模块跳转
 
    ```
        import { Native } from 'freed-multi';
        	    
        Native.deepLink(
            {
                moduleID: 101,
                moduleKey: 'index',
                param: {
                    id: 100000,
                    text: 'aaa'
                },
                transition: 'right',
                closeSelf: false
            }
        )
    ```
    | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
   |---------------- |----------------|----------|----------|--------------|---------
   | moduleID          | 模块ID | number | 是  | 100: '供应链' 101: '活动页' | |
   | moduleKey             | 跳转落地页key | string | 是  |  | |
   | param             | 传入参数 | object | 否  |  | |
   | transition             | 跳转动画 | string | 否  | right, bottom | right |
   | closeSelf             | 是否关闭当前页 | boolean | 否  |  | false |
 - scan(title, callback) 扫一扫
 ```
    import { Native } from 'freed-multi';
            	    
    Native.scan(
        '测试扫一扫',
        (data) => {
            // data 成功扫描回调
        }
    )
 ```
 | 参数             | 说明           | 类型       | 是否必须  |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|---------
| title          | 显示标题 | string | 否  |  | '' |
| callback             | 成功扫描回调 | function | 是  |  | |
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