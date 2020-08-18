<template>
  <div class="user-page">
    <div class="max-width">
      <div class="user-left">
        <div
          :class="active === $index ? 'the-menu active' : 'the-menu'"
          v-for="(item, $index) in menuList"
          :key="$index"
          @click="tab($index)"
        >{{item}}</div>
      </div>
      <div class="user-right">
        <template v-if="active === 0">
          <div class="form">
            <div class="form-left">
              <div class="form-group">
                <div class="form-title">基本信息</div>
                <div class="form-desc">修改你的基本资料，将显示在你的个人名片中，并可以让更多的朋友了解和认识你！</div>
              </div>
              <div class="form-group">
                <div class="form-title">用户名</div>
                <div class="form-desc">用户名既是你在宅设会的昵称也是重要标志</div>
                <input class="form-input" type="text" v-model="user.nickname" />
              </div>
              <div class="form-group">
                <button class="form-btn" @click="save">确定</button>
                <button class="form-btn disabled" @click="clear">清空</button>
              </div>
            </div>
            <div class="form-right">
              <div class="img" :style="{backgroundImage: `url(${user.imgSrc})`}"></div>
            </div>
          </div>
        </template>
        <template v-else-if="active === 1">
          <div class="title">扩展资料</div>
          <div class="form-g">
            <div class="form-t">性别</div>
            <div class="form-i">
              <div class="the-radio">
                <input type="radio" name="gender" id="male" v-model="user.sex" value="1" />
                <label for="male">
                  <span>男</span>
                </label>
              </div>
              <div class="the-radio">
                <input type="radio" name="gender" id="female" v-model="user.sex" value="2" />
                <label for="female">
                  <span>女</span>
                </label>
              </div>
            </div>
          </div>
          <div class="form-g">
            <div class="form-t">生日</div>
            <div class="form-i">
              <input type="date" class="birthday" v-model="user.birthday" />
            </div>
          </div>
          <div class="form-g">
            <div class="form-t">地区</div>
            <div class="form-i">{{user.country}} {{user.province}} {{user.city}} {{user.address}}</div>
          </div>
          <div class="form-g">
            <div class="form-t">电话</div>
            <div class="form-i">
              <input type="phone" class="phone" v-model="user.mobilePhoneNumber" />
            </div>
          </div>
          <div class="form-g">
            <div class="form-t">邮箱</div>
            <div class="form-i">
              <input type="email" v-model="user.email" />
            </div>
          </div>
          <div class="form-g">
            <div class="form-t">微信</div>
            <div class="form-i">
              <input type="text" v-model="user.wechatId" />
            </div>
          </div>
          <div class="form-g">
            <div class="form-i">
              <button class="form-btn" @click="save">确定</button>
              <button class="form-btn disabled" @click="clear">清空</button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>

<script>
import Tips from "@/components/Tips";

