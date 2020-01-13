<template>
  <div class="max-width">
    <div class="the-layer">
      <div class="layer-left">
        <div class="img" style="background-image: url('http://files.zdesigner.cn/2019/12/28/e7eaec524071ce948069035ac5b91ff7.png');"></div>
        
        <div class="btn">我还没有Eagle</div>
        <div class="btn" @click="showContact = true">联系小编上素材</div>

        <div class="tab-list">
          <div v-for="(item, $index) in tabList" :key="$index" :class="activeTab === item.value ? 'active tab' : 'tab'" @click="toggle(item.value)">{{item.label}}</div>
        </div>
      </div>
      <div class="layer-right">
        <div class="recommend">
          <div class="img"></div>
        </div>

        <div class="download-list">
          <div class="the-download" v-for="(item, $index) in downloadList" :key="$index">
            <div class="download-left">
              <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
            </div>
            <div class="download-mid">
              <div class="title">{{item.title}}</div>
              <div class="info">
                <span>上传人：{{item.author}}</span>
                <span>微信：{{item.wechat}}</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="dialogShow(item)">下载</div>
              <span>{{item.downloads}}</span>
            </div>
          </div>
        </div>

        <div class="pages" v-if="downloadList.length > 0">
          <div class="prev">上一页</div>
          <div class="page-list">
            <div :class="pageDownload === item ? 'page active' : 'page'" v-for="item in downloadPages" :key="item" @click="getDownloadList(item)">{{item > 3 ? '···' : item}}</div>
          </div>
          <div class="next">下一页</div>
          <div class="last">尾页</div>
        </div>
      </div>
    </div>

    <transition name="fade">
    <div class="dialog-layer" v-if="showContact">
      <div class="dialog-flex">
        <div class="dialog-block">
          <span class="close" @click="showContact = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="title">加入灵感分享计划</div>
          <div class="input-group">
            <span>称呼：</span>
            <input type="text" placeholder="您的称呼" />
          </div>
          <div class="input-group">
            <span>电话：</span>
            <input type="text" placeholder="留下您电话方便联系" />
          </div>

          <div class="btn" @click="closeContact">确定</div>
        </div>
      </div>
    </div>
    </transition>

    <downloadDialog :showDownload="showDownload" :dialog="dialog" @hide-download="showDownload = false" @open-link="openLink"></downloadDialog>

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
            <div class="btn" style="width: 160px;" @click="showFeedback = false">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import downloadDialog from './../../components/DownloadDialog';

