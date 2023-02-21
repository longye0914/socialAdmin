import { getList, getRegList, modifyUserinfo, hiddenUser, cancelHiddenUser } from '@/api/cususer/customUser'

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
        status: 1,
        signinfo: '',
        voicenum: 0,
        videonum: 0,
        totalbuy: 0,
        totalMoney: 0
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
        gender: 1,
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
      this.$router.push({ path: '/maleUser',
        query: {
          id: idV
        }
      })
    },
    changeSwitch(val) {
      if (val) {
        this.form.defaultpic = 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg'
      } else {
        this.form.defaultpic = ''
      }
    },
    getAddDyna() {
      getRegList(this.reglistQuery).then(response => {
        this.reglist = response.data.records
        // for (const index in this.list) {
        //   const item = this.list[index]
        //   console.log('img',item.img)
        // }
        // this.listLoading = false
        // this.newAddnum = response.data.total
        this.newAddnum = this.reglist.length
      })
    },
    // 屏蔽
    hiddenUser(selRow) {
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
    cancelHiddenUser(selRow) {
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
    resetForm() {
      this.form = {
        phone: '',
        salt: '',
        password: '',
        username: '',
        userpic: '',
        id: '',
        createTime: '',
        userstatus: ''
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
