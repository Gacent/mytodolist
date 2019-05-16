<template>
  <transition name="el-zoom-in-top">
    <div class="todolist" v-show="isShow">
      <el-form ref="form" :model="form" class="form" @submit.native.prevent="comfirm" :rules="rules">
        <img src="../assets/list.png" alt="">
        <el-form-item prop="input" class="elitem">
          <el-input
            v-model="form.input"
            placeholder="请输入你的工作清单"
            clearable
            autofocus
            class="input"
            prefix-icon="el-icon-edit-outline"
          ></el-input>
        </el-form-item>
      </el-form>
      <transition name="el-zoom-in-center">
        <el-table
          :data="list"
          border
          class="table"
          v-show="list.length>0">
          <el-table-column
            prop="date"
            label="添加list的日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="dolist"
            label="你要做的">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button
              size="mini"
              type="normal"
              @click="edit(scope.$index, scope.row)"
              v-show='!scope.row.iscompleted'>编辑</el-button>
              <el-button
              size="mini"
              type="primary"
              @click="finish(scope.$index, scope.row)"
              v-show='!scope.row.iscompleted'>我已完成</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="fail(scope.$index, scope.row)"
              v-show='!scope.row.iscompleted'>我做不到</el-button>
              <el-tag
              v-show="scope.row.iscompleted"
              type='success'
              >已完成</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </transition>
      <editdialog ref="editdialog" @changeinput="cginput"/>
    </div>
  </transition>
</template>

<script>
import dayjs from 'dayjs'
import editdialog from './components/editdialog'
import api from '@/api/index'
export default {
  name: 'todolist',
  components: {
    editdialog
  },
  data () {
    return {
      isShow: false,
      form: {
        input: ''
      },
      rules: {
        input: [
          {required: true, message: '请务必填写需要做的事情哦', trigger: 'change'}
        ]
      },
      list: [],
      currentRow: -1
    }
  },
  mounted () {
    this.isShow = true
    api.getList({aa: 1}).then((res) => {
      this.list = res.list
    })
  },
  methods: {
    edit (index, row) {
      this.$nextTick(() => {
        this.currentRow = index
        this.$refs.editdialog.openDialog(row.dolist)
      })
    },
    cginput (input) {
      this.list.forEach((i, v) => {
        if (v === this.currentRow) {
          i.dolist = input
        }
      })
    },
    finish (index, row) {
      console.log(index, row)
      this.list.forEach((i, v) => {
        if (v === index) {
          i.iscompleted = true
        }
      })
    },
    fail (index, row) {
      this.$confirm('真的要删除此事项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    comfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let shit = {
            'date': dayjs().format('YYYY-MM-DD HH:mm:ss'),
            'dolist': this.form.input,
            'iscompleted': false
          }
          this.list.push(shit)
          shit = null
          this.form.input = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form{
  width: 60%;
  margin:0 auto;
}
.elitem{
  width: 30%;
  margin:0 auto
}
.input{
  width: 100%
}
.table{
  width: 40%;
  margin: 30px auto
}
img{
  width: 10%;
  margin:20px auto;
  display: block;
}
</style>
