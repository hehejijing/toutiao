<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      ref="sex"
      :default-index="sexIndex"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  props: {
    sexIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    onConfirm(value, index) {
      const sex = this.$refs.sex.getIndexes()
      // this.$refs.sex.setColumnIndex(this.sexIndex)
      this.$emit('EditSex', sex)
      this.$parent.$parent.showSex = false
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    // onChange(picker, value, index) {
    //   this.$toast(`当前值：${value}, 当前索引：${index}`)
    // },
    onCancel() {
      // this.$toast('取消')
      this.$parent.$parent.showSex = false
    }
  }
}
</script>

<style></style>
