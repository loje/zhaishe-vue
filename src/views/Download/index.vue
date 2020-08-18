<template>
  <div class="max-width">
    <div class="the-layer">

      <div class="layer-right">
        <div class="recommend">
          <loading v-if="downloadBannerLoading"></loading>
          <swiper v-else :options="downloadSwiperOption" ref="leftSwiper">
            <template v-for="(item, $index) in downloadBanner">
            <swiper-slide :key="$index">
              <div class="img" :style="{backgroundImage:`url(${item.imgSrc})`}">
                <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
              </div>
            </swiper-slide>
            </template>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>

        <div class="tab-list">
          <div v-for="(item, $index) in tabList" :key="$index" :class="activeTab === item.value ? 'active tab' : 'tab'" @click="toggle(item.value)">{{item.label}}</div>
        </div>

        <div class="download-list">
          <loading v-if="downloadLoading"></loading>
          <template v-else>
          <div class="the-download" v-for="(item, $index) in downloadList" :key="$index">
            <div class="download-left">
              <div class="img" :style="{backgroundImage: `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
            </div>
            <div class="download-mid">
              <div class="title">{{item.title}}</div>
              <div class="info">
                <span>上传人：{{item.author}}</span>
                <span v-if="item.wechat">微信：{{item.wechat}}</span>
              </div>
            </div>
            <div class="download-right">
              <div class="btn" @click="dialogShow(item)">下载</div>
              <span>{{item.downloads}}</span>
            </div>
          </div>
          </template>
        </div>

        <div class="pages" v-if="downloadList.length > 0">
          <div class="prev" @click="getDownloadList(1)">首页</div>
          <div class="page-list">
            <div :class="pageDownload === item ? 'page active' : 'page'" v-for="item in downloadPages" :key="item" @click="getDownloadList(item)">{{item > 3 ? '···' : item}}</div>
          </div>
          <div class="next" @click="getDownloadList(pageDownload + 1)">下一页</div>
          <div class="last" @click="getDownloadList(downloadPages)">尾页</div>
        </div>
      </div>
    </div>

    <transition name="fade">
    <div class="dialog-layer" v-if="showContact">
      <div class="dialog-flex">
        <div class="dialog-block">
          <span class="close" @click="closeContact">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="title">加入灵感分享计划</div>
          <div class="input-group">
            <span>称呼：</span>
            <input type="text" v-model="inspiration.name" placeholder="您的称呼" />
          </div>
          <div class="input-group">
            <span>手机：</span>
            <input type="text" v-model="inspiration.phone" maxlength="11" placeholder="留下您的手机方便联系" />
          </div>
          <div class="error" v-if="inspiration.error">{{inspiration.error}}</div>

          <div class="btn" @click="comfilmContact">确定</div>
        </div>
      </div>
    </div>
    </transition>

    <downloadDialog :showDownload="showDownload" :dialog="dialog" @hide-download="showDownload = false" @open-link="openLink"></downloadDialog>

    <transition name="fade">
      <div class="dialog-layer" v-if="showFeedback">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="close" @click="showFeedback = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="feedback-content">
              <img src="http://files.zdesigner.cn/2020/01/07/833f0a7940b5b202804b20accfb30ab8.png" />
              <div class="title">宅设小编为您服务</div>
              <div class="content">我们运营小组已经收到了您的需求 会及时处理，请耐心等待哦，您也可以加入我们素材收集组</div>
              <div class="content" style="margin-top: 30px;">V：zhishehui01</div>
            </div>
            <div class="btn" style="width: 160px;" @click="showFeedback = false">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import loading from './../../components/Loading';
import './../../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import downloadDialog from './../../components/DownloadDialog';

