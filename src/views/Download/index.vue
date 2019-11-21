<template>
  <div class="max-width">
    <div class="title">下载专区</div>
    <div class="the-layer">
      <div class="layer-bar">
        <div class="tabs">
          <div :class="isActive === '' ? 'tab active' : 'tab'" @click="toggleTab('')">所有</div>
          <div :class="isActive === item.id ? 'tab active' : 'tab'" v-for="(item, $index) in sortList" :key="$index" @click="toggleTab(item.id)">{{item.name}}</div>
        </div>
        <div class="search-bar">
          <input type="text" v-model="text" />
          <span @click="search">搜索</span>
        </div>
      </div>
      
      <div class="tab-content">
        <template v-for="(item, $index) in downloadList">
        <div class="media" :key="$index">
          <div class="media-left">
            <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
          </div>
          <div class="media-right">
            <div class="media-t">{{item.title}}</div>
            <div class="media-info">
              <span class="author">宅设小编</span>
              <a @click="download(item, $index)">下载</a>
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
      sortList: [],
      downloadList: [],
      isActive: '',
      text: '2019',
    }
  },
  mounted() {
    this.getSort();
    this.getDownload();
  },
  methods: {
    toggleTab(id) {
      this.isActive = id;
      this.getDownload();
    },
    getSort() {
      const that = this;
      var query = new this.$AV.Query('download_sort');
      let arr = [];
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].attributes.id,
            name: res[i].attributes.name,
          });
        }
        that.sortList = arr;
      });
    },
    getDownload() {
      this.text = '';
      let that = this;
      var query = new this.$AV.Query('download');
      let arr = [];
      if (this.isActive !== '') {
        query.equalTo('sortId', this.isActive);
      }
      query.find().then(function (res) {
        console.log(res);
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            objectId: res[i].id,
            id: res[i].attributes.id,
            src: res[i].attributes.img ? res[i].attributes.img.attributes.url : undefined,
            title: res[i].attributes.title,
            downloads: res[i].attributes.downloads,
          });
        }
        that.downloadList = arr;
      });
    },
    search() {
      let that = this;
      var query = new this.$AV.Query('download');
      let arr = [];
      if (this.isActive !== '') {
        query.equalTo('sortId', this.isActive);
      }
      if (this.text !== '') {
        query.contains('title', this.text);
      }
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            objectId: res[i].id,
            id: res[i].attributes.id,
            src: res[i].attributes.img ? res[i].attributes.img.attributes.url : undefined,
            title: res[i].attributes.title,
            downloads: res[i].attributes.downloads,
          });
        }
        that.downloadList = arr;
      });
    },
    download(item, i) {
      var update = this.$AV.Object.createWithoutData('download', item.objectId);
      let newCouter = item.downloads + 1
      update.set('downloads', newCouter);
      update.save().then(() => {
        this.downloadList[i].downloads = newCouter;
      }),((error) => {
        console.log(error);
      });
    },
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
.the-layer {
  padding: 41px 34px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  .layer-bar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EBEBEB;
    .tabs {
      flex: 1;
      .tab {
        display: inline-block;
        margin-right: 65px;
        padding-bottom: 26px;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: rgba(51,51,51,1);
        cursor: pointer;
        &.active {
          color: #E3BE4C;
        }
      }
    }
    .search-bar {
      padding-bottom: 26px;
      input {
        width: 165px;
        height: 34px;
        border-radius: 10px;
        background-color: #EBEBEB;
        border: none;
        outline: none;
      }
      span {
        margin-left: 12px;
        font-size: 14px;
        font-family: PingFang SC Regular;
        color: rgba(227,190,76,1);
        cursor: pointer;
      }
    }
  }

  .tab-content {
    display: flex;
    flex-wrap: wrap;
    .media {
      display: flex;
      align-items: center;
      padding-right: 84px;
      padding-top: 45px;
      padding-bottom: 50px;
      width: 50%;
      box-sizing: border-box;
      border-bottom: 1px solid #EBEBEB;
      .media-left {
        width: 220px;
        .img {
          width: 100%;
          height: 110px;
          background-position: 50%;
          background-size: cover;
          background-color: #E3BE4C;
        }
      }
      .media-right {
        flex: 1;
        padding-left: 25px;
        .media-t {
          font-size: 18px;
          font-family: PingFang SC Regular;
          color: rgba(51,51,51,1);
        }
        .media-info {
          display: flex;
          margin-top: 16px;
          justify-content: space-between;
          .author {
            font-size: 13px;
            font-family: PingFang SC Regular;
            color: rgba(51,51,51,1);
          }
          a {
            font-size: 13px;
            font-family: PingFang SC Regular;
            color: rgba(92,157,255,1);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
