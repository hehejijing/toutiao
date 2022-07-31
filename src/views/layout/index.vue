<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item
        :to="item.to"
        v-for="(item, index) in tabbarData"
        :key="index"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
          <span>{{ item.text }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 30px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
