import { pushUpBanner, pushDownBanner, getList, modifyBanner, deleteBanner, uploadImage, addBanner } from '@/api/system/backbanner'

export default {
  data() {
    return {
      isShowInput: false,
      isShowModifyInput: false,
      formVisible: false,
      formTitle: '',
      isAdd: true,
      formModifyVisible: false,
      formModifyTitle: '',
      isModify: true,
      form: {
        id: '',
        createTime: '',
        resname: '',
        src: '',
        isjump: 'H5链接',
        url: '',
        type: '',
        sortid: ''
      },
      showDefaulthead: '',
      listQuery: {
        page: 1,
        limit: 5
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      options: [
        { label: 'H5链接', value: '0' },
        { label: '普通链接', value: '1' }
      ],
      optionsSort: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' }
      ],
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
      // if(this.regDate){
      //   this.listQuery['startRegDate'] = this.regDate[0]
      //   this.listQuery['endRegDate'] = this.regDate[1]
      // }
      // if(this.lastLoginTime){
      //   this.listQuery['startLastLoginTime'] = this.lastLoginTime[0]
      //   this.listQuery['endLastLoginTime'] = this.lastLoginTime[1]
      // }
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        // for (const index in this.list) {
        //   let item = this.list[index]
        //   if(item.wechatHeadImgUrl){
        //    item.img = item.wechatHeadImgUrl
        //   }else {
        //     item.img = getApiUrl() + '/file/getImgStream?idFile=' + item.avatar
        //   }
        //   console.log('img',item.img)
        // }
        this.listLoading = false
        this.total = response.data.total
      })
    },
    changeSwitch(val) {
      if (val) {
        this.form.defaultpic = 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg'
      } else {
        this.form.defaultpic = ''
      }
    },
    // 删除
    deleteBanner(selRow) {
      var id = selRow.id
      this.$confirm('是否删除该Banner', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBanner(id).then(response => {
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
    // 上架
    pushUpBanner(selRow) {
      var id = selRow.id
      this.$confirm('是否上架该Banner', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pushUpBanner(id).then(response => {
          this.$message({
            message: '上架成功',
            type: 'success'
          })
          this.fetchData()
        }).catch(err => {
        })
      }).catch(() => {
      })
    },
    // 下架
    pushDownBanner(selRow) {
      var id = selRow.id
      this.$confirm('是否下架该Banner', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pushDownBanner(id).then(response => {
          this.$message({
            message: '下架成功',
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
        this.form.src = response.data
        if (response.data.length > 0) {
          this.isShowInput = true
        }
      })

      // if (this.uploadFileId !== '') {
      //   this.$message({
      //     message: this.$t('common.mustSelectOne'),
      //     type: 'warning'
      //   })
      //   return false
      // }
      // this.loadingInstance = Loading.service({
      //   lock: true,
      //   text: this.$t('common.uploading'),
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
    },
    handleUploadSuccess(response, raw) {
      this.loadingInstance.close()
      if (response.code === 20000) {
        // this.uploadUrl = response.data
        this.form.src = response.data
        if (response.data.length > 0) {
          this.isShowInput = true
        }
        // this.uploadFileId = response.data.realFileName
        // this.form.fileName = response.data.originalFileName
      } else {
        this.$message({
          message: this.$t('common.uploadError'),
          type: 'error'
        })
      }
    },
    resetForm() {
      this.form = {
        id: '',
        createTime: '',
        resname: '',
        src: '',
        isjump: 'H5链接',
        url: '',
        type: 0,
        sortid: ''
      }
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.page = 1
      this.fetchData()
    },
    add() {
      this.resetForm()
      this.formTitle = '添加轮播图'
      this.formVisible = true
      this.isAdd = true
    },
    editBanner(selRow) {
      this.form.id = selRow.id
      this.form.createTime = selRow.createTime
      this.form.resname = selRow.resname
      this.form.src = selRow.src
      this.form.isjump = selRow.isjump
      this.form.url = selRow.url
      this.form.type = selRow.type
      this.form.sortid = selRow.sortid
      this.formModifyTitle = '修改轮播图'
      this.formModifyVisible = true
      this.isModify = true
    },
    cancelSave() {
      this.formVisible = false
      this.isShowInput = false
    },
    cancelModifySave() {
      this.formModifyVisible = false
      this.isShowModifyInput = false
    },
    addBannerReq(selRow) {
      addBanner({
        src: selRow.src,
        type: selRow.type,
        isjump: selRow.isjump,
        url: selRow.url,
        resname: selRow.resname,
        sortid: selRow.sortid
      }).then(response => {
        this.$message({
          message: this.$t('common.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
        this.formVisible = false
        this.isShowInput = false
      })
    },
    modifyBannerReq(selRow) {
      modifyBanner({
        id: selRow.id,
        src: selRow.src,
        type: selRow.type,
        isjump: selRow.isjump,
        url: selRow.url,
        resname: selRow.resname,
        sortid: selRow.sortid
      }).then(response => {
        this.formModifyVisible = false
        this.isShowInput = false
        this.$message({
          message: this.$t('common.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
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
    }
  }
}
