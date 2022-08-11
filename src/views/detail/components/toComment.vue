<template>
  <div class="box">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="content"
    />
    <van-button type="primary" class="btn" @click="publish">发布</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    publish() {
      this.$emit('publish', this.message)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 32px;
  display: flex;
  position: relative;
  .content {
    background-color: #f5f7f9;
    width: 85%;
  }
  .btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-15%, -50%);
    background-color: unset;
    color: skyblue;
    border: none;
  }
}
</style>
