<template>
  <div :class="classObj" class="app-wrapper">
    <!--    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />-->
    <div>
      <div class="left-menu" style="text-align: center;color:white;vertical-align:center;height: 41px;">
        <!--        <span>甜腻管理系统</span>-->
        <img src="img/icon_bottomlogo.jpg" style="width: 70px;height: 20px;margin-left: 15px;margin-right: 15px;alignment: center">
      </div>
      <sidebar class="sidebar-container" style="background-color: #191919" />
    </div>
    <div class="main-container" style="width: calc(100% - 150px)">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
    // TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #191919;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    //width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .left-menu {
    float: left;
    height: 41px;
    width: 150px;
    background-color: #191919;
    color: #191919;
    border-color: #191919;
    font-size: large;
    text-align: center;
    border-radius: 0px;
    line-height: 41px;
  }
</style>
