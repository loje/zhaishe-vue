<template>
  <div class="bottom">
    <div class="max-width">
      <div class="bottom-left">
        <div class="contect">
          小编微信：<br/>zhaishehui01
        </div>
        <div class="link">
          <span class="title">友情链接：</span>
          <div class="list">
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
          </div>
        </div>
        <div class="cop">Copyright © 2019 zdesginer.cn All rights reserved.</div>
      </div>
      <div class="bottom-right">
        <div class="qrcode" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png);"></div>
        <div class="text">宅设官方微信</div>
      </div>
    </div>
  </div>
</template>

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
        }
        .link {
          display: inline-flex;
          vertical-align: top;
          .title {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(51,51,51,1);
          }
          .list {
            display: flex;
            .img {
              margin: 0 20px;
              width: 46px;
              height: 46px;
              background: rgba(227,190,76,1);
              border-radius: 10px;
            }
          }
        }
        .cop {
          position:absolute;
          left: 0;
          bottom: 22px;
          font-size: 13px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
          text-transform : uppercase;
        }
      }
      .bottom-right {
        .qrcode{
          width: 123px;
          height: 123px;
          background-color: #fff;
          background-position: 50%;
        }
        .text {
          margin-top: 6px;
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
          text-align: center;
        }
      }
    }
  }
</style>