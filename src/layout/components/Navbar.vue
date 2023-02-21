<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container" />
    <!--    <span class="left-menu">{{ $store.getters.user.displayName }}</span>-->
    <span class="right-menu" @click="logout">退出登陆</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
      localStorage.setItem('roleval', '')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .navbar {
    min-height: 33px;
    height: 33px;
    width: calc(100% - 150px);
    alignment: right;
    position: fixed;
    margin-left: 150px;
    line-height: 33px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 33px;
      height: 33px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .left-menu {
      float: left;
      height: 30px;
      width: auto;
      margin-left: 16px;
      margin-top: 15px;
      alignment: center;
      color: #171717;
      size: A4;
      text-align: center;
      line-height: 30px;
    }
    .right-menu {
      float: right;
      height: 27px;
      width: 70px;
      margin-right: 20px;
      margin-top: 7px;
      alignment: center;
      //margin-top: 7px;
      background-color: #191919;
      color: #fff;
      border-color: #191919;
      text-align: center;
      border-radius: 1px;
      line-height: 30px;
    }
  }
</style>

