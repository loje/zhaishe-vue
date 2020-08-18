<template>
  <div
    :class="$route.name === '工具' || $route.name === '工具详情'  || $route.name === '活动' ? 'nav-bar no-shadow' : 'nav-bar'"
    v-if="$route.name !== '身份验证' && $route.name !== '手机验证'"
  >
    <div class="nav-top">
      <div class="logo" @click="$router.push('/')">
        <div
          class="img"
          style="background-image: url(http://files.zdesigner.cn/2020/02/21/726f1d504092234a80c547a94b9d50ea.png);"
        ></div>
      </div>
      <div class="max-width">
        <div id="nav" class="nav">
          <template v-for="(items, $index) in routes">
            <router-link
              :key="$index"
              :to="items.path"
              :class="isIndex ? '' : 'hideBorder'"
              v-if="items.meta && items.meta.menu"
            >{{items.name}}</router-link>
          </template>
        </div>
      </div>
      <div class="user-in" v-if="!$store.state.user">
        <a @click="goWxLogin">
          <i class="iconfont">&#xe603;</i>微信扫码登录
        </a> |
        <a style="color: #999;" @click="clear">清除登录缓存</a>
      </div>
      <div class="user" v-else>
        <div class="user-head" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
        <div class="hello" @click="toUser">欢迎，{{$store.state.user.nickname}}</div>
        <div class="link" @click="logout">退出</div>
      </div>
    </div>

    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>

    <Auth :showAuth="showAuthBoolean"></Auth>
  </div>
</template>

<script>
import { routes } from "./../router/index";
import Tips from "@/components/Tips";
import Auth from "@/components/Auth";

