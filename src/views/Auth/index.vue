<template>
  <div class="auth-page">
    <div class="max-width">
      <div class="auth-layer">
        <span class="back" @click="back">返回宅设</span>
        <div class="layer-flex">
          <div
            class="logo"
            style="background-image: url(http://files.zdesigner.cn/2020/02/21/726f1d504092234a80c547a94b9d50ea.png);"
          ></div>
          <div class="pic"></div>
        </div>
        <div class="layer-flex">
          <div class="form-title">身份验证</div>
          <div class="form-group">
            <div class="form-t">昵称</div>
            <div class="form-input">
              <input type="text" v-model="userinfo.nickname" disabled="true" />
            </div>
          </div>
          <div :class="errorType !== 'email' ? 'form-group' : 'form-group form-error'">
            <div class="form-t">邮箱</div>
            <div class="form-input">
              <input type="text" v-model="userinfo.email" placeholder="常用邮箱/该邮箱为你的账号" />
            </div>
          </div>
          <div :class="errorType !== 'password' ? 'form-group' : 'form-group form-error'">
            <div class="form-t">密码</div>
            <div class="form-input">
              <input type="text" placeholder="设置密码" v-model="userinfo.password" />
            </div>
          </div>
          <div class="error">{{error}}</div>
          <div class="btn" @click="save">完成</div>
        </div>
      </div>

      <div class="auth-btm">粤ICP备17153005号-1 zdesigner.cn 关于我们</div>

      <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
    </div>
  </div>
</template>

<script>
import Tips from "@/components/Tips";

export default {
  data() {
    return {
      userinfo: "",
      error: "",
      errorType: "",

      tipsText: "",
      tipsType: ""
    };
  },
  components: {
    Tips
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem("memberInfo"));
  },
  methods: {
    back() {
      this.$router.go(-2);
    },
    save() {
      if (!this.userinfo.email) {
        this.error = "请填写邮箱";
        this.errorType = "email";
        return false;
      }

      // 邮箱验证正则
      // eslint-disable-next-line no-useless-escape
      const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.userinfo.email)) {
        this.error = "邮箱格式不正确";
        this.errorType = "email";
        return false;
      }

      if (!this.userinfo.password) {
        this.error = "请填写密码";
        this.errorType = "password";
        return false;
      }

      const query = this.$Bmob.Query("_User");
      query.get(this.userinfo.objectId).then(user => {
        user.set("email", this.userinfo.email);
        user.set("password", this.userinfo.password);
        user
          .save()
          .then(() => {
            query.get(this.userinfo.objectId).then(user => {
              console.log(user)
              localStorage.setItem("memberInfo", JSON.stringify(user));
              this.$store.dispatch("getMember", user);
            });
            this.tipsText = "保存成功";
            this.tipsType = "success";
            let t = setTimeout(() => {
              this.tipsText = "";
              window.location.href = '/'
              clearTimeout(t);
            }, 1500);
          })
          .catch(err => {
            if (
              err
                .toString()
                .indexOf("Cannot convert undefined or null to object") !== -1
            ) {
              query.get(this.userinfo.objectId).then(user => {
                console.log(user)
                localStorage.setItem("memberInfo", JSON.stringify(user));
                this.$store.dispatch("getMember", user);
              });
              this.tipsText = "保存成功";
              this.tipsType = "success";
              let t = setTimeout(() => {
                this.tipsText = "";
                window.location.href = '/'
                clearTimeout(t);
              }, 1500);
            }
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-page {
  padding-top: 20px;
  .max-width {
    padding: 25px 50px;
    background-color: #fff;
    box-sizing: border-box;
    .auth-layer {
      position: relative;
      display: flex;
      .back {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        cursor: pointer;
      }
      .layer-flex {
        flex: 1;
        .logo {
          margin-bottom: 16px;
          width: 147px;
          height: 40px;
          background-position: 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .pic {
          width: 434px;
          height: 324px;
          background-color: #999;
          background-image: url('../../assets/img/auth_phone_pic.png');
        }

        .form-title {
          margin-top: 56px;
          margin-bottom: 15px;
          font-size: 14px;
          color: #333;
        }
        .form-group {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 0 10px;
          height: 45px;
          background-color: #f4f4f4;
          border-radius: 4px;
          overflow: hidden;
          box-sizing: border-box;
          .form-t {
            width: 70px;
            font-size: 16px;
            color: #333;
          }
          .form-input {
            flex: 1;
            height: 100%;
            input {
              padding: 0;
              width: 100%;
              height: 100%;
              background-color: transparent;
              border: none;
              outline: none;
              font-size: 16px;
            }
          }
          &.form-error {
            border: 1px solid #f17676;
          }
        }

        .error {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
        }

        .btn {
          margin-top: 60px;
          width: 160px;
          height: 38px;
          line-height: 38px;
          background-color: #f4c51d;
          border-radius: 2px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          color: #262626;
          cursor: pointer;
        }
      }
    }

    .auth-btm {
      margin-top: 100px;
      font-size: 14px;
      text-align: center;
      color: #333333;
      line-height: 20px;
    }
  }
}
</style>
