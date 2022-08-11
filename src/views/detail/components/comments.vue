<template>
  <div>
    <van-cell v-for="(item, index) in articleComments.results" :key="index">
      <template #title>
        <div class="title">
          <div class="img">
            <van-image round width="40px" height="40px" :src="item.aut_photo" />
          </div>
          <div class="right">
            <span>{{ item.aut_name }}</span>
            <div class="good" @click="goodComment(item.com_id, index)">
              <van-icon
                :class="item.is_liking ? 'goodComment' : ''"
                :name="item.is_liking ? 'good-job' : 'good-job-o'"
              />赞
            </div>
          </div>
        </div>
      </template>
      <template #label>
        <p>{{ item.content }}</p>
        <div class="bottom">
          <span>{{ item.pubdate }}</span>
          <button class="btn">回复{{ item.reply_count }}</button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { goodComment, cancelGoodComment } from '@/api'
export default {
  methods: {
    async goodComment(id, index) {
      try {
        if (this.articleComments.results[index].is_liking) {
          const { data } = await cancelGoodComment(id)
          this.$emit('goodComment', index)
          console.log(data)
        } else {
          const { data } = await goodComment(id)
          this.$emit('goodComment', index)
          console.log(data)
        }
      } catch (error) {}
    }
  },
  props: {
    articleComments: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  .right {
    flex: 1;
    position: relative;

    display: flex;
    justify-content: sp;
    span {
      margin-left: 20px;
    }
    .good {
      position: absolute;
      right: 0;
    }
  }
}
.van-cell__label {
  margin-left: 100px;
  p {
    font-size: 32px;
    margin-top: 0;
  }
  .btn {
    border-radius: 24px;
    background-color: unset;
    border: none;
    border: 1px solid #d8b9b9;
    margin-left: 20px;
    padding: 0 30px;
  }
}
.goodComment {
  color: rgb(139, 218, 36);
}
</style>
