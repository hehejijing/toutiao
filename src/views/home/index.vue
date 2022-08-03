<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id"
        ><ArticleList :id="item.id"></ArticleList
      ></van-tab>

      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      ><channelPopup
        :myChannels="myChannels"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @addChannel="addChannel"
      ></channelPopup
    ></van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  steMyChannelToLocal,
  getMyChannelByLocal
} from '@/api'
import ArticleList from './componets/ArticleList.vue'
import channelPopup from './componets/channelPopup.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  components: {
    ArticleList,
    channelPopup
  },
  created() {
    this.initMyChannels()
  },
  methods: {
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        console.log(data)
        this.myChannels = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannel(id)
        } else {
          steMyChannelToLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('你妈没了')
      } catch (error) {
        this.$toast.fail('哟，你妈还在呢')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          steMyChannelToLocal([...this.myChannels, channel])
        }
        this.$toast.success('你爹来啦')
        this.myChannels.push(channel)
      } catch (error) {
        this.$toast.fail('你爹在路上')
      }
    },
    initMyChannels() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        const myChannels = getMyChannelByLocal()
        console.log(111111111111111)
        console.log(myChannels)
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          this.getMyChannel()
        }
      }
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  // position: sticky;
  // top: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  // position: sticky;
  // top: 92px;
  // z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  margin-bottom: 50px;
  overflow: auto;
}
</style>
