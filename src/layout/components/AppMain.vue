<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100% - 41px);
  height: calc(100% - 41px);
  width: calc(100% - 150px);
  position: fixed;
  overflow: hidden;
  margin-top: 41px;
  margin-left: 150px;
}

.fixed-header+.app-main {
  padding-top: 41px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 41px);
  }

  .fixed-header+.app-main {
    padding-top: 41px;
  }
}
</style>

