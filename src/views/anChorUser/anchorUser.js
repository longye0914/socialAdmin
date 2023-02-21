import { cancelHiddenUser, getList, hiddenUser, modifyUserinfo, cancelHiddenUserOrder, hiddenUserOrder } from '@/api/cususer/customUser'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '添加用户',
      isModify: true,
      form: {
        phone: '',
        salt: '',
        password: '',
        username: '',
        userpic: '',
        defaultpic: '',
        id: '',
        createTime: '',
        lastLoginTime: '',
        userstatus: '',
        orstatus: '',
        qustatus: '',
        signinfo: '',
        voicenum: 0,
        videonum: 0,
        totalbuy: 0,
        totalMoney: 0,
        regdate: '',
        logindate: ''
      },
      userCustomdate: undefined,
      userCustomlogindate: undefined,
      listQuery: {
        page: 1,
        limit: 5,
        id: '',
        phone: '',
        username: '',
        userstatus: '',
        orstatus: '',
        qustatus: '',
        gender: 2,
        startregDate: '',
        endregDate: '',
        startDate: '',
        endDate: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      options: [
        { label: '正常', value: '0' },
        { label: '屏蔽', value: '1' }
      ],
      options2: [
        { label: 'A', value: '0' },
        { label: 'B', value: '1' },
        { label: 'S', value: '2' }
      ],
      options3: [
        { label: '禁止接单', value: '1' },
        { label: '正常', value: '0' },
        { label: '未接单', value: '2' }
      ],
      newAddnum: 0,
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      this.listQuery.startDate = ''
      this.listQuery.endDate = ''
      this.listQuery.startregDate = ''
      this.listQuery.endregDate = ''
      if (undefined !== this.userCustomlogindate) {
        this.listQuery.startDate = this.userCustomlogindate[0].toString()
        this.listQuery.endDate = this.userCustomlogindate[1].toString()
      }
      if (undefined !== this.userCustomdate) {
        this.listQuery.startregDate = this.userCustomdate[0].toString()
        this.listQuery.endregDate = this.userCustomdate[1].toString()
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    goToDetail(idV) {
      this.$router.push({ path: '/anChorUser',
        query: {
          id: idV
        }
      })
    },
    // 获取自定义注册用户
    getCustomUserList() {
      this.listQuery.startDate = this.userCustomdate[0]
      this.listQuery.endDate = this.userCustomdate[1]
    },
    // 获取自定义登陆用户
    getCustomLoginUserList() {
      this.listQuery.startDate = this.userCustomlogindate[0]
      this.listQuery.endDate = this.userCustomlogindate[1]
    },
    // 屏蔽
    hiddenUserAnch(selRow) {
      var id = selRow.id
      this.$confirm('是否屏蔽该用户', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hiddenUser(id).then(response => {
          this.$message({
            message: '屏蔽成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 取消屏蔽
    cancelHiddenUserAnch(selRow) {
      var id = selRow.id
      this.$confirm('是否取消屏蔽该用户', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelHiddenUser(id).then(response => {
          this.$message({
            message: '取消屏蔽成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 禁止接单
    hiddenUserOrder(selRow) {
      var id = selRow.id
      this.$confirm('是否禁止该用户接单', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hiddenUserOrder(id).then(response => {
          this.$message({
            message: '禁止接单',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 恢复接单
    cancelHiddenUserOrder(selRow) {
      var id = selRow.id
      this.$confirm('是否恢复该用户接单', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelHiddenUserOrder(id).then(response => {
          this.$message({
            message: '恢复接单成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    changeSwitch(val) {
      if (val) {
        this.form.defaultpic = 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg'
      } else {
        this.form.defaultpic = ''
      }
    },
    resetForm() {
      this.form = {
        phone: '',
        salt: '',
        password: '',
        username: '',
        userpic: '',
        id: '',
        createTime: '',
        userstatus: '',
        orstatus: '',
        qustatus: ''
      }
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.id = ''
      this.listQuery.phone = ''
      this.listQuery.username = ''
      this.listQuery.userstatus = ''
      this.listQuery.qustatus = ''
      this.listQuery.orstatus = ''
      this.listQuery.startDate = ''
      this.listQuery.endDate = ''
      this.listQuery.startregDate = ''
      this.listQuery.endregDate = ''
      this.userCustomdate = undefined
      this.userCustomlogindate = undefined
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClose() {

    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    modifyUserinfo(formSel) {
      var self = this
      var form = self.form
      form.username = formSel.username
      form.userpic = formSel.userpic
      form.defaultpic = formSel.defaultpic
      modifyUserinfo(form).then(response => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
        this.formVisible = false
      })
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      //     if (this.validPasswd()) {
      //     } else {
      //       this.$message({
      //         message: '提交失败',
      //         type: 'error'
      //       })
      //     }
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: this.$t('common.mustSelectOne'),
        type: 'warning'
      })
      return false
    }
  }
}
