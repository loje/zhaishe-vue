<template>
  <div class="max-width">
    <div class="the-layer">
      <div class="layer-left">
        <div class="img" style="background-image: url('http://files.zdesigner.cn/2019/12/28/e7eaec524071ce948069035ac5b91ff7.png');"></div>
        
        <div class="btn">我还没有Eagle</div>
        <div class="btn" @click="showContact = true">联系小编上素材</div>

        <div class="tab-list">
          <div class="tab active">banner</div>
          <div class="tab">H5</div>
          <div class="tab">Web</div>
          <div class="tab">App</div>
          <div class="tab">Logo</div>
          <div class="tab">其他</div>
        </div>
      </div>
      <div class="layer-right">
        <div class="recommend">
          <div class="img"></div>
        </div>

        <div class="download-list">
          <div class="the-download">
            <div class="download-left">
              <div class="img"></div>
            </div>
            <div class="download-mid">
              <div class="title">电台banner设计素材</div>
              <div class="info">
                <span>上传人：Answer</span>
                <span>微信：MuffinMan1874</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="showDownload = true">下载</div>
              <span>102</span>
            </div>
          </div>
          <div class="the-download">
            <div class="download-left">
              <div class="img"></div>
            </div>
            <div class="download-mid">
              <div class="title">电台banner设计素材</div>
              <div class="info">
                <span>上传人：Answer</span>
                <span>微信：MuffinMan1874</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="showDownload = true">下载</div>
              <span>102</span>
            </div>
          </div>
          <div class="the-download">
            <div class="download-left">
              <div class="img"></div>
            </div>
            <div class="download-mid">
              <div class="title">电台banner设计素材</div>
              <div class="info">
                <span>上传人：Answer</span>
                <span>微信：MuffinMan1874</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="showDownload = true">下载</div>
              <span>102</span>
            </div>
          </div>
          <div class="the-download">
            <div class="download-left">
              <div class="img"></div>
            </div>
            <div class="download-mid">
              <div class="title">电台banner设计素材</div>
              <div class="info">
                <span>上传人：Answer</span>
                <span>微信：MuffinMan1874</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="downDialog">下载</div>
              <span>102</span>
            </div>
          </div>
          <div class="the-download">
            <div class="download-left">
              <div class="img"></div>
            </div>
            <div class="download-mid">
              <div class="title">电台banner设计素材</div>
              <div class="info">
                <span>上传人：Answer</span>
                <span>微信：MuffinMan1874</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="showDownload = true">下载</div>
              <span>102</span>
            </div>
          </div>
        </div>

        <div class="pages">
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

    <downloadDialog :showDownload="showDownload" :dialog="dialog" @hide-download="showDownload = false"></downloadDialog>

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
      downloadList: [],
      downloadTotal: 0, // 总条数
      downloadPages: 2, // 总页数
      downloadLimit: 5, // 每页条数
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
  },
  methods: {
    getDownloadList() {},

    downDialog() {},

    closeContact() {
      this.showContact = false;
      this.showFeedback = true;
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
