<template>
    <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
        <el-table :data="tableData" border stripe>
            <el-table-column type="index"></el-table-column>
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
    name:'',
    mounted() {
        this.getRightsList();
    },
    data() {
      return {
          list: {
              name: '',
          },
          tableData: [],
      };
  },
//   created() {
//     // 获取所有的权限
//     this.getRightsList()
//   },
  methods: {
    getRightsList() {
            this.axios({
                method:"get",
                url:"permission",
                //headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpZCI6IjJmODMxYmIzLTYwNDktNDYwNy05Y2YzLTMxMGM0YmQyMjY0YSIsImV4cCI6MTYwNzAwNzEwNn0.rzb2oMNG5wrtMr0CGArKZA-qzxqP0E5Xin7I1Oseinms1QzZmpKm7ppVoTTFbYdV'}
            })
            .then(res => {
                console.log(res)
                console.log(res.data)
                this.list = res.data
            })
            }
  }
}
</script>

<style lang="less" scoped>
</style>
