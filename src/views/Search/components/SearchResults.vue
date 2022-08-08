<template>
  <div>
    <div class="resultsList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="加载中"
          @load="onLoad"
          offset="0"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        >
          <van-cell
            v-for="item in list"
            :key="item.art_id"
            :title="item.title"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getSearchResultsAPI } from '@/api'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false,
      refreshing: false
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const params = {
        q: this.keywords,
        page: this.page,
        per_page: this.per_page
      }
      try {
        const { data } = await getSearchResultsAPI(params)
        this.list = [...this.list, ...data.data.results]
        this.loading = false
        if (this.list.length === data.data.total_count) {
          this.finished = true
        }
        this.page = this.page + 1
      } catch (error) {
        this.loading = false

        this.error = true
      }
    },
    async onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      this.page = this.page + 1
      const params = {
        q: this.keywords,
        page: this.page,
        per_page: this.per_page
      }
      try {
        const { data } = await getSearchResultsAPI(params)
        this.list = [...data.data.results, ...this.list]
        this.refreshing = false
        if (this.list.length === data.data.total_count) {
          this.finished = true
        }
        this.page = this.page + 1
      } catch (error) {
        this.refreshing = false

        this.error = true
      }
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.resultsList {
  height: 1226px;
  overflow: auto;
}
</style>
