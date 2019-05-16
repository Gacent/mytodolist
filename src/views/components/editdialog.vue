<template>
  <el-dialog
    title="修改"
    :visible.sync="dialogVisible"
    width="15%"
    :before-close="handleClose">
    <div class="editinput">
      <el-form
        :model="formdialog"
        :rules="rules"
        @submit.native.prevent="submit"
      >
        <el-form-item prop="changevalue">
          <el-input
            placeholder="请输入内容"
            v-model="formdialog.changeinput"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      formdialog: {
        changeinput: ''
      },
      rules: {
        changevalue: [
          {require: true, message: '请务必填写需要做的事情哦'}
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.formdialog.changeinput = ''
      done()
    },
    submit () {
      this.$emit('changeinput', this.formdialog.changeinput)
      this.dialogVisible = false
    },
    openDialog (dolist) {
      this.formdialog.changeinput = dolist
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>

</style>
