<template>
  <div class="activity-list max-width">
    <template v-for="(item, $index) in activityList">
      <div class="the-activity" :key="$index">
        <div class="activity-left">
          <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
        </div>
        <div class="activity-right">
          <div class="activity-title">{{item.title}}</div>
          <div class="activity-info">
            <div class="info">活动时间：{{item.time}}</div>
            <div class="info">活动人数：{{item.number}}</div>
            <div class="info">活动方式：{{item.mode}}</div>
            <div class="info">活动费用：{{item.fee}}</div>
          </div>
          <div class="activity-link" @click="tolink">查看</div>          
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityList: [],
    }
  },
  mounted() {
    this.getActivity();
  },
  methods: {
    tolink() {
      this.$router.push('/activity/item');
    },
    getActivity() {
      let that = this;
      var query = new this.$AV.Query('activity');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            src: res[i].attributes.img.attributes.url,
            title: res[i].attributes.title,
            time: that.$moment(res[i].attributes.time).format('YYYY-MM-DD'),
            number: res[i].attributes.number,
            mode: res[i].attributes.mode,
            fee: res[i].attributes.fee,
          });
        }
        that.activityList = arr;
      });
    },
  },
};
</script>
<style lang="scss" scope>
  .activity-list {
    padding: 50px 0;
    .the-activity {
      display: flex;
      margin-bottom: 20px;
      width: 100%;
      height: 330px;
      .activity-left {
        width: 380px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .activity-right {
        position: relative;
        margin-left: 9px;
        flex: 1;
        padding: 50px 65px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        .activity-title{
          margin-bottom: 31px;
          font-size: 24px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
        }
        .activity-info {
          .info {
            margin-bottom: 10px;
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(153,153,153,1);
          }
        }
        .activity-link {
          position: absolute;
          right: 36px;
          bottom: 30px;
          width: 120px;
          height: 45px;
          line-height: 45px;
          background: rgba(241,196,74,1);
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  }
</style>
