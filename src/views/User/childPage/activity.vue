<template>
  <div>
    <div class="user-title">
      <span>我参与的活动</span>

      <div class="btn" @click="showActivity">推荐活动</div>
    </div>

    <div class="activity-layer">
      <template v-for="(item, $index) in userActList">
        <div class="the-activity" :key="$index">
          <div class="activity-left">
            <div class="img" :style="{backgroundImage: `url(${item.activity.imgSrc})`}"></div>
          </div>
          <div class="activity-right">
            <div class="desc">{{item.activity.desc}}</div>
            <div class="like">
              <i class="iconfont">&#xe602;</i> 1020
            </div>
          </div>
        </div>
      </template>
    </div>

    <transition name="fade">
      <div class="dialog-layer" v-if="dialogActivityShow">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:370px">
            <span class="close" @click="dialogActivityShow = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="dialog-title">填写您的活动内容</div>
            <div class="dialog-content">
              <div class="input-group">
                <span>标题</span>
                <input type="text" v-model="activityDialog.title" placeholder="活动标题" />
              </div>

              <div class="input-group">
                <span>电话</span>
                <input type="text" v-model="activityDialog.phone" placeholder="联系电话" maxlength="11" />
              </div>

              <div class="error" v-if="activityDialog.error">{{activityDialog.error}}</div>
            </div>
            <div class="btn" @click="comfilmActivity">提交</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userActList: [],
      dialogActivityShow: false,
      activityDialog: {
        title: "",
        phone: "",
        error: ""
      }
    };
  },
  mounted() {
    if (localStorage.getItem("memberInfo")) {
      this.getUserAct();
    }
  },
  methods: {
    showActivity() {
      this.dialogActivityShow = true;
      this.activityDialog = {
        title: "",
        phone: "",
        error: ""
      };
    },

    getUserAct() {
      const query = this.$Bmob.Query("activity_person");
      query.equalTo("user", "==", this.$store.state.user.objectId);
      //下面参数为Pointer字段名称， 可以一次查询多个表
      query.include("activity", "activity");
      query
        .find()
        .then(res => {
          this.userActList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toActivityDetail(id) {
      location.href = `/activity/item/${id}`;
    },
    comfilmActivity() {
      if (!this.activityDialog.title) {
        this.activityDialog.error = "请输入活动标题";
        return false;
      }
      if (!this.activityDialog.phone) {
        this.activityDialog.error = "请输入联系方式";
        return false;
      }

      this.activityDialog.error = "";

      const query = this.$Bmob.Query("activity_apply");

      if (localStorage.getItem("memberInfo")) {
        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set("user", userID);
      }
      if (this.activityDialog.title) {
        query.set("title", this.activityDialog.title);
      }
      if (this.activityDialog.phone) {
        query.set("phone", this.activityDialog.phone);
      }
      query.set("notDelete", true);
      query.save().then(() => {
        this.dialogActivityShow = false;
        this.activityDialog = {
          title: "",
          phone: "",
          error: ""
        };
        this.tipsType = "success";
        this.tipsText = "😊发布成功，请静候回复";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-title {
  position: relative;
  margin-bottom: 20px;
  line-height: 44px;
  font-size: 14px;
  color: #666;
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 135px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: #fff;
    text-align: center;
    font-weight: bold;
    color: #f4751d;
    cursor: pointer;
  }
}
.activity-layer {
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  .the-activity {
    display: flex;
    padding: 30px 0;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    .activity-left {
      .img {
        width: 260px;
        height: 160px;
        background-position: 50%;
        background-size: cover;
        border-radius: 2px;
        overflow: hidden;
      }
    }
    .activity-right {
      position: relative;
      flex: 1;
      padding-left: 30px;
      box-sizing: border-box;
      .desc {
        font-size: 14px;
        line-height: 24px;
        color: #888;
      }
      .like {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 66px;
        height: 26px;
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid #f4751d;
        font-size: 10px;
        line-height: 26px;
        text-align: center;
        color: #f4751d;
        cursor: pointer;
        i {
          font-size: 10px;
        }
      }
    }
  }
}

.dialog-layer {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .dialog-flex {
    flex: 1;
    .dialog-block {
      position: relative;
      display: block;
      margin: auto;
      padding: 40px 50px 35px 50px;
      width: 370px;
      background-color: #fff;
      border-radius: 2px;
      box-sizing: border-box;
      .close {
        position: absolute;
        right: 16px;
        top: 12px;
        cursor: pointer;
        z-index: 1;
      }
      .right {
        float: right;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
      }
      .dialog-title {
        margin-bottom: 16px;
        font-size: 16px;
        line-height: 22px;
        color: #333;
      }
      .input-group {
        position: relative;
        display: flex;
        margin-bottom: 20px;
        width: 100%;
        border: 1px solid #979797;
        border-radius: 2px;
        box-sizing: border-box;
        z-index: 0;
        span {
          position: relative;
          display: block;
          padding: 0 10px;
          min-width: 36px;
          font-size: 12px;
          color: #888;
          height: 34px;
          line-height: 34px;
          z-index: 1;
        }
        img {
          width: 135px;
          height: 135px;
        }
        select {
          flex: 1;
          border: none;
          outline: none;
        }
        input,
        .select-value {
          position: relative;
          flex: 1;
          border: none;
          outline: none;
          padding: 0;
          font-size: 12px;
          height: 34px;
          line-height: 34px;
          z-index: 1;
          &:disabled {
            background-color: #fff;
          }
        }
        input {
          z-index: 3;
        }

        .select-layer {
          position: absolute;
          left: 0;
          top: 0;
          padding-top: 36px;
          width: 100%;
          z-index: 2;
          .option-list {
            padding: 14px 0;
            box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
            background-color: #fff;
            .option {
              width: 100%;
              color: #888;
              height: 36px;
              line-height: 36px;
              text-align: center;
              font-size: 12px;
              cursor: pointer;
              &:hover {
                background-color: #f4c51d;
                color: #fff;
              }
            }
          }
        }

        textarea {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 12px;
          resize: none;
          box-sizing: border-box;
        }
      }

      .remark-box {
        margin-bottom: 25px;
        padding: 15px;
        width: 100%;
        height: 90px;
        background-color: #f2f2f2;
        color: #888;
        font-size: 12px;
        box-sizing: border-box;
      }
      .private-user {
        margin-top: 8px;
        font-size: 12px;
        color: #888;
        line-height: 17px;
      }
      .error {
        margin: 10px 0 30px 0;
        font-size: 12px;
        height: 17px;
        color: #e55d5d;
      }
      .btn {
        margin: auto;
        margin-top: 45px;
        width: 100px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #f4c51d;
        color: #000;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
      }
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
</style>