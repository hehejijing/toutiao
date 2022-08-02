<template>
  <van-cell
    :title="articleInfo.title"
    :label="lable"
    v-if="articleInfo.cover.type == 0"
  />
  <van-cell
    :title="articleInfo.title"
    :label="lable"
    v-else-if="articleInfo.cover.type == 1"
  >
    <template #default>
      <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    </template>
  </van-cell>
  <van-cell :title="articleInfo.title" :label="lable" v-else>
    <template #default>
      <van-image
        width="50"
        height="50"
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        :src="item"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    lable() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
