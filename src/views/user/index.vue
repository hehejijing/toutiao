<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <!-- input file 方法 accept=".png,.jpg" 表示只能选择特定后缀名的文件  hidden  表示隐藏 不可见 -->
      <input type="file" hidden ref="file" @change="selectPhoto" />
    </van-cell>
    <van-popup
        v-model="isShowAvator"
        class="avator-popup"
        closeable
        :style="{ width: '100%', height: '100%' }"
        ><update-avator></update-avator></van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false
    }
  },
  components: {
    UpdateAvator
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取失败，请刷新')
      }
    },
    selectPhoto() {
      this.isShowAvator = true
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3396fc;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
