<template>
  <div class="bottom">
    <div class="max-width">
      <div class="bottom-flex intro">
        <div class="title">关于我们</div>
        <div class="desc">深圳宅设传媒有限公司是一家以设计师为主题活动的公司，旗下平台宅设会以设计师活动聚集地为中心，分别有线下活动，优惠活动、外包信息公布等，一个让设计师聚集的福利平台</div>
        <div class="title">联系我们</div>
        <div class="desc">公司地址：深圳市南山区华侨城创意园北区A1栋602<br/>联系方式：186 6437 3764</div>
        <!-- <div class="cop">法律声明：粤ICP备17153005号-1</div> -->
      </div>
      <div class="bottom-line"></div>
      <div class="bottom-flex friend-link">
        <div class="title">友情链接</div>
        <div class="link-list">
          <a class="the-link" v-for="(item, $index) in linkList" :key="$index" :style="{backgroundImage: `url(${item.src})`}" :href="item.link" target="blank"></a>
        </div>
      </div>
      <div class="bottom-line"></div>
      <div class="bottom-flex wechat">
        <div class="title">宅设公众号</div>
        <div class="wechat-pic">
          <img src="http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
        </div>
        <div class="the-wechat">
          宅设小编微信<br/>zhaishehui01
        </div>
        <div class="the-email">
          商务合作邮箱<br/>zoupengyu@zdesigner.cn
        </div>
      </div>
      <div class="sys-list">
        <div class="sys">法律声明：粤ICP备17153005号-1</div>
        <div class="sys">关于我们</div>
        <div class="sys">用户协议</div>
        <div class="sys">商务合作</div>
        <div class="sys">联系我们</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [],
    }
  },
  mounted() {
    this.getLinks();
  },
  methods: {
    getLinks() {
      let that = this;
      var query = this.$Bmob.Query('link');
      const arr = [];
      query.equalTo('notDelete', '===', true);
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            src: res[i].src,
            link: res[i].link,
          });
        }
        that.linkList = arr;
      });
    },
    toLink(link) {
      window.open(link);
    }
  },
};
</script>

<style lang="scss" scope>
  .bottom {
    padding: 30px 0;
    width: 100%;
    background-color: #262626;
    .max-width {
      position: relative;
      display: flex;
      .bottom-flex {
        position: relative;
        color: #79798A;
        .title {
          font-size: 16px;
          line-height: 22px;
          font-weight: bold;
        }
        &.intro {
          padding-right: 55px;
          width: 440px;
          box-sizing: border-box;
          .desc {
            margin-top: 5px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 26px;
          }
          .cop {
            font-size: 14px;
            line-height: 17px;
          }
        }
        &.friend-link {
          position: relative;
          padding: 0 65px;
          width: 384px;
          box-sizing: border-box;
          .link-list {
            display: flex;
            width: 248px;
            flex-wrap: wrap;
            .the-link {
              display: block;
              margin-right: 40px;
              margin-top: 20px;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background-position: 50%;
              background-size: cover;
              &:nth-child(4n) {
                margin-right: 0;
              }
            }
          }

        }
        &.wechat {
          padding-left: 65px;
          width: 260px;
          box-sizing: border-box;
          .wechat-pic {
            margin-top: 10px;
            width: 80px;
            height: 80px;
            background-color: #fff;
            img {
              display: block;
              max-width: 100%;
            }
          }
          .the-wechat, .the-email {
            margin-top: 26px;
            font-size: 12px;
            line-height: 17px;
          }
        }
      }
      .bottom-line {
        width: 1px;
        height: 150px;
        background-color: #222229;
        box-shadow: 1px 0px 0px #33333C;
      }

      .sys-list {
        position: absolute;
        left: 0;
        bottom: 0;
        .sys {
          display: inline;
          margin-right: 50px;
          font-size: 12px;
          color: #79798A;
          line-height: 17px;
          cursor: pointer;
        }
      }
      // .bottom-left {
      //   position: relative;
      //   flex: 1;
      //   padding-top: 20px;
      //   height: 160px;
      //   box-sizing: border-box;
      //   .contect {
      //     display:inline-block;
      //     margin-right: 80px;
      //     vertical-align: top;
      //     font-size: 14px;
      //     line-height: 14px;
      //     .text-block {
      //       margin-bottom: 20px;
      //       .text {
      //         margin-bottom: 10px;
      //       }
      //     }
      //   }
      //   .link {
      //     display: inline-flex;
      //     vertical-align: top;
      //     .title {
      //       margin-right: 20px;
      //       font-size: 14px;
      //       font-family: PingFang SC Regular;
      //       color: #333;
      //     }
      //     .list {
      //       display: flex;
      //       .img {
      //         margin-right: 50px;
      //         width: 32px;
      //         height: 32px;
      //         border-radius: 10px;
      //         background-position: 50%;
      //         background-size: contain;
      //         cursor: pointer;
      //       }
      //     }
      //   }
      //   .cop {
      //     position:absolute;
      //     left: 0;
      //     bottom: 14px;
      //     font-size: 14px;
      //     font-family: PingFang SC Regular;
      //     color: #999;
      //     text-transform : uppercase;
      //   }
      // }
      // .bottom-right {
      //   .text {
      //     display: inline-block;
      //     vertical-align: top;
      //     margin-right: 20px;
      //     padding-top: 8px;
      //     font-size: 14px;
      //     font-family: PingFang SC Regular;
      //     color: #333;
      //   }
      //   .qrcode{
      //     display: inline-block;
      //     vertical-align: top;
      //     width: 120px;
      //     height: 120px;
      //     background-color: #fff;
      //     background-position: 50%;
      //     background-size: contain;
      //   }
        
      // }
    }
  }
</style>