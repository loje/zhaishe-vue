<template>
  <transition name="fade">
    <div class="dialog-layer" v-if="showDownload">
      <div class="dialog-flex">
        <div class="dialog-block" style="width:450px">
          <span class="close" @click="hideDownload">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="download-title">{{dialog.title}}</div>
          <div class="download-link">
            <div class="t">下载地址</div>
            <div class="url">{{dialog.link}}</div>
          </div>
          <div class="download-code">{{dialog.couponCode}}</div>
          <div class="download-cop">
            <span @click="showCop = true">版权声明</span>
          </div>

          <div class="btn" style="width: 160px;" @click="openLink">打开链接</div>
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
</template>

<script>
export default {
  props: {
    showDownload: {
      type: [Boolean],
      default: false,
    },
    dialog: {
      type: [Object],
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      copContent: `
      <p>宅设灵感库个人账号仅限个人使用，也限制在多台设备频繁切换使用。</p>
      <p>由于宅设会（www.zdesigner.cn）灵感库上的资源均来源于网络用户分享，故宅设灵感库不具备充分的监控能力来审查资源是否存在侵权等情节。宅设会不拥有此类资源的版权，本站所有资源仅供学习与交流，不得用于任何商业用途的范围，用户应自觉遵守著作权法及其他相关法律的规定，不得侵犯本网站及权利人的合法权利，给宅设灵感库和任何第三方造成损失的，侵权用户应负全部责任。</p>
      <p>宅设灵感库鼓励用户对网站上的作品进行全面监督，当版权拥有者提出侵权指控并出示充分的版权证明材料时，宅设灵感库在第一时间对投诉举报进行核实，并及时清理侵权作品。宅设灵感库“原创作品”会在内容中标注，所发布展示的原创作品，版权归上传作者所有，宅设灵感库会在满足前款条件下针对原创作品栏目采取移除等相应措施后不为此向原发布人承担违约责任或其他法律责任，包括不承担因侵权指控不成立而给原发布人带来损害的赔偿责任。</p>
      <p>宅设灵感库赋予每个账号在满足一定条件的情况下，通过网站正式程序下载资源的资格，但作为网站管理者，有权为保护账号安全，同时给予一定的下载限制，而不因此承担法律责任。 </p>
      <p>如果版权拥有者发现自己作品被侵权，任何单位和个人向宅设灵感库投诉举报时，应提交姓名、电话、身份证明、权属证明、具体链接（URL）及侵权情况详细描述发往版权投诉举报通道，宅设灵感库在收到相关举报文件后，若情况属实，会在24小时内采取删除、屏蔽、断开链接等措施来移除相关涉嫌侵权的内容。</p>`,
      showCop: false,
    }
  },
  methods: {
    hideDownload() {
      this.$emit('hide-download');
    },
    openLink() {
      window.open(this.dialog.link);
    },
  },
};
</script>

<style lang="scss" scoped>
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
        // .input-group {
        //   display: flex;
        //   align-items: center;
        //   margin-bottom: 20px;
        //   width: 100%;
        //   height: 36px;
        //   line-height: 36px;
        //   border: 1px solid #979797;
        //   border-radius: 2px;
        //   box-sizing: border-box;
        //   span {
        //     display: block;
        //     padding-left: 10px;
        //     width: 36px;
        //     font-size: 12px;
        //     color: #888;
        //   }
        //   input {
        //     flex: 1;
        //     border: none;
        //     outline: none;
        //     padding: 0;
        //     font-size: 12px;
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