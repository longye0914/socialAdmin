import { getList } from '@/api/cususer/investMon'

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
        paymenttime: '',
        amount: '',
        alipyaccount: '',
        investtype: ''
      },
      userCustomdate: undefined,
      listQuery: {
        page: 1,
        limit: 5,
        phone: '',
        username: '',
        id: '',
        investtype: '',
        startDate: '',
        endDate: ''
      },
      options: [
        { label: '普通充值', value: '0' },
        { label: '门槛费充值', value: '1' }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
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
        investmon: '',
        alipyaccount: '',
        investtype: ''
      }
    },
    passListShow() {
      this.listQuery.applystatus = 1
      this.fetchData()
    },
    refuseListShow() {
      this.listQuery.applystatus = 2
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
      this.listQuery.investtype = ''
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
