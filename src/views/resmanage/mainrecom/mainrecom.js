import { getMainRecommendUser, getConfigMainUser, modifyMainUser, removeMainUser } from '@/api/cususer/customUser'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        phone: '',
        username: '',
        id: 0,
        createTime: '',
        qustatus: 0,
        likednumber: 0
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
      getMainRecommendUser(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchQueryData(idV) {
      getConfigMainUser(idV).then(response => {
        this.querylist = response.data.records
      })
    },
    resetForm() {
      this.form = {
        phone: '',
        username: '',
        id: '',
        createTime: '',
        qustatus: 0,
        likednumber: 0,
        configtype: 0
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
      this.listQuery.page = 1
      this.fetchData()
    },
    add() {
      this.resetForm()
      this.querylist = null
      this.formTitle = '添加主播'
      this.formVisible = true
      this.isAdd = true
    },
    goToDetail(idV) {
      this.$router.push({ path: '/anChorUser',
        query: {
          id: idV
        }
      })
    },
    cancelAdd() {
      this.formVisible = false
    },
    addAnchorData(idVa) {
      modifyMainUser(idVa).then(response => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.fetchData()
      })
      this.formVisible = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
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
    handleQCurrentChange(currentRow, oldCurrentRow) {
      this.selQRow = currentRow
    },
    removeMainUser(formSel) {
      removeMainUser(formSel.id).then(response => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
