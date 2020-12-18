<template>
   <div class="all-container">
    <div class="all-container-padding bg"  >
      <el-form :model="query" ref="EditorUserForms">
        <el-form-item label="用户名" prop="username" >
         <el-col :span="8"> <el-input v-model="query.username" disabled ></el-input></el-col>
        </el-form-item>
        <el-form-item label="电话" prop="phone" >
         <el-col :span="8">  <el-input v-model="query.phone" placeholder="请输入电话" disabled></el-input></el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex" > 
         <el-col :span="8">  <el-input v-model="query.sex" placeholder="请输入性别" disabled></el-input></el-col>
        </el-form-item>
        <el-form-item label="用户角色" prop="roles" >
         <el-col :span="8">
          <el-input v-model="query.roles" disabled ></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <!-- <div class="grid-content bg-purple">
       <el-button type="primary" @click="EditorUserClick('query')" >保存</el-button>
      </div>
     </el-tab-pane>
     <el-tab-pane label="修改密码" name="second">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
       <el-form-item label="原密码" prop="pass" >
         <el-col :span="8">  <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass" >
         <el-col :span="8"><el-input v-model="ruleForm.newpass" placeholder="请输入新密码" id="newkey" type="password"></el-input></el-col>
        </el-form-item>
        <el-form-item label="重复新密码" prop="checknewpass" >
         <el-col :span="8">  <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input></el-col>
        </el-form-item>
        </el-form>
        <div class="grid-content bg-purple">
       <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div> -->        
    </div>
   </div>
</template>
<script>
import { userinfoData } from '../../api/index';
export default {
    name: 'currentUser',
    data() {
        return {
            query: {
                id: '',
                username: '',
                phone:'',
                sex:'',
                price:'',
                roles:[{
                    id:'',
                    name:''
                }]
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.axios({
            method: 'get',
            url: 'user',
            headers: { authorization: window.sessionStorage.getItem('token') }
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            this.query = res.data;
        });
        this.pageTotal = res.pageTotal || 50;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>