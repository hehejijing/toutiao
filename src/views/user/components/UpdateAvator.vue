<template>
  <div class="update-avator">
    <img src="../../../assets/images/banner.png" class="img" />

    <footer>
      <span>取消</span>
      <span>完成</span>
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
