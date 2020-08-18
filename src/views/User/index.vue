<template>
  <div class="user-page">
    <div class="max-width">
      <div class="user-left">
        <div class="user-side">
          <div class="user-head">
            <div class="img" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
            <div class="name">{{$store.state.user.nickname}}</div>
            <div class="btn" @click="goInfo">编辑资料</div>
          </div>

          <div class="side-list">
            <div
              :class="$route.params.tag === item.tag ? 'side active': 'side'"
              v-for="(item, $index) in tagList"
              :key="$index"
              @click="toTag(item.tag)"
            >
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-right">
        <template v-if="$route.params.tag === 'product'">
					<tool></tool>
        </template>
        <template v-if="$route.params.tag === 'private'">
          <privatePage></privatePage>
        </template>
        <template v-if="$route.params.tag === 'download'">
					<download></download>
				</template>
        <template v-if="$route.params.tag === 'activity'">
					<activity></activity>
        </template>
        <template v-if="$route.params.tag === 'record'">
					<record></record>
        </template>
      </div>
    </div>

    <!-- <transition name="fade">
      <div class="dialog-layer" v-if="dialogDownloadShow">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:370px">
            <span class="close" @click="dialogDownloadShow = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="dialog-title">填写您的灵感地址</div>
            <div class="dialog-content">
              <div class="input-group">
                <span>标题</span>
                <input type="text" v-model="downDialog.title" placeholder="收集的灵感包类型" />
              </div>

              <div
                class="input-group"
                style="z-index: 1;"
                @mouseenter="selectHover('download')"
                @mouseleave="downDialog.selectShow = false"
              >
                <span>类别</span>
                <input
                  type="text"
                  v-model="downloadTabs[downDialog.type ? downDialog.type : 0].label"
                  disabled="true"
                />
                <transition name="fade">
                  +
                  <div class="select-layer" v-if="downDialog.selectShow">
                    <div class="option-list">
                      <div
                        class="option"
                        v-for="(item, $index) in downloadTabs"
                        :key="$index"
                        @click="selectSort('download', item)"
                      >{{item.label}}</div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="input-group">
                <span>百度网盘</span>
                <input type="text" v-model="downDialog.link" placeholder="百度网盘链接" />
              </div>
              <div class="input-group">
                <span>下载密码</span>
                <input type="text" v-model="downDialog.code" />
              </div>

              <div class="error" v-if="downDialog.error">{{downDialog.error}}</div>
            </div>
            <div class="btn" @click="comfilmDownload">提交</div>
          </div>
        </div>
      </div>
    </transition> -->

    <tips :tips="tipsText" :tipsType="tipsType"></tips>

    <!-- <downloadDialog
      :showDownload="showDownload"
      :dialog="dialog"
      @hide-download="showDownload = false"
      @open-link="openLink"
    ></downloadDialog> -->
  </div>
</template>

<script>
import tips from "@/components/Tips";
import tool from "@/views/User/childPage/tool";
import download from "@/views/User/childPage/download";

import activity from "@/views/User/childPage/activity";
import privatePage from "@/views/User/childPage/private";

import record from "@/views/User/childPage/record";

// import downloadDialog from "@/components/DownloadDialog";

