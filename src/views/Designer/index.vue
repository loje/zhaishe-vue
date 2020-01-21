<template>
  <div class="designer-page max-width">
    <div class="page-title">宅设分享人</div>
    <div class="page-desc">什么是宅设分享人？宅设分享人是一群从事设计的高阶领导者，奖自己的经验分享给大家，助力迷茫的设计师 找到自己的目标，也同时为打造大咖个人IP积累丰富经验</div>
    <div class="page-btn" @click="showContact = true">加入我们</div>

    <div class="designer-list">
      <div class="the-designer" v-for="(item, $index) in designerList" :key="$index">
        <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div class="title">
            {{item.info}}
          </div>
          <div class="btn">个人链接</div>
          <div class="get" @click="orderIt(item)">找他接单</div>
        </div>
      </div>
    </div>

    <div class="pages">
      <div class="prev" @click="getDesignerList(pageDesigner - 1)">上一页</div>
      <div class="page-list">
        <div :class="pageDesigner === item ? 'page active' : 'page'" v-for="item in designerPages" :key="item" @click="getDesignerList(item)">{{item > 3 ? '···' : item}}</div>
      </div>
      <div class="next" @click="getDesignerList(pageDesigner + 1)">下一页</div>
    </div>

    <transition name="fade">
    <div class="dialog-layer" v-if="showContact">
      <div class="dialog-flex">
        <div class="dialog-block">
          <span class="close" @click="showContact = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="title">加入宅设分享人</div>
          <div class="input-group">
            <span>称呼：</span>
            <input type="text" placeholder="您的称呼" />
          </div>
          <div class="input-group">
            <span>您的联系方式：</span>
            <input type="text" placeholder="留下您电话方便联系" />
          </div>
          <div class="input-group">
            <span>个人链接：</span>
            <input type="text" placeholder="http://或https://开头" />
          </div>
          <div class="input-group">
            <span>分享主题：</span>
            <input type="text" placeholder="填写您的分享主题" />
          </div>

          <div class="error">1423435</div>

          <div class="btn" @click="closeContact">确定</div>
        </div>
      </div>
    </div>
    </transition>

    <transition name="fade">
      <div class="dialog-layer" v-if="showFeedback">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="close" @click="showFeedback = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="feedback-content">
              <img src="http://files.zdesigner.cn/2020/01/07/833f0a7940b5b202804b20accfb30ab8.png" />
              <div class="title">宅设小编为您服务</div>
              <div class="content">我们运营小组已经收到了您的需求 会及时处理，请耐心等待哦，您也可以加入我们素材收集组</div>
              <div class="content" style="margin-top: 30px;">V：zhishehui01</div>
            </div>
            <div class="btn" @click="showFeedback = false">确定</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="dialog-layer" v-if="showOrder">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="close" @click="showOrder = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="order-designer">
              <img :src="order.src" />
              <div class="name">{{order.name}}</div>
            </div>
              
            <div class="input-group">
              <span>称呼：</span>
              <input type="text" placeholder="您的称呼" />
            </div>
            <div class="input-group">
              <span>您的联系方式：</span>
              <input type="text" placeholder="留下您电话方便联系" />
            </div>
            <div class="input-group" style="height:auto;">
              <textarea placeholder="填写您的需求" rows="8"></textarea>
            </div>
            <div class="btn" @click="closeContact">确定</div>
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
      designerList: [],
      designerTotal: 0, // 总条数
      designerPages: 0, // 总页数
      designerLimit: 10, // 每页条数
      designerLoading: false,
      skipDesigner: 0, // 跳过数量
      pageDesigner: 1, // 当前页数

      showContact: false,
      showFeedback: false,
      showOrder: false,

      order: {},
    }
  },
  mounted() {
    this.getDesCount();
  },
  methods: {
    getDesCount() {
      var query = this.$Bmob.Query('designer');
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.designerTotal = total;
        this.designerPages = parseInt(total / this.designerLimit);
        if (total % this.designerLimit > 0) {
          this.designerPages = this.designerPages + 1;
        }
        this.getDesignerList(1);
      });
    },
    getDesignerList(page) {
      if (page) {
        if (page > this.designerPages) {
          this.pageDesigner = this.designerPages;
        } else if (page < 0) {
          this.pageDesigner = 1;
        } else {
          this.pageDesigner = page;
        }
      } else {
        this.pageDesigner = 1
      }
      var query = this.$Bmob.Query('designer');
      this.skipDesigner = this.designerLimit * (this.pageDesigner - 1);

      query.equalTo('notDelete', '===', true);
      query.skip(this.skipDesigner);
      query.limit(this.designerLimit);
      let arr = [];
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            src: res[i].img,
            name: res[i].name,
            info: res[i].info,
          });
        }
        this.designerList = arr;
      });
    },

    closeContact() {
      this.showOrder = false;
      this.showContact = false;
      this.showFeedback = true;
    },

    orderIt(item) {
      this.showOrder = true;
      this.order = item;
    },
  },
};
</script>

