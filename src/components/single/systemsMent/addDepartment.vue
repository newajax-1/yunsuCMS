<template>
  <el-row class="add_department">
		<div class="content-title">
			<span>员工管理-组织架构</span>
		</div>
		<el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" ><i class="fa fa-refresh "></i> 刷 新</el-button>
			<el-button class="btn btn-blue btn-small" > 增 加 员 工</el-button>
        </el-col>
		<!-- 左侧部门 -->
		<el-col :span="6">
			<div class="table-wrap">
				<el-table
                    @cell-click="orgDetali"
                    :data="table_data">
                        <el-table-column prop="orgName"></el-table-column>
                        <el-table-column>
                            <template scope="scope">
                                <div v-show="show_tips[scope.$index].show">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="editorgDetali(scope.row.id)">编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="deleteStaff(scope.row.id)">删除</el-button>                                    
                                </div>
                            </template>
                        </el-table-column>
				</el-table>
			</div>
		</el-col> 
		
		<!--右侧 -->
		<el-col :span="18" >
			<div class="sub_org">
                <div class="title">
                    <span>下级部门</span>
                </div>
                <div class="detail">
                    <span>精益达{{main_title}}</span>
                </div>
                <el-form>
                    <el-row>
                        <el-col :span="8" v-for="item in form_data" :key="item.id">
                            <el-form-item >
                                <el-input 
                                placeholder="子部门" 
                                v-model="item.orgName"></el-input>
                            </el-form-item>
                        </el-col>               
                    </el-row>
                </el-form>
                <div class="message center mt-10">
                <el-button class="btn btn-blue btn-large" @click="addNewDepart">新增部门</el-button>
                <el-button class="btn btn-small btn-green"@click="updataDepartment()" >保 存</el-button>
                <el-button class="btn btn-small btn-gray"@click="backToOrg()" >返 回</el-button>
            </div>
			</div>
		</el-col>
	</el-row>
</template>
<script src="./addDepartments.js"></script>
<style lang="stylus">

.add_department 
    .el-form-item__content
        .el-input
            .el-input__inner
                width 180px
    .table-wrap
        margin-top 10px
        padding-bottom 10px
        text-align center
    .sub_org
        background #fff
        padding-bottom 20px
        margin-right:10px
        margin-left:10px
        margin-top:10px
        .title
            width 100%
            height 40px
            text-align center
            border-bottom:1px solid #e5e5e5
            background:#e4f3ff
            span 
                font-size 16px
                color #666
                line-height 40px
        .detail
            width 100%
            height 40px
            text-indent 2em
            border-bottom:1px solid #e5e5e5
            margin-bottom 12px
            span 
                font-size 16px
                color #666
                line-height 40px
        .el-form-item__content
            .el-input
                padding-left 18%
        .message
            margin-left:50%
            transform translateX(-22%)
    .table-wrap
        .el-table__header 
            th
                color #fff
                height 0
                line-height 0
                border 0 solid #fff  
</style>

