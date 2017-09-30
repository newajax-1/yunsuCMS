<template>
	<div class="role_managements">
        <el-row>
            <el-col :span="24">
            	<div class="content-title">
                    <span>系统管理-角色管理</span>
                </div>
                <div class="content-buttons">
                    <el-button  class="btn btn-blue btn-small" @click="refresh()" v-if="buttonsRightList[0]"> 刷 新</el-button>
                    <el-button  class="btn btn-blue btn-large" @click="addGroup()" v-if="buttonsRightList[1]"> 增加分组</el-button>
                </div>
		    </el-col>
	        <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="table-wrap">
                    <el-table
                        border
                        :data="table_data">
                        <el-table-column prop="index" label="NO" width="60"></el-table-column>
                        <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
                        <el-table-column prop="remarks" label="角色描述" width="200"></el-table-column>
                        <el-table-column prop="empNameList" label="成员"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    @click="addGroup(scope.row.id)"
                                    v-if="buttonsRightList[2]">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    @click="deleteRole(scope.row.id)"
                                    v-if="buttonsRightList[3]">删除</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    @click="roleManage(scope.row.id)"
                                    v-if="buttonsRightList[4]">成员维护</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="openModal(scope.row.id)"
                                    v-if="buttonsRightList[5]">权限</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 start-->
                    <div class="table-page">
                        <el-pagination
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[15, 20, 30, 40]"
                            :current-page.sync="page_list.pageNum"
                            :page-size="page_list.pageSize"
                            :total="page_list.total"
                            @size-change="currentSizeChange"
                            @current-change="currentPageChange">
                        </el-pagination>
                    </div>
                    <!--分页 end -->
                </div>
            </el-col>
            <!-- 数据表格 end -->

    	</el-row>

		<!--新增分组弹框 start-->
        <el-dialog
            size="small"
            class="default-dialog dialog-small"
            :visible.sync="add_group"
            :title="model_title">
            <div>
                <el-row>
                    <el-col :span="24">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" >

                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <el-form-item label="角色名称：" class="required">
                                        <el-input placeholder="输入角色名称" class="asterisk" v-model="add_info.roleName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="角色描述：">
                                        <el-input class="descrip"placeholder="输入描述" v-model="add_info.remarks"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <div class="message center mt-10">
                                <el-button class="btn btn-small btn-green" @click="saveModelData()" >提 交</el-button>
                                <el-button class="btn btn-small btn-gray" @click="closeDialog()">关 闭</el-button>
                            </div>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!--新增弹框 end-->

        <!--成员维护弹窗 start-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            :visible.sync="role_management"
            :before-close="closeModal"
            title="成员维护">
            <div>
                <el-row>
                    <!-- 下拉部门 -->
                    <el-col :span="3">
                        <el-menu 
                            default-active="2" 
                            class="el-menu-vertical-demo" 
                            @open="handleOpen" 
                            @close="handleClose" 
                            >
                            <el-menu-item 
                                v-for="item in org_info"  
                                :key="item.orgName"
                                index="item.id"
                                @click="changeDepm(item.id)">
                                {{item.orgName}}</el-menu-item>
                        </el-menu>
                    </el-col> 
                    <!--右侧多选框-->

                    <el-col :span="21">
                        <div class="top">
                            <el-row>
                                <el-col :span="3" :offset="1">
                                    <el-checkbox 
                                    :indeterminate="isSelected" 
                                    v-model="selectedAll" 
                                    @change="selectedMian">组内用户</el-checkbox>
                                </el-col>
                                <el-col :span="17" >
                                    <el-checkbox-group
                                    v-model="selectedChecked"
                                    @change="selecteList">
                                        <el-checkbox 
                                        @change="anther"
                                        v-for="item in selectedEmpList" 
                                        :label="item" 
                                        :key="item"></el-checkbox>
                                    </el-checkbox-group>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="bottoms">
                            <el-row>
                                <el-col :span="3" :offset="1">
                                    <el-checkbox 
                                        :indeterminate="isIndeterminate" 
                                        v-model="checkAll" 
                                        @change="AllMian">组外用户</el-checkbox>
                                </el-col>
                                <el-col :span="17" >
                                    <el-checkbox-group 
                                        v-model="isCheckedList "
                                        @change="AllList">
                                        <el-checkbox 
                                            @change="other"
                                            v-for="item in allEmpList" 
                                            :label="item" 
                                            :key="item"></el-checkbox>
                                    </el-checkbox-group>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    
                </el-row>
                <div class="message center mt-10">
                    <el-button class="btn btn-small btn-green"@click="saveMaintain()" >保存</el-button>
                    <el-button class="btn btn-small btn-gray"@click="closeModal()" >关 闭</el-button>
                </div>
            </div>
        </el-dialog>
        <!--成员维护弹窗 end-->

        <!--权限管理 start-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large jurisdiction"
            title="权限设置"
            :before-close="confirmCloseModal"
            :visible.sync="jurisdiction">

            <ul class="power-wrap">
                <li class="power-item " v-for="menu in button_list" :key="menu.chooseType">
                    <p class="power-title ">{{menu.menuName}}</p>
                    <ul class="sec-menu ">
                        <li class="sec-item clearfix" v-for="sec_menu in menu.secondMenuList" :key="sec_menu.chooseType">
                            <div class="sec-wrap">
                                <label class="sec-title fl">{{sec_menu.menuName}}</label>
                                <div class="check-box fl">
                                    <el-checkbox-group v-model="sec_menu.isChecked">
                                        <el-checkbox v-for="button in sec_menu.sysButtonList" :label="button" :key="button">{{button}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </li>
                    </ul>                  
                </li>
            </ul>
            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="confirmSendData()">提 交</el-button>
                <el-button class="btn btn-small btn-gray" @click="confirmCloseModal()">关 闭</el-button>
            </div>

        </el-dialog>
        <!--权限管理 end-->

    </div>
</template>

<script src="./rolemanagements.js"></script>
<style lang="stylus">
.layout-content 
    .role_managements
        .el-menu-vertical-demo
            left: 10px
        .descrip
            .el-input__inner
                width 400px
        .top
            width 98%
            height 100%
            border 1px solid #ccc
            margin-left 20px
            padding-top 20px
            border-radius 3px
            margin-bottom 8px
            padding-bottom 15px
        .bottoms
            width 98%
            height 100%
            border 1px solid #ccc
            margin-left 20px
            padding-top 20px
            border-radius 3px
            margin-bottom 8px
            padding-bottom 15px
        .power-wrap
            height: 550px 
            overflow-y: scroll
            border-bottom: 1px solid #e1e1e1
            .power-item
                width: 100%
                display: table
                border: 1px solid #e1e1e1
                border-bottom: 0
                &:nth-child(2n)
                    background: #eef1f6
            .power-title
                width: 1em
                padding: 0 10px
                border-right: 1px solid #e1e1e1
            .sec-menu,
            .power-title
                display: table-cell
                vertical-align: middle
            .sec-item
                padding: 5px 0
                border-bottom: 1px solid #e1e1e1
                &:last-child
                    border-bottom: 0
            .sec-title
                width: 8em
                padding: 0 10px
                border-right: 1px solid #e1e1e1
                text-align: right
            .check-box
                padding: 0 10px

</style>
