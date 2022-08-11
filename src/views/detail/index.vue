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
      <van-divider>正文结束</van-divider>
      <comments
        :articleComments="articleComments"
        @goodComment="goodComment"
      ></comments>
    </div>
    <underSide
      :articleInfo="articleInfo"
      @good="good"
      @collect="collect"
      @publish="publish"
    ></underSide>
  </div>
</template>

<script>
import {
  getArticleInfo,
  followings,
  cancelFollowing,
  getArticleComment,
  commentArticle
} from '@/api'
import './github-markdown.css'
import underSide from './components/underside.vue'
import comments from './components/comments'
export default {
  data() {
    return {
      articleInfo: {},
      articleComments: {}
    }
  },
  methods: {
    async getArticleInfo() {
      const { data } = await getArticleInfo(this.$route.params.id)
      this.articleInfo = data.data
      this.getArticleComment()
      // console.log(data)
      // console.log(this.$route.params.id)
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
    },
    good(attitude) {
      this.articleInfo.attitude = attitude
    },
    collect(isCollect) {
      this.articleInfo.is_collected = isCollect
    },
    async getArticleComment() {
      console.log(this.articleInfo.art_id)
      const { data } = await getArticleComment(this.articleInfo.art_id)
      this.articleComments = data.data
      console.log(data)
    },
    goodComment(index) {
      this.articleComments.results[index].is_liking =
        !this.articleComments.results[index].is_liking
    },
    async publish(content) {
      try {
        const { data } = await commentArticle(this.articleInfo.art_id, content)
        console.log(data)

        this.$toast.success('发布成功').$nextTick(location.reload())
      } catch (error) {
        this.$toast.fail('发布评论失败，请重试')
      }
    }
  },
  created() {
    this.getArticleInfo()
  },
  components: {
    underSide,
    comments
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
}
h1 {
  font-size: 40px;
}
</style>
