<template>
  
    <div >
                    <el-form
                    
    ref="ruleForm"
    :model="ruleForm" 
    :rules="rules">
                                <el-form-item label='订单编号：' prop="hehe">
                                    <el-input  v-model='ruleForm.hehe'></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                                <el-form-item label="年龄" prop="age">
                                    <el-input v-model.number="ruleForm.age"></el-input>
                                </el-form-item>

                    </el-form>
    </div>
</template>
<script>
  export default {
    name : "test",
    data(){
        var haha = (rule, value, callback) => {
            debugger
            if (value === '') {
                callback(new Error('请输入订单编号'));
            }
            callback();
        };
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        return {
          //新增校验
            ruleForm: {
                hehe: '',
                age: ''
            },

            rules: {
                hehe: [
                    { validator: haha, trigger: 'blur' }
                ],
                age: [
                  { validator: checkAge, trigger: 'blur' }
                ]
            }
        }
    }
  }
</script>