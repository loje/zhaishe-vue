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

    <div class="dialog" v-if="dialog">
      <div class="dialog-box max-width">
        <div class="img" :style="{backgroundImage: `url(${dialog.src})`}"></div>
        <div class="box-right">
          <div class="recommended">
            <div class="recommended-t">推荐码</div>
            <input type="text" />
            <div class="recommended-tips">恭喜您以获得团购码</div>
          </div>
          <div class="the-price">
            <div class="price-t">现购价</div>
            <div class="price-num" style="color:#cc0033;">199元</div>
          </div>
          <div class="the-price">
            <div class="price-t">团购价</div>
            <div class="price-num">139元</div>
          </div>
          <div class="box-btn" @click="next">下一步</div>
        </div>
      </div>
      <div class="dialog-bg" @click="hideBuy"></div>
    </div>

    <div class="dialogForm" v-if="dialogForm">
      <div class="dialog-box">
        <div class="img" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png);"></div>
        <div class="dialog-right">
          <div class="form-t">团购信息</div>
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
          <div class="tips">小编会添加好微信后固定时间邮箱发码</div>
          <a class="btn">购买</a>
        </div>
      </div>
      <div class="dialog-bg" @click="hideFrom"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
      dialog: '',
      dialogForm: '',
    }
  },
  mounted() {
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
            sys: arrb,
          });
        }
        that.productList = arr;
      });
    },
    showBuy(item) {
      this.dialog = item;
    },
    hideBuy() {
      this.dialog = '';
    },
    next() {
      this.dialogForm = this.dialog;
      this.dialog = '';
    },
    hideFrom() {
      this.dialog = '';
      this.dialogForm = '';
    }
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
          color: rgba(51,51,51,1);
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
              color: rgba(227,190,76,1);
              line-height: 30px;
            }
            .sys-list {
              margin-top: 11px;
              span {
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
                color: rgba(51,51,51,1);
                text-align: center;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }
  }
  .dialog {
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
      align-items: center;
      height: 221px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      z-index: 1;
      .img {
        width: 221px;
        height: 221px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .box-right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 50px;
        height: 100%;
        box-sizing: border-box;
        .recommended {
          .recommended-t {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(51,51,51,1);
          }
          input {
            margin-top: 11px;
            padding: 0 23px;
            width: 276px;
            height: 47px;
            outline: none;
            border: none;
            background-color: #eee;
            border-radius: 10px;
            box-sizing: border-box;
          }
          .recommended-tips {
            margin-top: 13px;
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(212,92,92,1);
          }
        }
        .the-price {
          margin-left: 50px;
          .price-t {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(51,51,51,1);
          }
          .price-num {
            margin-top: 11px;
            font-size: 24px;
            font-family: PingFang SC Regular;
            color: rgba(153,153,153,1);
          }
        }
        .box-btn {
          width: 170px;
          height: 47px;
          line-height: 47px;
          text-align: center;
          background: rgba(241,196,74,1);
          font-size: 24px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
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
      .img {
        width: 378px;
        height: 378px;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .dialog-right {
        margin-left: 114px;
        .form-t {
          margin-bottom: 33px;
          font-size: 24px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
        }
        .form-group {
          margin-bottom: 22px;
          span {
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(51,51,51,1);
          }
          input {
            margin-left: 7px;
            width: 330px;
            height: 36px;
            line-height: 36px;
            border: none;
            outline: none;
            border-bottom: 1px solid #ddd;
          }
        }
        .tips {
          margin-bottom: 44px;
          font-size: 18px;
          font-family: PingFang SC Regular;
          color: rgba(153,153,153,1);
        }
        .btn {
          display: block;
          text-decoration: none;
          width: 170px;
          height: 47px;
          line-height: 47px;
          background: rgba(241,196,74,1);
          text-align: center;
          font-size: 18px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
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
  
</style>
