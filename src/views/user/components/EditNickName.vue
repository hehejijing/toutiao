<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入留言"
      show-word-limit
    />
  </div>
</template>

<script>
// import { uploadProfile } from '@/api'
export default {
  data() {
    return {
      message: ''
    }
  },
  props: {
    nickName: {
      type: String,
      required: true
    }
  },
  created() {
    this.message = this.nickName
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.showNickName = false
      this.message = this.nickName
    },
    onClickRight() {
      // this.uploadProfile()
      // this.$emit('reLoad', true)
      this.$emit('uploadProfile', this.message)
      this.$parent.$parent.showNickName = false
    }
    // async uploadProfile() {
    //   const name = this.message
    //   const data = {
    //     name: name
    //   }
    //   const res = await uploadProfile(data)
    //   console.log(res)
    // }
  }
}
</script>

<style></style>
