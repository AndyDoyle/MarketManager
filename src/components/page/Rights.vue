<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <div class="handle-box">
                <el-select v-model="form.roleid" placeholder="身份" class="handle-select mr10">
                    <el-option key="3" label="营业员" value="3"></el-option>
                    <el-option key="2" label="库管员" value="2"></el-option>
                    <el-option key="1" label="系统管理员" value="1"></el-option>
                </el-select>
                <!-- <el-input  placeholder="用户名称" width=30% class="handle-input mr10"></el-input> -->
            <el-button type="primary" icon="el-icon-search"  @click="findpermission">搜索</el-button>
            </div>
            <el-table :data="tableData" border stripe>
                <el-table-column label="序号" width="500" prop="id"></el-table-column>
                <el-table-column label="权限名称" prop="name"></el-table-column>
                <!-- <el-table-column label="路径" prop="method"></el-table-column> -->
                <!-- <el-table-column label="权限等级" prop="level"> 
            <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
            </template>
            </el-table-column> -->
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: '',
    created() {
        this.getRightsList();
    },
    data() {
        return {
            tableData: [],
            form: {}
        };
    },
    // created() {
    //     // 获取所有的权限
    //     this.getRightsList()
    // },
    methods: {
        getRightsList() {
            this.axios({
                method: 'get',
                url: 'admin/permission',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.tableData = res.data;
            });
        },
        findpermission() {
            this.axios({
                method: 'get',
                url: 'admin/role_permission/' + this.form.roleid,
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data);
                this.tableData = res.data;
            });
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
