<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 商品入库单 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-select v-model="query.type" placeholder="商品种类" class="handle-select mr10">
                    <el-option key="1" label="食零" value="食零"></el-option>
                    <el-option key="2" label="生活用品" value="2"></el-option>
                    <el-option key="3" label="家用电器" value="3"></el-option>
                    <el-option key="4" label="饮品" value="4"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="商品名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addRecord">添加入库记录</el-button>
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
                <el-table-column prop="supplierId" label="供应商名称"></el-table-column>
                <el-table-column prop="goodId" label="商品名称"></el-table-column>
                <el-table-column prop="date" label="入库日期" :formatter="formatDate"></el-table-column>
                <el-table-column prop="quantity" label="入库数量"></el-table-column>
                <el-table-column prop="unitId" label="入库单位"></el-table-column>
                <el-table-column prop="price" label="入库单价"></el-table-column>
                <el-table-column prop="paid" label="已付金额"></el-table-column>
                <!-- <el-table-column prop="元" label="备注">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.other==='支付完成'?'success':(scope.row.other==='支付未完成'?'danger':'')"
                        >{{scope.row.other}}</el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row.id, scope.$index, scope.row)"
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

        <!-- 添加入库记录弹出框 -->
        <el-dialog title="入库记录添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="供应商名称">
                    <el-input v-model="form.supplierId"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="form.goodId"></el-input>
                </el-form-item>
                <el-form-item label="入库日期">
                    <el-col :span="11">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="入库数量">
                    <el-input v-model="form.quantity"></el-input>
                </el-form-item>
                <el-form-item label="入库单位">
                    <el-select v-model="form.unitId" placeholder="请选择">
                        <el-option key="1" label="包" value="1"></el-option>
                        <el-option key="2" label="瓶" value="2"></el-option>
                        <el-option key="3" label="个" value="3"></el-option>
                        <el-option key="4" label="听" value="4"></el-option>
                        <el-option key="5" label="件" value="5"></el-option>
                        <el-option key="6" label="箱" value="6"></el-option>
                        <el-option key="7" label="只" value="7"></el-option>
                        <el-option key="8" label="台" value="8"></el-option>
                        <el-option key="9" label="袋" value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入库单价">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="操作用户">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="已付金额">
                    <el-input v-model="form.paid"></el-input>
                </el-form-item>
                <!-- <el-form-item label="备注">
                    <el-input v-model="form.other"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="saveRecord">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="eform" :model="eform" label-width="70px">
                <el-form-item label="供应商名称">
                    <el-input v-model="eform.supplierId"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="eform.goodId"></el-input>
                </el-form-item>
                <el-form-item label="入库日期">
                    <el-col :span="11">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="eform.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="入库数量">
                    <el-input v-model="eform.quantity"></el-input>
                </el-form-item>
                <el-form-item label="入库单位">
                    <el-input v-model="eform.unit"></el-input>
                </el-form-item>
                <el-form-item label="入库单价">
                    <el-input v-model="eform.price"></el-input>
                </el-form-item>
                <el-form-item label="已付金额">
                    <el-input v-model="eform.paid"></el-input>
                </el-form-item>
                <el-form-item label="操作用户">
                    <el-input v-model="eform.userId"></el-input>
                </el-form-item>
                <!-- <el-form-item label="备注">
                    <el-input v-model="eform.other"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { goodinData } from '../../api/index';
export default {
    name: 'goodin',
    data() {
        return {
            query: {
                id: '',
                date: '',
                supplierId: '',
                supllierid: '',
                goodId: '',
                goodid: '',
                quantity: '',
                unit: '',
                unitid: '',
                price: '',
                paid: '',
                userid: '',
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
        //格式化时间方法区
        formatDate(row, column) {
            // 获取单元格数据
            let data = row[column.property];
            if (data == null) {
                return null;
            }
            let dt = new Date(data);
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
        },
        // 获取数据
        getData() {
            this.axios({
                method: 'get',
                url: 'goodin',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.tableData = res.data;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(id, index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log('删除的ID是' + id),
                        this.axios({
                            method: 'delete',
                            url: 'goodin/' + id,
                            headers: { authorization: window.sessionStorage.getItem('token') }
                        })
                            .then((res) => {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            })
                            .catch((err) => {
                                this.$message.error('删除成功');
                            });
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
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.eform = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.axios({
                method: 'put',
                url: 'goodin',
                params:this.eform,
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
                .then((res) => {
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.eform);
                })
                .catch(() => {
                    this.$message.error('编辑失败');
                });
            this.editVisible = false;
        },
        // 添加操作
        addRecord() {
            this.addVisible = true;
        },
        //保存添加
        saveRecord() {
            this.axios({
                method: 'post',
                url: 'goodin',
                params: this.form,
                headers: { authorization: window.sessionStorage.getItem('token') }
            })
                .then((res) => {
                    this.$message.success(`添加记录成功`);
                    location.reload();
                })
                .catch(() => {
                    this.$message.error(`添加记录失败`);
                });
            this.addVisible = false;
        },
        //取消编辑
        cancelEdit() {
            this.editVisible = false;
            this.$message.error(`取消编辑`);
        },
        //取消添加
        cancelAdd() {
            this.addVisible = false;
            this.$message.error(`取消添加`);
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
