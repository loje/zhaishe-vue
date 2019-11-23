<template>
  <div class="bottom">
    <div class="max-width">
      <div class="bottom-left">
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
      var query = new this.$AV.Query('link');
      const arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
            link: res[i].attributes.link,
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
    width: 100%;
    height: 187px;
    background-color: #fff;
    .max-width {
      display: flex;
      align-items: center;
      .bottom-left {
        position: relative;
        flex: 1;
        padding-top: 29px;
        height: 187px;
        box-sizing: border-box;
        .contect {
          display:inline-block;
          margin-right: 121px;
          vertical-align: top;
          font-size: 14px;
          line-height: 14px;
          .text-block {
            margin-bottom: 20px;
            .text {
              margin-bottom: 11px;
            }
          }
        }
        .link {
          display: inline-flex;
          vertical-align: top;
          .title {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: #333;
          }
          .list {
            display: flex;
            .img {
              margin-left: 50px;
              width: 34px;
              height: 34px;
              border-radius: 10px;
              background-position: 50%;
              background-size: contain;
              cursor: pointer;
            }
          }
        }
        .cop {
          position:absolute;
          left: 0;
          bottom: 14px;
          font-size: 14px;
          font-family: PingFang SC Regular;
          color: #999;
          text-transform : uppercase;
        }
      }
      .bottom-right {
        .text {
          display: inline-block;
          vertical-align: top;
          margin-right: 34px;
          padding-top: 8px;
          font-size: 14px;
          font-family: PingFang SC Regular;
          color: #333;
        }
        .qrcode{
          display: inline-block;
          vertical-align: top;
          width: 123px;
          height: 123px;
          background-color: #fff;
          background-position: 50%;
        }
        
      }
    }
  }
</style>