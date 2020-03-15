<template>
  <div class="nav-bar">
    <div class="max-width">
      <div class="nav-top">
        <div class="logo" @click="$router.push('/')">
          <div class="img" style="background-image: url(http://files.zdesigner.cn/2020/02/21/726f1d504092234a80c547a94b9d50ea.png);"></div>
        </div>
        <div id="nav" class="nav">
          <template v-for="(items, $index) in routes">
          <router-link :key="$index" :to="items.path" :class="isIndex ? '' : 'hideBorder'" v-if="items.meta && items.meta.menu">{{items.name}}</router-link>
          </template>
        </div>
        <div class="user-in" v-if="!$store.state.user">
          <a @click="goWxLogin"><i class="iconfont">&#xe603;</i>微信扫码登录</a> | 
          <a style="color: #999;" @click="clear">清除登录缓存</a>
        </div>
        <div class="user" v-else>
          <div class="user-head" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
          <div class="hello" @click="toUser">欢迎，{{$store.state.user.username}}</div>
          <div class="link" @click="logout">退出</div>
        </div>
      </div>
    </div>
    <transition name="fade">
    <Login v-show="showLogin" :status="loginStatus" @close-login="closeLogin"></Login>
    </transition>
  </div>
</template>

<script>
import { routes } from './../router/index'
import Login from './Login'