export default {
  data() {
    return {
      downloadSwiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true,
        loop : true,
        delay: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        }
      },
      downloadBanner: [],
      downloadBannerLoading: false,
      tabList: [
        {
          label: '全部',
          value: '',
        },
        {
          label: 'banner',
          value: 1,
        },
        {
          label: 'H5',
          value: 2,
        },
        {
          label: 'Web',
          value: 3,
        },
        {
          label: 'App',
          value: 4,
        },
        {
          label: 'Logo',
          value: 5,
        },
        {
          label: '其他',
          value: 6,
        },
      ],
      activeTab: '',

      downloadList: [],
      downloadTotal: 0, // 总条数
      downloadPages: 2, // 总页数
      downloadLimit: 14, // 每页条数
      downloadLoading: false,
      skipDownload: 0, // 跳过数量
      pageDownload: 1, // 当前页数

      dialog: {},

      showContact: false,
      showDownload: false,

      showFeedback: false,

      inspiration: {
        name: '',
        phone: '',
        error: '',
      },
    }
  },
  components: {
    downloadDialog,
    loading,
    swiper,
    swiperSlide,
  },
  activated() {
    this.pageDownload = 1;
    this.getDownloadCount();
    this.getBanner();
  },
  methods: {
    toggle(i) {
      this.activeTab = i;
      this.getDownloadCount();
    },
    getBanner() {
      var query = this.$Bmob.Query('banner');
      let downloadBanner = [];

      query.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          if (res[i].position && res[i].position === 'download') {
            downloadBanner.push({
              id: res[i].objectId,
              imgSrc: res[i].imgSrc,
              link: res[i].link
            });
          }
        }
        this.downloadBanner = downloadBanner;
      });
    },
    getDownloadCount() {
      var query = this.$Bmob.Query('download');
      if (this.activeTab !== '') {
        query.equalTo('type', '==', this.activeTab);
      }
      query.equalTo('notDelete', '==', true);
      query.count().then((total) => {
        this.downloadTotal = total;
        this.downloadPages = parseInt(total / this.downloadLimit);
        if (total % this.downloadLimit > 0) {
          this.downloadPages = this.downloadPages + 1;
        }
        this.getDownloadList(this.pageDownload);
      });
    },
    getDownloadList(page) {
      if (page) {
        if (page > this.downloadPages) {
          this.pageDownload = this.downloadPages;
        } else if (page < 0) {
          this.pageDownload = 1;
        } else {
          this.pageDownload = page;
        }
      } else {
        this.pageDownload = 1
      }

      var query = this.$Bmob.Query('download');
      this.skipDownload = this.downloadLimit * (this.pageDownload - 1);

      let arr = [];
      query.order('-updatedAt');
      if (this.activeTab !== '') {
        query.equalTo('type', '==', this.activeTab);
      }
      query.equalTo('notDelete', '==', true);
      query.skip(this.skipDownload);
      query.limit(this.downloadLimit);
      this.downloadLoading = true;
      query.find().then((res) => {
        this.downloadLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            imgSrc: res[i].imgSrc,
            title: res[i].title,
            desc: res[i].desc,
            author: res[i].author,
            wechat: res[i].wechat,
            downloads: res[i].downloads,
            link: res[i].link,
            code: res[i].code,
          });
        }
        this.downloadList = arr;
      });
    },
    closeContact() {
      this.showContact = false;
      this.inspiration = {
        name: '',
        phone: '',
        error: '',
      };
    },
    comfilmContact() {
      if (!this.inspiration.name) {
        this.inspiration.error = '请输入称呼';
        return false;
      }
      if (!this.inspiration.phone) {
        this.inspiration.error = '请输入手机号码';
        return false;
      }

      if (this.inspiration.phone.length !== 11) {
        this.inspiration.error = '请输入11位的手机号码';
        return false;
      }

      this.inspiration.error = '';

      const query = this.$Bmob.Query('inspiration');
      if(this.inspiration.name) {
        query.set('name', this.inspiration.name);
      }
      if(this.inspiration.phone) {
        query.set('phone', this.inspiration.phone);
      }
      query.save().then(() => {
        this.loading = false;
        this.showContact = false;
        this.showFeedback = true;
        this.inspiration = {
          name: '',
          phone: '',
          error: '',
        };
      }),(error) => {
        console.log(error);
        this.loading = false;
      };
    },
    dialogShow(item) {
      if (!localStorage.getItem('memberInfo')) {
        alert('请先点右上角登录');
        return false;
      }
      console.log(item);
      this.dialog = item;
      this.showDownload = true;
    },
    openLink() {
      console.log(this.dialog);
      const query = this.$Bmob.Query('download');
      query.get(this.dialog.id).then((res) => {
        res.set('downloads', Number(res.downloads) + 1);
        res.save().then(() => {
          this.getDownloadCount();
          window.open(this.dialog.link);
        });
      }).catch(err => {
        console.log(err)
      });
    },
  },
};
</script>
<style>
  .recommend .swiper-pagination-bullet {
    border: 1px solid #fff;
    background: transparent;
    opacity: 1;
    box-sizing: border-box;
  }
  .recommend .swiper-pagination-bullet-active {
    background: #ffffff;
  }
