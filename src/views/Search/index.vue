<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onsearch"
        @focus="onSearchFocus"
        @cancel="$router.push('/')"
      />
    </form>
    <component :is="component" :keywords="keywords" ></component>
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-results></search-results> -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResults from './components/SearchResults.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  methods: {
    onsearch() {
      this.isShowSearchResults = true
    },
    onSearchFocus() {
      this.isShowSearchResults = false
    }
  },
  computed: {
    component() {
      if (this.keywords === '') {
        return SearchHistory
      }
      if (this.isShowSearchResults) {
        return SearchResults
      }
      return SearchSuggestion
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
>
