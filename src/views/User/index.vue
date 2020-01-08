<template>
  <div class="user-page">
    <div class="user-top">
      <div class="user-head">
        <div class="img"></div>
        <div class="name"></div>
      </div>
      <div class="user-bg"></div>
    </div>

    <div class="max-width">
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block active">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block ing">宅设第二十期</div>
          <div class="block end">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">您参与的过活动</div>
        <div class="block-list">
          <div class="block">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">购买的工具</div>
        <div class="block-list">
          <div class="block">宅设第二十期</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-top {
    position: relative;
    padding-bottom: 20px;
    width: 100%;
    .user-head {
      position: relative;
      padding-top: 175px;
      z-index: 1;
      .img {
        margin: auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
      }
      .name {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: #242424;
      }
    }
    .user-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 230px;
      background-color: rgba(244,197,29,0.2);
      z-index: 0;
    }
  }

  .user-block {
    padding: 20px 0;
    .block-title {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
      color: #242424;
    }
    .block-list {
      .block {
        display: inline-flex;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
        margin-right: 50px;
        width: 160px;
        height: 70px;
        text-align: center;
        border: 1px solid #F4751D;
        color: #F4751D;
        font-size: 12px;
        line-height: 17px;
        border-radius: 2px;
        box-sizing: border-box;
        transition: all 250ms ease-in-out;
        cursor: pointer;
        &.ing {
          background-color: rgba(244,117,29,0.30);
          border-color: #F4761F;
          color: #F4761F;
        }
      }
    }
  }
</style>