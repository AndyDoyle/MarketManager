<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-stock"></i> 库存表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="query.type" placeholder="商品类型" class="handle-select mr10">
            <el-option key="1" label="生活用品" value=1></el-option>
            <el-option key="2" label="家用电器" value=2></el-option>
            <el-option key="3" label="食品" value=3></el-option>
            </el-select>
            <el-input v-model="query.username" placeholder="商品名称" class="handle-input mr10" ></el-input>
            <el-button type="primary" icon="el-icon-search" >搜索</el-button>
        </div>
        <el-table :data="tableData" border stripe>
            <el-table-column prop=index label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="goodId" label="商品名称"></el-table-column>
            <el-table-column prop="date" label="更新时间"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="unitId" label="单位"></el-table-column>
            <el-table-column prop="price" label="总金额"></el-table-column>
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
</template>
<script>
import { stockData } from '../../api/index';
export default {
    name: 'stock',
    data() {
        return {
            query: {
                name: '',
                date: '',
                quantity:'',
                unit:'',
                price:'',
                pageIndex: 1,
                pageSize: 10
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
                url: 'stock',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.tableData = res.data;
            });
                this.tableData = res.list;
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
