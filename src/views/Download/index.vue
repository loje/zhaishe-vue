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
          <input type="text" v-model="text" placeholder="请输入标题关键字" />
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

    <div class="dialog" v-if="visible === true">
      <div class="dialog-flex">
        <span class="dialog-close" @click="visible = false">关闭</span>
        <div class="dialog-title">{{dialog.title}}</div>
        <div class="line"></div>
        <div class="link">
          <a :href="dialog.link" target="blank">下载链接：{{dialog.link}}</a>
        </div>
        <div class="code">
          <div class="code-panel" id="inviteCode">{{dialog.code}}</div>
          <div class="copy" @click="copyit">复制</div>
        </div>
        <div class="tips">{{tips}}</div>
      </div>
      <div class="dialog-bg"></div>
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
      visible: false,
      dialog: {},
      tips: '复制百度云密码前往下载',
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
      var query = this.$Bmob.Query('download_sort');
      let arr = [];
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            name: res[i].name,
          });
        }
        this.sortList = arr;
      });
    },
    getDownload() {
      this.text = '';
      let that = this;
      var query = this.$Bmob.Query('download');
      let arr = [];
      // if (this.isActive !== '') {
      //   query.equalTo('sortId', '==', this.isActive);
      // }
      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          if (this.isActive !== '') {
            if (this.isActive === res[i].sort) {
              arr.push({
                objectId: res[i].objectId,
                src: res[i].imgSrc,
                title: res[i].title,
                link: res[i].link,
                code: res[i].code,
                downloads: res[i].downloads,
              });
            }
          } else {
            arr.push({
              objectId: res[i].objectId,
              src: res[i].imgSrc,
              title: res[i].title,
              link: res[i].link,
              code: res[i].code,
              downloads: res[i].downloads,
            });
          }
        }
        that.downloadList = arr;
      });
    },
    search() {
      let that = this;
      var query = this.$Bmob.Query('download');
      let arr = [];

      this.isActive = '';
      if (this.text !== '') {
        query.equalTo('title', '==', this.text);
      }
      query.find().then(function (res) {
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            objectId: res[i].objectId,
            src: res[i].imgSrc,
            title: res[i].title,
            link: res[i].link,
            code: res[i].code,
            downloads: res[i].downloads,
          });
        }
        that.downloadList = arr;
      });
    },
    download(data) {
      this.visible = true;
      this.dialog = data;
    },
    copyit() {
      const that = this;
      document.execCommand(this.dialog.code);
      // alert('已复制！');
      var Url2 = document.getElementById("inviteCode").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.tips = '密码复制成功！';
      let s = setTimeout(() => {
        that.tips = '复制百度云密码前往下载';
        clearTimeout(s);
      },2000);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 24px;
  font-family: PingFang SC Regular;
  color: #333;
}
.the-layer {
  margin-bottom: 20px;
  padding: 30px;
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
        margin-right: 30px;
        padding-bottom: 15px;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        cursor: pointer;
        &.active {
          color: #FFCB2B;
        }
      }
    }
    .search-bar {
      padding-bottom: 15px;
      input {
        padding: 0 15px;
        width: 160px;
        height: 34px;
        border-radius: 10px;
        background-color: #EBEBEB;
        border: none;
        outline: none;
        box-sizing: box-sizing;
      }
      span {
        margin-left: 12px;
        font-size: 14px;
        font-family: PingFang SC Regular;
        color: #FFCB2B;
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
      padding-right: 60px;
      padding-top: 20px;
      padding-bottom: 15px;
      width: 50%;
      box-sizing: border-box;
      border-bottom: 1px solid #EBEBEB;
      .media-left {
        width: 220px;
        .img {
          width: 220px;
          height: 110px;
          background-position: 50%;
          background-size: cover;
          background-color: #FFCB2B;
        }
      }
      .media-right {
        flex: 1;
        padding-left: 25px;
        .media-t {
          font-size: 16px;
          font-family: PingFang SC Regular;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .media-info {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          .author {
            font-size: 14px;
            font-family: PingFang SC Regular;
            color: #333;
          }
          a {
            font-size: 14px;
            font-family: PingFang SC Regular;
            color: rgba(92,157,255,1);
            cursor: pointer;
          }
        }
      }
    }
  }
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .dialog-flex {
    position: relative;
    padding: 10px;
    width: 640px;
    height: 350px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    z-index: 1;
    .dialog-close {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      color: #333;
    }
    .dialog-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 145px;
      font-size: 24px;
      word-break: break-all;
      color: #333;
    }
    .line {
      width: 100%;
      height: 1px;
      border-top: 1px dotted #EBEBEB;
    }
    .link {
      padding-top: 15px;
      a {
        color: #5C9DFF;
        font-size: 14px;
      }
    }
    .code {
      padding-top: 15px;
      text-align: center;
      .code-panel {
        display: inline-block;
        vertical-align: middle;
        width: 200px;
        height: 40px;
        line-height: 40px;
        background-color: #EBEBEB;
        color: #333;
        border-radius: 10px;
      }
      .copy {
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        color: #333333;
      }
    }
    .tips {
      padding-top: 30px;
      color: #999;
      font-size: 14px;
    }
  }
  .dialog-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.75);
    z-index: 0;
  }
}
</style>
