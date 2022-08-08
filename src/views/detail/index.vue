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
          <van-button type="info" round>➕ 关注</van-button>
        </template>
      </van-cell>
      <p class="article" v-html="articleInfo.content"></p>
    </div>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api'
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
    }
  },
  created() {
    this.getArticleInfo()
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
  max-height: 1200px;
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
  .article {
    font-size: 12px;
    :deep(pre) {
      max-width: 100%;
      overflow: scroll;
    }
    :deep(img) {
      width: 100%;
    }
  }
}
h1 {
  font-size: 40px;
}
</style>