export default {
  data() {
    return {
      routes: routes[0].children,
      isIndex: false,

      tipsText: "",
      tipsType: "",
      showAuthBoolean: false
    };
  },
  components: {
    Tips,
    Auth
  },
  watch: {
    $route(from) {
      if (from.name === "首页") {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
      if (this.$route.query.code) {
        this.getToken();
      }
    }
	},
	// created() {
	// 	if (localStorage.getItem("memberInfo")) {
  //     if (
  //       this.$route.name !== "身份验证" &&
  //       (!JSON.parse(localStorage.getItem("memberInfo")).mobilePhoneNumber || JSON.parse(localStorage.getItem("memberInfo")).mobilePhoneNumber === '' ||
  //         !JSON.parse(localStorage.getItem("memberInfo")).email || JSON.parse(localStorage.getItem("memberInfo")).email === '')
  //     ) {
  //       this.showAuthBoolean = true;
  //     }
  //   }
	// },
  mounted() {
    if (this.$route.query.code) {
      this.getToken();
    }

    if (localStorage.getItem("memberInfo")) {
      if (
        this.$route.name !== "身份验证" &&
        (!JSON.parse(localStorage.getItem("memberInfo")).mobilePhoneNumber || JSON.parse(localStorage.getItem("memberInfo")).mobilePhoneNumber === '' ||
          !JSON.parse(localStorage.getItem("memberInfo")).email || JSON.parse(localStorage.getItem("memberInfo")).email === '')
      ) {
        this.showAuthBoolean = true;
      }
    }
  },
  methods: {
    toUser() {
      this.$router.push({
        path: "/user/product"
      });
    },
    goWxLogin() {
      const url = `${location.protocol}//${
        location.host.indexOf("www") === -1 ? "www." : ""
      }${location.host}${location.pathname}`;
      const fullUrl = encodeURIComponent(url);
      location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=wx9a76b368090721eb&redirect_uri=${fullUrl}&response_type=code&scope=snsapi_login#wechat_redirect`;
    },
    logout() {
      this.$Bmob.User.logout();
      const memberInfo = localStorage.getItem("memberInfo");
      if (!memberInfo) {
        this.$store.dispatch("getMember", "");
        location.href = this.$route.path;
      }
      if (this.$route.name === "个人中心") {
        location.href = "/";
      }
    },
    clear() {
      localStorage.clear();
      this.tipsText = "登录缓存已清除，将回到首页";
      this.tipsType = "success";
      let t = setTimeout(() => {
        this.tipsText = "";
        location.reload();
        clearTimeout(t);
      }, 1500);
      return false;
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    getToken() {
      const that = this;
      if (!localStorage.getItem("memberInfo")) {
        // 如果localStorage里没有用户数据，就去扫码登录吧
        let params = {
          funcName: "access_token",
          data: {
            code: this.$route.query.code,
            appid: "wx9a76b368090721eb",
            secret: "f17b3a8b2b6f23e998b8af0372fd7774"
          }
        };
        this.$Bmob.functions(params.funcName, params.data).then(respon => {
          if (respon.errcode === 40163) {
            this.tipsText =
              "Code been used.（若多次出现此报错，请联系系统管理员）";
            this.tipsType = "error";
            let t = setTimeout(() => {
              this.tipsText = "";
              location.href = "/";
              clearTimeout(t);
            }, 1500);
            return false;
          }

          let param = {
            funcName: "wechatUser",
            data: {
              access_token: respon.access_token,
              openid: respon.openid
            }
          };
          this.$Bmob.functions(param.funcName, param.data).then(user => {
            if (user.errcode) {
              this.tipsText = user.errmsg;
              this.tipsType = "error";
              let t = setTimeout(() => {
                this.tipsText = "";
                location.href = "/";
                clearTimeout(t);
              }, 1500);
              return false;
            }
            if (user.sucess === false) {
              this.$router.push("/");
              this.tipsText = user.message;
              this.tipsType = "error";
              let t = setTimeout(() => {
                this.tipsText = "";
                clearTimeout(t);
              }, 1500);
              return false;
            }
            let alluser = this.$Bmob.Query("_User");
            const query1 = alluser.equalTo("unionid", "==", user.unionid);
            const query2 = alluser.equalTo("openid", "==", user.openid);
            alluser.or(query1, query2);
            alluser.find().then(res => {
              const userlist = res[0];

              if (res.length > 0) {
                if (!userlist.isCustomer) {
                  this.tipsText = "账号已被禁用，请联系管理员";
                  this.tipsType = "error";
                  let t = setTimeout(() => {
                    that.logout();
                    that.tipsText = "";
                    clearTimeout(t);
                  }, 1500);
                  return false;
                }

                localStorage.setItem("memberInfo", JSON.stringify(userlist));
                this.$store.dispatch("getMember", userlist);
                let now = new Date();
                let year = now.getFullYear();
                let month = this.checkTime(now.getMonth() + 1);
                let date = this.checkTime(now.getDate());
                let hour = this.checkTime(now.getHours());
                let minute = this.checkTime(now.getMinutes());
                let second = this.checkTime(now.getSeconds());
                let data = {
                  __type: "Date",
                  iso: `${year}-${month}-${date} ${hour}:${minute}:${second}`
                };
                const userquery = this.$Bmob.Query("_User");
                userquery.get(userlist.objectId).then(userdata => {
                  userdata.set("loginTime", data);
                  userdata.set("unionid", user.unionid);
                  userdata.set("username", user.unionid);
                  userdata.set("nickname", user.nickname);

                  userdata
                    .save()
                    .then(() => {
                      console.log("---已记录登录时间---");
                      if (
                        !JSON.parse(localStorage.getItem("memberInfo"))
                          .mobilePhoneNumber ||
                        !JSON.parse(localStorage.getItem("memberInfo")).email ||
                        !JSON.parse(localStorage.getItem("memberInfo")).password
                      ) {
                        that.showAuthBoolean = true;
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
              } else {
                console.log("------注册------");
                const email = `user${new Date().getTime()}@bmob.cn`;
                let params = {
                  username: user.unionid,
                  nickname: user.nickname,
                  password: "123456",
                  email,
                  imgSrc: user.headimgurl,
                  openid: user.openid,
                  unionid: user.unionid,
                  sex: user.sex,
                  city: user.city,
                  province: user.province,
                  country: user.country,
                  isCustomer: true,
                  isAdmin: false
                };
                that.$Bmob.User.register(params)
                  .then(r => {
                    const query = that.$Bmob.Query("_User");
                    query
                      .get(r.objectId)
                      .then(res => {
                        localStorage.setItem("memberInfo", JSON.stringify(res));
                        that.$store.dispatch("getMember", res);
                        location.href = "/";
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            });
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scope>
a {
  text-decoration: none;
  color: #000;
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
  &.no-shadow {
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }

  .max-width {
    margin: auto;
    height: 100%;
  }
  .nav-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    letter-spacing: 2px;
    box-sizing: border-box;
    z-index: 1000;
    .logo {
      position: absolute;
      left: 40px;
      top: 0;
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
      height: 50px;
      line-height: 50px;
      a {
        display: inline-block;
        width: 128px;
        font-size: 14px;
        text-align: center;
        color: #333;
        transition: background-color 0.5s, color 0.5s;
        cursor: pointer;
        &:hover {
          background-color: #ffcb2b;
          color: #333;
        }
        &.router-link-exact-active {
          background-color: #ffcb2b;
          color: #333;
        }
      }
    }
    .user-in {
      position: absolute;
      right: 40px;
      top: 0;
      text-align: right;
      line-height: 50px;
      color: #f2f2f2;
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
          background: #ffcb2b;
          border-radius: 10px;
          text-align: center;
          &:hover {
            color: #333;
          }
        }
      }
    }
    .user {
      position: absolute;
      right: 40px;
      top: 0;
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
        color: #f4751d;
        cursor: pointer;
      }
      .link {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s, transform 0.25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
    transform: translate(0, -15px);
  }
  .fade-leave,
  .fade-enter-to {
    transform: translate(0, 0);
  }
}
</style>
