<template>
  <div>
    <div class="activity-list max-width" v-if="$route.path !== '/activity/item'">
      <div class="page-left">
      <template v-for="(item, $index) in activityList">
        <div class="the-activity" :key="$index">
          <div class="activity-left">
            <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
          </div>
          <div class="activity-right">
            <div class="activity-title">{{item.title}}</div>
            <div class="activity-desc">{{item.desc}}</div>

            <div class="activity-info">
              <div class="info">活动时间：{{item.time}}</div>
              <div class="info">活动人数：{{item.number}}</div>
              <div class="info">活动方式：{{item.mode}}</div>
              <div class="info">活动费用：{{item.fee}}</div>
            </div>
            <div class="activity-link" @click="tolink(item.id)">查看</div>          
          </div>
        </div>
      </template>
      </div>
      <div class="page-right">
        <div class="menu-list">
          <div @click="toggle('')" :class="active === '' ? 'menu active' : 'menu'">全部</div>

          <template v-for="(item, $index) in sortList">
          <div :key="$index" @click="toggle(item)" :class="active === item.id ? 'menu active' : 'menu'">{{item.sortName}}</div>
          </template>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sortList: [],
      activityList: [],
      active: '',
    }
  },
  activated() {
    this.getSortList();
    this.getActivity();
  },
  computed: {
    // 获取当前路由的子路由
    routes(){
      var routes = {
        children: this.$router.options.routes
      };
 
      var route = this.$route.matched;
 
      for(var i=0; i<route.length-1; i++){
        routes = routes.children.find((e) => (e.name == route[i].name));
      }
      return routes.children
    }
  },
  methods: {
    tolink(id) {
      this.$router.push({path: '/activity/item', query: {id}});
    },
    getSortList() {
      let that = this;
      var query = new this.$AV.Query('activity_sort');
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          that.sortList.push({
            id: res[i].id,
            sortName: res[i].get('sortName'),
          });
        }
      });
    },
    toggle(item) {
      if (item) {
        this.$router.push(`/activity?id=${item.id}`);
        this.active = item.id;
      } else {
        this.$router.push(`/activity`);
        this.active = '';
      }
      this.getActivity();
    },
    getActivity() {
      let that = this;
      var query = new this.$AV.Query('activity');
      var fileQuery = new this.$AV.Query('_File');
      var activityModeQuery = new this.$AV.Query('activity_mode');
      
      let arr = [];
      if (that.active) {
        query.equalTo('sort', that.$AV.Object.createWithoutData('activity_sort', that.active));
      }
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          fileQuery.get(res[i].get('img').id).then((img) => {
            activityModeQuery.get(res[i].get('mode').id).then((mode) => {
              arr.push({
                id: res[i].id,
                src: img.get('url'),
                title: res[i].get('title'),
                desc: res[i].get('desc'),
                time: that.$moment(res[i].attributes.time).format('YYYY-MM-DD'),
                number: res[i].get('number'),
                mode: mode.get('mode'),
                fee: res[i].get('fee'),
              });
            });
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
    display: flex;
    justify-content: baseline;
    padding: 50px 0;
    box-sizing: border-box;
    .page-left {
      width: 913px;
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
          padding: 39px 38px;
          height: 100%;
          background-color: #fff;
          border-radius: 10px;
          box-sizing: border-box;
          .activity-title{
            margin-bottom: 10px;
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: #333;
          }
          .activity-desc {
            margin-bottom: 20px;
            font-size: 18px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .activity-info {
            .info {
              margin-bottom: 10px;
              font-size: 16px;
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
            color: #333;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .page-right {
      margin-left: 20px;
      width: 300px;
      .menu-list {
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .menu {
          width: 100%;
          height: 80px;
          line-height: 80px;
          font-size: 18px;
          color: #333;
          text-align: center;
          &.active {
            background-color: #FFCB2B;
          }
        }
      }
    }
  }
</style>
