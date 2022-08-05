<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">登录盒子
        <button @click="$router.push('./user')">两极反转</button>
      </div>
      <div class="logout" v-else>未登录盒子</div>
    </header>
    <!-- 中间 -->
    <div class="main">收藏/历史/消息通知/小志同学</div>
    <!-- 底部 -->
    <footer v-if="isLogin">
      <button @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {

  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  }
}
</script>

<style></style>
