<template>
  <div class="max-width">
    <div class="title">下载专区</div>
    <div class="the-layer">
      <div class="tabs">
        <div class="tab"></div>
      </div>
      <div class="tab-content">
        <template v-for="(item, $index) in files">
        <div class="media" :key="$index">
          <div class="media-left">
            <div class="img"></div>
          </div>
          <div class="media-right">
            <div class="media-t"></div>
            <div class="media-info">
              <span class="author">宅设小编</span>
              <a>下载</a>
            </div>
          </div>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: [],
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-top: 33px;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: PingFang SC Regular;
  color: rgba(51,51,51,1);
}
</style>