<style lang="scss" scoped>
  .designer-page {
    .page-title {
      padding-top: 50px;
      font-size: 24px;
      line-height: 33px;
      font-weight: bold;
      text-align: center;
    }
    .page-desc {
      margin: auto;
      padding-top: 15px;
      padding-bottom: 20px;
      max-width: 670px;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #919191;
    }
    .page-btn {
      margin: auto;
      width: 140px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      background-color: #F4C51D;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
    }
    .designer-list {
      display: flex;
      padding-top: 50px;
      flex-wrap: wrap;
      .the-designer {
        position: relative;
        margin-bottom: 41px;
        margin-right: 40px;
        width: 180px;
        height: 340px;
        border-radius: 2px;
        border: 1px solid #D8D8D8;
        box-sizing: border-box;
        overflow: hidden;
        // &:nth-child(2n+5) {
        //   margin-right: 0;
        // }
        .img {
          position: relative;
          width: 100%;
          height: 230px;
          background-position: 50%;
          background-size: cover;
          z-index: 0;
        }
        .info {
          position: absolute;
          left: 0;
          bottom: -150px;
          padding: 25px 15px 15px 15px;
          width: 100%;
          height: 260px;
          background-color: #fff;
          box-sizing: border-box;
          transition: all ease-in-out 0.25s;
          &:hover {
            bottom: 0px;
          }
          .name {
            font-size: 16px;
            line-height: 20px;
            font-family: PingFang SC Regular;
            color: #383838;
          }
          .title {
            margin-top: 20px;
            color: #888;
            font-size: 12px;
            line-height: 17px;
            span {
              margin-top: 3px;
              display: block;
              &:first-child {
                margin-top: 0;
              }
            }
          }
          .btn {
            display: block;
            margin-top: 40px;
            width: 66px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #333;
            font-size: 12px;
            text-align: center;
            border-radius: 2px;
            background-color: #F4C51D;
            cursor: pointer;
          }
          .get {
            margin-top: 50px;
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: bold;
            color: rgba(51,51,51,1);
            line-height: 22px;
            cursor: pointer;
          }
        }
      }
    }

    .pages {
      position: relative;
      margin-bottom: 20px;
      padding-right:45px;
      width: 100%;
      height: 50px;
      border-top: 1px solid #F2F2F2;
      text-align: right;
      box-sizing: border-box;
      .prev, .next, .last {
        display: inline-block;
        vertical-align: middle;
        line-height: 50px;
        color: #888;
        font-size: 12px;
      }
      .last {
        margin-left: 25px;
      }
      cursor: pointer;
      .page-list {
        display: inline-flex;
        margin: 0 15px;
        line-height: 50px;
        vertical-align: middle;
        .page {
          width: 34px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          font-weight: bold;
          color: #000;
          text-align: center;
          cursor: pointer;
          &:hover, &.active {
            color: #fff;
            background-color: #F4C51D;
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
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    .dialog-flex {
      flex: 1;
      .dialog-block {
        position: relative;
        display: block;
        margin: auto;
        padding: 25px 30px 35px 30px;
        width: 340px;
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
        .title {
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 22px;
          color: #333;
          text-align: center;
          font-weight: bold;
        }
        .input-group {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          width: 100%;
          height: 36px;
          line-height: 36px;
          border: 1px solid #979797;
          border-radius: 2px;
          box-sizing: border-box;
          span {
            display: block;
            padding-left: 10px;
            width: 90px;
            font-size: 12px;
            color: #888;
          }
          input {
            flex: 1;
            border: none;
            outline: none;
            padding: 0;
            font-size: 12px;
          }
          textarea {
            flex: 1;
            border: none;
            outline: none;
            padding: 10px;
            font-size: 12px;
            resize: none;
          }
        }

        .error {
          margin-bottom: 30px;
          font-size: 12px;
          height: 17px;
          color: #E55D5D;
        }

        .btn {
          margin: auto;
          margin-top: 45px;
          width: 100px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          background-color: #F4C51D;
          color: #000;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
        }


        // 反馈
        .feedback-content {
          img {
            display: block;
            margin: auto;
            width: 118px;
          }
          .title {
            margin-top: 36px;
            text-align: center;
            font-size: 16px;
            line-height: 22px;
            color: #333;
          }
          .content {
            padding: 0 15%;
            font-size: 12px;
            line-height: 17px;
            color: #333;
            text-align: center;
            box-sizing: border-box;
          }
        }

        // 找他接单
        .order-designer {
          padding-bottom: 40px;
          img {
            display: block;
            margin: auto;
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
          .name {
            margin-top: 10px;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #333;
          }
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
</style>
