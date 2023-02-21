import { getList, removeReport, ignoreReport } from '@/api/system/feedreport'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        id: '',
        taginfo: '',
        data: '',
        phone: '',
        state: '',
        type: '',
        username: '',
        userpic: '',
        callinfo: '',
        pics: '',
        create_time: '',
        post_id: ''
      },
      feedType: 0,
      regDate: undefined,
      lastLoginTime: undefined,
      listQuery: {
        page: 1,
        limit: 6,
        id: '',
        username: '',
        callinfo: '',
        state: '',
        startDate: '',
        endDate: ''
      },
      options: [
        { label: '已处理', value: '1' },
        { label: '已忽略', value: '2' },
        { label: '未处理', value: '0' }
      ],
      userCustomdate: undefined,
      value: '0',
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
  // watch: {
  //   value: function(value) {
  //     this.listQuery.type = value
  //     this.fetchData()
  //   }
  // },
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
        this.listQuery.startDate = this.userCustomdate[0]
        this.listQuery.endDate = this.userCustomdate[1]
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.id = ''
      this.listQuery.callinfo = ''
      this.listQuery.username = ''
      this.listQuery.state = ''
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
      this.form = currentRow
    },
    // 处理
    handleFeed(selRow) {
      var id = selRow.id
      this.$confirm('是否确认处理', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeReport(id).then(response => {
          this.$message({
            message: '处理成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 忽略
    ignoreFeed(selRow) {
      var id = selRow.id
      this.$confirm('是否确认忽略', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ignoreReport(id).then(response => {
          this.$message({
            message: '处理成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    }
  }
}
