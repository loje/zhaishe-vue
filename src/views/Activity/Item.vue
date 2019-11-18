<template>
  <div>
  <div class="max-width">
    <div class="banner"></div>
    <div class="activity-title">活动信息</div>
    <div class="activity-detail"></div>
  </div>
  <div class="price-layer">
    <div class="max-width">
      <div class="pv">浏览量：2018</div>
      <div class="fee">费用：<span>50</span>元</div>
      <a>报名</a>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>
<style lang="scss" scope>
  .banner {
    margin-top: 20px;
    width: 100%;
    height: 426px;
    border-radius: 10px;
    background-color: #E3BE4C;
  }
  .activity-title {
    margin-left: 25px;
    margin-top: 33px;
    font-size: 18px;
    font-family: PingFang SC Regular;
    color: rgba(51,51,51,1);
  }
  .activity-detail {
    margin-top: 20px;
    padding: 71px 133px 61px 133px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .price-layer {
    width: 100%;
    height: 89px;
    background-color: #fff;
    box-shadow: 0px 38px 79px 0px rgba(42,38,43,0.07);
    .max-width {
      display: flex;
      height: 100%;
      padding-right: 104px;
      align-items: center;
      justify-content:flex-end;
      box-sizing: border-box;
    }
  }
</style>
