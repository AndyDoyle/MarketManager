<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-good"></i> 盘存表 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addRecord">添加盘点记录</el-button>
            </div>
            <el-table
                :data="recordData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="盘点⽇期"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看盘点记录</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
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
        </div>
        <el-dialog title="盘存记录" :visible.sync="recVisible" width="90%">
            <el-form ref="addForm" :model="addForm" label-width="90%">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <template slot-scope="scope">
                        <el-table-column
                            v-model="addForm[scope.$index].date"
                            prop="date"
                            label="最后更新⽇期"
                            width="120"
                            align="center"
                        ></el-table-column>
                        <el-table-column prop="goodId" label="商品名称"></el-table-column>
                        <el-table-column prop="price" label="商品种类" width="150" align="center"></el-table-column>
                        <el-table-column prop="unitId" label="单位" width="100" align="center"></el-table-column>
                        <el-table-column prop="quantity" label="记录数量"></el-table-column>
                        <el-table-column label="盘点数量">
                            <el-input v-model="addForm[scope.$index].newquantity"></el-input>
                        </el-table-column>
                        <el-table-column label="盈亏">
                            <el-input v-model="addForm.yk" disabled></el-input>
                        </el-table-column>
                    </template>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="saveAdd">保存退出</el-button>
            </span>
        </el-dialog>
        <!-- 查看盘点记录弹出框 -->
        <el-dialog title="盘存记录" :visible.sync="editVisible" width="70%">
            <el-form ref="editForm" :model="editForm" label-width="70%">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="id" label="Index" width="60" align="center"></el-table-column>
                    <el-table-column prop="goodname" label="商品名称"></el-table-column>
                    <el-table-column prop="type" label="商品种类" width="150" align="center"></el-table-column>
                    <el-table-column prop="unit" label="单位" width="100" align="center"></el-table-column>
                    <el-table-column prop="quantity" label="记录数量"></el-table-column>
                    <el-table-column label="盘点数量">
                        <el-input v-model="editForm.newquantity"></el-input>
                    </el-table-column>
                    <el-table-column label="盈亏">
                        <el-input v-model="editForm.yk"></el-input>
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保存退出</el-button>
            </span>
        </el-dialog>
        <!-- 添加盘点记录弹出框 -->

        <el-dialog title="添加记录" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="盘点⽇期">
                    <el-col :span="11">
                        <el-date-picker
                            type="date"
                            placeholder="选择⽇期"
                            v-model="addForm.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { ykData } from '../../api/index';
export default {
    name: 'Inventory',
    data() {
        return {
            query: {
                goodname: '',
                goodid: '',
                date: '',
                type: '',
                typeid: '',
                quantity: '',
                newquantity: '',
                unit: '',
                unitid: '',
                yk: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            recordData: [],
            unitData: [],
            typeDate: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            recVisible:false,
            pageTotal: 0,
            addForm: [],
            editForm: {},
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
                url: 'inventory/record',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data);
                this.recordData = res.data;
            });
            this.axios({
                method: 'get',
                url: 'unit',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data);
                this.unitData = res.data;
            });
            this.axios({
                method: 'get',
                url: 'goodtype',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data);
                this.typeData = res.data;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // ⼆次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
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
        // 查看盘点记录操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存记录添加
        saveEdit() {
            this.addVisible = false;
            this.$message.success(`添加记录成功`);
            // this.$message.success(`修改第 ${this.idx + 1} ⾏成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 添加操作
        addRecord() {
            this.axios({
                method: 'get',
                url: 'stock',
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    this.addForm = res.data;
                })
                .catch();
            this.addVisible = true;
        },
        //确认查看记录
        saveAdd() {
            this.axios({
                method: 'post',
                params: this.addForm,
                url: 'admin/user',
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
                .then((res) => {
                    this.$message.success('添加成功');
                    location.reload();
                })
                .catch((err) => {
                    this.$message.success('添加成功');
                });
            this.recVisible = false;
            // this.$message.success(`保存成功`);
        },
        //取消编辑
        cancelEdit() {
            this.editVisible = false;
            this.$message.error(`取消编辑`);
        },
        //取消添加
        cancelAdd() {
            console.log(this.addForm);
            this.addVisible = false;
            this.$message.error(`取消添加`);
        },
        // 分⻚导航
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