export default {
  components: {
		tips,
		tool,
		download,
		activity,
    privatePage,
		record,
    // downloadDialog
  },
  data() {
    return {
      tagList: [
        {
          tag: "product",
          title: "我的工具"
        },
        {
          tag: "download",
          title: "灵感库"
        },
        {
          tag: "activity",
          title: "参与活动"
        },
        {
          tag: "private",
          title: "私单墙"
        },

        {
          tag: "record",
          title: "我的记录"
        }
      ],

      tipsText: "",
      tipsType: "error",

      // downloadList: [],
      // userDownloadList: [],
      // dialogDownloadShow: false,
      // downDialog: {
      //   type: "",
      //   selectShow: false,
      //   error: ""
      // },

      // showDownload: false,
      // downloadTabs: [
      //   {
      //     label: "全部",
      //     value: ""
      //   },
      //   {
      //     label: "banner",
      //     value: 1
      //   },
      //   {
      //     label: "H5",
      //     value: 2
      //   },
      //   {
      //     label: "Web",
      //     value: 3
      //   },
      //   {
      //     label: "App",
      //     value: 4
      //   },
      //   {
      //     label: "Logo",
      //     value: 5
      //   },
      //   {
      //     label: "其他",
      //     value: 6
      //   }
      // ],
      dialog: {},

      userTab: 1,
      userEdit: false,
      user: {},
    };
  },
  mounted() {
    if (this.$route.params.tag === "private") {
      this.pagePrivate = 1;
      this.getPrivateCount();
    }

    // if (this.$route.params.tag === "download") {
    //   this.getDownload();
    // }

    if (this.$route.params.tag === "index") {
      this.getUserInfo();
    }

    if (localStorage.getItem("memberInfo")) {
      // this.getUserDownload();
    } else {
      location.href = "/";
    }
  },
  watch: {
    $route() {

      // if (this.$route.params.tag === "download") {
      //   this.getDownload();
      // }

      if (this.$route.params.tag === "index") {
        this.getUserInfo();
      }
    }
  },
  methods: {
    goInfo() {
      this.$router.push("/userinfo");
    },

    toTag(item) {
      this.$router.push({
        path: `/user/${item}`,
        query: {
          code: this.$route.query.code
        }
      });
    },

    // showDownloadDialog() {
    //   this.dialogDownloadShow = true;
    //   this.downloadDialog = {
    //     title: "",
    //     link: "",
    //     code: "",
    //     error: ""
    //   };
    // },
    // getDownload() {
    //   var query = this.$Bmob.Query("download");
    //   this.designerLoading = true;
    //   query.order("-updatedAt");
    //   query.equalTo("notDelete", "===", true);
    //   query.find().then(res => {
    //     this.downloadList = res;
    //   });
    // },
    // getUserDownload() {
    //   var query = this.$Bmob.Query("download");
    //   query.equalTo("user", "==", this.$store.state.user.objectId);
    //   query.order("-updatedAt");
    //   query.find().then(res => {
    //     this.userDownloadList = res;
    //   });
    // },
    // comfilmDownload() {
    //   if (!this.downDialog.title) {
    //     this.downDialog.error = "请输入标题";
    //     return false;
    //   }
    //   if (!this.downDialog.link) {
    //     this.downDialog.error = "请输入百度云链接";
    //     return false;
    //   }
    //   if (!this.downDialog.code) {
    //     this.downDialog.error = "请输入百度云密码";
    //     return false;
    //   }

    //   this.downDialog.error = "";

    //   const query = this.$Bmob.Query("download");

    //   if (this.downDialog.objectId) {
    //     query.set("id", this.downDialog.objectId);
    //   }

    //   if (localStorage.getItem("memberInfo")) {
    //     const userPointer = this.$Bmob.Pointer("_User");
    //     const userID = userPointer.set(this.$store.state.user.objectId);
    //     query.set("user", userID);
    //   }
    //   if (this.downDialog.title) {
    //     query.set("title", this.downDialog.title);
    //   }
    //   if (this.downDialog.type) {
    //     query.set("type", this.downDialog.type);
    //   }
    //   if (this.downDialog.link) {
    //     query.set("link", this.downDialog.link);
    //   }
    //   if (this.downDialog.code) {
    //     query.set("code", this.downDialog.code);
    //   }
    //   query.set("author", this.$store.state.user.name);
    //   query.set("notDelete", false);
    //   query.save().then(() => {
    //     this.dialogDownloadShow = false;
    //     this.downloadDialog = {
    //       title: "",
    //       link: "",
    //       code: "",
    //       error: ""
    //     };
    //     this.getDownload();
    //     this.getUserDownload();
    //   });
    // },

    getPrivateCount() {
      var query = this.$Bmob.Query("private_orders");
      query.equalTo("notDelete", "==", true);
      query.equalTo("audit", "==", true);
      query.count().then(total => {
        this.privateTotal = total;
        this.privatePages = parseInt(total / this.privateLimit);
        if (total % this.privateLimit > 0) {
          this.privatePages = this.privatePages + 1;
        }
        this.getPrivateList(this.pagePrivate);
      });
    },
    getPrivateList(page) {
      if (page) {
        if (page > this.privatePages) {
          this.pagePrivate = this.PrivatePages;
        } else if (page < 0) {
          this.pagePrivate = 1;
        } else {
          this.pagePrivate = page;
        }
      } else {
        this.pagePrivate = 1;
      }

      const query = this.$Bmob.Query("private_orders");
      this.skipPrivate = this.privateLimit * (this.pagePrivate - 1);

      query.order("-updatedAt");
      query.skip(this.skipPrivate);
      query.limit(14);
      query.equalTo("notDelete", "==", true);
      query.equalTo("audit", "==", true);
      query.equalTo("online", "==", true);

      query
        .find()
        .then(res => {
          for (let i = 0; i < res.length; i += 1) {
            let day = parseInt(
              (new Date().getTime() - new Date(res[i].createdAt).getTime()) /
                86400000
            );
            if (day > 1) {
              res[i].createdAt = `${day}天前发布`;
            } else {
              res[i].createdAt = `新任务`;
              res[i].isNewst = true;
            }
          }
          this.privateList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserPrivate() {
      const query = this.$Bmob.Query("private_orders");
      query.equalTo("user", "==", this.$store.state.user.objectId);
      query.order("-updatedAt");
      query.equalTo("notDelete", "==", true);
      query
        .find()
        .then(res => {
          this.userPrivateList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    selectHover(type) {
      switch (type) {
        case "private":
          this.privatePostDialog.selectShow = true;
          break;
        case "download":
          console.log("selectHover", this.downDialog.selectShow);
          this.downDialog.selectShow = true;
          break;
        default:
          break;
      }
    },
    selectSort(type, item) {
      switch (type) {
        case "private":
          this.privatePostDialog.sort = item.name;
          this.privatePostDialog.selectShow = false;
          break;
        case "download":
          this.downDialog.type = item.value;
          this.downDialog.selectShow = false;
          break;
        default:
          break;
      }
    },

    online(item) {
      const query = this.$Bmob.Query("private_orders");
      query.get(item.objectId).then(privateOrder => {
        privateOrder.set("online", item.online === false ? true : false);
        privateOrder.save().then(() => {
          this.pagePrivate = 1;
          this.getPrivateCount();
          this.getUserPrivate();
        });
      });
    },
    // downloadOnline(item) {
    //   const query = this.$Bmob.Query("download");
    //   query.get(item.objectId).then(download => {
    //     download.set(
    //       "notDelete",
    //       item.notDelete === false || !item.notDelete ? true : false
    //     );
    //     download.save().then(() => {
    //       this.getDownload();
    //       this.getUserDownload();
    //     });
    //   });
    // },
    // editDownload(item) {
    //   this.dialogDownloadShow = true;
    //   this.downDialog = {
    //     ...item,
    //     selectShow: false,
    //     error: ""
    //   };
    // },

    // dialogShow(item) {
    //   this.dialog = item;
    //   this.showDownload = true;
    // },
    // openLink() {
    //   const query = this.$Bmob.Query("download");
    //   query
    //     .get(this.dialog.objectId)
    //     .then(res => {
    //       res.set("downloads", Number(res.downloads) + 1);
    //       res.save().then(() => {
    //         window.open(this.dialog.link);
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    goTab(tab) {
      this.userTab = tab;
      if (tab === 2) {
        this.getOrderList();
      } else if (tab === 1) {
        this.getUserInfo();
      }
    },

    getUserInfo() {
      const userquery = this.$Bmob.Query("_User");
      userquery.get(this.$store.state.user.objectId).then(user => {
        this.user = user;
      });
    },
    editUserInfo() {
      this.userEdit = true;
    },
    updateUserInfo() {
      // 邮箱验证正则
      // eslint-disable-next-line no-useless-escape
      const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.user.email)) {
        this.dialogError = "邮箱格式不正确";
        return false;
      }
      const userquery = this.$Bmob.Query("_User");
      userquery.get(this.$store.state.user.objectId).then(user => {
        user.set("nickname", this.user.nickname ? this.user.nickname : "");
        user.set("sex", this.user.sex ? this.user.sex : 0);
        user.set("email", this.user.email ? this.user.email : "");
        user.set("address", this.user.address ? this.user.address : "");
        user.set(
          "professional",
          this.user.professional ? this.user.professional : ""
        );
        user.set("qq", this.user.qq ? this.user.qq : "");
        user.set("wechatId", this.user.wechatId ? this.user.wechatId : "");
        user
          .save()
          .then(() => {
            this.userEdit = false;
          })
          .catch(err => {
            if (
              err
                .toString()
                .indexOf("Cannot convert undefined or null to object") !== -1
            ) {
              this.userEdit = false;
            }
            if (
              err.code === 203 &&
              err.error.indexOf("email") !== -1 &&
              err.error.indexOf("already taken.") !== -1
            ) {
              alert("该邮箱已经被绑定，请换其他邮箱");
            }
          });
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  padding-top: 40px;
  padding-bottom: 50px;
  .max-width {
    display: flex;
    .user-left {
      padding-right: 50px;
      width: 310px;
      box-sizing: border-box;
      .user-side {
        .user-head {
          margin: auto;
          margin-bottom: 20px;
          padding: 30px 0;
          background-color: #fff;
          text-align: center;
          .img {
            margin: auto;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-size: cover;
          }
          .name {
            margin-bottom: 30px;
            margin-top: 10px;
            font-size: 14px;
            color: #242424;
            line-height: 20px;
          }
          .btn {
            display: inline-block;
            padding: 0 15px;
            color: #bfc4cd;
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            border: 1px solid #bfc4cd;
            cursor: pointer;
            &:hover {
              color: #f4c51d;
              border: 1px solid #f4c51d;
            }
          }
        }

        .side-list {
          width: 100%;
          background-color: #fff;
          .side {
            padding: 0 20px;
            height: 90px;
            line-height: 90px;
            text-align: center;
            box-sizing: border-box;
            transition: background-color 0.25s;
            cursor: pointer;
            span {
              display: block;
              font-size: 14px;
              color: #666666;
              line-height: 90px;
              transition: color 0.25s;
              border-bottom: 1px solid #f5f5f5;
            }
            &:hover,
            &.active {
              background-color: #f4c51d;
              span {
                color: #fff;
              }
            }
          }
        }
      }
    }
    .user-right {
      flex: 1;

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