</style>
<style lang="scss" scoped>

  .the-layer {
    padding: 30px 0;
    width: 100%;
    .layer-right {
      width: 100%;
      
      .recommend {
        width: 100%;

        .swiper-container{
          width: 100%;
          height: 230px;
          .swiper-slide {
            .img {
              width: 100%;
              height: 100%;
              background-position: 50%;
              background-size: cover;
              .link {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .tab-list {
        display: flex;
        margin-top: 20px;
        width: 100%;
        .tab {
          width: 100px;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          text-align: center;
          border-bottom: 5px solid transparent;
          cursor: pointer;
          &:hover, &.active {
            color: #F4C51D;
            border-color: #F4C51D;
          }
        }
      }

      .download-list {
        display: flex;
        padding: 30px;
        width: 100%;
        flex-wrap: wrap;
        box-sizing: border-box;
        background-color: #fff;
        .the-download {
          display: flex;
          margin-bottom: 25px;
          padding: 0 50px;
          width: 50%;
          box-sizing: border-box;
          .download-left {
            width: 16px;
            .img {
              width: 16px;
              height: 16px;
              background-color: #888;
              background-size: cover;
              background-position: 50%;
              border-radius: 50%;
            }
          }
          .download-mid {
            flex: 1;
            padding: 0 30px 0 5px;
            box-sizing: border-box;
            .title {
              font-size: 14px;
              line-height: 20px;
              font-weight: bold;
            }
            .info {
              margin-top: 5px;
              color: #888;
              span {
                margin-right: 32px;
                font-size: 12px;
              }
            }
          }
          .download-right {
            width: 40px;
            .btn {
              background-color: #F4C51D;
              width: 40px;
              height: 20px;
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              border-radius: 2px;
              cursor: pointer;
            }
            span {
              display: block;
              margin-top: 10px;
              font-size: 12px;
              line-height: 17px;
              text-align: center;
              color: #888;
            }
          }
        }
      }
      .pages {
        position: relative;
        margin-top: 30px;
        margin-bottom: 20px;
        padding-right:45px;
        width: 100%;
        height: 32px;
        text-align: right;
        box-sizing: border-box;
        .prev, .next, .last {
          display: inline-block;
          padding: 0 10px;
          vertical-align: middle;
          line-height: 32px;
          color: #333;
          font-size: 14px;
          border-radius: 2px;
          background: #e2e2e2;
        }
        .last {
          margin-left: 25px;
        }
        cursor: pointer;
        .page-list {
          display: inline-flex;
          margin: 0 15px;
          line-height: 32px;
          vertical-align: middle;
          .page {
            margin: 0 5px;
            width: 32px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: #333;
            text-align: center;
            border-radius: 2px;
            background: #e2e2e2;
            cursor: pointer;
            &:hover, &.active {
              background-color: #F4C51D;
            }
          }
        }
      }
    }
  }

  .dialog-layer {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    .dialog-flex {
      flex: 1;
      .dialog-block {
        position: relative;
        display: block;
        margin: auto;
        padding: 25px 30px 35px 30px;
        width: 340px;
        background-color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
        .close {
          position: absolute;
          right: 16px;
          top: 12px;
          cursor: pointer;
          z-index: 1;
        }
        .title {
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 22px;
          color: #333;
          text-align: center;
          font-weight: bold;
        }
        .input-group {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
          border: 1px solid #979797;
          border-radius: 2px;
          box-sizing: border-box;
          span {
            display: block;
            padding-left: 10px;
            min-width: 50px;
            font-size: 12px;
            color: #888;
            height: 36px;
            line-height: 36px;
          }
          input {
            flex: 1;
            border: none;
            outline: none;
            padding: 0;
            font-size: 12px;
            height: 36px;
            line-height: 36px;
          }
        }
        .error {
          margin-bottom: 30px;
          font-size: 12px;
          height: 17px;
          color: #E55D5D;
        }

        .btn {
          margin: auto;
          margin-top: 45px;
          width: 100px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          background-color: #F4C51D;
          color: #000;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
        }

        // 版权
        .cop-title {
          padding-top: 15px;
          color: #333;
          font-size: 16px;
          line-height: 22px;
          font-weight: bold;
          word-break: break-all;
        }
        .cop-content {
          color: #888;
          font-size: 12px;
          line-height: 18px;
        }

        // 反馈
        .feedback-content {
          img {
            display: block;
            margin: auto;
            width: 118px;
          }
          .title {
            margin-top: 36px;
            text-align: center;
            font-size: 16px;
            line-height: 22px;
            color: #333;
          }
          .content {
            padding: 0 15%;
            font-size: 12px;
            line-height: 17px;
            color: #333;
            text-align: center;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s, transform 0.25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
    transform: translate(0, -15px);
  }
  .fade-leave, .fade-enter-to {
    transform: translate(0, 0);
  }
</style>
