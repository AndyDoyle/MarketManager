<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-user"></i> 用户表 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
            <el-select v-model="query.roles" placeholder="职位" class="handle-select mr10" @change="handleSearch">
                <el-option key="1" label="系统管理员" value="1"></el-option>
                <el-option key="3" label="营业员" value="3"></el-option>
                <el-option key="2" label="库管员" value="2"></el-option>
            </el-select>
            <el-input v-model="query.username" placeholder="用户名称" style="width: 200px;" class="handle-input" @keyup.enter.native="handleSearch" />
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
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
            <el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名称"></el-table-column>
            <el-table-column prop="phone" label="用户电话"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="roles[0].name" label="职位"></el-table-column>
            <el-table-column label="操作" width="270" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" icon="el-icon-setting" @click="handleRight(scope.row.id)">授权</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id, scope.row, scope.$index)"
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
        <!-- 弹出赋权窗口 -->
        <el-dialog title="添加角色" :visible.sync="rightVisible" width="20%">
            <el-form ref="rformref" :model="rightform" label-width="70px">
                <el-form-item label="用户ID">
                    <el-input v-model="rightform.userid"></el-input>
                </el-form-item>
                <el-form-item label="选择角色">
                    <el-select v-model="rightform.roleid" placeholder="请选择角色添加">
                        <el-option label="营业员" value="3"></el-option>
                        <el-option label="库管员" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rightVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRight">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 弹出增加用户编辑框 -->
        <el-dialog title="添加用户" :visible.sync="addVisible" width="30%">
            <el-form ref="aformref" :model="addform" label-width="70px">
                <el-form-item label="用户名称">
                    <el-input v-model="addform.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="addform.password"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="addform.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addform.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="uformref" :model="updateform" label-width="70px">
                <el-form-item label="用户ID">
                    <el-input v-model="updateform.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="updateform.username"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="updateform.password"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="updateform.phone"></el-input>
                </el-form-item>
                <!-- <el-form-item label="职位">
                    <el-input v-model="updateform.roles[0].name"></el-input>
                </el-form-item> -->
                <el-form-item label="性别">
                    <el-radio-group v-model="updateform.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
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
import { userData } from '../../api/index';
export default {
    name: 'user',
    data() {
        return {
            query: {
                qry:'',
                username: '',
                password: '',
                phone: '',
                sex: ''
                // pageIndex: 1,
                // pageSize: 10
            },
            input: '',
            // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            rightVisible: false,
            pageTotal: 1,
            addform: {},
            updateform: {},
            rightform: {},
            idx: -1,
            id: -1
            // rules: {
            //     phone: [{ required: true, message: '请输入注册手机号', trigger: 'blur' },
            //     {min:11 ,  message: '请输入正确的手机号'}],
            //     password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            // },
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
                url: 'admin/user',
                headers: { authorization: window.sessionStorage.getItem('token') }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.tableData = res.data;
            });
            // this.pageTotal = res.pageTotal || 50;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },

        // search() {
        //     // 支持模糊查询
        //     // this.xmgcqkJsonsData：用于搜索的总数据
        //     //　toLowerCase():用于把字符串转为小写，让模糊查询更加清晰
        //     let _search = this.jobNo.toLowerCase();
        //     let newListData = []; // 用于存放搜索出来数据的新数组
        //     if (_search) {
        //         this.xmgcqkJsonsData.filter((item) => {
        //             if (item.code.toLowerCase().indexOf(_search) !== -1) {
        //                 newListData.push(item);
        //             }
        //         });
        //     }
        //     this.xmgcqkJsonsData = newListData;
        //     // console.log(‘新数组',newListData)
        // },
        search() {
            if (!this.input) {
                return this.items;
            }
            return this.items.filter((v) => {
                return v.name.includes(this.input);
            });
        },

        // 删除操作
        handleDelete(id, row, index) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    console.log('删除的ID是' + index),
                        this.axios({
                            method: 'delete',
                            url: 'admin/user/' + id,
                            headers: { authorization: window.sessionStorage.getItem('token') }
                        })
                            .then((res) => {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            })
                            .catch(() => {});
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            this.$confirm('确定要批量删除吗？', '提示', {
                type: 'warning'
            })
                .then((res) => {
                    console.log(length);
                    for (let i = 0; i < length; i++) {
                        // console.log(this.multipleSelection[i].id);
                        this.axios({
                            method: 'delete',
                            url: 'admin/user/' + this.multipleSelection[i].id,
                            headers: { authorization: window.sessionStorage.getItem('token') }
                        })
                            .then((res) => {})
                            .catch(() => {});
                    }
                    this.$message.success('删除成功');
                    location.reload();
                    this.multipleSelection = [];
                })
                .catch((err) => {
                    this.$message.error('删除失败');
                    this.multipleSelection = [];
                });
        },

        // 添加用户
        addUser() {
            this.addVisible = true;
        },

        // 保存添加
        saveAdd() {
            this.addVisible = false;
            this.$refs.aformref.validate((valid) => {
                console.log(valid);
                // this.query=this.formdata,
                // console.log(query),
                this.axios({
                    method: 'post',
                    params: this.addform,
                    url: 'admin/user',
                    headers: { authorization: window.sessionStorage.getItem('token') }
                })
                    .then((res) => {
                        this.$message.success('添加成功');
                        location.reload();
                    })
                    .catch((err) => {
                        this.$message.error('添加失败');
                    });
            });
        },

        // 编辑赋权
        handleRight(id) {
            this.id = id;
            this.rightform.userid = id;
            this.rightVisible = true;
        },

        // 保存编辑
        saveRight() {
            this.rightVisible = false;
            this.$refs.rformref.validate((valid) => {
                console.log(valid);
                this.axios({
                    method: 'put',
                    params: this.rightform,
                    url: 'admin/user_role',
                    headers: { authorization: window.sessionStorage.getItem('token') }
                })
                    .then((res) => {
                        location.reload();
                        this.$message.success('赋权成功');
                    })
                    .catch((err) => {
                        this.$message.error('赋权失败');
                    });
            });
        },

        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.updateform.id = row.id;
            this.editVisible = true;
        },

        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$refs.uformref.validate((valid) => {
                console.log(valid);
                console.log(this.updateform);
                this.axios({
                    method: 'put',
                    params: this.updateform,
                    url: 'admin/user',
                    headers: { authorization: window.sessionStorage.getItem('token') }
                })
                    .then((res) => {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData, this.idx, this.updateform);
                        // location. reload();
                    })
                    .catch((err) => {
                        this.$message.error('修改失败');
                    });
            });
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
    /* display: inline-block; */
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
