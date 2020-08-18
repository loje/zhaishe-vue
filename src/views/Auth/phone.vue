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
            <div class="form-t">+86</div>
            <div class="form-input">
              <input type="text" v-model="userinfo.mobilePhoneNumber" maxlength="11" />
            </div>
          </div>

          <div class="error">{{error}}</div>

          <drag-verify
            :width="width"
            :height="height"
            :text="text"
            :success-text="successText"
            :background="background"
            :progress-bar-bg="progressBarBg"
            :completed-bg="completedBg"
            :handler-bg="handlerBg"
            :handler-icon="handlerIcon"
            :text-size="textSize"
            :success-icon="successIcon"
            @passcallback="passcallback"
            ref="Verify"
          ></drag-verify>

          <div class="code" v-if="showCode">
            <input type="text" v-model="userinfo.code" maxlength="6" class="code-input" />
            <div class="code-btn" @click="getCode" v-if="codeDisabled === false">发送</div>
            <div class="code-btn disabled" v-else>已发送</div>

            <span class="tips" v-html="codeText"></span>
          </div>

          <div class="rules">
            <input type="checkbox" name="checkbox" id="checkbox" v-model="ruleChecked" />
            <label for="checkbox">
              <div class="checkbox">
                <i class="iconfont">&#xe607;</i>
              </div>
              
              我已阅读并接受 <a>用户协议</a> 和 <a>隐私政策</a>
            </label>
          </div>

          <div class="btn" @click="save">下一步</div>
        </div>
      </div>

      <div class="auth-btm">粤ICP备17153005号-1 zdesigner.cn 关于我们</div>

      <Tips :tips="tipsText" :tipsType="tipsType" style="top: 0;"></Tips>
    </div>
  </div>
</template>

<script>
import "@/assets/css/font-awesome.min.css";
import Tips from "@/components/Tips";
import dragVerify from "vue-drag-verify";

