<template>
  <div class="underSide">
    <div class="left">
      <van-button
        plain
        hairline
        type="primary"
        class="btn"
        round
        @click="showPopup"
        >写评论
      </van-button>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">内容</van-popup>
    </div>
    <div class="right">
      <van-icon name="comment-o" :badge="articleInfo.comm_count" />
      <van-icon
        :name="articleInfo.is_collected ? 'star' : 'star-o'"
        @click="isCollect(articleInfo.art_id)"
        :class="articleInfo.is_collected ? 'star' : ''"
      />
      <van-icon
        :name="articleInfo.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="isLikes(articleInfo.art_id)"
        :class="articleInfo.attitude === 1 ? 'good' : ''"
      />
      <van-icon name="share-o" @click="showShare = true" />
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { likes, cancelLikes, collection, cancelCollection } from '@/api'
export default {
  data() {
    return {
      show: false,
      collection: 'star-o',
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    },
    showPopup() {
      this.show = true
    },
    async isLikes(id) {
      if (this.articleInfo.attitude === -1) {
        const { data } = await likes(id)
        if (data.message === 'OK') {
          this.$emit('good', 1)
        }
        console.log(data)
      } else {
        const { data } = await cancelLikes(id)
        this.$emit('good', -1)

        console.log(data)
      }
    },
    async isCollect(id) {
      if (this.articleInfo.is_collected) {
        const { data } = await cancelCollection(id)
        this.$toast.success('取消收藏成功')
        this.$emit('collect', false)
        console.log(data)
      } else {
        const { data } = await collection(id)
        if (data.message === 'OK') {
          this.$toast.success('收藏成功')
          this.$emit('collect', true)
        }

        console.log(data)
      }
    }
  },
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.underSide {
  width: 100%;
  height: 44px;
  position: relative;

  position: absolute;

  display: flex;
  .btn {
    width: 269px;
    height: 44px;
    margin-left: 32px;
  }
  .right {
    height: 88px;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
  }
  .star,
  .good {
    color: rgb(139, 218, 36);
  }
}
</style>
