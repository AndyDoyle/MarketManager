<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-worktime"></i> 工作时间表 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
            <el-select v-model="query.role" placeholder="身份" class="handle-select mr10">
                <el-option key="1" label="营业员" value="营业员"></el-option>
                <el-option key="2" label="库管员" value="库管员"></el-option>
            </el-select>
            <el-input v-model="query.username" placeholder="用户名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addUserTime">添加用户时间表</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="userId" label="用户名称"></el-table-column>
            <el-table-column prop="sdate" label="上班时间" :formatter="formatDate"></el-table-column>
            <el-table-column prop="edate" label="下班时间" :formatter="formatDate"></el-table-column>
            <el-table-column prop="workDay" label="星期"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
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
        <!-- 弹出增加用户时间表编辑框 -->
        <el-dialog title="添加用户时间表" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上班时间">
                    <el-time-picker placeholder="选择时间" v-model="form.sdate" style="width: 100%"></el-time-picker>
                </el-form-item>
                <el-form-item label="下班时间">
                    <el-time-picker placeholder="选择时间" v-model="form.edate" style="width: 100%"></el-time-picker>
                </el-form-item>
                <el-form-item label="星期">
                    <el-input v-model="form.workday"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="上班时间">
                    <el-time-picker placeholder="选择时间" v-model="form.sdate" style="width: 100%"></el-time-picker>
                </el-form-item>
                <el-form-item label="下班时间">
                    <el-time-picker placeholder="选择时间" v-model="form.edate" style="width: 100%"></el-time-picker>
                </el-form-item>
                <el-form-item label="星期">
                    <el-input v-model="form.workday"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { worktimeData } from '../../api/index';
export default {
    name: 'worktime',
    data() {
        return {
            query: {
                name: '',
                sdate: '',
                edate: '',
                workday: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            pageTotal: 1,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //格式化时间方法区
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property]
            if(data == null) {
                return null
            }
            let dt = new Date(data)
                return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                //return dt.getHours() >= 10 ? dt.getHours() : '0' + dt.getHours() +':'+ dt.getMinutes()>=10?dt.getMinutes():'0'+dt.getMinutes() +':'+ dt.getSeconds() >= 10 ? dt.getSeconds() : '0' + dt.getSeconds()
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            this.axios({
                method: 'get',
                url: 'worktime',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.tableData = res.data;
            });
            this.pageTotal = res.pageTotal || 50;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row ,id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.axios({
                    method: 'delete',
                    url: 'worktime/'+id,
                    headers: { authorization: window.sessionStorage.getItem('token') }
                    })
                    .then((res) => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
            })
            .catch((err) => {
                this.$message.error('删除失败');
            });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        addUserTime() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //增加用户

        // 保存添加
        saveAdd() {
            this.axios({
                method: 'post',
                url: 'worktime',
                params:this.form,
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
            .then((res) => {
                this.$message.success(`添加成功`);
                location.reload;
            })
            .catch((err) => {
                this.$message.error(`添加失败`);
            });
            this.addVisible = false;
        },
        // 保存编辑
        saveEdit() {
            this.axios({
                method: 'put',
                url: 'worktime',
                params:this.eform,
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
            .then((res) => {
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.eform);
            })
            .catch((err) => {
                this.$message.success(`修改失败`);
            });
            this.editVisible = false;
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
