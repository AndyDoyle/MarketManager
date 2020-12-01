<template>
<div class="center">
    <span>管理员中心 / 管理用户</span>
    <br/>
    <hr/>

    <!-- 在这里写东西 -->
    <div class="search_text">
        <input type="text" placeholder="请输入..."><button>搜索<tton>
    </div>
    {{list}}
    <table class="user_data">
        <thead>
            <tr>
                <th class="user_head">用户ID</th>
                <th class="user_head">用户组</th>
                <th class="user_head">用户名</th>
                <th class="user_head">联系方式</th>
                <th class="user_head">邮箱</th>
                <th class="user_head">注册时间</th>
                <th class="user_head">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list.result" :key="item.id">
                <td class="user_msg">{{item.id}}</td>
                <td class="user_msg">{{item.duty}}</td>
                <td class="user_msg">{{item.username}}</td>
                <td class="user_msg">{{item.phone}}</td>
                <td class="user_msg">{{item.email}}</td>
                <td class="user_msg">{{item.begin_time}}</td>
                <td class="user_msg1"><a href="" >编辑</a></td>
                <td class="user_msg1"><a href="" >删除</a></td>
            </tr>
        </tbody>
    </table>
    
</div>
    
    
</template>

<script>
export default {
    name:'manager_users',
    mounted() {
        this.queryuser();
    },
    data(){

        return {
            list:[
                {id:'001',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},
                // {id:'002',duty:'zz',user_name:'sb',phone:110,email:'110@qq.com',begin_time:'2000/01/01'},



            ],
        }
    },
    methods:{
        queryuser(){
            this.axios({
                method:"get",
                url:"role",
                headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpZCI6IjJmODMxYmIzLTYwNDktNDYwNy05Y2YzLTMxMGM0YmQyMjY0YSIsImV4cCI6MTYwNzAwNzEwNn0.rzb2oMNG5wrtMr0CGArKZA-qzxqP0E5Xin7I1Oseinms1QzZmpKm7ppVoTTFbYdV'}
            })
            .then(res => {
                console.log(res)
                console.log(res.data)
                this.list = res.data
            })

            }

        },

        //
        // del(id){    //删除
        //     this.$http.get('api/delproduct/'+id).then(result=>{
        //         if (result.body.status === 0) {
        //             //成功
        //             this.getAllList()
        //         } else {
        //             alert('获取数据失败')
        //         }
        //     })
        // }

}
</script>

<style scoped>

.center{
    height: 100%;
    /* border: 1px solid black; */
    width: 90%;
    margin-left:5%;
}
table,td{
    border:solid;

}
.user_head{
    padding-right: 50px;
}
.user_msg{
    padding-right: 50px;
}
.user_msg1{
    padding-right: 10px;
}
.search_text{
    padding-top: 10px;
    padding-bottom: 10px;
}
span{
    font-size: 12px;
    font-family: sans-serif;
    color: grey;
}

</style>