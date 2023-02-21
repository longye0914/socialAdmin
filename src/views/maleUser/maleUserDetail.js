import { getCallList } from '@/api/cususer/callOperation'
import {
  cancelHiddenUser,
  hiddenUser,
  cancelHiddenUserOrder,
  hiddenUserOrder,
  getUserInfo,
  getUserDealDetail
} from '@/api/cususer/customUser'

export default {

  data() {
    return {
      options: [
        { label: '语音', value: '0' },
        { label: '视频', value: '1' }
      ],
      formVisible: false,
      formTitle: '',
      isDeal: true,
      id: '',
      form: {
        user_id: '',
        username: '',
        userpic: '',
        anthorid: '',
        singlemon: '',
        calltype: '',
        calllength: '',
        create_time: '',
        end_time: ''
      },
      listQuery: {
        page: 1,
        limit: 6,
        anthorid: '',
        calltype: ''
      },
      formDeal: {
        id: 0,
        user_id: 0,
        dealmon: '',
        dealtype: 0,
        create_time: ''
      },
      listDealQuery: {
        page: 1,
        limit: 5
      },
      total: 0,
      list: null,
      deallist: null,
      dealtotal: 0,
      listLoading: true,
      selRow: {
        username: '',
        userpic: '',
        createTime: '',
        userstatus: 0,
        orstatus: 0,
        qustatus: 0,
        myselfintro: '',
        signinfo: '',
        path: '',
        bodylength: '',
        birthday: '',
        lastLoginTime: '',
        phone: '',
        id: 0,
        likedcount: 0,
        voicecount: 0,
        picturecount: 0,
        videosetflag: 0,
        videoset: '',
        videocallcount: 0,
        videocalltotal: 0,
        voicesetflag: 0,
        voiceset: '',
        voicecallcount: 0,
        voicecalltotal: 0,
        // 累积金额
        tianmon: 0,
        remainmon: 0,
        // 累积券
        tianticket: 0
      }
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      debugger
      this.id = this.$route.query.id
      this.fetchData()
      this.getUserInfo()
      this.getDetallist()
    },
    fetchData() {
      this.listLoading = true
      this.listQuery.anthorid = this.id
      getCallList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    getUserInfo() {
      getUserInfo(this.id).then(response => {
        this.selRow = response.data
      })
    },
    getDetallist() {
      getUserDealDetail(this.id).then(response => {
        this.deallist = response.data.records
        this.dealtotal = response.data.total
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.anthorid = ''
      this.listQuery.calltype = ''
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
    dealDetail() {
      this.formTitle = '交易明细'
      this.formVisible = true
      this.isDeal = true
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
          this.getUserInfo()
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
          this.getUserInfo()
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
          this.getUserInfo()
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
          this.getUserInfo()
        }).catch(err => {
        })
      }).catch(() => {
      })
    }
  }
}
