<template>
  <div class="login-page">
    <div class="box-flex">
      <i class="iconfont close" @click="close">&#xea13;</i>
      <div class="login-box" v-if="showbox === 'login'">
        <div class="title">你还没有登录</div>
        <div class="input-group">
          <span>账号</span>
          <input type="text" v-model="form.name" />
        </div>
        <div class="input-group">
          <span>密码</span>
          <input type="text" v-model="form.password" />
        </div>
        <div class="tips">
          <span></span>
          <a>忘记密码</a>
        </div>

        <fieldset>
          <legend>选择已有的社交媒体</legend>
        </fieldset>

        <i class="iconfont wechat">&#xe644;</i>

        <div class="btn-group">
          <a class="btn">登录</a>
          <a class="btn" @click="showbox = 'register'">注册</a>
        </div>
      </div>
      <div class="register-box" v-else-if="showbox === 'register'">
        <div class="title">请输入你的信息</div>
        <div class="input-group">
          <span>手机</span>
          <input type="text" v-model="form.phone" />
        </div>
        <div class="input-group">
          <span>密码</span>
          <input type="text" v-model="form.password" />
        </div>
        <div class="input-group">
          <span>再次确认</span>
          <input type="text" v-model="form.passwordAgain" />
        </div>
        <div class="tips">
          <span></span>
        </div>
        <div class="btn-group">
          <a class="btn" style="width: 100%">确定</a>
        </div>
      </div>
      <div class="register-status" v-else-if="showbox === 'status'">
        <img src="" />
        <div class="status">注册成功</div>
        <div class="btn-group">
          <a class="btn" style="width: 100%">返回登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: [String],
      default: 'login',
    },
  },
  data() {
    return {
      form: {},
      showbox: 'login',
    }
  },
  watch: {
    status: {
      immediate: true,
      handler (val) {
        console.log(val);
        this.showbox = val;
      },
    },
  },
  methods: {
    goRegister() {
      this.form = {};
      this.showbox = 'register';
    },
    close() {
      this.form = {};
      this.$emit('close-login', '关闭登录框');
    },
  },
};
</script>

<style lang="scss" scoped>
  .login-page {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.75);
    z-index: 1;
    .box-flex {
      position: relative;
      padding: 30px 25px;
      width: 280px;
      background-color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      .close {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
      }
      .title {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51,51,51,1);
        line-height: 22px;
      }
      .input-group {
        display: flex;
        margin-top: 20px;
        align-items: center;
        width: 100%;
        height: 40px;
        border: 1px solid #D9D9D9;
        box-sizing: border-box;
        border-radius: 2px;
        span {
          margin: 0 15px;
          font-size: 12px;
          color: #888;
        }
        input {
          padding: 0;
          border: none;
          flex: 1;
          outline: none;
          font-size: 12px;
        }
      }
      .tips {
        position: relative;
        margin-top: 10px;
        width: 100%;
        span {
          display: inline-block;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(229,93,93,1);
          line-height: 17px;
        }
        a {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51,51,51,1);
          line-height: 17px;
          cursor: pointer;
        }
      }

      fieldset {
        margin-top: 40px;
        margin-bottom: 10px;
        border-left: none;
        border-right: none;
        border-bottom: none;
        border-color: #D9D9D9;
        border-width: 1px;
        legend {
          margin: 0;
          padding: 0 25px;
          text-align: center;
          color: #888;
          font-size: 12px;
          line-height: 17px;
        }

      }

      .wechat {
        display: block;
        margin: auto;
        width: 24px;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
        color: #1BB723;
        cursor: pointer;
      }

      .status {
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: bold;
        color: rgba(38,38,38,1);
        line-height: 22px;
      }

      .btn-group {
        display: flex;
        margin-top: 30px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        .btn {
          display: block;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #F4C51D;
          border-radius: 2px;
          font-size: 14px;
          color: #262626;
          cursor: pointer;
        }
      }
    }
  }
</style>