<template>
  <div class="login-page">
    <div :class="showbox === 'wechat' ? 'box-flex wechat-flex' : 'box-flex'">
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
          <span>{{error}}</span>
          <a>忘记密码</a>
        </div>

        <fieldset>
          <legend>选择已有的社交媒体</legend>
        </fieldset>

        <!-- <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx9a76b368090721eb&redirect_uri=http%3a%2f%2fzdesigner.cn%2fuser&response_type=code&scope=snsapi_login#wechat_redirect" target="blank"><i class="iconfont wechat">&#xe644;</i></a> -->
        <i class="iconfont wechat" @click="goWechat">&#xe644;</i>

        <!-- 【敲黑板重点来了】这里的redirect_uri可以是你网站下的任何页面（不局限于授权回调域配置的域名），但是一定要在前面加上http://，并且使用urlencode编码。如：http://www.sciparty.com/weixinlogin。例如下面的链接地址：
        https://open.weixin.qq.com/connect/qrconnect?appid=wxf43a4fc291843e43&redirect_uri=http%3a%2f%2fwww.sciparty.com%2fweixinlogin&response_type=code&scope=snsapi_login#wechat_redirect

        作者：小七君
        链接：https://www.jianshu.com/p/5b5c2131bff9
        来源：简书
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 -->
        <div class="btn-group">
          <a class="btn" @click="login">登录</a>
          <a class="btn" @click="showbox = 'register'">注册</a>
        </div>
      </div>
      <div class="register-box" v-else-if="showbox === 'register'">
        <div class="title">请输入你的信息</div>
        <div class="input-group">
          <span>手机</span>
          <input type="text" v-model="form.phone" maxlength="11" />
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
          <span>{{error}}</span>
        </div>
        <div class="btn-group">
          <a class="btn" style="width: 100%" @click="register">确定</a>
        </div>
      </div>
      <div class="register-status" v-else-if="showbox === 'status'">
        <img src="" />
        <div class="status">注册成功</div>
        <div class="btn-group">
          <a class="btn" style="width: 100%" @click="goLogin">返回登录</a>
        </div>
      </div>
      
      <div class="wechat-box"  v-else-if="showbox === 'wechat'">
        <wxlogin appid="wx9a76b368090721eb" scope="snsapi_login" redirect_uri="http%3a%2f%2fzdesigner.cn%2fuser" theme="black"></wxlogin>

        <div class="btn" @click="goLogin">返回账号登录</div>
      </div>
    </div>

    <!-- <div class="wechat-login" v-if="showWechat === true">
      <div class="wechat-flex">
        <div class="wechat-box">
          <wxlogin appid="wx9a76b368090721eb" scope="snsapi_login" redirect_uri="http%3a%2f%2fzdesigner.cn%2fuser"></wxlogin>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import wxlogin from 'vue-wxlogin';

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
      error: '',

      showWechat: false,
    }
  },
  components: {
    wxlogin,
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
    login() {
      this.$Bmob.User.login(this.form.name, this.form.password).then(res => {
        console.log(res)
        if (res.code === 101) {
          this.error = '账号或密码有误';
          return false;
        }
        if (res.sessionToken) {
          this.close();
          const memberInfo = localStorage.getItem('memberInfo');
          if (memberInfo) {
            this.$store.dispatch('getMember', JSON.parse(memberInfo));
          }
        }
      }).catch(err => {
        console.log(err)
        this.error = '账号或密码有误';
      });
    },
    goRegister() {
      this.error = '';
      this.form = {};
      this.showbox = 'register';
    },
    goLogin() {
      this.error = '';
      this.form = {};
      this.showbox = 'login';
    },
    close() {
      this.error = '';
      this.form = {};
      this.showbox = 'login';
      this.$emit('close-login', '关闭登录框');
    },
    register() {
      if (!this.form.phone) {
        this.error = '请填写手机号';
        return false;
      }
      if (this.form.phone.length !== 11) {
        this.error = '手机号必须是11位';
        return false;
      }
      if (!this.form.password) {
        this.error = '请填写密码';
        return false;
      }
      if (!this.form.passwordAgain) {
        this.error = '请再次填写密码';
        return false;
      }
      if (this.form.password !== this.form.passwordAgain) {
        this.error = '两次密码不一致';
        return false;
      }
      let params = {
        username: this.form.phone,
        password: this.form.passwordAgain,
        email: `${this.form.phone}@zdesigner.cn`,
        mobilePhoneNumber: this.form.phone,
        imgSrc: 'http://files.zdesigner.cn/2020/01/07/833f0a7940b5b202804b20accfb30ab8.png',
      }
      this.$Bmob.User.register(params).then((res) => {
        console.log(res)
        this.form = {};
        this.showbox = 'status';
      }).catch(err => {
      console.log(err)
      });
    },

    goWechat() {
      this.showWechat = true;
      this.error = '';
      this.form = {};
      this.showbox = 'wechat';
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
      transition: all ease-in-out 250ms;
      &.wechat-flex {
        width: 350px;
      }
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
        color: #07c160;
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

    // .wechat-login {
    //   position: fixed;
    //   left: 0;
    //   top: 0;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 0;
    //   .wechat-flex {
    //     flex: 1;
    //     .wechat-box {
    //       margin: auto;
    //       width: 300px;
    //       height: 400px;
    //       background-color: #fff;
    //       border-radius: 2px;
    //     }
    //   }
    // }
    .wechat-box {
      .btn {
        display: block;
        margin: auto;
        // width: 100px;
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
</style>