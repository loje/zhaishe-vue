<template>
  <div class="max-width">
    <div class="title">宅设严选人</div>
    <div class="designer-list">
      <div class="the-designer" v-for="(item, $index) in list" :key="$index">
        <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
        <div class="name">{{item.name}}</div>
        <div class="info">{{item.info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.getlist();
  },
  methods: {
    getlist() {
      let that = this;
      var query = new this.$AV.Query('designer');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
            name: res[i].attributes.name,
            info: res[i].attributes.info,
          });
        }
        that.list = arr;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    margin: 39px 0;
    font-size: 18px;
    font-family: PingFang SC Regular;
    color: #333;
  }
  .designer-list {
    display: flex;
    flex-wrap: wrap;
    .the-designer {
      margin-bottom: 41px;
      margin-right: 25px;
      width: 234px;
      &:nth-child(4n+4) {
        margin-right: 0;
      }
      .img {
        width: 100%;
        height: 272px;
        background-position: 50%;
        background-size: cover;
        border-radius: 10px;
      }
      .name {
        margin-top: 16px;
        width: 100%;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
      }
      .info {
        margin-top: 16px;
        width: 100%;
        font-size: 14px;
        font-family: PingFang SC Regular;
        color: #333;
      }
    }
  }
</style>
