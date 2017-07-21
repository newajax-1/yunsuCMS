<template>
	<div>
        <el-row>
            <el-col :span="24">
            	<div class="content-title">
                    <span>角色管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
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
                        <el-table-column prop="roleName" label="角色名称"></el-table-column>
                        <el-table-column prop="remark" label="角色描述"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="UpdateCustom(scope.row.roleId)">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="deleteInfo(scope.row.roleId)">删除</el-button>
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
            :title="titleName"
            custom-class="pub-dialog"
            :visible.sync="newCustom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">

                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="" >

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="角色名称：">
                                            <el-input v-model="addInfo.roleName" :placeholder="addInfo.roleName"></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="角色描述：">
                                            <el-input v-model="addInfo.remark" :placeholder="addInfo.remark"></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="权限分配：">
                                            <el-tree
                                              :data="data2"
                                              show-checkbox
                                              default-expand-all
                                              node-key="id"
                                              ref="tree"
                                              highlight-current
                                              :props="defaultProps"
                                              class="bigTree">
                                            </el-tree>
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
                    <el-button class="btn-edit btn" @click="showAdd(adfasdasd)">保存</el-button>
                    <el-button class="btn-save btn" @click="">取消</el-button>
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
                // 分页
                pageList: {
                  pageNum: 1,
                  pageSize: 10,
                  total: 1
                },
                currentPage: 1,
                adfasdasd: "",
                titleName: "",
                // 查询
                info: {
                    infoName: "",
                },

                tableData: [],

                addInfo: {
                    roleName: "",
                    remark: "",
                },


                /////////////////////////////////////////////////////////////////////////////////////////////////////
                data2: [
                    {
                        id: "1",
                        label: '一级 1',
                        children: [
                            {
                                id: "1-1",
                                label: '二级 1-1',
                            }
                        ]
                    }, {
                        id: "2",
                        label: '一级 2',
                        children: [
                            {
                                id: "2-1",
                                label: '二级 2-1'
                            }, {
                                id: "2-2",
                                label: '二级 2-2'
                            }
                        ]
                    }, {
                        id: "3",
                        label: '一级 3',
                        children: [
                            {
                                id: "3-1",
                                label: '二级 3-1'
                            }, {
                                id: "3-2",
                                label: '二级 3-2'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
			}
		},
		methods: {
            // 数据加载和搜索
            loadTable() {
                var that = this;
                that.$ajax({
                    method: 'post',
                    url: '/role/loadTable',
                    transformRequest: [function (data) {
                        data = JSON.stringify({
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
                    // that.$clearObject(that.info);
                });
            },
            // 重置
            reset() {
                var that = this;
                that.$clearObject(that.info);
            },
            // 弹框显示
            toAdd() {
            	this.adfasdasd = "";
            	this.titleName = "新增";
                var that = this;
                that.newCustom = true;
                that.$clearObject(that.addInfo);
            },
            showAdd(id) {
                var that = this;
                var flag;
                if(id == "") {
                	flag = '/role/addRole'
                }else{
                	flag = '/role/update'
                }
                that.$ajax({
                    method: 'post',
                    url: flag,
                    transformRequest: [function (data) {
                        data = JSON.stringify({
                            roleName: that.addInfo.roleName,
                            remark: that.addInfo.remark,
                            roleId: id,
                            stringId: that.$refs.tree.getCheckedKeys().join(","),
                        });
                        console.log(data)
                        return data;
                    }],
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(function(data){
                    if(data.data.success) {
                        that.newCustom = false;
                     	that.loadTable();
                    }
                     
                });
            },
            // 修改信息
            UpdateCustom(id) {
             	this.adfasdasd = id;
             	this.titleName = "修改";
                var that = this;
                that.$ajax({
                    method: 'post',
                    url: '/role/queryById',
                    transformRequest: [function (data) {
                        data = JSON.stringify({
                              roleId: id,
                        });
                        return data;
                    }],
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(function(data){
                    if(data.data.success) {
                   		that.addInfo.roleName = data.data.data.data.roleName
                   		that.addInfo.remark = data.data.data.data.remark
                    }
                     
                });
                that.newCustom = true;
            },
            // 删除信息
            deleteInfo(id) {
             var that = this;
                that.$ajax({
                    method: 'post',
                    url: '/role/deleteById',
                    transformRequest: [function (data) {
                        data = JSON.stringify({
                              roleId: id,
                              isDel: 1,
                        });
                        return data;
                    }],
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(function(data){
                    if(data.data.success) {
                        that.newCustom = false;
                     	that.loadTable();
                    }
                     
                });
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
            // 设置默认权限项
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes(
                    [
                        {
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 9,
                            label: '三级 1-1-1'
                        }
                    ]
                );
            },
        },
        mounted(){
            //当组件模板挂载时数据显示到上面去。
            this.loadTable();
        },
	}
</script>

<style lang="stylus">
.bigTree
    width 340px
</style>