<template>
  <div>
    <van-cell value="内容" label="描述信息">
      <template #title>
        <div class="title">
          <div class="img">
            <van-image
              round
              width="40px"
              height="40px"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          13888888888
        </div>
      </template>
      <template #label> <p>我爱一条柴</p></template>
      <template #default>
        <div><van-icon name="good-job-o" />赞</div>
      </template>
    </van-cell>
    <p class="bottom">
      21分钟前<van-button plain hairline type="primary" round class="btn"
        >回复6</van-button
      >
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-content: flex-start;
  .img {
    margin-right: 20px;
  }
}
p {
  padding-left: 100px;
  font-size: 32px;
  margin: unset;
}
.van-cell__label {
  margin-top: unset;
}
.bottom {
  font-size: 24px;
}
</style>
