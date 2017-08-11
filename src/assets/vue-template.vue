<!--
 coding by Alex of 2017-08-08
-->
<template>

    <!-- 请给予当前模块名字，作为类名  -->
    <el-row class="template-name">

        <!-- @content-title {必须存在}  作为当前模块的标题  -->
        <div class="content-title">
            <span>标题</span>
        </div>
        
        <!-- @content-search {必须存在}  作为当前模块的查询部分  -->
        <div class="content-search">
            
            <!-- 
                @btn {必须存在} 按钮初始化样式
                @btn-small {必须存在} 按钮尺寸
                @btn-blue {必须存在} 按钮颜色
            -->
            <el-button class="btn btn-small btn-blue" @click="searchFormData()">查 询</el-button>
            <el-button class="btn btn-small btn-orange" @click="reset">重 置</el-button>
        </div> 

        <!-- 
            @content-buttons {必须存在} 正文操作按钮，带icon按钮
            @btn-small {必须存在} 两字带icon 按钮，默认颜色为 btn-blue
            @btn-large {必须存在} 四字带icon 按钮，默认颜色为 btn-blue
        -->
        <el-col :span="24" class="content-buttons">

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-refresh "></i> 刷 新
            </el-button>

            <el-button class="btn btn-blue btn-large" @click="openSalePlanModal('新建计划')">
                <i class="fa fa-file-text-o"></i> 新建计划
            </el-button>

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-trash-o"></i>删除
            </el-button>

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-pencil-square-o"></i>编辑
            </el-button>

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-sign-in"></i>下发
            </el-button>

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-check-square-o"></i>保存
            </el-button>

            <el-button class="btn btn-blue btn-small" @click="refresh">
                <i class="fa fa-times "></i>关闭
            </el-button>
            
        </el-col>

        <!-- 
            @tab-title {必须存在} 表格Tabs按钮
        -->
        <el-tabs class="tab-title">
            <el-tab-pane></el-tab-pane>
        </el-tabs>
        
        <!-- @table-wrap {必须存在} 正文表格父类 属性border必选 -->
        <div class="table-wrap">
            <el-table border></el-table>
        </div>


        <!-- @table-page {必须存在} 正文表格分页 -->
        <div class="table-page fr">

        </div>

        <!-- 
            @default-dialog {必须存在} 初始化弹窗样式 
            @dialog-large {必须存在#与size='large'同时存在} 弹窗large尺寸定义 
        -->
        <el-dialog
            size="large"
            class="default-dialog dialog-large">
            <el-form>
                
                <div class="message">
                    <el-button class="btn btn-small btn-green" @click="addNewSalePlan()">完 成</el-button>
                    <el-button class="btn btn-small btn-gray" @click="confirmCloseModal()">关 闭</el-button>
                </div>
            </el-form>

            <div class="message">
                <el-button class="btn btn-small btn-green" @click="addNewSalePlan()">完 成</el-button>
                <el-button class="btn btn-small btn-gray" @click="confirmCloseModal()">关 闭</el-button>
            </div>

            
            <div class="table-wrap">

            </div>
        </el-dialog>
    </el-row>
</template>
