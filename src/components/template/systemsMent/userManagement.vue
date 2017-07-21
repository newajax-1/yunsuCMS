<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>用户管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="手机号：">
                            <el-input placeholder="输入手机号" v-model="info.infoPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="工号：">
                            <el-input placeholder="输入工号" v-model="info.infoNum"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="reset-btn">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="toAdd()" class="search-btn">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="tableData">
                        <el-table-column prop="name" label="用户名称"></el-table-column>
                        <el-table-column prop="account" label="手机"></el-table-column>
                        <el-table-column prop="createUser" label="创建人"></el-table-column>
                        <el-table-column prop="jobNumber" label="工号"></el-table-column>
                        <el-table-column prop="roleId" label="用户角色"></el-table-column>
                        <el-table-column prop="orgId" label="所属部门"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="UpdateCustom(scope.row.accountId)">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="deleteInfo(scope.row.accountId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
        <!--分页 start-->
        <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageList.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageList.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="pageList.total">
            </el-pagination>
        </div>
        <!--分页 end-->

        <!--新增弹框 start-->
        <el-dialog
            size="tiny"
            :title="tableDataName"
            custom-class="pub-dialog"
            :visible.sync="newCustom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">

                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="">

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="用户名称：">
                                            <el-input v-model="addInfo.name" :placeholder="addInfo.name || ''"></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="工号：">
                                            <el-input v-model="addInfo.jobNumber" :placeholder="addInfo.jobNumber || ''"></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="手机：">
                                            <el-input v-model="addInfo.account" :placeholder="addInfo.account || ''"></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="密码(默认)：">
                                            <el-input :disabled="isDisabled"  :placeholder="addInfo.password || '123456'"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="用户角色：">
                                            <el-select v-model="addInfo.roleId" :placeholder="addInfo.remark || '选择角色'">
                                                <el-option 
                                                v-for="item in roleList"
                                                :label="item.remark" 
                                                :value="item.roleId"
                                                ></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="所属部门：">
                                            <el-select v-model="addInfo.orgId" :placeholder="addInfo.orgName || '选择部门'">
                                                <el-option 
                                                v-for="item in ogrList"
                                                :label="item.orgName" 
                                                :value="item.orgId"
                                                ></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="message clearfix">
                <div class="fl">
                    <el-button class="btn-edit btn" @click="addNewCustom()">保存</el-button>
                    <el-button class="btn-save btn" @click="newCustom = false">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>

<script>
    export default {
        name: 'adsadad',
        data() {
            return {
                newCustom: false,
                isDisabled: true,
                isScopeId: "",
                tableData: [],
                tableDataName: "",
                // 条件查询
                info: {
                  infoPhone: "",
                  infoNum: "",
                },
                // 分页
                pageList: {
                  pageNum: 1,
                  pageSize: 10,
                  total: 1
                },
                currentPage: 1,
                // 添加数据
                addInfo: {
                    // addName: "",  //名称
                    // jobNumber: "",  //会员工号
                    // addPassword: "123456",
                    // account: "",  //号码
                    // roleId: "",  //角色ID
                    // orgId: "",  //组织ID
                },
                // 修改数据
                upInfo: {},
                // 角色下拉框
                roleList: [],
                // 部门下拉
                ogrList: [],
            }
        },
        methods: {
            // 数据加载和搜索
            loadTable() {
                var that = this;
                that.$ajax({
                    method: 'post',
                    url: '/memberAccount/index',
                    transformRequest: [function (data) {
                        data = JSON.stringify({
                            jobNumber: $.trim(that.info.infoNum),
                            account: $.trim(that.info.infoPhone),
                            pageNum: that.pageList.pageNum,
                            pageSize: that.pageList.pageSize,
                        });
                        return data;
                    }],
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(function(data){
                    if(data.data.success) {
                        that.tableData = data.data.data.page.list;
                        that.pageList.total = data.data.data.page.total;
                    }
                    that.$clearObject(that.info);
                });
            },
            // 重置
            reset() {
                this.$clearObject(this.info);
            },
            // 新增弹框显示
            toAdd() {
                var that = this;
                that.newCustom = true;
                that.isScopeId = "";
                that.tableDataName = "新增用户",
                that.$clearObject(that.addInfo);
                that.addInfo.addPassword = "123456";
                that.$ajax.get("/memberAccount/onClick").then(function(res) {
                    that.roleList = res.data.data.roleList
                    that.ogrList = res.data.data.ogrList
                }).catch(function(error) {
                    console.log(error);
                });

            },
            // 修改信息
            UpdateCustom(id) {
                var that = this;
                that.newCustom = true;
                that.isScopeId = id;
                that.isDisabled = false;
                that.tableDataName = "修改用户",
                that.$ajax.get("/memberAccount/onClick?accountId=" + id).then(function(res) {
                    that.addInfo = res.data.data.data;
                    console.log(that.addInfo)
                    that.roleList = res.data.data.roleList
                    that.ogrList = res.data.data.ogrList
                }).catch(function(error) {
                    console.log(error);
                });
            },
            // 保存
            addNewCustom(id) {
                var that = this;

                if($.trim(that.addInfo.name) == "" || $.trim(that.addInfo.jobNumber) == "" ||$.trim(that.addInfo.roleId)=="" ||$.trim(that.addInfo.orgId)=="") {
                    alert("请将信息填写完整");
                    return;
                }else if(!/^1[34578]\d{9}$/.test($.trim(that.addInfo.account))) {
                    alert("手机格式错误");
                    return;
                }else {
                    var falg = "";
                    if(id) {
                        falg = '/memberAccount/deleteAccount';
                    }else {
                        falg = '/memberAccount/updateMemberAccount';
                    };
                    that.$ajax({
                        method: 'post',
                        url: falg,
                        transformRequest: [function (data) {
                            data = JSON.stringify({
                                name : $.trim(that.addInfo.name),
                                jobNumber: $.trim(that.addInfo.jobNumber),
                                password: $.trim(that.addInfo.addPassword),
                                account : $.trim(that.addInfo.account),
                                roleId : $.trim(that.addInfo.roleId),
                                orgId : $.trim(that.addInfo.orgId),
                            });
                            return data;
                        }],
                        headers: {
                         'Content-Type': 'application/json'
                        }
                    })
                    .then(function(data){
                        console.log(data)
                        if(data.data.success) {
                            console.log(data)
                            alert("保存成功！")
                            that.loadTable();
                        }
                        that.newCustom = false;
                        alert(data.data.tipMsg)
                    });
                }
            },
            // 删除信息
            deleteInfo(id) {
                var that = this;
                if(confirm("你确定删除么？")) {
                    that.$ajax.get("/memberAccount/deleteAccount?accountId=" + id).then(function(res) {
                        alert("删除成功！")
                        that.loadTable();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            },
            // 分页
            handleSizeChange(val) {
                var that = this;
                that.pageList.pageSize = val;
                that.loadTable();
            },
            // -----------------------------------------------------------------------------------------------------------------------------------      
            handleCurrentChange(val) {
                var that = this;
                that.pageList.pageNum = val;
                that.loadTable();
            },

        },
        mounted(){
            //当组件模板挂载时数据显示到上面去。
            this.loadTable();
        },
    }
</script>