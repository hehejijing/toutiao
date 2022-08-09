<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="content">
      <h1>{{ articleInfo.title }}</h1>
      <van-cell>
        <template #title>
          <div class="author">
            <van-image
              width="35"
              height="35"
              round
              :src="articleInfo.aut_photo"
            />
            <div class="text">
              <span>{{ articleInfo.aut_name }}</span>
              <span>{{ articleInfo.pubdate }}</span>
            </div>
          </div>
        </template>
        <template #default>
          <van-button
            type="info"
            round
            @click="changeFollowing(articleInfo.aut_id)"
            ><span v-if="articleInfo.is_followed">已关注</span
            ><span v-else>➕ 关注</span></van-button
          >
        </template>
      </van-cell>
      <p class="article markdown-body" v-html="articleInfo.content"></p>
    </div>
    <underSide></underSide>
  </div>
</template>

<script>
import { getArticleInfo, followings, cancelFollowing } from '@/api'
import './github-markdown.css'
import underSide from './components/underside.vue'
export default {
  data() {
    return {
      articleInfo: {}
    }
  },
  methods: {
    async getArticleInfo() {
      const { data } = await getArticleInfo(this.$route.params.id)
      this.articleInfo = data.data
      console.log(data)
    },
    async changeFollowing(id) {
      if (this.articleInfo.is_followed) {
        await cancelFollowing(id)
        const { data } = await getArticleInfo(this.$route.params.id)
        if (data.data.is_followed === false) {
          this.articleInfo.is_followed = false
          this.$toast.success('取消关注成功')
        } else {
          this.$toast.fail('取消关注失败，请重试')
        }
        // console.log(data)
        // console.log(1)
      } else {
        const { data } = await followings(id)
        if (data.message === 'OK') {
          this.articleInfo.is_followed = true
          this.$toast.success('关注成功')
        } else {
          this.$toast.fail('关注失败，请重试')
        }
      }
      // this.articleInfo.is_followed = !this.articleInfo.is_followed
    }
  },
  created() {
    this.getArticleInfo()
  },
  components: {
    underSide
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.content {
  padding: 25px 32px;
  max-height: 1100px;
  overflow: auto;
  .van-cell {
    padding: unset;
    .author {
      display: flex;
      align-items: center;
      .text {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
      }
    }
  }
  .van-button--info {
    height: unset;
    line-height: 2;
  }
  // .article {
  //   font-size: 12px;
  //   :deep(pre) {
  //     max-width: 100%;
  //     overflow: scroll;
  //   }
  //   :deep(img) {
  //     width: 100%;
  //   }
  // }
}
h1 {
  font-size: 40px;
}
</style>
