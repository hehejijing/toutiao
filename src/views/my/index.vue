<template>
  <div class="aaa">
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">
        <div class="userinfo">
          <van-image
            round
            width="67"
            height="67"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span>我爱一条柴</span>
          <button @click="$router.push('./user')" class="btn">编辑资料</button>
        </div>
        <van-grid class="detail" :border="false">
          <van-grid-item>
            <template #default>
              <span>0</span>
              <span>头条</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <span>0</span>
              <span>头条</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <span>0</span>
              <span>头条</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <span>0</span>
              <span>头条</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="logout" v-else>
        <div class="toLogin" @click="$router.push('/login')">
          <div><img src="../../assets/images/mobile.png" alt="" /></div>
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 中间 -->
    <div class="main">
      <van-grid :column-num="2">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="clock-o" text="历史" />
      </van-grid>
      <van-cell-group class="cell-group">
        <van-cell title="消息通知" is-link />
        <van-cell title="小志同学" is-link />
      </van-cell-group>
    </div>
    <!-- 底部 -->
    <footer v-if="isLogin">
      <button @click="logout" class="logout-btn">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  }
}
</script>

<style lang="less" scoped>
.logout {
  background-image: url('http://liufusong.top/hmtt/img/banner.d43e3812.png');
  background-size: 100% 100%;
  width: 100%;
  height: 400px;
  position: relative;

  .toLogin {
    width: 100%;
    // background-color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 132px;
      height: 132px;
      display: block;
      margin: 0 auto;
    }
    span {
      font-size: 28px;
      color: #fff;
    }
  }
}
:deep(.main) {
  .van-icon-star-o {
    color: #eb585f;
  }
  .van-icon-clock-o {
    color: #ffab3d;
  }
  .cell-group {
    margin-top: 10px;
  }
}
.aaa {
  height: 1334px;
  background-color: #f5f7f9;
}
.login {
  background-image: url('http://liufusong.top/hmtt/img/banner.d43e3812.png');
  background-size: 100% 100%;
  width: 100%;
  height: 400px;
  position: relative;
  .userinfo {
    width: 100%;
    // background-color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-70%);
    display: flex;
    padding: 0 30px;

    // flex-direction: column;
    img,
    span,
    button {
      margin: auto;
    }
    span {
      font-size: 30px;
      color: #fff;
      margin-left: 30px;
    }
    .btn {
      font-size: 24px;
      border-radius: 24px;
      border: none;
    }
  }
}
.logout-btn {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  border: none;
  font-size: 30px;
  line-height: 3;
  color: #ff0001;
}
:deep(.detail) {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  .van-grid-item {
    border: none;
    font-size: 26px;
    color: #fff;
    span {
      line-height: 1.5;
    }
  }
  .van-grid-item__content {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