export default {
  data() {
    return {
      user: "",
      menuList: ["基本资料", "扩展资料"],
      active: 0,
      tipsText: "",
      tipsType: ""
    };
  },
  components: {
    Tips
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("memberInfo"));
  },
  methods: {
    tab(index) {
      this.active = index;
    },
    save() {
      const query = this.$Bmob.Query("_User");
      query.get(this.user.objectId).then(user => {
        user.set("nickname", this.user.nickname);
        if (this.user.sex) {
          user.set("sex", this.user.sex);
        }
        if (this.user.birthday) {
          user.set("birthday", this.user.birthday);
        } else {
          user.unset("birthday");
        }
        user.set("mobilePhoneNumber", this.user.mobilePhoneNumber);
        user.set("email", this.user.email);
        user
          .save()
          .then(() => {
            this.tipsText = "保存成功";
            this.tipsType = "success";
            let t = setTimeout(() => {
              this.tipsText = "";
              clearTimeout(t);
            }, 500);
            const userquery = this.$Bmob.Query("_User");
            userquery.get(this.user.objectId).then(r => {
              this.user = r;
              localStorage.setItem("memberInfo", JSON.stringify(r));
              this.$store.dispatch("getMember", r);
            });
          })
          .catch(error => {
            if (
              error
                .toString()
                .indexOf("Cannot convert undefined or null to object") !== -1
            ) {
              this.tipsText = "保存成功";
              this.tipsType = "success";
              let t = setTimeout(() => {
                this.tipsText = "";
                clearTimeout(t);
              }, 500);
              const userquery = this.$Bmob.Query("_User");
              userquery.get(this.user.objectId).then(r => {
                this.user = r;
                localStorage.setItem("memberInfo", JSON.stringify(r));
                this.$store.dispatch("getMember", r);
              });
            }
          });
      });
    },
    clear() {}
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  padding-top: 50px;
  padding-bottom: 50px;
  .max-width {
    display: flex;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    .user-left {
      width: 200px;
      box-sizing: border-box;
      .the-menu {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        border-left: 10px solid #f0f2f4;
        background-color: #f0f2f4;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          border-left: 10px solid #f4c51d;
        }
        &.active {
          background-color: #f9fafb;
          border-left: 10px solid #f4c51d;
        }
      }
    }
    .user-right {
      flex: 1;
      padding: 40px 20px;
      background-color: #fff;
      box-sizing: border-box;
      .form {
        display: flex;
        .form-left {
          padding-left: 65px;
          padding-right: 90px;
          box-sizing: border-box;
          .form-group {
            margin-bottom: 50px;
            .form-title {
              font-size: 20px;
              font-weight: bold;
              line-height: 28px;
            }
            .form-desc {
              margin-top: 10px;
              margin-bottom: 20px;
              font-size: 14px;
              color: #888888;
              line-height: 20px;
            }
            .form-input {
              width: 194px;
              height: 50px;
              border: 1px solid #dcdcdc;
              border-radius: 4px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
            }
            .form-btn {
              margin-right: 20px;
              width: 97px;
              height: 36px;
              border: 1px solid #f4c51d;
              border-radius: 2px;
              font-size: 14px;
              background-color: #fff;
              cursor: pointer;
              &.disabled {
                border: 1px solid #d9d9d9;
                color: #d9d9d9;
              }
            }
          }
        }
        .form-right {
          width: 190px;
          .img {
            width: 190px;
            height: 190px;
            border-radius: 50%;
            background-size: contain;
          }
        }
      }

      .title {
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        line-height: 28px;
      }
      .form-g {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #f5f5f5;
        .form-t {
          padding-left: 65px;
          padding-right: 70px;
          font-size: 16px;
          color: #888;
        }
        .form-i {
          flex: 1;
          .the-radio {
            display: inline-block;
            vertical-align: middle;
            margin-right: 34px;
            cursor: pointer;
            label {
              display: flex;
              align-items: center;
              span {
                margin-left: 14px;
                font-size: 16px;
                color: #333333;
                line-height: 20px;
              }
            }
            input[type="radio"] + label::before {
              display: block;
              content: ""; /*不换行空格*/
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 1px solid #979797;
              box-sizing: border-box;
            }
            input[type="radio"] {
              position: absolute;
              clip: rect(0, 0, 0, 0);
            }
            input[type="radio"]:checked + label::before {
              background-color: #f4c51d;
              border-color: #f4c51d;
            }
          }
          .birthday {
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
          }
          input {
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            font-size: 16px;
            color: #888;
            font-weight: bold;
            outline: none;
          }

          .form-btn {
            margin-right: 20px;
            width: 97px;
            height: 36px;
            border: 1px solid #f4c51d;
            border-radius: 2px;
            font-size: 14px;
            background-color: #fff;
            outline: none;
            cursor: pointer;
            &:first-child {
              margin-left: 65px;
            }
            &.disabled {
              border: 1px solid #d9d9d9;
              color: #d9d9d9;
            }
          }
        }
      }
    }
  }
}
</style>
