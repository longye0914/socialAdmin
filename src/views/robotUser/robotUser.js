import { cancelHiddenUser, getList, hiddenUser, uploadImage, addUser, addUserVoices, addUserPictures } from '@/api/cususer/customUser'

export default {
  data() {
    return {
      conditions: [],
      isShowInput: false,
      formVisible: false,
      formTitle: '',
      isAdd: true,
      formVisible2: false,
      formTitle2: '',
      isAdd2: true,
      addheadpic: '',
      form: {
        phone: '',
        salt: '',
        password: '',
        username: '',
        id: '',
        createTime: '',
        qustatus: 1,
        userpic: '',
        birthday: '',
        bodylength: '',
        path: '',
        signinfo: '',
        signShow: '',
        myselfintro: '',
        videoset: '',
        videosetflag: 0,
        voiceset: '',
        voicesetflag: 0,
        priimset: '',
        priimsetflag: 0,
        voicenum: 0,
        videonum: 0,
        totalbuy: 0,
        totalMoney: 0
      },
      showDefaulthead: '',
      regDate: undefined,
      lastLoginTime: undefined,
      listQuery: {
        page: 1,
        limit: 5,
        id: '',
        username: '',
        gender: 0
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      options: [
        { label: '屏蔽', value: '0' },
        { label: '正常', value: '1' }
      ],
      optionsVideo: [
        { label: '50Q/分钟', value: '50Q/分钟' },
        { label: '100Q/分钟', value: '100Q/分钟' },
        { label: '200Q/分钟', value: '200Q/分钟' },
        { label: '300Q/分钟', value: '300Q/分钟' },
        { label: '500Q/分钟', value: '500Q/分钟' }
      ],
      optionsVoice: [
        { label: '50Q/分钟', value: '50Q/分钟' },
        { label: '100Q/分钟', value: '100Q/分钟' },
        { label: '200Q/分钟', value: '200Q/分钟' },
        { label: '300Q/分钟', value: '300Q/分钟' },
        { label: '500Q/分钟', value: '500Q/分钟' }
      ],
      optionsPriim: [
        { label: '10Q/条', value: '10Q/条' },
        { label: '20Q/条', value: '20Q/条' },
        { label: '30Q/条', value: '30Q/条' },
        { label: '40Q/条', value: '40Q/条' },
        { label: '50Q/条', value: '50Q/条' }
      ],
      categories: [{
        name: '外貌特点',
        count: 0,
        children: [
          {name: '皮肤白'}, {name: '健康肤色'}, {name: '大长腿'}, {name: '小蛮腰'},
          {name: '腿上有肉'}, {name: '九头身'}, {name: '肉嘟嘟'}, {name: '标准身材'},
          {name: '亭亭玉立'}, {name: '凹凸有型'}
        ]
      }, {
        name: '性格标签',
        count: 0,
        children: [
          {name: '温柔'}, {name: '可爱'}, {name: '体贴'}, {name: '撒娇'},
          {name: '独立'}, {name: '另类'}, {name: '纯情'}, {name: '贤惠'},
          {name: '单纯'}, {name: '奔放'}, {name: '活泼'}, {name: '纯朴'},
          {name: '率真'}, {name: '羞涩'}, {name: '泼辣'}, {name: '随和'}
        ]
      }, {
        name: '交友癖好',
        count: 0,
        children: [
          {name: '主动'}, {name: '被动'}, {name: '网恋'}, {name: '奔现'},
          {name: '颜控'}, {name: '腿控'}, {name: '声控'}, {name: '拜金'}
        ]
      }],
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      calleft: 0,
      speed: 1,
      duration: 0,
      dataList: [],
      dataVoicelist: []
    }
  },

  mounted() {
    var imgBox = document.getElementsByClassName('imgBoxoul')[0]
    imgBox.innerHTML += imgBox.innerHTML
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
    this.move()
  },
  watch: {
    // 监听条件变化，按照请求接口拼装请求参数
    conditions(val) {
      const selectedCondition = {}
      for (const categorie of this.categories) {
        const selected_list = []
        for (const child of categorie.children) {
          if (child.active) {
            selected_list.push(child.name)
          }
        }
        selectedCondition[categorie.name] = selected_list.join('|')
      }
      console.log(selectedCondition)
    }
  },

  // props: ['dataList'],
  computed: {
    widthData() {
      return 240 * Number(this.dataList.length * 2)
    }
  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    getDuration() {
      console.log(this.$refs.audio.duration)
      this.duration = this.$refs.audio.duration
    },
    deletePicture(itemV) {
      // if (this.dataList.indexOf(itemV) > 0) {
      this.dataList.splice(itemV)
      // }
    },
    deleteVoice(itemV) {
      // if (this.dataVoicelist.indexOf(itemV) > 0) {
      this.dataVoicelist.splice(itemV)
      // }
    },
    goToDetail(idV) {
      this.$router.push({ path: '/robotUser',
        query: {
          id: idV
        }
      })
    },
    changeSwitch(val) {
      if (val) {
        this.form.defaultpic = 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg'
      } else {
        this.form.defaultpic = ''
      }
    },
    // 屏蔽
    hiddenUser(selRow) {
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
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 取消屏蔽
    cancelHiddenUser(selRow) {
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
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    handleBeforeUpload(file) {
      const fileFormData = new FormData()
      fileFormData.append('file', file)
      const requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImage(fileFormData, requestConfig).then(response => {
        this.addheadpic = response.data
        if (response.data.length > 0) {
          // this.isShowInput = true
        }
      })
    },
    // handleUploadSuccess(response, raw) {
    //   this.loadingInstance.close()
    //   if (response.code === 20000) {
    //     // this.uploadUrl = response.data
    //     this.form.src = response.data
    //     if (response.data.length > 0) {
    //       // this.isShowInput = true
    //     }
    //     // this.uploadFileId = response.data.realFileName
    //     // this.form.fileName = response.data.originalFileName
    //   } else {
    //     this.$message({
    //       message: this.$t('common.uploadError'),
    //       type: 'error'
    //     })
    //   }
    // },
    handleBeforeUpload2(file) {
      const fileFormData = new FormData()
      fileFormData.append('file', file)
      const requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImage(fileFormData, requestConfig).then(response => {
        // this.form.userpic = response.data
        this.dataList.push(response.data)
        if (response.data.length > 0) {
          // this.isShowInput = true
        }
      })
    },
    // handleUploadSuccess2(response, raw) {
    //   this.loadingInstance.close()
    //   if (response.code === 20000) {
    //     this.form.src = response.data
    //     if (response.data.length > 0) {
    //       // this.isShowInput = true
    //     }
    //     // this.uploadFileId = response.data.realFileName
    //     // this.form.fileName = response.data.originalFileName
    //   } else {
    //     this.$message({
    //       message: this.$t('common.uploadError'),
    //       type: 'error'
    //     })
    //   }
    // },
    handleBeforeUpload3(file) {
      const fileFormData = new FormData()
      fileFormData.append('file', file)
      const requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImage(fileFormData, requestConfig).then(response => {
        // this.form.userpic = response.data
        this.dataVoicelist.push(response.data)
        if (response.data.length > 0) {
          // this.isShowInput = true
        }
      })
    },
    // handleUploadSuccess3(response, raw) {
    //   this.loadingInstance.close()
    //   if (response.code === 20000) {
    //     // this.uploadUrl = response.data
    //     this.form.src = response.data
    //     if (response.data.length > 0) {
    //       // this.isShowInput = true
    //     }
    //     // this.uploadFileId = response.data.realFileName
    //     // this.form.fileName = response.data.originalFileName
    //   } else {
    //     this.$message({
    //       message: this.$t('common.uploadError'),
    //       type: 'error'
    //     })
    //   }
    // },
    resetForm() {
      this.form = {
        phone: '',
        salt: '',
        password: '',
        username: '',
        id: '',
        createTime: '',
        qustatus: ''
      }
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.id = ''
      this.listQuery.username = ''
      this.listQuery.page = 1
      this.fetchData()
    },
    add() {
      this.resetForm()
      this.formTitle = '创建机器人'
      this.formVisible = true
      this.isAdd = true
    },
    cancelSave() {
      this.formVisible = false
      this.isShowInput = false
    },
    cancelSave2() {
      this.formVisible2 = false
      // this.isShowInput = false
    },
    nextStep(selRow) {
      // this.formVisible = false
      // this.isShowInput = false
      this.formTitle2 = '添加机器人'
      this.formVisible2 = true
      this.isAdd2 = true
    },
    preStep() {
      // this.formVisible = false
      // this.isShowInput = false
      this.formTitle2 = '添加机器人'
      this.formVisible2 = false
      this.isAdd2 = false
    },
    addSave() {
      // 遍历循环新数组 拼接字符串
      let signVal = ''
      this.conditions.forEach(function(itemV) {
        signVal += itemV.name + ','
      })
      debugger
      // 判断截取最后一个逗号
      if (signVal > 0) {
        signVal = signVal.substr(0, signVal.length - 1)
      }
      addUser({
        userpic: this.addheadpic,
        username: this.form.username,
        bodylength: this.form.bodylength,
        birthday: this.form.birthday,
        path: this.form.path,
        myselfintro: this.form.myselfintro,
        signinfo: signVal,
        videoset: this.form.videoset,
        videosetflag: this.form.videosetflag,
        voiceset: this.form.voiceset,
        voicesetflag: this.form.voicesetflag,
        priimset: this.form.priimset,
        priimsetflag: this.form.priimsetflag
      }).then(response => {
        debugger
        this.addVoiceData(response.data)
        this.addPicData(response.data)
        this.$message({
          message: this.$t('创建成功'),
          type: 'success'
        })
        this.fetchData()
        this.formVisible = false
        this.formVisible2 = false
        this.isShowInput = false
      })
    },
    addVoiceData(id) {
      // 遍历循环新数组 拼接字符串
      let strVal = ''
      this.dataVoicelist.forEach(function(itemV) {
        strVal += itemV.toString() + ','
      })
      // 判断截取最后一个逗号
      if (strVal > 0) {
        strVal = strVal.substr(0, strVal.length - 1)
      }
      addUserVoices({
        urls: strVal,
        voicetime: this.duration,
        user_id: id
      }).then(response => {
        // this.$message({
        //   message: this.$t('创建成功'),
        //   type: 'success'
        // })
        this.fetchData()
        this.formVisible = false
        this.formVisible2 = false
        this.isShowInput = false
      })
    },
    addPicData(id) {
      // 遍历循环新数组 拼接字符串
      let strVal = ''
      this.dataList.forEach(function(itemV) {
        strVal += itemV.toString() + ','
      })
      // 判断截取最后一个逗号
      if (strVal > 0) {
        strVal = strVal.substr(0, strVal.length - 1)
      }
      addUserPictures({
        urls: strVal,
        user_id: id
      }).then(response => {
        // this.$message({
        //   message: this.$t('创建成功'),
        //   type: 'success'
        // })
        this.fetchData()
        this.formVisible = false
        this.formVisible2 = false
        this.isShowInput = false
      })
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
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: this.$t('common.mustSelectOne'),
        type: 'warning'
      })
      return false
    },
    // 处理标签点击事件，未选中则选中，已选中则取消选中
    clickChild(category, categoryIndex, child, childIndex) {
      if (this.conditions.length === 5) {
        this.$message({
          message: '最多添加5个标签',
          type: 'warning'
        })
        return
      }
      const uid = `${categoryIndex}-${childIndex}`
      child.uid = uid
      console.log(uid)

      // 取消选择
      if (child.active === true) {
        category.count--
        child.active = false
        this.conditions.forEach((conditionChild, index) => {
          if (conditionChild.uid === child.uid) {
            this.conditions.splice(index, 1)
          }
        })
        // 选择
      } else {
        category.count++
        child.active = true
        this.conditions.push(child)
      }
    },

    // 清除已选整个类别标签
    clearCategory(category, categoryIndex) {
      category.count = 0

      // 可选列表均为未选中状态
      category.children.forEach(child => {
        child.active = false
      })

      // 清空该类已选元素
      for (let index = this.conditions.length - 1; index >= 0; index--) {
        const conditionChild = this.conditions[index]
        if (conditionChild.uid.startsWith(categoryIndex)) {
          this.conditions.splice(index, 1)
        }
      }
    },

    // 移除一个条件
    removeCondition(condition, index) {
      const categoryIndex = condition.uid.split('-')[0]
      this.categories[categoryIndex].count--
      this.conditions.splice(index, 1)
      condition.active = false
    },

    // 清空所有条件
    clearCondition() {
      for (let i = this.conditions.length - 1; i >= 0; i--) {
        this.removeCondition(this.conditions[i], i)
      }
    },
    // 移动
    move() {
      this.timer = setInterval(this.starmove, 20)
    },
    // 开始移动
    starmove() {
      this.calleft -= 1.2//* this.speed
      if (this.calleft <= -1150) {
        this.calleft = 0
      }
    },
    // 鼠标悬停时停止移动
    stopmove() {
      clearInterval(this.timer)
    },
    // 点击按钮左移
    zuohua() {
      this.calleft -= 240// this.speed = 1
      if (this.calleft <= -1200) {
        this.calleft = 0
      }
    },
    // 点击按钮右移
    youhua() { // this.speed = -1
      this.calleft += 240
      if (this.calleft >= 0) {
        this.calleft = -1200
      }
    }
  }
}
