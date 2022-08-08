<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageAricle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        offset="0"
        :finished="isFinished"
        finished-text="没有更多了"
        @load="loadNextPageAricle"
        :immediate-check="false"
        :error.sync="error"
        error-text="蹦砂卡拉卡"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem'
export default {
  data() {
    return {
      articles: [],
      loading: false,
      pre_timestamp: '',
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        console.log(this.articles)
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('看成败 人生豪迈 只不过是重头再来')
      }
    },
    async loadNextPageAricle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timesamp = data.data.pre_timestamp
        if (timesamp == null) {
          this.isFinished = true
        }
        const results = data.data.results
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        this.pre_timestamp = timesamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    },
    getArticleInfo(id) {
      console.log(1111)
      // const { data } = await getArticleInfo(id)
      // console.log(data)
    }
  }
}
</script>

<style></style>