export default {
  data() {
    return {
      tabList: [
        {
          label: 'banner',
          value: 1,
        },
        {
          label: 'H5',
          value: 2,
        },
        {
          label: 'Web',
          value: 3,
        },
        {
          label: 'App',
          value: 4,
        },
        {
          label: 'Logo',
          value: 5,
        },
        {
          label: '其他',
          value: 6,
        },
      ],
      activeTab: 1,

      downloadList: [],
      downloadTotal: 0, // 总条数
      downloadPages: 2, // 总页数
      downloadLimit: 10, // 每页条数
      downloadLoading: false,
      skipDownload: 0, // 跳过数量
      pageDownload: 1, // 当前页数

      dialog: {},

      showContact: false,
      showDownload: false,

      showFeedback: false,
    }
  },
  components: {
    downloadDialog,
  },
  activated() {
    this.pageDownload = 1;
    this.getDownloadCount();
  },
  methods: {
    toggle(i) {
      this.activeTab = i;
      this.getDownloadCount();
    },
    getDownloadCount() {
      var query = this.$Bmob.Query('download');
      query.equalTo('type', '==', this.activeTab);
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.downloadTotal = total;
        this.downloadPages = parseInt(total / this.downloadLimit);
        if (total % this.downloadLimit > 0) {
          this.downloadPages = this.downloadPages + 1;
        }
        this.getDownloadList(this.pageDownload);
      });
    },
    getDownloadList(page) {
      if (page) {
        if (page > this.downloadPages) {
          this.pageDownload = this.downloadPages;
        } else if (page < 0) {
          this.pageDownload = 1;
        } else {
          this.pageDownload = page;
        }
      } else {
        this.pageDownload = 1
      }

      var query = this.$Bmob.Query('download');
      this.skipDownload = this.downloadLimit * (this.pageDownload - 1);

      let arr = [];
      query.order('-endTime');
      query.equalTo('type', '==', this.activeTab);
      query.equalTo('notDelete', '==', true);
      query.skip(this.skipDownload);
      query.limit(this.downloadLimit);
      this.downloadLoading = true;
      query.find().then((res) => {
        this.downloadLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          // let arrb = [];
          // if (res[i].system) {
          //   let sysList = res[i].system;
          //   var querySys = this.$Bmob.Query('support_sys');
          //   for (let x = 0; x < sysList.length; x += 1) {
          //     querySys.get(sysList[x]).then((result) => {
          //       arrb.push({
          //         id: result.objectId,
          //         icon: result.icon,
          //         title: result.title,
          //       });
          //     });
          //   }
          // }
          
          arr.push({
            id: res[i].objectId,
            imgSrc: res[i].imgSrc,
            title: res[i].title,
            desc: res[i].desc,
            author: res[i].author,
            wechat: res[i].wechat,
            downloads: res[i].downloads,
            link: res[i].link,
            code: res[i].code,
            // groupPrice: res[i].groupPrice,
            // price: res[i].price,
            // sys: arrb,
          });
        }
        this.downloadList = arr;
      });
    },

    closeContact() {
      this.showContact = false;
      this.showFeedback = true;
    },
    dialogShow(item) {
      console.log(item);
      this.dialog = item;
      this.showDownload = true;
    },
    openLink() {
      console.log(this.dialog);
      const query = this.$Bmob.Query('download');
      query.get(this.dialog.id).then((res) => {
        res.set('downloads', Number(res.downloads) + 1);
        res.save().then(() => {
          this.getDownloadCount();
          window.open(this.dialog.link);
        });
      }).catch(err => {
        console.log(err)
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .the-layer {
    display: flex;
    padding: 30px 0;
    width: 100%;
    .layer-left {
      flex: 1;
      padding-top:30px;
      box-sizing: border-box;
      background-color: #fff;
      .img {
        margin: auto;
        margin-bottom: 30px;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-size: cover;
      }
      .btn {
        margin: auto;
        margin-bottom: 15px;
        width: 110px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #8F8F8F;
        font-size: 12px;
        border: 1px solid #979797;
        border-radius: 2px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .tab-list {
        margin-top: 50px;
        width: 100%;
        .tab {
          margin-bottom: 20px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          text-align: center;
          cursor: pointer;
          &:hover, &.active {
            background-color: #F4C51D;
          }
        }
      }
    }
    .layer-right {
      margin-left: 30px;
      width: 870px;
      background-color: #fff;
      .recommend {
        width: 100%;
        .img {
          display: block;
          width: 100%;
          height: 230px;
          background-color: #D8D8D8;
        }
        .author {
          margin-top: 10px;
          margin-right: 50px;
          text-align: right;
          color: #888;
          font-size: 12px;
          box-sizing: border-box;
        }
      }

      .download-list {
        display: flex;
        margin-top: 50px;
        padding: 0 30px;
        width: 100%;
        flex-wrap: wrap;
        box-sizing: border-box;
        .the-download {
          display: flex;
          margin-bottom: 20px;
          padding: 0 15px;
          width: 50%;
          box-sizing: border-box;
          .download-left {
            width: 16px;
            .img {
              width: 16px;
              height: 16px;
              background-color: #888;
              background-size: cover;
              background-position: 50%;
              border-radius: 50%;
            }
          }
          .download-mid {
            flex: 1;
            padding: 0 30px 0 5px;
            box-sizing: border-box;
            .title {
              font-size: 14px;
              line-height: 20px;
              font-weight: bold;
            }
            .info {
              margin-top: 10px;
              color: #888;
              span {
                margin-right: 5px;
                font-size: 12px;
              }
            }
          }
          .download-right {
            width: 40px;
            .btn {
              background-color: #F4C51D;
              width: 40px;
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              border-radius: 2px;
              cursor: pointer;
            }
            span {
              display: block;
              margin-top: 10px;
              font-size: 12px;
              line-height: 17px;
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
            width: 36px;
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

        // 版权
        .cop-title {
          padding-top: 15px;
          color: #333;
          font-size: 16px;
          line-height: 22px;
          font-weight: bold;
          word-break: break-all;
        }
        .cop-content {
          color: #888;
          font-size: 12px;
          line-height: 18px;
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
