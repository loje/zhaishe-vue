<template>
  <div class="bottom">
    <div class="max-width">
      <!-- <div class="bottom-left">
        <div class="contect">
          <div class="text-block">
            <div class="text">小编微信：</div>
            <div class="text">zhaishehui01</div>
          </div>
          <div class="text-block">
            <div class="text">商务邮箱：</div>
            <div class="text">zoupengyu@zdesigner.cn</div>
          </div>
        </div>
        <div class="link">
          <span class="title">友情链接：</span>
          <div class="list">
            <template v-for="(item, $index) in linkList">
            <div class="img" :key="$index" v-if="$index < 4" :style="{ backgroundImage: `url(${item.src})`}" @click="toLink(item.link)"></div>
            </template>
          </div>
        </div>
        <div class="cop">Copyright © 2019 zdesginer.cn All rights reserved.</div>
      </div>
      <div class="bottom-right">
        <div class="text">官方微信</div>
        <div class="qrcode" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png);"></div>
      </div> -->
      <div class="bottom-flex intro">
        <div class="title">关于我们</div>
        <div class="desc">宅设会是以设计师为中心的活动社群，每月不定期线下分享、聚会活动等，一直在广深两地组织活动，推进广深两地设计师前行，为了让更多设计师与大咖面对面的交流学习，也为了让更多出色的设计师分享自己的成绩，我们一直以知识共享形式链接着每一位善于学习和分享的人，让参与者和分享者都融入其中，每一次活动都成为你的收获，成为你更同值得努力的目标</div>
        <div class="cop">Copyright © 2019 zdesginer.cn All rights reserved.</div>
      </div>
      <div class="bottom-line"></div>
      <div class="bottom-flex friend-link">
        <div class="title">友情链接</div>
        <div class="link-list">
          <div class="the-link" v-for="(item, $index) in linkList" :key="$index" :style="{backgroundImage: `url(${item.src})`}"></div>
        </div>
      </div>
      <div class="bottom-line"></div>
      <div class="bottom-flex wechat">
        <div class="title">宅设公众号</div>
        <div class="wechat-pic"></div>
        <div class="the-wechat">
          宅设小编微信<br/>zhaishehui01
        </div>
        <div class="the-email">
          商务合作邮箱<br/>zoupengyu@zdesigner.cn
        </div>
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
      display: flex;
      .bottom-flex {
        color: #D4D4D4;
        .title {
          font-size: 16px;
          line-height: 22px;
        }
        &.intro {
          padding-right: 55px;
          width: 440px;
          box-sizing: border-box;
          .desc {
            margin-top: 10px;
            font-size: 12px;
            line-height: 26px;
            color: #fff;
          }
          .cop {
            margin-top: 20px;
            font-size: 14px;
            line-height: 20px;
          }
        }
        &.friend-link {
          padding: 0 65px;
          width: 384px;
          box-sizing: border-box;
          .link-list {
            display: flex;
            width: 248px;
            flex-wrap: wrap;
            .the-link {
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
          }
          .the-wechat, .the-email {
            margin-top: 20px;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
      .bottom-line {
        width: 1px;
        height: 150px;
        background-color: #222229;
        box-shadow: 1px 0px 0px #33333C;
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