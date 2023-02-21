import { getList, deleteChatWords, addOfficeNotice, modifyOfficeNotice } from '@/api/system/chatcommwords'

import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'

export default {
  // directives: { permission },
  data() {
    return {
      isShowInput: false,
      formVisible: false,
      formTitle: '',
      isAdd: true,
      formModiVisible: false,
      formModiTitle: '修改话术',
      isModify: true,
      form: {
        id: '',
        content: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 3,
        content: ''
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
      this.uploadUrl = getApiUrl() + '/file'
      this.uploadHeaders['Authorization'] = getToken()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        debugger
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
      this.resetForm()
      this.listQuery.page = 1
      this.listQuery.content = ''
      this.fetchData()
    },
    // 删除
    deleteItem(selRow) {
      var id = selRow.id
      this.$confirm('是否确认删除', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteChatWords(id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
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
    resetForm() {
      this.form = {
        id: '',
        content: ''
      }
    },
    editItem(selRo) {
      this.formModiTitle = '修改话术'
      this.formModiVisible = true
      this.isModify = true
      this.form = selRo
      this.form.content = selRo.content
      this.form.id = selRo.id
    },
    modifyItem(formVa) {
      modifyOfficeNotice(formVa).then(response => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
        this.formModiVisible = false
      })
    },
    add() {
      this.resetForm()
      this.formTitle = '添加话术'
      this.formVisible = true
      this.isAdd = true
    },
    cancelModifyNotice() {
      this.formModiVisible = false
    },
    cancelNotice() {
      this.isShowInput = false
      this.formVisible = false
    },
    addOfficeNotice() {
      var self = this
      var form = self.form
      addOfficeNotice(form).then(response => {
        this.formVisible = false
        this.isShowInput = false
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
