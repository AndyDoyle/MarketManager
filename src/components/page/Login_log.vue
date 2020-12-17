<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-good"></i> 登录日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                :default-sort = "{prop: 'createDate', order: 'descending'}"
                header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="userPhone" label="电话号码" width="150" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户ID" sortable :formatter="formatDate"></el-table-column>
                <el-table-column prop="method" label="method" :formatter="formatDate"></el-table-column>
                <el-table-column prop="createDate" label="时间" sortable width="300" align="center"></el-table-column>
                <el-table-column prop="ip" label="IP" width="130" align="center"></el-table-column>
                <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { goodData } from '../../api/index';
export default {
    name: 'login_log',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 1,
            form: {},
            eform: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // //格式化时间方法区
        // formatDate(row, column) {
        //     // 获取单元格数据
        //     let data = row[column.property]
        //     if(data == null) {
        //         return null
        //     }
        //     let dt = new Date(data)
        //         return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        // },
        // 获取数据
        getData() {            
        this.axios({
            method:"get",
            url:"admin/log/login_log",
            headers:{'authorization':window.sessionStorage.getItem('token')}
        })
        .then(res => { 
            console.log(res)
            console.log(res.data)
            this.tableData = res.data
        })
        },
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
