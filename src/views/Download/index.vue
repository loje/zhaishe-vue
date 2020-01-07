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
          <div class="author">作者：xxx</div>
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

          <!-- <input type="checkbox" id="checkbox" class="check-box" />
          <label class="check-label" for="checkbox">
            <div class="bg">
              <i class="iconfont">&#xe607;</i>
            </div>
            <span>是否加入产品分销</span>
          </label> -->

          <div class="btn" @click="closeContact">确定</div>
        </div>
      </div>
    </div>
    </transition>

    <transition name="fade">
    <div class="dialog-layer" v-if="showDownload">
      <div class="dialog-flex">
        <div class="dialog-block" style="width:450px">
          <span class="close" @click="showDownload = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="download-title">电台bannerxxxxxxxxxxx标题，最长标题我在最后一个。xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx。</div>
          <div class="download-link">
            <div class="t">下载地址</div>
            <div class="url">http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxx</div>
          </div>
          <div class="download-code">HEBWEX</div>
          <div class="download-cop">
            <span @click="showCop = true">版权声明</span>
          </div>

          <div class="btn" style="width: 160px;">打开链接</div>
        </div>
      </div>
      <transition name="fade">
      <div class="dialog-layer" v-if="showCop">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:450px">
            <span class="close" @click="showCop = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="cop-title">版权声明</div>
            <div class="cop-content" v-html="copContent"></div>
            <div class="btn" style="width: 160px;" @click="showCop = false">同意，继续下载</div>
          </div>
        </div>
      </div>
      </transition>
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
              <img src=""  />
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

      showContact: false,
      showDownload: false,
      showCop: false,

      copContent: `
      <p>宅设灵感库个人账号仅限个人使用，也限制在多台设备频繁切换使用。</p>
      <p>由于宅设会（www.zdesigner.cn）灵感库上的资源均来源于网络用户分享，故宅设灵感库不具备充分的监控能力来审查资源是否存在侵权等情节。宅设会不拥有此类资源的版权，本站所有资源仅供学习与交流，不得用于任何商业用途的范围，用户应自觉遵守著作权法及其他相关法律的规定，不得侵犯本网站及权利人的合法权利，给宅设灵感库和任何第三方造成损失的，侵权用户应负全部责任。</p>
      <p>宅设灵感库鼓励用户对网站上的作品进行全面监督，当版权拥有者提出侵权指控并出示充分的版权证明材料时，宅设灵感库在第一时间对投诉举报进行核实，并及时清理侵权作品。宅设灵感库“原创作品”会在内容中标注，所发布展示的原创作品，版权归上传作者所有，宅设灵感库会在满足前款条件下针对原创作品栏目采取移除等相应措施后不为此向原发布人承担违约责任或其他法律责任，包括不承担因侵权指控不成立而给原发布人带来损害的赔偿责任。</p>
      <p>宅设灵感库赋予每个账号在满足一定条件的情况下，通过网站正式程序下载资源的资格，但作为网站管理者，有权为保护账号安全，同时给予一定的下载限制，而不因此承担法律责任。 </p>
      <p>如果版权拥有者发现自己作品被侵权，任何单位和个人向宅设灵感库投诉举报时，应提交姓名、电话、身份证明、权属证明、具体链接（URL）及侵权情况详细描述发往版权投诉举报通道，宅设灵感库在收到相关举报文件后，若情况属实，会在24小时内采取删除、屏蔽、断开链接等措施来移除相关涉嫌侵权的内容。</p>`,

      showFeedback: false,
    }
  },
  activated() {
  },
  methods: {
    getDownloadList() {},

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
        // min-height: 460px;
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

        // .check-box {
        //   display: none;
        //   margin: 0;
        //   width: 20px;
        //   height: 20px;
        //   opacity: 0.5;
        //   &:checked +.check-label {
        //     .bg {
        //       i {
        //         display: block;
        //       }
        //     }
        //   }
        // }
        // .check-label {
        //   cursor: pointer;
        //   .bg {
        //     display: inline-block;
        //     vertical-align: middle;
        //     width: 20px;
        //     height: 20px;
        //     border-radius: 2px;
        //     border: 1px solid #979797;
        //     i {
        //       display: none;
        //       width: 100%;
        //       height: 100%;
        //       line-height: 20px;
        //       color: #F4C51D;
        //     }
        //   }
        //   span {
        //     display: inline-block;
        //     margin-left: 15px;
        //     vertical-align: middle;
        //     font-size: 12px;
        //     color: #979797;
        //   }
        // }
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

        // 下载
        .download-title {
          padding-top: 15px;
          color: #333;
          font-size: 16px;
          line-height: 22px;
          font-weight: bold;
          word-break: break-all;
        }
        .download-link {
          margin-top: 30px;
          font-size: 12px;
          line-height: 17px;
          .t {
            margin-bottom: 5px;
          }
          .url {
            color: #5BA4F2;
            word-break: break-all;
          }
        }
        .download-code {
          margin-top: 20px;
          width: 100%;
          height: 70px;
          line-height: 70px;
          border-radius: 2px;
          background-color: #FCFCFC;
          text-align: center;
          font-size: 24px;
        }
        .download-cop {
          margin-top: 10px;
          font-size: 12px;
          span {
            cursor: pointer;
          }
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