export default {
  data() {
    return {
      routes: routes[0].children,
      isIndex: false,
      showLogin: false,
      loginStatus: 'login',
    }
  },
  components: {
    Login,
  },
  watch: {
    $route(from) {
      console.log(this.$route);
      if (from.name === '首页') {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
      if (this.$route.query.code) {
        this.getToken();
      }
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.getToken();
    }
  },
  methods: {
    closeLogin() {
      this.showLogin = false;
    },
    toRegister() {
      this.showLogin = true;
      this.loginStatus = 'register';
    },
    toUser() {
      const memberInfo = localStorage.getItem('memberInfo');
      this.$router.push({
        path: '/user/index',
        query: {
          code: JSON.parse(memberInfo).objectId,
        },
      });
    },
    goWxLogin() {
      const url = `${location.protocol}//${location.host.indexOf('www') === -1 ? 'www.' : ''}${location.host}${location.pathname}`;
      const fullUrl = encodeURIComponent(url);
      location.href=`https://open.weixin.qq.com/connect/qrconnect?appid=wx9a76b368090721eb&redirect_uri=${fullUrl}&response_type=code&scope=snsapi_login#wechat_redirect`
    },
    logout() {
      this.$Bmob.User.logout();
      const memberInfo = localStorage.getItem('memberInfo');
      if (!memberInfo) {
        this.$store.dispatch('getMember', '');
        location.href = this.$route.path;
      }
      if (this.$route.name === '个人中心') {
        location.href = '/';
      }
    },
    clear() {
      localStorage.clear();
      alert('登录缓存已清除');
      location.reload();
    },
    checkTime(i) {
      if (i < 10) { i="0" + i }
      return i;
    },
    getToken() {
      if (!localStorage.getItem('memberInfo')) {
        let params = {
          funcName: 'access_token',
          data: {
            code : this.$route.query.code,
          }
        };
        this.$Bmob.functions(params.funcName, params.data).then((respon) => {
          if (respon.errcode === 40163) {
            location.href = '/';
            return false;
          }

          let param = {
            funcName: 'wechatUser',
            data: {
              access_token: respon.access_token,
              openid: respon.openid,
            }
          };
          this.$Bmob.functions(param.funcName, param.data).then((user) => {
            if (user.sucess === false) { 

              this.$router.push('/');
              this.tipsText = user.message;
              let t = setTimeout(() => {
                this.tipsText = '';
                clearTimeout(t);
              }, 1500);
              return false;
            }
            this.$Bmob.User.users().then((res) => {
              const userlist = res.results;
              const isWX = userlist.some((item) => item.openid === user.openid && user.openid !== '');
              if (isWX) {
                for (let i = 0; i < userlist.length; i += 1) {
                  if (userlist[i].openid === user.openid) {
                    if (!userlist[i].isCustomer) {
                      alert('账号已被禁用，请联系管理员');
                      this.logout();
                      return false;
                    }
                    // console.log(userlist[i]);
                    localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                    this.$store.dispatch('getMember', userlist[i]);
                    let now = new Date();
                    let year = now.getFullYear();
                    let month = this.checkTime(now.getMonth() + 1);
                    let date = this.checkTime(now.getDate());
                    let hour = this.checkTime(now.getHours());
                    let minute = this.checkTime(now.getMinutes());
                    let second = this.checkTime(now.getSeconds());
                    let data = {
                        "__type": "Date",
                        "iso": `${year}-${month}-${date} ${hour}:${minute}:${second}`
                    };

                    const userquery = this.$Bmob.Query('_User');
                    userquery.get(userlist[i].objectId).then(user => {
                      user.set('loginTime', data);
                      user.save().then(() => {
                        console.log('---已记录登录时间---');
                      }).catch(err => {
                        console.log(err)
                      });
                    });
                  }
                }
              } else {
                const email = `user${new Date().getTime()}@bmob.cn`;
                let params = {
                  username: user.nickname,
                  password: '123456',
                  email,
                  imgSrc: user.headimgurl,
                  openid: user.openid,
                  sex: user.sex,
                  city: user.city,
                  province: user.province,
                  country: user.country,
                  isCustomer: true,
                  isAdmin: false,
                }
                this.$Bmob.User.register(params).then(r => {
                  this.$Bmob.User.users().then(u => {
                    let ul = u.results;
                    for (let i = 0; i < ul.length; i += 1) {
                      if (ul[i].objectId === r.objectId) {
                        localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                        this.$store.dispatch('getMember', ul[i]);
                        location.href = '/';
                      }
                    }
                  })
                }).catch(err => {
                  console.log(err)
                });
              }
            });
          });
        });
      }
    },
  },
}
</script>

<style lang="scss" scope>
  a {
    text-decoration: none;
    color: #000;
    font-family: PingFang SC Regular;
  }
  .nav-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    box-shadow: 0px -34px 49px 9px #bbb;
    z-index: 2;
    .max-width {
      margin: auto;
      height: 100%;
      .nav-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        letter-spacing: 2px;
        box-sizing: border-box;
        z-index: 1000;
        .logo {
          line-height: 50px;
          cursor: pointer;
          .img {
            display: inline-block;
            margin-right: 16px;
            width: 147px;
            height: 40px;
            background-position: 50%;
            background-size: contain;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
        .nav {
          display: flex;
          justify-content: space-between;
          line-height: 50px;
          a {
            display: inline-block;
            margin: 0 25px;
            width: 70px;
            font-size: 12px;
            text-align: center;
            transition: color 0.5s;
            border-bottom: 4px solid #fff;
            cursor: pointer;
            &:hover {
              color: #FFCB2B;
            }
            &.router-link-exact-active {
              color: #FFCB2B;
              border-bottom: 4px solid #FFCB2B;
            }
          }
        }
        .user-in {
          text-align: right;
          line-height: 50px;
          color: #F2F2F2;
          z-index: 1;
          a {
            display: inline-block;
            font-size: 12px;
            letter-spacing: 0px;
            cursor: pointer;
            transition: color 0.5s;
            i {
              margin-right: 5px;
              font-size: 12px;
            }
            &:hover {
              color: #07c160;
            }
            &.btn {
              margin-left: 30px;
              width: 100px;
              height: 40px;
              line-height: 40px;
              background: #FFCB2B;
              border-radius: 10px;
              text-align: center;
              &:hover {
                color: #333;
              }
            }
          }
        }
        .user {
          font-size: 12px;
          line-height: 50px;
          .user-head {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-size: cover;
          }
          .hello {
            display: inline-block;
            margin-right: 15px;
            vertical-align: middle;
            color:#F4751D;
            cursor: pointer;
          }
          .link {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.25s, transform 0.25s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
      opacity: 0;
      transform: translate(0, -15px);
    }
    .fade-leave, .fade-enter-to {
      transform: translate(0, 0);
    }
  }
</style>
