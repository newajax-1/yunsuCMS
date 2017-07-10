<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="left"
                        label-width="0px"
                        class="demo-ruleForm card-box loginform"
                        :style="formOffset"
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="登录" name="login">
                                <el-form-item
                                    prop='username'>
                                    <el-input type="text" auto-complete="off" v-model="ruleForm.username" placeholder="账号"></el-input>
                                </el-form-item>

                                <el-form-item
                                    prop='password'>
                                    <el-input type="password" auto-complete="off" @keyup.enter.native="login()" v-model="ruleForm.password" placeholder="密码"></el-input>
                                </el-form-item>
                                <!--
                                <el-form-item
                                    prop='identify'>
                                    <el-row>
                                        <el-col :span="16"><el-input type="text" v-on:keyup.enter="login"  v-model="ruleForm.identify" auto-complete="off" placeholder="验证码"></el-input></el-col>
                                        <el-col :span="8"><img class="identify-img"src="http://192.168.168.66:8080/ybs_mes/memberAccount/AuthImg"></el-col>
                                    </el-row>
                                </el-form-item>
                                -->
                                <el-checkbox style="margin:0px 0px 35px 0px;">
                                    记住密码
                                </el-checkbox>
                                <el-form-item style="width:100%;">
                                    <el-button type="primary" @click="login()">登录
                                    </el-button>
                                    <el-button>重置</el-button>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="APP" name="app">
                                APP
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                    <!--登陆错误提示 -->
                    <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    size="tiny">
                        <span v-text="errorMsg"></span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script src="./login.js"></script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "login.styl"
</style>
