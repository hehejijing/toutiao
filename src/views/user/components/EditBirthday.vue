<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1998, 0, 1),
      maxDate: new Date(2098, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  methods: {
    onConfirm(value) {
      const year = value.getFullYear()
      const month = value.getMonth() + 1
      const day = value.getDate()
      const time = year + '-' + month + '-' + day
      // console.log(time)
      this.$emit('EditBirthday', time)
      // console.log(this.birthday)
      this.$parent.$parent.showBirthday = false
    },
    onCancel() {
      this.$parent.$parent.showBirthday = false
    }
  },

  created() {
    // console.log(this.birthday)
    const arr = this.birthday.split('-')
    // console.log(arr)
    this.currentDate = new Date(arr[0], arr[1] - 1, arr[2])
  }
}
</script>

<style></style>
