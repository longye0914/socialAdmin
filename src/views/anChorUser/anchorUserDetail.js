import { getCallList } from '@/api/cususer/callOperation'
import { cancelHiddenUser, hiddenUser, cancelHiddenUserOrder, hiddenUserOrder, getUserInfo, getUserDealDetail, getUserVoicelist, getUserPicturelist } from '@/api/cususer/customUser'

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
      formVoiceVisible: false,
      formVoiceTitle: '语音',
      isVoice: true,
      formPictureTitle: '',
      formPictureVisible: false,
      isPicture: true,
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
      formDeal: {
        id: 0,
        user_id: 0,
        dealmon: '',
        dealtype: 0,
        create_time: ''
      },
      formVoice: {
        id: 0,
        user_id: 0,
        url: '',
        voicetime: 0,
        showflag: 0,
        create_time: ''
      },
      formPicture: {
        id: 0,
        user_id: 0,
        url: '',
        create_time: ''
      },
      listQuery: {
        page: 1,
        limit: 6,
        anthorid: '',
        calltype: ''
      },
      listDealQuery: {
        page: 1,
        limit: 5
      },
      total: 0,
      list: null,
      listLoading: true,
      deallist: null,
      dealtotal: 0,
      voicelist: null,
      voicetotal: 0,
      picturelist: null,
      picturetotal: 0,
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
      },
      n: 0
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.id = this.$route.query.id
      this.fetchData()
      this.getUserInfo()
      this.getDetallist()
      this.getVoicelist()
      this.getPicturelist()
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
    getDetallist() {
      getUserDealDetail(this.id).then(response => {
        this.deallist = response.data.records
        this.dealtotal = response.data.total
      })
    },
    getVoicelist() {
      getUserVoicelist(this.id).then(response => {
        this.voicelist = response.data.records
        this.voicetotal = response.data.total
      })
    },
    getPicturelist() {
      getUserPicturelist(this.id).then(response => {
        this.picturelist = response.data.records
        this.picturetotal = response.data.total
      })
    },
    getUserInfo() {
      getUserInfo(this.id).then(response => {
        this.selRow = response.data
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
    prev() {
      if (this.n === 0) {
        this.n = 0
      } else {
        this.n--
      }
    },
    next() {
      if (this.n === this.picturelist.length - 1) {
        this.n = this.picturelist.length - 1
      } else {
        this.n++
      }
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
    dealDetail() {
      this.formTitle = '交易明细'
      this.formVisible = true
      this.isDeal = true
    },
    voiceDialog(selRow) {
      this.formVoice = selRow
      this.formVoiceTitle = '语音'
      this.formVoiceVisible = true
      this.isVoice = true
    },
    pictureDialog() {
      this.formPictureTitle = ''
      this.formPictureVisible = true
      this.isPicture = true
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
      this.form = currentRow
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
