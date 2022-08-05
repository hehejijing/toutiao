<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
    >
      <template #title> <span v-html="item"></span></template
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    // map 映射 返回一个新数组，新数组的长度和原数组一样
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
      )
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionAPI(this.keywords)
        console.log(data)
        // boolean（） 判断（）内的值的布尔值 并返回
        // this.suggestions = data.data.options.filter((str) => Boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
