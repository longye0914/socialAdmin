import { getConfigMainUser, getConfigRobotUser, getThresholdRealUser, getThresholdRebotUser, modifyThresholdUser, removeThresholdUser } from '@/api/cususer/customUser'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        phone: '',
        username: '',
        id: '',
        createTime: '',
        qustatus: '',
        configtype: 0
      },
      listQuery: {
        page: 1,
        limit: 5,
        id: '',
        phone: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      total: 0,
      list: null,
      listLoading: true,
      listQueryResult: {
        page: 1,
        limit: 5,
        keyVal: ''
      },
      querylist: null,
      selRow: {},
      selQRow: {},
      actvieGroup: 'realanchor',
      cfgGroups: [
        { name: '真实主播', value: 'realanchor' },
        { name: '机器人', value: 'rebotanchor' }
      ]
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
      this.list = null
      getThresholdRealUser(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchQueryData(idV) {
      this.querylist = null
      getConfigMainUser(idV).then(response => {
        this.querylist = response.data.records
      })
    },
    fetchData2() {
      this.listLoading = true
      this.list = null
      getThresholdRebotUser(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchQueryData2(idV) {
      this.querylist = null
      getConfigRobotUser(idV).then(response => {
        this.querylist = response.data.records
      })
    },
    resetForm() {
      this.form = {
        phone: '',
        username: '',
        id: '',
        createTime: '',
        qustatus: '',
        configtype: 0
      }
    },
    search() {
      this.listQuery.page = 1
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    reset() {
      this.listQuery.id = ''
      this.listQuery.phone = ''
      this.listQuery.username = ''
      this.listQuery.page = 1
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    goToDetail(idV) {
      this.$router.push({ path: '/anChorUser',
        query: {
          id: idV
        }
      })
    },
    goToRobotDetail(idV) {
      this.$router.push({ path: '/robotUser',
        query: {
          id: idV
        }
      })
    },
    changeGroup(tab, event) {
      if (tab.name === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    add() {
      this.resetForm()
      this.querylist = null
      this.formTitle = '添加主播'
      this.formVisible = true
      this.isAdd = true
    },
    lookInfo(selRow) {
    },
    cancelAdd() {
      this.formVisible = false
    },
    addAnchorData(idVa) {
      modifyThresholdUser(idVa).then(response => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        if (this.actvieGroup === 'realanchor') {
          this.fetchData()
        } else {
          this.fetchData2()
        }
      })
      this.formVisible = false
    },
    handleFilter() {
      this.listQuery.page = 1
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    fetchPage(page) {
      this.listQuery.page = page
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      if (this.actvieGroup === 'realanchor') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    handleQCurrentChange(currentRow, oldCurrentRow) {
      this.selQRow = currentRow
    },
    removeMainUser(formSel) {
      removeThresholdUser(formSel.id).then(response => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
