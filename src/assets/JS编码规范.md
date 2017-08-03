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
    
    以 is : boolean

    ### 函数私有变量
    变量名前下划线

    cust_name
    temp_list
    临时数据对象: _data
    临时对象 : _temp

## ajax

Vue.$ajaxWrap({
    type : "get" or "post",
    url : url,
    data : data ,
    success : function(data){
        //do success function 
    },
    error() {
        //do error function
    }
})

## 清除数据
    Vue.$clearObject()

## 提示框
    
    ### 普通提示框
    Vue.$message("这是一条普通消息");

    ### 成功与警告框
    Vue.$message({
        message: "这是一条成功/警告消息",
        type: "success" or "warning"
    });

    ### 错误框
    Vue.$message.error("这是一条错误消息");


## 删除关闭提示

    Vue.$confirm("你确定删除么？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
    }).then(function() {
    
        })
    }).catch(function() {});