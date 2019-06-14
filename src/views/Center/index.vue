<template>
  <div class="login-hyh">
    <!-- Header -->
    <h1 class="nav-header">
      <span v-on:click="back">返回</span>
      猫眼电影
    </h1>
    <!-- Tab选项卡 -->
    <div class="login-tab">
      <van-tabs v-model="tabAct">
        <van-tab title="美团账号登录">
          <!-- 登录表单 -->
            <!-- <van-cell-group> -->
              <van-field placeholder="账户名/手机号/Email" />
              <van-field placeholder="请输入您的密码" />
            <!-- </van-cell-group> -->
        </van-tab>
        <van-tab title="手机验证登录">
          <!-- 登录表单 -->
          <div class="login-form">
            <!-- <van-cell-group> -->
              <van-field placeholder="请输入手机号" />
              <van-field placeholder="请输入短信验证码" />
            <!-- </van-cell-group> -->
          </div>
          <van-button disabled type="primary" size="small">获取验证码</van-button>

        </van-tab>
      </van-tabs>
    </div>
    <!-- 登录按钮 -->
    <div class="login-box">
      <button class="login-denglu">登录</button>
    </div>
    <div class="login-reg">
      <a href="#">立即注册</a>
      <a href="#">找回密码</a>
    </div>
    <!-- 尾部 -->
    <div class="login-other">
      <p>@ 猫眼电影 客服电话 : 400-670-5335</p>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      tabAct: 1
    }
  },
  methods: {
    back () {
      this.$router.go(-1)// 返回上一层
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/styles/common/mixins.less';

  div{
    background: #f8f8f8;
    box-sizing: border-box;
  }
  .nav-header{
    position: relative;
    .nav-header;
    span{
      position: absolute;
      left: 14px;
      font-size: 12px;
    }
  }
  .login-tab{
    width: 100%;
    height: 40px;
    background: pink;
    .login-form{
      width: 70%;
      height: 88px;
      background: skyblue;
      display: inline-block;
      margin-right: 3%;
    }
  }

  .login-box{
    width: 100%;
    height: 76px;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
  .login-denglu{
    width: 300px;
    height: 44px;
    background: #e54847;
    color: #ffffff;
    line-height: 44px;
    text-align: center;
    border: none;
  }
  .login-reg{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
  }
  a{
    color: #e54847;
  }
  .login-other{
    width: 100%;
    height: 300px;
    background: #f8f8f8;
    p{
      margin: 14px 16px;
    }
  }
</style>
