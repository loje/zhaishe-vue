<template>
  <div class="max-width">
    <!-- <div class="title">宅设严选人</div> -->
    <div class="designer-list">
      <div class="the-designer" v-for="(item, $index) in list" :key="$index">
        <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
        <div class="designer-info">
          <div class="name">{{item.name}}</div>
          <div class="info">{{item.info}}</div>
        </div>
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
      var query = this.$Bmob.Query('designer');
      query.equalTo('notDelete', '===', true);
      let arr = [];
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            src: res[i].img,
            name: res[i].name,
            info: res[i].info,
          });
        }
        that.list = arr;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  // .title {
  //   margin: 20px 0;
  //   font-size: 24px;
  //   font-family: PingFang SC Regular;
  //   color: #333;
  // }
  .designer-list {
    display: flex;
    padding: 20px 0;
    flex-wrap: wrap;
    .the-designer {
      position: relative;
      margin-bottom: 41px;
      margin-right: 25px;
      width: 270px;
      border-radius: 10px;
      overflow: hidden;
      &:nth-child(4n+4) {
        margin-right: 0;
      }
      .img {
        position: relative;
        width: 100%;
        height: 350px;
        background-position: 50%;
        background-size: cover;
        z-index: 0;
      }
      .designer-info {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 10px;
        width: 100%;
        height: 100px;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 1;
        .name {
          // margin-top: 15px;
          width: 100%;
          font-size: 14px;
          font-family: PingFang SC Regular;
          color: #333;
        }
        .info {
          margin-top: 10px;
          width: 100%;
          font-size: 14px;
          font-family: PingFang SC Regular;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
