import { getList, passWithDrawItem, refuseWithDrawItem, mulpassWithDraw, passWithDrawItemWechat, refuseWithDrawItemWechat, mulpassWithDrawWechat } from '@/api/cususer/withDraw'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isRefuse: true,
      form: {
        phone: '',
        username: '',
        id: 0,
        createTime: '',
        applystatus: 0,
        withdrawmon: '',
        alipyaccount: '',
        accountname: '',
        remark: '',
        orderno: ''
      },
      userCustomdate: undefined,
      listQuery: {
        page: 1,
        limit: 5,
        phone: '',
        username: '',
        id: '',
        applystatus: 0,
        startDate: '',
        endDate: ''
      },
      refuseQuery: {
        id: '',
        remark: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      total: 0,
      list: null,
      chooselist: null,
      listLoading: true,
      selRow: {},
      remarkVal: '',
      ids: ''
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
      if (undefined !== this.userCustomdate) {
        this.listQuery.startDate = this.userCustomdate[0].toString()
        this.listQuery.endDate = this.userCustomdate[1].toString()
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    // 批量通过
    applaypass() {
      this.$confirm('是否批量通过该笔提现', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 遍历循环新数组 拼接字符串
        let strVal = ''
        let strValwechat = ''
        this.chooselist.forEach(function(itemV) {
          if ('微信提现' === itemV.remark) {
            strValwechat += itemV.id.toString() + ','
          } else {
            strVal += itemV.id.toString() + ','
          }
        })
        // 判断截取最后一个逗号
        if (strVal > 0) {
          strVal = strVal.substr(0, strVal.length - 1)
        }
        if (strValwechat > 0) {
          strValwechat = strValwechat.substr(0, strValwechat.length - 1)
        }

        // 支付宝
        if (strVal !== '') {
          mulpassWithDraw(strVal).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(err => {
          })
        }
        // 微信
        if (strValwechat !== '') {
          mulpassWithDrawWechat(strValwechat).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(err => {
          })
        }
      }).catch(() => {
      })
    },
    // 通过
    passWithDrawItem(selRow) {
      var id = selRow.id
      this.$confirm('是否通过该笔提现', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if ('微信提现' === selRow.remark) {
          passWithDrawItemWechat(id).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(err => {
          })
        } else {
          passWithDrawItem(id).then(response => {
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(err => {
          })
        }
      }).catch(() => {
      })
    },
    // 拒绝
    refuseDialog(selRow) {
      this.selRow = selRow
      this.formTitle = '拒绝提现理由'
      this.formVisible = true
      this.isRefuse = true
    },
    selListData(val) {
      // 获取到选中行的数据
      console.log('val', val)
      this.chooselist = val
    },
    cancelRefuse() {
      this.resetForm()
      this.formVisible = false
    },
    sureRefuse(remarkVal) {
      this.refuseQuery.id = this.selRow.id
      this.refuseQuery.remark = remarkVal
      if ('微信提现' === this.selRow.remark) {
        refuseWithDrawItemWechat(this.refuseQuery).then(response => {
          this.formVisible = false
          this.resetForm()
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      } else {
        refuseWithDrawItem(this.refuseQuery).then(response => {
          this.formVisible = false
          this.resetForm()
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }
    },
    resetForm() {
      this.form = {
        phone: '',
        username: '',
        id: '',
        createTime: '',
        applystatus: 0,
        withdrawmon: '',
        alipyaccount: '',
        accountname: '',
        remark: ''
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
      this.listQuery.startDate = ''
      this.listQuery.endDate = ''
      this.userCustomdate = undefined
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    }
  }
}
