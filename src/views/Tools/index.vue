<template>
  <div class="tools-page max-width">
    <div class="tool" v-for="item in productList" :key="item.id">
      <div class="tool-left">
        <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
      </div>
      <div class="tool-right">
        <div class="tool-title">{{item.title}}</div>
        <div class="tool-desc">{{item.desc}}</div>
        <div class="tool-btm">
          <div class="support">
            <div class="support-t">支持系统</div>
            <div class="sys-list">
              <template v-for="(i, $index) in item.sys" >
                <span :key="$index" v-html="i"></span>
              </template>
            </div>
          </div>
          <div class="btn-group">
            <a class="btn" @click="showBuy(item)">购买</a>
            <a>下载</a>
          </div>
        </div>
      </div>
    </div>

    <div class="dialogForm" v-if="dialogForm">
      <div class="dialog-box">
        <div class="dialog-left">
          <div class="img" :style="{backgroundImage: `url(${dialogForm.src})`}"></div>
          <input type="text" placeholder="请输入邀请码" />
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
export default {
  data() {
    return {
      productList: [],
      dialogForm: '',
      tips: '',

      dialogQrcode: false,
    }
  },
  activated() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      let that = this;
      var query = new this.$AV.Query('product');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          let arrb = [];
          if (res[i].attributes.system) {
            let sysList = res[i].attributes.system;
            for (let x = 0; x < sysList.length; x += 1) {
              var querySys = new that.$AV.Query('support_sys');
              querySys.equalTo('id', sysList[x]);
              querySys.find().then(function (result) {
                arrb.push(result[0].attributes.icon);
              });
            }
          }
          
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
            title: res[i].attributes.title,
            desc: res[i].attributes.desc,
            groupPrice: res[i].attributes.groupPrice,
            price: res[i].attributes.price,
            sys: arrb,
          });
        }
        that.productList = arr;
      });
    },
    showBuy(item) {
      this.dialogForm = item;
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

<style lang="scss" scoped>
  .tools-page {
    padding: 50px 0;
    .tool {
      display: flex;
      margin-bottom: 20px;
      width: 100%;
      height: 330px;
      .tool-left {
        width: 380px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        .img {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .tool-right {
        position: relative;
        margin-left: 9px;
        flex: 1;
        padding: 50px 65px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        .tool-title{
          font-size: 24px;
          font-family: PingFang SC Medium;
          color: #333;
        }
        .tool-desc {
          margin-top: 25px;
          font-size: 16px;
          line-height: 30px;
          font-family: PingFang SC Light;
          color: rgba(153,153,153,1);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .tool-btm {
          position: absolute;
          left: 65px;
          bottom: 26px;
          width: calc(100% - 130px);
          .support {
            .support-t {
              font-size: 16px;
              font-family: PingFang SC Light;
              color: #FFCB2B;
              line-height: 30px;
            }
            .sys-list {
              margin-top: 11px;
              span {
                display: inline-block;
                margin-right: 25px;
                >>>.icon {
                  display: block;
                  width: 32px;
                  height: 32px;
                }
              }
            }
          }
          .btn-group {
            display: flex;
            width: 100%;
            justify-content: flex-end;
            a {
              font-size: 16px;
              font-family: PingFang SC Regular;
              color: rgba(92,157,255,1);
              line-height: 45px;
              cursor: pointer;
              &.btn {
                margin-right: 57px;
                width: 120px;
                height: 45px;
                background: rgba(241,196,74,1);
                color: #333;
                text-align: center;
                border-radius: 10px;
              }
            }
          }
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
      padding: 50px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 1;
      .dialog-left {
        text-align: center;
        .img {
          width: 378px;
          height: 350px;
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
        margin-left: 114px;
        .form-t {
          margin-bottom: 33px;
          .original-price {
            margin-right: 41px;
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(153,153,153,1);
          }
          .group-price {
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
        }
        .form-group {
          margin-top: 22px;
          span {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: #333;
            letter-spacing: 5px;
          }
          input {
            margin-left: 7px;
            width: 330px;
            height: 47px;
            line-height: 47px;
            border: none;
            outline: none;
            border-bottom: 1px solid #ddd;
          }
        }
        .tips {
          margin-top: 27px;
          margin-bottom: 44px;
          font-size: 16px;
          font-family: PingFang SC Regular;
          width: 142px;
          height: 23px;
          color: rgba(243,107,107,1);
        }
        .btn {
          display: block;
          text-decoration: none;
          width: 100%;
          height: 47px;
          line-height: 47px;
          background: rgba(241,196,74,1);
          text-align: center;
          font-size: 18px;
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
