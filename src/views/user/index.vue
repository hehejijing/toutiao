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
      ><update-avator @update-avator="userInfo.photo = $event" :photo="photo" v-if="isShowAvator"></update-avator
    ></van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
import { resoveToBase64 } from '@/utils/toBase64'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
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
    // 选择图片后
    async selectPhoto(e) {
      // 第一种方法
      //   // 1.获取选择图片的文件对象
      //   // e.target 触发事件的元素
      //   // file.files 伪数组，储存选择的所有的文件对象
      //   const file = e.target.files[0]
      //   // 2.把file 文件对象处理成img标签可识别的url
      //   // URL.createObjectURL(file对象) --> img可识别的url
      //   const url = window.URL.createObjectURL(file)
      //   console.log(url)
      //   // 3.传递url
      //   this.photo = url
      //   // 4.清空value 避免无法连续选中同一张图片
      //   e.target.value = ''
      //   this.isShowAvator = true
      // 第二种方法
      const file = e.target.files[0]
      const url = await resoveToBase64(file)
      this.photo = url
      e.target.value = ''
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