export default {
  data() {
    return {
      userinfo: "",
      error: "",
      errorType: "",

      tipsText: "",
      tipsType: "",

      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
      background: "#E8E8E8",
      progressBarBg: "#f4c51d",
      completedBg: "#49CC6F",
      handlerBg: "#fff",
      text: "请将滑块拖动到右侧",
      successText: "验证成功",
      width: 500,
      height: 33,
      textSize: "12px",

      showCode: false,
      codeText: "",
      codeDisabled: false,
      ruleChecked: false
    };
  },
  components: {
    Tips,
    dragVerify
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem("memberInfo"));
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    save() {
      this.error = "";
      const that = this;
      if (this.ruleChecked === false) {
        this.tipsText = "请勾选同意用户协议和隐私政策";
        this.tipsType = "error";
        let t = setTimeout(() => {
          that.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      if (this.userinfo.mobilePhoneNumber === "") {
        this.tipsText = "请填写手机号";
        this.tipsType = "error";
        let t = setTimeout(() => {
          that.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      if (this.userinfo.mobilePhoneNumber.length !== 11) {
        this.tipsText = "手机号必须是11位";
        this.tipsType = "error";
        let t = setTimeout(() => {
          that.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      if (this.showCode === false) {
        this.tipsText = "请拖动滑块";
        this.tipsType = "error";
        let t = setTimeout(() => {
          that.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }

      if (this.userinfo.code === "" || !this.userinfo.code) {
        this.tipsText = "请填写验证码";
        this.tipsType = "error";
        let t = setTimeout(() => {
          that.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }

      let smsCode = that.userinfo.code;
      let data = {
        mobilePhoneNumber: that.userinfo.mobilePhoneNumber
      };
      this.$Bmob
        .verifySmsCode(smsCode, data)
        .then(response => {
          console.log(response);
          const query = this.$Bmob.Query("_User");
          query.get(that.userinfo.objectId).then(user => {
            user.set("mobilePhoneNumber", that.userinfo.mobilePhoneNumber);
            user
              .save()
              .then(() => {
                that.tipsText = "保存成功";
                that.tipsType = "success";
                let t = setTimeout(() => {
                  that.tipsText = "";
                  that.$router.push('/auth')
                  clearTimeout(t);
                }, 500);
              })
              .catch(err => {
                if (
                  err
                    .toString()
                    .indexOf("Cannot convert undefined or null to object") !==
                  -1
                ) {
                  this.tipsText = "保存成功";
                  this.tipsType = "success";
                  let t = setTimeout(() => {
                    this.tipsText = "";
                    that.$router.push('/auth')
                    clearTimeout(t);
                  }, 500);
                }
              });
          });
        })
        .catch(function(error) {
          console.log(error);
          that.tipsText = error.error;
          that.tipsType = "error";
          let t = setTimeout(() => {
            that.tipsText = "";
            clearTimeout(t);
          }, 1500);
        });
    },
    passcallback() {
      this.showCode = true;
      console.log("finishing");
    },
    getCode() {
      const that = this;
      if (that.codeDisabled === false) {
        let params = {
          mobilePhoneNumber: this.userinfo.mobilePhoneNumber, //string
          template: '宅设会手机验证'
        };
        this.$Bmob
          .requestSmsCode(params)
          .then(response => {
            console.log(response);
            that.codeDisabled = true;
            let t = 60;
            const s = setInterval(() => {
              if (t > 0) {
                t = t - 1;
                that.codeText = "<span style='color: #f4751d;'>" + t + "</span>秒可重新发送";
              } else {
                clearInterval(s);
                that.codeText = "";
                that.codeDisabled = false;
              }
            }, 1000);
          })
          .catch(error => {
            if (error.code === 10010) {
              that.tipsText = '该手机号发送短信达到限制(一天给同一手机号发送短信不能超过10条，一小时给同一手机号发送短信不能超过5条，一分钟给同一手机号发送短信不能超过1条)'
            } else {
              that.tipsText = error.error;
            }
            that.tipsType = "error";
            let t = setTimeout(() => {
              that.tipsText = "";
              clearTimeout(t);
            }, 1500);
          });
      }
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
          margin-bottom: 10px;
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
              letter-spacing: 2px;
            }
          }
          &.form-error {
            border: 1px solid #f17676;
          }
        }

        .error {
          margin-bottom: 10px;
          padding-left: 10px;
          font-size: 14px;
          color: #999999;
          line-height: 20px;
        }

        .code {
          display: flex;
          margin-top: 20px;
          .code-input {
            padding: 0 30px;
            width: 150px;
            height: 45px;
            background-color: #f4f4f4;
            border: 1px solid #f4c51d;
            border-radius: 4px;
            outline: none;
            box-sizing: border-box;
          }
          .code-btn {
            margin-left: 10px;
            font-size: 14px;
            width: 98px;
            height: 45px;
            line-height: 43px;
            border: 1px solid #f4c51d;
            color: #333333;
            border-radius: 4px;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;
            &.disabled {
              background-color: #e2e2e2;
              color: #999999;
              border: 1px solid #e2e2e2;
            }
          }
          .tips {
            margin-left: 15px;
						line-height: 45px;
            font-size: 14px;
            color: #999999;
          }
        }

        .rules {
          margin: 20px 0;
          font-size: 14px;
          line-height: 20px;
          color: #333;

          label {
            display: flex;
            align-items: center;
            cursor: pointer;
            a {
              color: #f4751d;
            }
          }
          input[type="checkbox"] + label .checkbox{
            margin-right: 15px;
            display: block;
            // content: ""; /*不换行空格*/
            width: 20px;
            height: 20px;
            border-radius: 2px;
            border: 1px solid #979797;
            box-sizing: border-box;
            transition: all 250ms ease;
            i {
              opacity: 0;
              color: #fff;
            }
          }
          input[type="checkbox"] {
            position: absolute;
            clip: rect(0, 0, 0, 0);
          }
          input[type="checkbox"]:checked + label .checkbox {
            background-color: #f4c51d;
            border-color: #f4c51d;
            i {
              opacity: 1;
            }
          }
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

<style>
.drag_verify {
  border-radius: 4px !important;
}
.drag_verify .dv_handler {
  /* width: 56px!important; */
  border-radius: 4px !important;
}
.drag_verify .dv_progress_bar {
  border-radius: 4px !important;
  transition: background 250ms ease-in !important;
}
</style>
