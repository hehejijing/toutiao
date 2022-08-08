<template>
  <div>
    <van-cell title="搜索历史">
      <template #default><van-icon name="delete-o" /></template>
    </van-cell>
    <van-cell-group>
      <van-cell
        :title="item"
        v-for="(item, index) in history"
        :key="index"
        @click="searchHistory(index)"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: []
    }
  },
  methods: {
    showHistory() {
      this.history = Array.from(
        new Set(localStorage.getItem('HISTORY').split(','))
      )
      console.log(this.history)
    },
    searchHistory(index) {
      this.$emit('searchHistory', this.history[index])
    }
  },

  created() {
    this.showHistory()
  }
}
</script>

<style></style>
