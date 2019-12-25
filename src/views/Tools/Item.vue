<template>
  <div class="tools-page">
    <div class="max-width">
      <div class="media">
        <div class="media-left">
          <loading class="img" v-if="loading === true"></loading>
          <div v-else class="img" :style="{backgroundImage: `url(${imgSrc})`}"></div>
        </div>
        <loading v-if="loading === true"></loading>
        <template v-else>
        <div class="media-right">
          <div class="media-info">
            <div class="title">{{title}}</div>
            <div class="sub-title">{{desc}}</div>

            <div class="support">
              <div class="support-t">支持系统</div>
              <div class="sys-list">
                <template v-for="(i, $index) in sys" >
                  <div class="tools-sys" :key="$index" v-html="i.icon"></div>
                </template>
              </div>
            </div>

            <div class="btn-group">
              <a class="btn" @click="showBuy">购买</a>
              <router-link :to="{path: '/download', query: { keyword: title }}">下载</router-link>
            </div>
          </div>
        </div>
        </template>
      </div>

      <div class="tools-detail">
        <loading v-if="loading === true"></loading>
        <article v-else v-html="content"></article>
      </div>
    </div>

    <div class="dialogForm" v-if="dialogForm">
      <div class="dialog-box">
        <div class="dialog-left">
          <div class="img" :style="{backgroundImage: `url(${dialogForm.src})`}"></div>
        </div>
        <div class="dialog-right">
          <div class="form-t">
            <span class="original-price">原价：{{dialogForm.price}}元</span>
            <span class="group-price">团购价：{{dialogForm.groupPrice}}元</span>
          </div>
          <div class="form-group">
            <span>姓名</span>
            <input type="text" />
          </div>
          <div class="form-group">
            <span>邮箱</span>
            <input type="text" />
          </div>
          <div class="form-group">
            <span>微信</span>
            <input type="text" />
          </div>
          <div class="tips">{{tips}}</div>
          <a class="btn" @click="buy">购买</a>
        </div>
      </div>
      <div class="dialog-bg" @click="hideFrom"></div>
    </div>

    <div class="dialog-qrcode" v-if="dialogQrcode">
      <div class="dialog-box">
        <div class="img" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png);"></div>
        <div class="text">小编会第一时间联系您支付<br/>加小编了解进度</div>
      </div>
      <div class="dialog-bg" @click="hideQrcode"></div>
    </div>
  </div>
</template>

<script>
import loading from '@/components/Loading';
export default {
  components: {
    loading,
  },
  data() {
    return {
      loading: false,
      imgSrc: '',
      title: '',
      desc: '',
      sys: [],
      content: '',

      dialogForm: '',
      tips: '',

      dialogQrcode: false,
    }
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.loading = true;
      var query = this.$Bmob.Query('product');
      query.get(this.$route.query.id).then((res) => {
        this.loading = false;
        this.imgSrc = res.imgSrc || '';
        this.title = res.title || '';
        this.desc = res.desc || '';
        this.content = res.content;
        this.groupPrice = res.groupPrice;
        this.price = res.price;

        if (res.system) {
          let sysList = res.system;
          let arrb = [];
          var querySys = this.$Bmob.Query('support_sys');
          for (let x = 0; x < sysList.length; x += 1) {
            querySys.get(sysList[x]).then((result) => {
              arrb.push({
                id: result.objectId,
                icon: result.icon,
                title: result.title,
              });
            });
          }
          this.sys = arrb;
        }
      });
    },

    showBuy() {
      this.dialogForm = {
        id: this.$route.query.id,
        src: this.imgSrc,
        title: this.title,
        desc: this.desc,
        groupPrice: this.groupPrice,
        price: this.price,
        sys: this.sys,
      };
    },
    buy() {
      this.dialogForm = '';
      this.dialogQrcode = true;
    },
    hideFrom() {
      this.dialogForm = '';
      this.dialogQrcode = false;
    },
    hideQrcode() {
      this.dialogQrcode = false;
    },
  },
};
</script>

<style>
.tools-sys .icon{
  display: block;
  width: 24px;
  height: 24px;
}
</style>

<style lang="scss" scoped>
  .media {
    display: flex;
    align-items: top;
    margin-top: 20px;
    width: 100%;
    height: 330px;
    overflow: hidden;
    .media-left {
      width: 330px;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
      .img {
        width: 100%;
        height: 100%;
        background-position: 50%;
        background-size: cover;
      }
    }
    .media-right {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding-left: 10px;
      .media-info {
        position: relative;
        padding: 30px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        .title {
          font-size: 24px;
          font-family: PingFang SC Regular;
          color: #333;
          line-height: 24px;
        }
        .sub-title {
          margin-top: 15px;
          font-size: 14px;
          font-family: PingFang SC Regular;
          color: #999;
          line-height: 24px;
        }
        .support {
          margin-top: 20px;
          .support-t {
            font-size: 16px;
            font-family: PingFang SC Light;
            color: #FFCB2B;
            line-height: 30px;
          }
          .sys-list {
            margin-top: 11px;
            .tools-sys {
              display: inline-block;
              margin-right: 25px;
              line-height: 24px;
            }
          }
        }

        .btn-group {
          position: absolute;
          right: 30px;
          bottom: 30px;
          display: flex;
          width: 100%;
          justify-content: flex-end;
          a {
            margin-right: 30px;
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(92,157,255,1);
            line-height: 40px;
            cursor: pointer;
            &.btn {
              width: 100px;
              height: 40px;
              background: #FFCB2B;
              color: #333;
              text-align: center;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }

  .tools-detail {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 30px;
    min-height: 800px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    article {
      width: 100%;
      box-sizing: border-box;
      img {
        max-width: 100%;
      }
      p {
        width: 100%;
         img {
          max-width: 100%;
        }
      }
    }
  }

  .dialogForm {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.34);
    z-index: 1;
    .dialog-box {
      position: relative;
      display: flex;
      margin: auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 1;
      .dialog-left {
        text-align: center;
        .img {
          width: 300px;
          height: 300px;
          background-position: 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        input {
          width: 273px;
          height: 47px;
          background: rgba(235,235,235,1);
          border: none;
          outline: none;
          border-radius: 10px;
          text-align: center;
          font-size: 18px;
        }
      }

      .dialog-right {
        position: relative;
        margin-left: 50px;
        .form-t {
          margin-bottom: 15px;
          .original-price {
            margin-right: 20px;
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(153,153,153,1);
          }
          .group-price {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
        }
        .form-group {
          margin-top: 15px;
          span {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: #333;
            letter-spacing: 5px;
          }
          input {
            margin-left: 7px;
            width: 300px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            border: none;
            outline: none;
            border-bottom: 1px solid #ddd;
          }
        }
        .tips {
          margin-top: 15px;
          margin-bottom: 15px;
          font-size: 16px;
          font-family: PingFang SC Regular;
          width: 100%;
          height: 23px;
          color: rgba(243,107,107,1);
        }
        .btn {
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          text-decoration: none;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: rgba(241,196,74,1);
          text-align: center;
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: #333;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
    .dialog-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }

  .dialog-qrcode {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.34);
    z-index: 1;
    .dialog-box {
      position: relative;
      margin: auto;
      padding: 50px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 1;
      .img {
        width: 340px;
        height: 340px;
        background-size: contain;
      }
      .text {
        text-align: center;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: #333;
        line-height: 30px;
      }
    }
    .dialog-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
</style>