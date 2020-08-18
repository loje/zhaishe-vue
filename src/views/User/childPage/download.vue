<template>
  <div>
    <div class="user-title">
      <span>我发布的灵感</span>

      <div class="btn" @click="showDownloadDialog">发布</div>
    </div>

    <div class="download-list">
			<template v-for="(item, $index) in userDownloadList">
      <div class="the-download" :key="$index">
				<span class="title">{{item.title}}</span>
				<div class="download-right">
					<span class="status" v-if="item.notDelete === false">审核中</span>
					<span class="status" v-else>下架</span>

					<span class="del" @click="downloadOnline(item)" v-if="item.notDelete === true">删除</span>
				</div>
			</div>
			</template>
    </div>

    <transition name="fade">
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
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloadList: [],
      userDownloadList: [],
      dialogDownloadShow: false,
      downDialog: {
        type: "",
        selectShow: false,
        error: ""
      },

      showDownload: false,
      downloadTabs: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "banner",
          value: 1
        },
        {
          label: "H5",
          value: 2
        },
        {
          label: "Web",
          value: 3
        },
        {
          label: "App",
          value: 4
        },
        {
          label: "Logo",
          value: 5
        },
        {
          label: "其他",
          value: 6
        }
      ]
    };
  },
  mounted() {
    this.getUserDownload();
  },
  methods: {
    showDownloadDialog() {
      this.dialogDownloadShow = true;
      this.downloadDialog = {
        title: "",
        link: "",
        code: "",
        error: ""
      };
    },
    getDownload() {
      var query = this.$Bmob.Query("download");
      this.designerLoading = true;
      query.order("-updatedAt");
      query.equalTo("notDelete", "===", true);
      query.find().then(res => {
        this.downloadList = res;
      });
    },
    getUserDownload() {
      var query = this.$Bmob.Query("download");
      query.equalTo("user", "==", this.$store.state.user.objectId);
      query.order("-updatedAt");
      query.find().then(res => {
        this.userDownloadList = res;
      });
    },
    comfilmDownload() {
      if (!this.downDialog.title) {
        this.downDialog.error = "请输入标题";
        return false;
      }
      if (!this.downDialog.link) {
        this.downDialog.error = "请输入百度云链接";
        return false;
      }
      if (!this.downDialog.code) {
        this.downDialog.error = "请输入百度云密码";
        return false;
      }

      this.downDialog.error = "";

      const query = this.$Bmob.Query("download");

      if (this.downDialog.objectId) {
        query.set("id", this.downDialog.objectId);
      }

      if (localStorage.getItem("memberInfo")) {
        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set("user", userID);
      }
      if (this.downDialog.title) {
        query.set("title", this.downDialog.title);
      }
      if (this.downDialog.type) {
        query.set("type", this.downDialog.type);
      }
      if (this.downDialog.link) {
        query.set("link", this.downDialog.link);
      }
      if (this.downDialog.code) {
        query.set("code", this.downDialog.code);
      }
      query.set("author", this.$store.state.user.name);
      query.set("notDelete", false);
      query.save().then(() => {
        this.dialogDownloadShow = false;
        this.downloadDialog = {
          title: "",
          link: "",
          code: "",
          error: ""
        };
        this.getDownload();
        this.getUserDownload();
      });
    },

    downloadOnline(item) {
      const query = this.$Bmob.Query("download");
      query.get(item.objectId).then(download => {
        download.set(
          "notDelete",
          item.notDelete === false || !item.notDelete ? true : false
        );
        download.save().then(() => {
          this.getDownload();
          this.getUserDownload();
        });
      });
    },
    editDownload(item) {
      this.dialogDownloadShow = true;
      this.downDialog = {
        ...item,
        selectShow: false,
        error: ""
      };
		},
		
		selectHover(type) {
      switch (type) {
        // case "private":
        //   this.privatePostDialog.selectShow = true;
        //   break;
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
        // case "private":
        //   this.privatePostDialog.sort = item.name;
        //   this.privatePostDialog.selectShow = false;
        //   break;
        case "download":
          this.downDialog.type = item.value;
          this.downDialog.selectShow = false;
          break;
        default:
          break;
      }
    },

    // dialogShow(item) {
    //   this.dialog = item;
    //   this.showDownload = true;
    // },
    openLink() {
      const query = this.$Bmob.Query("download");
      query
        .get(this.dialog.objectId)
        .then(res => {
          res.set("downloads", Number(res.downloads) + 1);
          res.save().then(() => {
            window.open(this.dialog.link);
          });
        })
        .catch(err => {
          console.log(err);
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
.download-list {
	display: flex;
	flex-wrap: wrap;
	padding: 30px 0;
	width: 100%;
	background-color: #fff;
	.the-download {
		position: relative;
		margin-bottom: 10px;
		padding: 0 40px;
		width: 50%;
		font-size: 12px;
		font-size: 12px;
		box-sizing: border-box;
		.download-right {
			position: absolute;
			right: 40px;
			top: 0;
			// .status {
			// 	cursor: pointer;
			// }
			.del {
				color: #999;
				margin-left: 15px;
				cursor: pointer;
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
