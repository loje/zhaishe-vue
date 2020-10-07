<template>
  <div class="max-width">
    <div class="page-top">
      <div class="title">私单墙</div>
      <div class="btn" @click="showPostPrivate">发布私单</div>
    </div>

    <div class="private-list">
      <template v-for="(item, $index) in list">
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
								<template v-if="userinfo">
								{{item.phone || '暂无'}}
								</template>
								<template v-else>登录验证后查看</template>
							</div>
            </div>
            <div class="item">
              <div class="t">联系方式</div>
              <div class="v">
								<template v-if="userinfo">{{item.wechatId}}</template>
								<template v-else>登录验证后查看</template>
							</div>
            </div>
            <div class="item">
              <div class="t">发布时间</div>
              <div class="v">
								<template v-if="item.isNewst">
									<span style="color: #F4751D;">最新发布</span>
								</template>
								<template v-else>
								{{item.createdAt}}
								</template>
							</div>
            </div>
          </div>
          <div class="private-content">
            <div class="t">项目介绍</div>
            <div class="content">{{item.remark}}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="pages" v-if="list.length > 0 && pages > 1">
      <div class="prev" @click="getlist(1)">首页</div>
      <div class="page-list">
        <div
          :class="current === item ? 'page active' : 'page'"
          v-for="item in pages"
          :key="item"
          @click="getlist(item)"
        >{{item > 3 ? '···' : item}}</div>
      </div>
      <div class="next" @click="getlist(current + 1)">下一页</div>
      <div class="last" @click="getlist(pages)">尾页</div>
    </div>

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
			userinfo: '',
      list: [],

      current: 1,
      total: 0,
      limit: 10,
      pages: 0,

      dialogPrivateShow: false,
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
		this.userinfo = JSON.parse(localStorage.getItem('memberInfo'))
    this.getlist(1);
  },
  methods: {
    getCount() {
      const query = this.$Bmob.Query("private_orders");
      query.equalTo('notDelete', '==', true);
      query.equalTo('online', '==', true);
      query.count().then(count => {
        this.total = count;
        this.pages = parseInt(count / this.limit) + (count % this.limit > 0 ? 1 : 0);
      });
    },
    getlist(page) {
			this.getCount();
			this.current = page
      const query = this.$Bmob.Query("private_orders");
      query.equalTo('notDelete', '==', true);
      query.equalTo('online', '==', true);
			query.order('-updatedAt');
      query.skip(this.limit * (this.current - 1));
      query.limit(this.limit);
      query.find().then(res => {
				for (let i = 0; i < res.length; i += 1) {
          let day = parseInt((new Date().getTime() - new Date(res[i].createdAt).getTime()) / 86400000);
          if (day > 1) {
            res[i].createdAt = `${day}天前发布`;
            res[i].isNewst = false;
          } else {
            res[i].createdAt = `新任务`;
            res[i].isNewst = true;
          }
        }
        this.list = res;
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
    selectHover(type) {
      switch (type) {
        case "private":
          this.privatePostDialog.selectShow = true;
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
        default:
          break;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.page-top {
  position: relative;
  margin-top: 30px;
  margin-bottom: 20px;
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  .btn {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 135px;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #f4751d;
    text-align: center;
    cursor: pointer;
  }
}

.the-private {
  margin-bottom: 20px;
  padding: 35px 30px;
  background-color: #fff;
  box-sizing: border-box;
  .private-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 1px solid #f5f5f5;
    .item {
      text-align: center;
      .t {
        font-size: 14px;
        font-weight: 400;
        color: #888888;
        line-height: 20px;
      }
      .v {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        line-height: 25px;
      }
    }
  }
  .private-content {
    padding-top: 18px;
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
    }
  }
}

.pages {
  position: relative;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-right: 45px;
  width: 100%;
  height: 32px;
  text-align: right;
  box-sizing: border-box;
  .prev,
  .next,
  .last {
    display: inline-block;
    padding: 0 10px;
    vertical-align: middle;
    line-height: 32px;
    color: #333;
    font-size: 14px;
    border-radius: 2px;
    background: #e2e2e2;
    cursor: pointer;
  }
  .last {
    margin-left: 25px;
  }
  .page-list {
    display: inline-flex;
    margin: 0 15px;
    line-height: 32px;
    vertical-align: middle;
    .page {
      margin: 0 5px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #333;
      text-align: center;
      border-radius: 2px;
      background: #e2e2e2;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: #f4c51d;
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
