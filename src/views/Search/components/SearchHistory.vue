<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <div>
          <van-icon
            name="delete-o"
            v-if="!isSHowDel"
            @click="isSHowDel = true"
          />
          <span v-if="isSHowDel" @click="delAll">全部删除</span>
          <span
            v-if="isSHowDel"
            style="margin-left: 10px"
            @click="isSHowDel = false"
            >完成</span
          >
        </div></template
      >
    </van-cell>
    <van-cell-group>
      <van-cell v-for="(item, index) in history" :key="index">
        <template #title
          ><span @click="searchHistory(index)">{{ item }}</span></template
        >
        <template #right-icon
          ><van-icon
            name="delete-o"
            v-if="isSHowDel"
            @click="del(index)" /></template
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [],
      isSHowDel: false
    }
  },
  methods: {
    showHistory() {
      this.history = Array.from(
        new Set(JSON.parse(localStorage.getItem('HISTORY')))
      )
      console.log(this.history)
    },
    searchHistory(index) {
      this.$emit('searchHistory', this.history[index])
    },
    delAll() {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容'
        })
        .then(() => {
          this.history = []
          console.log(this.history)
          localStorage.removeItem('HISTORY')
        })
        .catch(() => {
          // on cancel
        })
    },
    del(index) {
      this.history.splice(index, 1)
      localStorage.setItem('HISTORY', JSON.stringify(this.history))
    }
  },

  created() {
    this.showHistory()
  }
}
</script>

<style></style>
