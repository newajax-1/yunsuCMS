# JavaScript编码规范.md

## 变量初始值
    非对象为undefined
    对象初始值为null

## 函数命名：

### 小驼峰命名
    get : 获取数据
    load : 将数据加载在页面（量大）
    set : 填充数据（量小）
    sava : 保存JS数据
    send : 发送给后台数据
    handle : 处理JS数据
    add : 添加某数据
    remove : 移除属性
    delete : 删除数据
    create : 创建
    reset : 重置
    clear : 清除
    refresh : 刷新
    search : 查找
    update : 修改

## 变量命名

    变量名描述用下划线连接，以区别函数的小驼峰命名
    cust_name
    temp_list

## 路由跳转

    Vue.$goRoute(route); 

## ajax

    Vue.$ajaxWrap({
        type : "get" or "post", // default type get
        url : url,
        data : data ,
        success : function(data){
            // do success function 
        },
        error() {
            // do error function
        },
        fail(){
            // 请求失败的情况：当请求status非200时的处理
        }
    })

## 清除数据

    Vue.$clearObject();

## 检测数组

    Vue.$isArray();

## 提示框
    
    ### 普通提示框
    Vue.$baseWarn("这是一条普通消息",function(){
        // alert 效果
        // 确认后需要做的事件
    });

    ### 成功与警告框
    Vue.$baseConfirm("确定信息",function(){
        // 确认后需要做的事件
    });


## 日期截取

    Vue.$handleDateObject(); // return yyyy-mm-dd