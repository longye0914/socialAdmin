import { getCallList } from '@/api/cususer/callOperation'
import {
  cancelHiddenUser,
  hiddenUser,
  cancelHiddenUserOrder,
  hiddenUserOrder,
  getUserInfo,
  getUserDealDetail, modifyUserBaseinfo, modifyUserSetinfo, getUserPicturelist, getUserVoicelist
} from '@/api/cususer/customUser'

export default {

  data() {
    return {
      options: [
        { label: '语音', value: '0' },
        { label: '视频', value: '1' }
      ],
      optionsQu: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'S', value: 'S' }
      ],
      optionsVideo: [
        { label: '10Q/分钟', value: '10Q/分钟' },
        { label: '50Q/分钟', value: '50Q/分钟' },
        { label: '100Q/分钟', value: '100Q/分钟' },
        { label: '150Q/分钟', value: '150Q/分钟' },
        { label: '200Q/分钟', value: '200Q/分钟' },
        { label: '250Q/分钟', value: '250Q/分钟' },
        { label: '300Q/分钟', value: '300Q/分钟' },
        { label: '350Q/分钟', value: '350Q/分钟' }
      ],
      optionsVoice: [
        { label: '10Q/分钟', value: '10Q/分钟' },
        { label: '50Q/分钟', value: '50Q/分钟' },
        { label: '100Q/分钟', value: '100Q/分钟' },
        { label: '150Q/分钟', value: '150Q/分钟' },
        { label: '200Q/分钟', value: '200Q/分钟' },
        { label: '250Q/分钟', value: '250Q/分钟' },
        { label: '300Q/分钟', value: '300Q/分钟' },
        { label: '350Q/分钟', value: '350Q/分钟' }
      ],
      formVisible: false,
      formTitle: '',
      isDeal: true,
      formBaseEdVisible: false,
      formBaseEdTitle: '',
      isBaseed: true,
      formOrderEdTitle: '',
      formOrderEdVisible: false,
      isOrderEdit: true,
      formVoiceVisible: false,
      formVoiceTitle: '语音',
      isVoice: true,
      voicelist: null,
      voicetotal: 0,
      formPictureTitle: '',
      formPictureVisible: false,
      isPicture: true,
      picturelist: null,
      picturetotal: 0,
      n: 0,
      id: '',
      form: {
        id: 0,
        myselfintro: '',
        signinfo: '',
        qustatus: 0,
        quvalue: 'A',
        videosetflag: 0,
        videoset: '',
        voicesetflag: 0,
        voiceset: '',
        path: '',
        bodylength: '',
        birthday: '',
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
      pictureDialog() {
        this.formPictureTitle = ''
        this.formPictureVisible = true
        this.isPicture = true
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
      formVoice: {
        id: 0,
        user_id: 0,
        url: '',
        voicetime: 0,
        showflag: 0,
        create_time: ''
      },
      listDealQuery: {
        page: 1,
        limit: 5
      },
      baseinfoQuery: {
        id: 0,
        username: '',
        qustatus: 0,
        quvalue: 'A',
        myselfintro: '',
        signinfo: '',
        path: '',
        bodylength: '',
        birthday: ''
      },
      usersetQuery: {
        id: 0,
        videosetflag: 0,
        videoset: '',
        voicesetflag: 0,
        voiceset: ''
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
        quvalue: 'A',
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
    editBaseinfo(selRow) {
      this.form = selRow
      this.formBaseEdTitle = '编辑基本资料'
      this.formBaseEdVisible = true
      this.isBaseed = true
    },
    editOrderinfo(selRow) {
      this.form = selRow
      this.formOrderEdTitle = '编辑接单设置信息'
      this.formOrderEdVisible = true
      this.isOrderEdit = true
    },
    modifyBaseinfo() {
      this.baseinfoQuery.id = this.form.id
      this.baseinfoQuery.username = this.form.username
      this.baseinfoQuery.qustatus = this.form.qustatus
      this.baseinfoQuery.quvalue = this.form.quvalue
      this.baseinfoQuery.path = this.form.path
      this.baseinfoQuery.birthday = this.form.birthday
      this.baseinfoQuery.bodylength = this.form.bodylength
      this.baseinfoQuery.signinfo = this.form.signinfo
      this.baseinfoQuery.myselfintro = this.form.myselfintro
      modifyUserBaseinfo(this.baseinfoQuery).then(response => {
        this.formBaseEdVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getUserInfo()
      })
    },
    modifyOrderSet() {
      this.usersetQuery.id = this.form.id
      this.usersetQuery.videoset = this.form.videoset
      this.usersetQuery.videosetflag = this.form.videosetflag
      this.usersetQuery.voiceset = this.form.voiceset
      this.usersetQuery.voicesetflag = this.form.voicesetflag
      modifyUserSetinfo(this.usersetQuery).then(response => {
        this.formOrderEdVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getUserInfo()
      })
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
    // 下架
    hiddenUserAnch(selRow) {
      var id = selRow.id
      this.$confirm('是否下架该用户', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hiddenUser(id).then(response => {
          this.$message({
            message: '下架成功',
            type: 'success'
          })
          this.getUserInfo()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 上架
    cancelHiddenUserAnch(selRow) {
      var id = selRow.id
      this.$confirm('是否上架该机器人', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelHiddenUser(id).then(response => {
          this.$message({
            message: '上架机器人成功',
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
