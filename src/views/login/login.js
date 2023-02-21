
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { getInfo } from '@/api/user'
export default {
  name: 'login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('login.errorAccount')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error(this.$t('login.errorPassword')))
      } else {
        callback()
      }
    }
    return {
      roles: [],
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      pwdType: 'password',
      redirect: '/'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.redirect = redirect
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    getUsInfo() {
      getInfo().then(response => {
        localStorage.setItem('roleval', response.data.profile.roleid)
        this.$router.push(this.redirect)
        // const rolev = localStorage.getItem('roleval')
        // const booSh = localStorage.getItem('roleval').toString().indexOf('2') > 0
        // console.log(rolev)
        // console.log(booSh)
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false
            this.getUsInfo()
          }).catch((err) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
