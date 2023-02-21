import { getList } from '@/api/cususer/withDraw'

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
        applystatus: 1,
        withdrawmon: '',
        alipyaccount: '',
        accountname: '',
        remark: ''
      },
      listQuery: {
        page: 1,
        limit: 5,
        phone: '',
        username: '',
        id: '',
        // (this.actvieGroup === 'finishpay') ? 1 : 2
        applystatus: 1,
        startDate: '',
        endDate: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      userCustomdate: undefined,
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      actvieGroup: 'finishpay',
      cfgGroups: [
        { name: '已打款', value: 'finishpay' },
        { name: '未通过', value: 'refuseapply' }
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
    resetForm() {
      this.form = {
        phone: '',
        username: '',
        id: '',
        createTime: '',
        applystatus: (this.actvieGroup === 'finishpay') ? 1 : 2,
        withdrawmon: '',
        alipyaccount: '',
        accountname: '',
        remark: ''
      }
    },
    changeGroup(tab, event) {
      debugger
      this.list = null
      if (tab.name === 'finishpay') {
        this.actvieGroup = 1
        this.listQuery.applystatus = 1
      } else {
        this.actvieGroup = 2
        this.listQuery.applystatus = 2
      }
      this.fetchData()
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
