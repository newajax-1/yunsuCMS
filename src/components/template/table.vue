<template>
    <div class="table">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="catName"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template scope="scope">
                    <el-button @click="{lookInfo(scope.row),checkInfo = true}" type="text" size="small">查看</el-button>
                    <el-button @click="{editSearch(scope.row.id),updateInfo = true}" type="text" size="small">修改</el-button>
                    <el-button @click="deleteInfo(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-button :plain="true" type="info" @click="newInfo = true">新增</el-button>

        <!-- 查看的弹出框start -->
        <el-dialog
            title="查看信息"
            :visible.sync="checkInfo" 
            size="tiny"
            :before-close="handleClose">
            <span>
                <el-input v-model="info.catName" :disabled="true"></el-input>
                <el-input v-model="info.age" :disabled="true"></el-input>
                <el-input v-model="info.id" :disabled="true"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkInfo = false">取 消</el-button>
                <el-button type="primary" @click="checkInfo = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看的弹出框end -->

        <!-- 新增的弹出框start -->
        <el-dialog
            title="查看信息"
            :visible.sync="newInfo"
            size="tiny"
            :before-close="handleClose">
            <span>
                <el-input v-model="info.userName" ></el-input>
                <el-input v-model="info.age" ></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newInfo = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增的弹出框end -->

        <!-- 修改的弹出框start -->
        <el-dialog
            title="查看信息"
            :visible.sync="updateInfo"
            size="tiny"
            :before-close="handleClose">
            <span>
                <el-input v-model="info.userName" ></el-input>
                <el-input v-model="info.age" ></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateInfo = false">取 消</el-button>
                <el-button type="primary" @click="confirmUpdate()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改的弹出框end -->
    </div>  
</template>
<script>
import Qs from 'qs'
// 注释之前空格一行，缩进用四格空格符，方便排错。
export default {
    name : "table", 
    methods: {
        
        //加载表格
        loadTable(id){
            var that = this;  
            axios({
                method: 'post',
                url: 'springboot/cat/queryCatList',
                transformRequest: [function (data) {
                　　data = Qs.stringify({
                        pageNum : that.pageNum,
                        pageSize : that.pageSize
                    });
                    return data;
                }],
                baseURL: 'http://192.168.168.66:8080/',
            })
            .then(function(data){
                that.tableData = data.data.data.page.list
            })

            // js引入qs是main.js的局部变量，这里没有用；
            // 因为组件化开发，所有的单页面文件，都是一个封闭的块级作用域内，如果要应用这个块级作用域的局部变量，就要想vue文件这样，用export导出，用import导入
            // 先import导入ele，然后有use方法注册给vue，但是qs没有，因为qs只是一个方法，如果想要饿了么那样的话；
            // 就要想全局配置axios这样，给vue.prototype.Qs = Qs然后通过this.qs使用 

        },

        //elementUI对话框
        handleClose(done){
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        //删除
        deleteInfo(id){
            var that = this;  
            axios({
                method: 'post',
                url: 'springboot/cat/deleteCat',
                transformRequest: [function (data) {
                　　data = Qs.stringify({
                        id : id
                    });
                    return data;
                }],
                baseURL: 'http://192.168.168.66:8080/',
            })
            .then(function(){
                 that.loadTable();
            })
            .catch(function(err){
                console.log(err)
            })
        },
        
        //查看
        lookInfo(obj){

            //将这一行的值拿出来赋值给info,直接渲染（此时的表单是不能输入的，要禁用掉输入功能,用属性:disabled="true"）
            this.info = obj;

            //因为初始值为false,点击查看了让其变为true,弹出弹出框
        },
        
        //新增弹出框后的确认按钮
        confirmAdd(){
        
            //把在表单中输入的数据传到后台
            var that = this;  
            axios({
                method: 'post',
                url: 'springboot/cat/addCat',
                transformRequest: [function (data) {
                　　data = Qs.stringify({
                        catName : that.info.userName,
                        age : that.info.age
                    });
                    return data;
                }],
                baseURL: 'http://192.168.168.66:8080/',
            })
            .then(function(){

                 //重新渲染数据
                that.loadTable();
                that.newInfo = false;
                $('input').reset();
            })
            .catch(function(err){
                console.log(err)
            })
        },

        // 编辑查询
        editSearch(ids){
            var that = this;
            that.currentId =that.currentId||ids;
            console.log(that.currentId);
            axios({
                method: 'post',
                url: 'springboot/cat/queryById',
                transformRequest: [function (data) {
                　　data = Qs.stringify({
                        id : ids
                    });
                    return data;
                }],
                baseURL: 'http://192.168.168.66:8080/',
            })
            .then(function(results){
                var data = results.data.data.data;
                that.info.userName = data.catName;
                that.info.age = data.age;
            })
        },

        // 修改提交
        confirmUpdate(ids){
            var that = this;
            console.log(that.currentId);
            axios({
                method: 'post',
                url: 'springboot/cat/updateCat',
                transformRequest: [function (data) {
                　　data = JSON.stringify({
                        wcatName:that.info.userName,
                        age:that.info.age,
                        id:that.currentId
                    });
                    return data;
                }],
                baseURL: 'http://192.168.168.66:8080/',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(results){
                that.loadTable();
                that.updateInfo = false;
            })

        },
    },
    data() {
      return {

        //要显示的表格数据，这个一定要是数组
        tableData:[],//定义一个空数组用来存放请求后端的表格数据。
        pageNum:1,
        pageSize:10,
        total:null,

        //表格每一行的数据
        info:{
          userName:'',
          passWord:'',
          age:null,
        },

        //对话框
        checkInfo: false,
        newInfo:false,
        updateInfo:false,
        globalUrl : "http://192.168.168.66:8080/",
        currentId : undefined
      }
    },
    mounted(){

      //当组件模板挂载时数据显示到上面去。
      	this.loadTable();
    }
}
</script>