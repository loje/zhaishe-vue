<template>
  <div>
    <div class="user-title">
      <span>私单墙</span>

      <div class="btn" @click="showPostPrivate">发布私单</div>
    </div>


    <div class="private-list">
      <template v-for="(item, $index) in userPrivateList">
        <div class="the-private" :key="$index">
          <div class="private-top">
            <div class="item">
              <div class="t">项目类别</div>
              <div class="v">{{item.sort}}</div>
            </div>
            <div class="item">
              <div class="t">联系人</div>
              <div class="v">{{item.name}}</div>
            </div>
            <div class="item">
              <div class="t">联系方式</div>
              <div class="v">
                <div>电话：{{item.phone || '暂无'}}</div>
                <div>微信：{{item.wechatId || '暂无'}}</div>
              </div>
            </div>

            <div class="item">
              <div class="t">发布时间</div>
              <div class="v">
                <template v-if="item.isNewst">
                  <span style="color: #F4751D;">最新发布</span>
                </template>
                <template v-else>{{item.createdAt}}</template>
              </div>
            </div>
          </div>
          <div class="private-bottom">
            <div class="private-content">
              <div class="t">项目介绍</div>
              <div class="content">{{item.remark}}</div>
            </div>
            <div class="private-btn">
              <!-- <template v-if="item.audit === false">
                <span>审核中</span>
              </template>
              <template v-else>
                <span @click="editPrivate(item)">修改</span>
                <span @click="del(item)">删除</span>
              </template>-->
              <template v-if="item.audit === true">
                <span @click="online(item)">
                  <template v-if="item.online === true">下线</template>
                  <template v-else>上线</template>
                </span>
              </template>
              <template v-else>
                <span style="color:#ccc;">审核中</span>
              </template>
              <span @click="editPrivate(item)">修改</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- <transition name="fade">
      <div class="dialog-layer" v-if="dialogPrivateShow">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:370px">
            <span class="close" @click="dialogPrivateShow = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="dialog-title">发布私单墙</div>
            <div class="dialog-content">
              <div class="input-group">
                <span>标题</span>
                <input type="text" v-model="privateDialog.title" placeholder="收集的灵感包类型" />
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
    </transition>-->

    <transition name="fade">
      <div class="dialog-layer" v-if="dialogPrivateShow">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:370px">
            <span class="close" @click="dialogPrivateShow = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="dialog-title">填写您的需求</div>
            <div class="dialog-content">
              <div class="input-group">
                <span>称呼</span>
                <input type="text" v-model="privatePostDialog.name" placeholder="您的姓名" />
              </div>
              <div class="input-group">
                <span>电话</span>
                <input
                  type="text"
                  v-model="privatePostDialog.phone"
                  placeholder="您的联系电话"
                  maxlength="11"
                />
              </div>
              <div class="input-group">
                <span>微信</span>
                <input type="text" v-model="privatePostDialog.wechatId" />
              </div>
              <div
                class="input-group"
                style="z-index: 1;"
                @mouseenter="selectHover('private')"
                @mouseleave="privatePostDialog.selectShow = false"
              >
                <span>类别</span>
                <input type="text" v-model="privatePostDialog.sort" />
                <transition name="fade">
                  +
                  <div class="select-layer" v-if="privatePostDialog.selectShow">
                    <div class="option-list">
                      <div
                        class="option"
                        v-for="(item, $index) in privateSortList"
                        :key="$index"
                        @click="selectSort('private', item)"
                      >{{item.name}}</div>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="input-group">
                <span>需求</span>
                <textarea
                  v-model="privatePostDialog.remark"
                  rows="4"
                  maxlength="50"
                  placeholder="50字内的需求描述"
                ></textarea>
              </div>
              <div class="error" v-if="privatePostDialog.error">{{privatePostDialog.error}}</div>
            </div>
            <div class="btn" @click="comfilmPrivate">提交</div>
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
      userPrivateList: [],
      dialogPrivateShow: false,
      privateList: [],
			showPrivate: false,
			privateLoading: false,
			privateDialog: {},
			privateSortList: [
        {
          id: 1,
          name: 'UI界面设计'
        },{
          id: 2,
          name: '交互设计'
        },{
          id: 3,
          name: '平面设计'
        },{
          id: 4,
          name: 'VI/Logo设计'
        },{
          id: 5,
          name: '网页设计'
        },{
          id: 6,
          name: '包装设计'
        },{
          id: 7,
          name: '插画'
        },{
          id: 8,
          name: 'H5页面设计'
        },{
          id: 9,
          name: '产品设计'
        },{
          id: 10,
          name: '动画'
        },
        // {
        //   id: 11,
        //   name: '输入'
        // },
      ],
      privatePostDialog: {
        sort: '',
        selectShow: false,
        error: ''
      },
    };
  },
  mounted() {
    this.getUserPrivate();
  },
  methods: {
    getUserPrivate() {
      const query = this.$Bmob.Query("private_orders");
      query.equalTo("user", "==", this.$store.state.user.objectId);
      query.order("-updatedAt");
      query.equalTo("notDelete", "==", true);
      // query.equalTo("audit", "==", true);
      // query.equalTo("online", "==", true);
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
        // case "download":
        //   console.log("selectHover", this.downDialog.selectShow);
        //   this.downDialog.selectShow = true;
        //   break;
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
        // case "download":
        //   this.downDialog.type = item.value;
        //   this.downDialog.selectShow = false;
        //   break;
        default:
          break;
      }
    },

    del(item) {
      const query = this.$Bmob.Query("private_orders");
      query.get(item.objectId).then(privateOrder => {
        privateOrder.set("notDelete", false);
        privateOrder.save().then(() => {
          this.getUserPrivate();
        });
      });
		},
		
    comfilmPrivate() {
      if (!this.privatePostDialog.name) {
        this.privatePostDialog.error = '请输入称呼';
        return false;
      }
      // if (!this.privatePostDialog.phone) {
      //   this.privatePostDialog.error = '请输入手机号码';
      //   return false;
      // }

      if (this.privatePostDialog.phone.length > 0 && this.privatePostDialog.phone.length < 11) {
        this.privatePostDialog.error = '请输入11位的手机号码';
        return false;
      }

      if (!this.privatePostDialog.wechatId) {
        this.privatePostDialog.error = '请输入微信号';
        return false;
      }

      if (!this.privatePostDialog.sort) {
        this.privatePostDialog.error = '请选择类型';
        return false;
      }

      if (!this.privatePostDialog.remark) {
        this.privatePostDialog.error = '请输入需求描述';
        return false;
      }

      this.privatePostDialog.error = '';

      const query = this.$Bmob.Query('private_orders');
      if(this.privatePostDialog.id) {
        query.set('id', this.privatePostDialog.id);
      }

      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      query.set('name', this.privatePostDialog.name || '');
      query.set('phone', this.privatePostDialog.phone || '');
      query.set('wechatId', this.privatePostDialog.wechatId || '');
      query.set('sort', this.privatePostDialog.sort || '');
      query.set('remark', this.privatePostDialog.remark || '');
      query.set('audit', false);

      query.save().then(() => {
        this.dialogPrivateShow = false;
        this.privatePostDialog = {
          selectShow: false,
          name: '',
          phone: '',
          wechatId: '',
          sort: '',
          remark: '',
          error: '',
        };

        this.getUserPrivate();
      });
    },

    showPostPrivate() {
      this.dialogPrivateShow = true;
      this.privatePostDialog = {
        selectShow: false,
        name: "",
        phone: "",
        wechatId: "",
        remark: "",
        error: ""
      };
    },
    editPrivate(item) {
      this.dialogPrivateShow = true;
      this.privatePostDialog = {
        selectShow: false,
        id: item.objectId,
        name: item.name,
        phone: item.phone,
        wechatId: item.wechatId,
        sort: item.sort,
        remark: item.remark,
        error: ""
      };
    },
    online(item) {
      const query = this.$Bmob.Query("private_orders");
      query.get(item.objectId).then(privateOrder => {
        privateOrder.set("online", item.online === false ? true : false);
        privateOrder.save().then(() => {
          // this.pagePrivate = 1;
          // this.getPrivateCount();
          this.getUserPrivate();
        });
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
// .item-list {
//   .the-item {
//     margin-bottom: 20px;
//     padding: 25px 20px;
//     background-color: #fff;
//     font-size: 14px;
//     box-sizing: border-box;
//     table {
//       width: 100%;
//       border-spacing: 0;
//       border-collapse:collapse;
//       thead tr td {
//         border-bottom: 1px solid #f5f5f5;
//         color: #888888;
//       }
//     }
//   }
// }
.the-private {
  margin-bottom: 20px;
  padding: 30px;
  background-color: #fff;
  box-sizing: border-box;
  .private-top {
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid #f5f5f5;
    .item {
      width: 25%;
      .t {
        font-size: 14px;
        color: #888888;
        line-height: 20px;
      }
      .v {
        margin-top: 10px;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .private-bottom {
    display: flex;
    align-items: flex-end;
    .private-content {
      flex: 1;
      padding-top: 15px;
      .t {
        margin-bottom: 14px;
        font-size: 14px;
        color: #888888;
        line-height: 20px;
      }
      .content {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        word-break: break-all;
      }
    }
    .private-btn {
      text-align: right;
      width: 150px;
      font-size: 14px;
      span {
        margin-left: 15px;
        color: #4a90e2;
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