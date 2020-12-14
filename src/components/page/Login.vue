<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">超市后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="loginref" label-width="0px" class="ms-content">
                <el-form-item prop="phone">
                    <el-input v-model="param.phone" placeholder="账号/用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="login()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            param: {
                phone: '11111111',
                password: '12345',
            },
            rules: {
                phone: [{ required: true, message: '请输入用户名', trigger: 'blur' },
                {min: 6, max: 18,message: '请输入6到18位账号'}],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        login(){
        this.axios({
            url:'login',
            method:'post',
            params:this.param,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            console.log(res);
            // console.log(this.param);
            // console.log(res.headers);
            //获取后端token
            this.userToken = res.headers.authorization;
            //储存到vuex
            window.sessionStorage.setItem('token', this.userToken);
            // console.log(sessionStorage);
            this.$message.success("登陆成功");
            this.$router.push({ path:'/dashboard'})
        }).catch(err=>{
            console.log(err);
            //失败后删除token
            window.sessionStorage.removeItem('token');
            this.$message.error("登录失败");
        });
    },

    },
};
</script>

<style lang='less' scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>