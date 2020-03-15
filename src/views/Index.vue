<template>
  <div class="home">
    <div class="swiper-layer">
      <div class="max-width">
        <div class="swiper-box">
          <div class="box-left">
            <loading v-if="bannerLoading"></loading>
            <swiper v-else :options="leftSwiperOption" ref="leftSwiper">
              <template v-for="(item, $index) in bannerLeft">
              <swiper-slide :key="$index">
                <div class="img" :style="{backgroundImage:`url(${item.imgSrc})`}">
                  <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
                </div>
              </swiper-slide>
              </template>
            </swiper>
          </div>
          <div class="box-right">
            <loading v-if="bannerLoading"></loading>
            <swiper v-else :options="rightSwiperOption" ref="rightSwiper">
              <template v-for="(item, $index) in bannerRight">
              <swiper-slide :key="$index">
                <div class="img" :style="{backgroundImage:`url(${item.imgSrc})`}">
                  <a :href="item.link" v-if="item.link" class="link" target="blank"></a>
                </div>
              </swiper-slide>
              </template>
            </swiper>
          </div>
        </div>

        <div class="layer">
          <div class="layer-flex">
            <div class="layer-title">
              <div class="icon" style="background-image: url('http://files.zdesigner.cn/2019/12/28/e7eaec524071ce948069035ac5b91ff7.png');background-size: cover;"></div>
              <div class="title">Eagle素材包</div>
              <div class="more" @click="$router.push('./download')">
                <i class="iconfont">&#xe649;</i>
              </div>
            </div>
            <div class="layer-list">
              <div class="list-item" v-for="(item, $index) in downloadList" :key="$index" @click="dialogShow(item)">
                <div class="icon" :style="{'background-image': `url(http://files.zdesigner.cn/2020/02/27/8ab5a6ee40d57e448012b8083b68f496.png)`}"></div>
                <div class="title">{{item.title}}</div>
                <div class="item-right">{{item.author}}</div>
              </div>
            </div>
          </div>
          <div class="layer-flex">
            <div class="layer-title">
              <div class="icon">
                <i class="iconfont">&#xe62b;</i>
              </div>
              <div class="title">设计师工具</div>
              <div class="more" @click="$router.push({path: '/tools'})">
                <i class="iconfont">&#xe649;</i>
              </div>
            </div>
            <div class="layer-block">
              <div class="block-item" v-for="(item, $index) in recommendList" :key="$index" @click="$router.push(`/tools/item/${item.id}`)">
                <div class="icon" :style="{'background-image': `url(${item.imgSrc})`}"></div>
                <div class="title">{{item.title}}</div>
              </div>
              <div class="block-item more-item" @click="showRecommend = true">
                <div class="icon">加入宅设</div>
                <div class="title">其他</div>
              </div>
            </div>
          </div>
          <div class="layer-flex">
            <div class="layer-title">
              <div class="icon">
                <i class="iconfont" style="color:#197AFF;">&#xe665;</i>
              </div>
              <div class="title">私单墙</div>
              <div class="more" @click="goPrivate">
                <i class="iconfont">&#xe649;</i>
              </div>
              <!-- <div class="handle">
                <div class="prev" @click="getPrivateList(pagePri - 1)">
                  <i class="iconfont">&#xe693;</i>
                </div>
                <div class="next" @click="getPrivateList(pagePri + 1)">
                  <i class="iconfont">&#xe600;</i>
                </div>
              </div> -->
            </div>
            <div class="layer-list">
              <div class="list-item" v-for="(item, $index) in privateList" :key="$index" :title="item.title" @click="privateShow(item)">
                <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
                <div class="title">{{item.remark}}</div>
                <div class="item-right">
                  <template v-if="item.isNewst">
                    <div style="display: inline-block;width: 56px;height: 20px;background-color: #f4751d;color:#fff;text-align: center;">新任务</div>
                  </template>
                  <template v-else>{{item.createdAt}}</template>
                </div>
              </div>
            </div>
            <!-- <div class="pulish">
              <span>我要发布</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="activity-layer">
      <div class="max-width">
        <div class="layer-title">
          <div class="title">深圳同城</div>
          <div class="layer-nav">
            <div :class="actTab === '宅设主办' ? 'nav active' : 'nav'" @click="getActCount('宅设主办')">宅设主办</div>
            <div :class="actTab === '其他活动' ? 'nav active' : 'nav'" @click="getActCount('其他活动')">其他活动</div>
          </div>
          <div class="pages">
            <div class="prev" @click="getActivity(actTab, (pageAct - 1))">上一页</div>
            <div class="page-list">
              <div :class="pageAct === item ? 'page active' : 'page'" v-for="item in actPages" :key="item" @click="getActivity(actTab, item)">{{item > 3 ? '···' : item}}</div>
            </div>
            <div class="next" @click="getActivity(actTab, (pageAct + 1))">下一页</div>
          </div>
        </div>

        <div class="activity-list">
          <template v-if="activityList.length === 0">
            <div style="text-align:center; color:#999;">暂无数据</div>
          </template>
          <template v-else>
            <div class="the-activity" v-for="(item, $index) in activityList" :key="$index">
              <div class="activity-left">
                <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
              </div>
              <div class="activity-mid">
                <div class="title"><span v-if="pageAct === 1 && $index === 0">最新活动</span>{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="tag">
                  <span>
                    <template v-if="item.sort === 1">宅设主办</template>
                    <template v-else-if="item.sort === 2">推荐活动</template>
                    <template v-else-if="item.sort === 3">合作活动</template>
                    <template v-else-if="item.sort === 4">探讨会</template>
                  </span>
                  <span class="sort">活动标签：
                    <template v-if="item.mode === 1">线下活动</template>
                    <template v-else-if="item.mode === 2">线上直播</template>
                  </span>
                  <span class="time">{{item.startTime}} ~ {{item.endTime}}</span>
                  <span class="num">参与人数：{{item.number}}</span>
                </div>
              </div>
              <div class="activity-right">
                <div class="btn" @click="$router.push(`/activity/item/${item.id}`)">查看活动</div>
                <div class="price">￥{{item.fee}}</div>
                <div class="toggle" @click="toggle($index)" v-if="item.agendaList"><i :class="item.toggleStatus === true ? 'iconfont show' : 'iconfont'">&#xe667;</i>查看分享人</div>
              </div>
              <div class="speaker-list" v-show="item.toggleStatus === true" v-if="item.agendaList">
                <div class="speaker" v-for="(i, $index) in item.agendaList" :key="$index">
                  <div class="img" :style="{backgroundImage: `url(${i.imgSrc})`}"></div>
                  <div class="speaker-right">
                    <div class="title">{{i.title}}</div>
                    <div class="theme">《{{i.theme}}》</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="designer-layer">
      <div class="max-width">
        <div class="layer-title">
          <div class="title">宅设分享人<span>宅设大咖组</span></div>
          <div class="more" @click="$router.push('/designer')">
            <i class="iconfont">&#xe649;</i>
          </div>
        </div>
        <div class="people-box" @mouseenter="on_bot_enter" @mouseleave="on_bot_leave">
          <loading v-if="designerLoading"></loading>
          <swiper v-else :options="designerSwiperOption" ref="designerSwiper">
            <template v-for="(item, $index) in designerList">
            <swiper-slide :key="$index">
            <div class="box">
              <div class="img" :style="{backgroundImage: `url(${item.src})`}"></div>
              <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="title">
                  {{item.info}}
                </div>
                <div class="btn">个人链接</div>
                <div class="get" @click="orderIt(item)">找他接单</div>
              </div>
            </div>
            </swiper-slide>
            </template>
          </swiper>
        </div>
      </div>
    </div>
    <div class="btm-bannner">
      <img src="../assets/img/btm_tips.png" />
    </div>

    <downloadDialog :showDownload="showDownload" :dialog="dialog" @hide-download="showDownload = false" @open-link="openLink"></downloadDialog>

    <transition name="fade">
    <div class="dialog-layer" v-if="showRecommend">
      <div class="dialog-flex">
        <div class="dialog-block">
          <span class="close" @click="closeRecommend">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="title">填写你推荐的产品</div>
          <div class="input-group">
            <span>称呼</span>
            <input type="text" v-model="recommend.name" placeholder="您的称呼" />
          </div>
          <div class="input-group">
            <span>电话</span>
            <input type="text" v-model="recommend.phone" maxlength="11" placeholder="您的联系电话" />
          </div>
          <div class="input-group">
            <span>微信</span>
            <input type="text" v-model="recommend.wechatId" />
          </div>
          <div class="input-group">
            <span>备注</span>
            <textarea v-model="recommend.remark" rows="4" placeholder="描述你的推荐内容"></textarea>
          </div>

          <div class="error" v-if="recommend.error">{{recommend.error}}</div>

          <div class="btn" @click="comfilmRecommend">确定</div>
        </div>
      </div>
    </div>
    </transition>

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
            <div class="btn" @click="showFeedback = false">确定</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="dialog-layer" v-if="showOrder">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="close" @click="showOrder = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="order-designer">
              <img :src="order.src" />
              <div class="name">{{order.sharerName}}</div>
            </div>
              
            <div class="input-group">
              <span>称呼：</span>
              <input type="text" v-model="order.name" placeholder="您的称呼" />
            </div>
            <div class="input-group">
              <span>您的联系方式：</span>
              <input type="text" v-model="order.phone" placeholder="留下您电话方便联系" />
            </div>
            <div class="input-group" style="height:auto;">
              <textarea v-model="order.content" placeholder="填写您的需求" rows="8"></textarea>
            </div>
            <div class="error" v-if="order.error">{{order.error}}</div>
            <div class="btn" @click="closeContact">确定</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="dialog-layer" v-if="showPrivate">
        <div class="dialog-flex">
          <div class="dialog-block">
            <span class="right">
              <template v-if="privateDialog.isNewst">
                <div style="width: 56px;height: 20px;background-color: #f4751d;color:#fff;text-align: center;">新任务</div>
              </template>
              <template v-else>{{privateDialog.createdAt}}</template>
            </span>
            <div class="title">{{privateDialog.title || '私单墙详情'}}</div>
            <div class="remark-box">{{privateDialog.remark}}</div>
            <div class="private-user">姓名：{{privateDialog.name}}</div>
            <div class="private-user">微信：{{privateDialog.wechatId}}</div>
            <div class="private-user">电话：{{privateDialog.phone}}</div>
            <div class="btn" @click="showPrivate = false">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import loading from './../components/Loading';
import './../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import downloadDialog from './../components/DownloadDialog';

export default {
  components: {
    loading,
    swiper,
    swiperSlide,
    downloadDialog,
  },
  data() {
    return {
      leftSwiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        autoplay: true,
        loop : true,
        delay: 1000,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      rightSwiperOption: {
        autoplay: false,
        loop : true,
        delay: 1000,
        direction : 'vertical',
        slidesPerView : 2,
        spaceBetween : 20,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      bannerLeft: [],
      bannerRight: [],
      bannerLoading: false,

      recommendList: [],
      recommendLoading: false,

      actTab: '宅设主办',
      actTotal: 0, // 总条数
      actPages: 0, // 总页数
      actLimit: 3, // 每页条数
      activityList: [],
      activityLoading: false,
      skipAct: 0, // 跳过数量
      pageAct: 1, // 当前页数

      downloadList: [],
      downloadLoading: false,

      designerList: [],
      designerLoading: false,

      designerSwiperOption: {
        autoplay: true,
        loop : true,
        delay: 1000,
        slidesPerView: 5,
        spaceBetween: 40,
      },

      showPrivate: false,
      privateDialog: {},
      privateList: [],
      // priTotal: 0,
      // priPages: 0,
      priLimit: 6,
      // skipPri: 0, // 跳过数量
      // pagePri: 1, // 当前页数

      showDownload: false,
      dialog: {},

      showRecommend: false,
      recommend: {
        name: '',
        phone: '',
        wechatId: '',
        remark: '',
        error: '',
      },

      showFeedback: false,
      showOrder: false,
    }
  },
  computed: {
    swiper() {
      return this.$refs.leftSwiper.swiper;
    }
  },
  mounted() {
    this.getDesigner();
    this.getActCount('宅设主办');
    this.getBanner();
    this.getRecommend();
    this.getPrivateList();
    this.getDownload();
  },
  methods: {
    getBanner() {
      var query = this.$Bmob.Query('banner');
      let bannerLeft = [];
      let bannerRight = [];
      this.bannerLoading = true;
      query.find().then((res) => {
        this.bannerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          if (res[i].position && res[i].position === 'left') {
            bannerLeft.push({
              id: res[i].id,
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            });
          }
          if (res[i].position && res[i].position === 'right') {
            bannerRight.push({
              id: res[i].objectId,
              imgSrc: res[i].imgSrc,
              link: res[i].link,
            });
          }
        }
        this.bannerLeft = bannerLeft;
        this.bannerRight = bannerRight;
      });
    },
    getRecommend() {
      var query = this.$Bmob.Query('product');
      let arr = [];
      this.recommendLoading = true;
      query.equalTo('recommend', '===', true);
      query.equalTo('status', '===', 0);
      query.equalTo('notDelete', '===', true);
      query.find().then((res) => {
        this.recommendLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            title: res[i].title,
            imgSrc: res[i].imgSrc
          });
        }
        this.recommendList = arr;
      });
    },
    // getPrivateCount() {
    //   let privateQuery = this.$Bmob.Query('private_orders');
    //   privateQuery.equalTo('notDelete', '==', true);
    //   privateQuery.count().then((total) => {
    //     this.priTotal = total;
    //     this.priPages = parseInt(total / this.priLimit);
    //     if (total % this.priLimit > 0) {
    //       this.priPages = this.priPages + 1;
    //     }
    //     this.getPrivateList(1);
    //   });
    // },
    getPrivateList() {
      // if (page) {
      //   if (page > this.priPages) {
      //     this.pagePri = this.priPages;
      //   } else if (page < 0) {
      //     this.pagePri = 1;
      //   } else {
      //     this.pagePri = page;
      //   }
      // } else {
      //   this.pagePri = 1
      // }

      let privateQuery = this.$Bmob.Query('private_orders');
      // this.skipPri = this.priLimit * (this.pagePri - 1);
      privateQuery.order('-createdAt');
      privateQuery.equalTo('notDelete', '==', true);
      privateQuery.equalTo('audit', '==', true);
      privateQuery.equalTo('online', '==', true);
      // privateQuery.skip(this.skipPri);
      privateQuery.limit(this.priLimit);
      privateQuery.find().then((res) => {
        for (let i = 0; i < res.length; i += 1) {
          let day = parseInt((new Date().getTime() - new Date(res[i].createdAt).getTime()) / 86400000);
          if (day > 1) {
            res[i].createdAt = `${day}天前发布`;
            res[i].isNewst = false;
          } else {
            res[i].createdAt = `新任务`;
            res[i].isNewst = true;
          }
        }
        this.privateList = res;
      });
    },
    privateShow(item) {
      this.showPrivate = true;
      this.privateDialog = item;
    },
    getActCount(actTab) {
      console.log(actTab);
      var query = this.$Bmob.Query('activity');
      query.equalTo('notDelete', '==', true);
      if (actTab === '宅设主办') {
        query.equalTo('sort', '==', 1);
      } else {
        query.equalTo('sort', '!=', 1);
      }
      query.count().then((total) => {
        this.actTotal = total;
        this.actPages = parseInt(total / this.actLimit);
        if (total % this.actLimit > 0) {
          this.actPages = this.actPages + 1;
        }
        this.getActivity(actTab, 1);
      });
    },
    getActivity(actTab, page) {
      console.log(page);
      this.actTab = actTab;

      if (page) {
        if (page > this.actPages) {
          this.pageAct = this.actPages;
        } else if (page < 0) {
          this.pageAct = 1;
        } else {
          this.pageAct = page;
        }
      } else {
        this.pageAct = 1
      }
      
      var query = this.$Bmob.Query('activity');
      this.skipAct = this.actLimit * (this.pageAct - 1);

      let arr = [];
      query.order('-endTime');
      query.equalTo('notDelete', '==', true);
      if (actTab === '宅设主办') {
        query.equalTo('sort', '==', 1);
      } else {
        query.equalTo('sort', '!=', 1);
      }

      query.skip(this.skipAct);
      query.limit(this.actLimit);
      this.activityLoading = true;
      query.find().then((res) => {
        this.activityLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          for (let key in res[i].startTime) {
            if (key === 'iso') {
              res[i].startTime = res[i].startTime[key];
            }
          }
          for (let key in res[i].endTime) {
            if (key === 'iso') {
              res[i].endTime = res[i].endTime[key];
            }
          }
          arr.push({
            id: res[i].objectId,
            title: res[i].title,
            imgSrc: res[i].imgSrc,
            desc: res[i].desc,
            status: res[i].status,
            sort: res[i].sort,
            mode: res[i].mode,
            number: res[i].number,
            fee: res[i].fee,
            startTime: res[i].startTime,
            endTime: res[i].endTime,
            toggleStatus: false,
            agendaList: res[i].agenda ? JSON.parse(res[i].agenda) : undefined,
          });
        }
        this.activityList = arr;
      });
    },
    getDownload() {
      var query = this.$Bmob.Query('download');
      let arr = [];
      this.designerLoading = true;
      query.order('-updatedAt');
      query.equalTo('notDelete', '===', true);
      query.equalTo('isTop', '===', true);
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          let sort = this.$Bmob.Query('download_sort');
          sort.get(res[i].sort).then((s) => {
            if (s.name === 'Eagle分类素材包') {
              arr.push({
                id: res[i].objectId,
                title: res[i].title,
                sort: s.name,
                imgSrc: res[i].imgSrc,
                author: res[i].author,
                desc: res[i].desc,
                wechat: res[i].wechat,
                downloads: res[i].downloads,
                link: res[i].link,
                code: res[i].code,
              });
            }
          });
        }
        this.downloadList = arr;
      });
    },
    getDesigner() {
      var query = this.$Bmob.Query('designer');
      let arr = [];
      this.designerLoading = true;
      query.equalTo('isTop', '===', true);
      query.find().then((res) => {
        this.designerLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          arr.push({
            id: res[i].objectId,
            src: res[i].img,
            info: res[i].info,
            name: res[i].name,
          });
        }
        this.designerList = arr;
      });
    },
    toActivity(id) {
      this.$router.push({
        path: '/activity/item',
        query: { id },
      })
    },
    toggle(i) {
      for (let x = 0; x < this.activityList.length; x += 1) {
        if (x !== i) {
          this.activityList[x].toggleStatus = false;
        }
      }
      this.activityList[i].toggleStatus = !this.activityList[i].toggleStatus;
    },
    on_bot_enter() {
      console.log('进来了');
      this.$refs.designerSwiper.swiper.autoplay.stop();
    },
    on_bot_leave() {
      console.log('出去了');
      this.$refs.designerSwiper.swiper.autoplay.start();
    },


    dialogShow(item) {
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
          window.open(this.dialog.link);
        });
      }).catch(err => {
        console.log(err)
      });
    },

    closeRecommend() {
      this.recommend = {};
      this.showRecommend = false;
    },
    comfilmRecommend() {
      if (!this.recommend.name) {
        this.recommend.error = '请输入称呼';
        return false;
      }
      if (!this.recommend.phone) {
        this.recommend.error = '请输入手机号码';
        return false;
      }

      if (this.recommend.phone.length !== 11) {
        this.recommend.error = '请输入11位的手机号码';
        return false;
      }

      if (!this.recommend.wechatId) {
        this.recommend.error = '请输入微信号';
        return false;
      }

      if (!this.recommend.remark) {
        this.recommend.error = '请输入推荐内容';
        return false;
      }

      this.recommend.error = '';

      const query = this.$Bmob.Query('recommend');
      if(localStorage.getItem('memberInfo')) {
        const userPointer = this.$Bmob.Pointer('_User');
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set('user', userID);
      }
      if(this.recommend.name) {
        query.set('name', this.recommend.name);
      }
      if(this.recommend.phone) {
        query.set('phone', this.recommend.phone);
      }
      if(this.recommend.wechatId) {
        query.set('wechatId', this.recommend.wechatId);
      }
      if(this.recommend.remark) {
        query.set('remark', this.recommend.remark);
      }
      query.save().then(() => {
        this.showRecommend = false;
        this.showFeedback = true;
        this.recommend = {
          name: '',
          phone: '',
          wechatId: '',
          remark: '',
          error: '',
        };
      });
    },

    closeContact() {
      if (!this.order.name) {
        this.order.error = '请输入您的称呼';
        return false;
      }

      if (!this.order.phone) {
        this.order.error = '请输入您的联系方式';
        return false;
      }

      if (!this.order.content) {
        this.order.error = '请输入您的需求';
        return false;
      }

      this.order.error = '';

      const query = this.$Bmob.Query('sharer_order');

      const sharerPointer = this.$Bmob.Pointer('sharer');
      const sharerID = sharerPointer.set(this.order.sharerId)

      query.set('sharerId', sharerID);
      if(this.order.name) {
        query.set('name', this.order.name);
      }
      if(this.order.phone) {
        query.set('phone', this.order.phone);
      }
      if(this.order.content) {
        query.set('content', this.order.content);
      }

      query.save().then(() => {
        this.showOrder = false;
        this.showFeedback = true;
        this.order = {
          sharerId: '',
          src: '',
          name: '',
          phone: '',
          content: '',
        };
      });
    },
    orderIt(item) {
      this.showOrder = true;
      this.order = {
        ...this.order,
        sharerName: item.name,
        src: item.src,
        sharerId: item.id,
      };
    },
    goPrivate() {
      if (!localStorage.getItem('memberInfo')) {
        alert('请先点右上角登录');
        return false;
      }
      const memberInfo = localStorage.getItem('memberInfo');
      this.$router.push({
        path: '/user/private',
        query: {
          code: JSON.parse(memberInfo).objectId,
        },
      });
    },
  },
}
</script>

<style lang="scss" scope>
  .swiper-layer {
    .swiper-box {
      position: relative;
      display: flex;
      margin-top: 30px;
      margin-bottom: 40px;
      width: 100%;
      height: 340px;
      overflow: visible;
      z-index: 0;
      .box-left {
        padding-right: 20px;
        width: 730px;
        height: 100%;
        background-position: 50%;
        background-size: cover;
        .swiper-container{
          width: 100%;
          height: 100%;
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
      .box-right {
        width: 370px;
        .swiper-container{
          width: 100%;
          height: 100%;
          .swiper-slide {
            .img {
              width: 100%;
              height: 100%;
              background-position: 50%;
              background-size: cover;
            }
          }
        }
      }
    }
    .swiper-pagination-bullet-active {
      background-color: #fff;
    }
    .layer {
      position: relative;
      z-index: 1;
    }
  }

  .layer {
    display: flex;
    width: 100%;
    margin-bottom: 40px;
    justify-content: space-between;
    .layer-flex {
      position: relative;
      padding: 20px;
      height: 260px;
      width: 350px;
      background-color: #fff;
      overflow: hidden;
      box-sizing: border-box;
      .layer-title {
        position: relative;
        margin-bottom: 20px;
        padding-right: 50px;
        width: 100%;
        height: 22px;
        box-sizing: border-box;
        .icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          vertical-align: middle;
          i {
            font-size: 22px;
            color: #EDB61B;
          }
        }
        .title {
          display: inline-block;
          margin-left: 10px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 22px;
          vertical-align: middle;
        }
        .more {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #F2F2F2;
          color: #F4C51D;
          font-size: 24px;
          border-radius: 2px;
          transition: all ease 0.25s;
          cursor: pointer;
          i {
            display: block;
            font-size: 22px;
            line-height: 22px;
          }
          &:hover {
            border-color: #F4C51D;
          }
        }
        .handle {
          position: absolute;
          right: 0;
          top: -4px;
          display: flex;
          .prev, .next {
            width: 20px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border: 1px solid #F2F2F2;
            border-radius: 2px;
            cursor: pointer;
            i {
              color: #F4C51D;
            }
            &:hover {
              border-color: #F4C51D;
            }
          }
          .prev{
            margin-right: 15px;
          }
        }
      }
      .layer-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        .list-item {
          position: relative;
          display: flex;
          margin-bottom: 13px;
          align-items: center;
          width: 100%;
          font-size: 12px;
          line-height: 20px;
          cursor: pointer;
          i {
            display: block;
          }
          .title {
            flex: 1;
            padding-left: 5px;
            height: 20px;
            color: #888;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .item-right {
            width: 80px;
            text-align: right;
            color: #888;
          }
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            .title {
              color: #F4C51D;
            }
            .item-right {
              color: #F4C51D;
            }
          }
        }
      }
      .pulish {
        position: absolute;
        left: 0;
        bottom: 15px;
        display: block;
        margin: auto;
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: rgba(244,117,29,1);
        line-height: 17px;
        span {
          cursor: pointer;
        }
      }

      .layer-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .block-item {
          margin-bottom: 10px;
          width: 33.33%;
          height: 90px;
          cursor: pointer;
          .icon {
            margin: auto;
            width: 50px;
            height: 50px;
            background-position: 50%;
            background-size: cover;
          }
          .title {
            margin-top: 10px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }

          &.more-item {
            .icon {
              display: flex;
              align-items: center;
              padding: 0 10px;
              border: 2px solid #F2F2F2;
              box-sizing: border-box;
              font-size: 12px;
              color: #888;
            }
          }
        }
      }
    }
  }

  .activity-layer {
    background-color: #fff;
    .max-width {
      margin: auto;
      .layer-title {
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #F2F2F2;
        box-sizing: border-box;
        .title {
          padding-left: 10px;
          width: 280px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 50px;
          vertical-align: middle;
        }
        .layer-nav {
          flex: 1;
          display: flex;
          .nav {
            margin: 0 30px;
            height: 50px;
            line-height: 50px;
            border-bottom: 4px solid transparent;
            box-sizing: border-box;
            cursor: pointer;
            &:hover, &.active {
              color: #F4C51D;
              border-bottom: 4px solid #F4C51D;
            }
          }
        }
        .pages {
          .prev {
            display: inline-block;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            font-size: 12px;
            color: #888;
            cursor: pointer;
          }
          .page-list {
            display: inline-block;
            vertical-align: middle;
            .page {
              display: inline-block;
              width: 34px;
              height: 50px;
              line-height: 50px;
              vertical-align: middle;
              text-align: center;
              cursor: pointer;
              font-weight: bold;
              transition: all ease 0.25s;
              &.more {
                color: #D8D8D8;
                font-weight: normal;
                letter-spacing: 4px;
              }
              &:hover, &.active {
                background-color: #F4C51D;
                color: #000;
              }
            }
          }
          .next {
            display: inline-block;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            font-size: 12px;
            color: #888;
            cursor: pointer;
          }
        }
      }

      .activity-list {
        width: 100%;
        .the-activity {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 60px;
          width: 100%;
          &:last-child {
            margin-bottom: 0;
          }
          .activity-left {
            width: 280px;
            height: 160px;
            .img {
              width: 280px;
              height: 160px;
              background-color: #888;
              border-radius: 3px;
              background-position: 50%;
              background-size: cover;
            }
          }
          .activity-mid {
            position: relative;
            flex: 1;
            height: 160px;
            padding: 0 30px;
            box-sizing: border-box;
            .title {
              margin-bottom: 10px;
              font-size: 20px;
              font-family: PingFangSC;
              font-weight: 600;
              color: #262626;
              line-height: 32px;
              span {
                display: inline-block;
                margin-right: 10px;
                padding: 0 5px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                font-weight: normal;
                border: 1px solid #FF5D01;
                border-radius: 2px;
                color: #FF5D01;
                vertical-align: middle;
              }
            }
            .desc {
              font-size: 14px;
              color: #888;
              line-height: 24px;
            }
            .tag {
              position: absolute;
              left: 30px;
              bottom: 0;
              width: 100%;
              font-size: 12px;
              line-height: 17px;
              span {
                color: #262626;
              }
              .sort {
                color: #888;
                margin-left: 25px;
              }
              .time {
                color: #888;
                margin-left: 25px;
              }
              .num {
                color: #888;
                margin-left: 25px;
              }
            }
          }
          .activity-right {
            position: relative;
            width: 100px;
            height: 160px;
            text-align: right;
            .btn {
              display: inline-block;
              width: 100px;
              height: 40px;
              line-height: 38px;
              text-align: center;
              cursor: pointer;
              border-radius: 3px;
              border: 1px solid #F4C51D;
              box-sizing: border-box;
              font-size: 14px;
              font-weight: bold;
              color: #262626;
              &:hover {
                background-color: rgba(244,197,29,0.30);
              }
            }
            .price {
              margin-top: 10px;
              width: 100px;
              font-size: 16px;
              font-weight: 600;
              color: rgba(244,117,29,1);
              line-height: 22px;
              text-align: center;
            }
            .toggle {
              position: absolute;
              right: 0;
              bottom: 0;
              color: #2B2B2B;
              font-size: 12px;
              cursor: pointer;
              i {
                display: inline-block;
                margin-right: 5px;
                height: 12px;
                font-size: 12px;
                color: #231916;
                transform: rotate(0deg);
                transition: transform 0.25s linear;
                &.show {
                  transform: rotate(-180deg);
                }
              }
            }
          }
          .speaker-list {
            margin-top: 20px;
            width: 100%;
            background-color: #FCFCFC;
            white-space:nowrap;
            overflow: auto;
            .speaker {
              display: inline-block;
              padding: 19px 30px;
              vertical-align: middle;
              .img {
                display: inline-block;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background-color: #999;
                vertical-align: middle;
                background-size: cover;
              }
              .speaker-right {
                display: inline-block;
                vertical-align: middle;
                padding-left: 15px;
                .title {
                  font-size: 14px;
                  line-height: 20px;
                  color: #2B2B2B;
                }
                .theme {
                  margin-top: 10px;
                  font-size: 12px;
                  line-height: 17px;
                  color: #2B2B2B;
                }
              }
            }
          }
        }
      }
    }
  }

  .designer-layer {
    padding-top: 50px;
    padding-bottom: 30px;
    background-color: #fff;
    .max-width {
      margin: auto;
      .layer-title {
        position: relative;
        margin-bottom: 20px;
        padding-right: 50px;
        width: 100%;
        height: 22px;
        box-sizing: border-box;
        .title {
          display: inline-block;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #383838;
          line-height: 22px;
          vertical-align: middle;
          span {
            margin-left: 20px;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(136,136,136,1);
            line-height: 20px;
          }
        }
        .more {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border: 1px solid #F2F2F2;
          letter-spacing: 2px;
          color: #F4C51D;
          font-size: 24px;
          border-radius: 2px;
          transition: all ease 0.25s;
          cursor: pointer;
          &:hover {
            border-color: #F4C51D;
          }
          i {
            display: block;
            font-size: 22px;
            line-height: 22px;
          }
        }
      }
      .people-box {
        width: 100%;
        .box {
          position: relative;
          width: 100%;
          height: 340px;
          border: 1px solid #D8D8D8;
          overflow: hidden;
          box-sizing: border-box;
          .img {
            position: relative;
            width: 100%;
            height: 230px;
            background-color: #fff;
            background-position: 50%;
            background-size: cover;
            z-index: 0;
          }
          .info {
            position: absolute;
            left: 0;
            bottom: -150px;
            padding: 25px 15px 15px 15px;
            width: 100%;
            height: 260px;
            background-color: #fff;
            box-sizing: border-box;
            transition: all ease-in-out 0.25s;
            &:hover {
              bottom: 0px;
            }
            .name {
              font-size: 16px;
              line-height: 20px;
              font-family: PingFang SC Regular;
              color: #383838;
            }
            .title {
              margin-top: 20px;
              color: #888;
              font-size: 12px;
              line-height: 17px;
              span {
                margin-top: 3px;
                display: block;
                &:first-child {
                  margin-top: 0;
                }
              }
            }
            .btn {
              display: block;
              margin-top: 40px;
              width: 66px;
              height: 25px;
              line-height: 25px;
              text-align: center;
              color: #333;
              font-size: 12px;
              text-align: center;
              border-radius: 2px;
              background-color: #F4C51D;
              cursor: pointer;
            }
            .get {
              margin-top: 50px;
              font-size: 16px;
              font-family: PingFangSC;
              font-weight: bold;
              color: rgba(51,51,51,1);
              line-height: 22px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .btm-bannner {
    width: 100%;
    background-image: url(../assets/img/btm_tips.png);
    background-position: 50%;
    background-color: #fff;
    img {
      display: block;
      margin: auto;
      max-width: 100%;
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
          right: 12px;
          top: 12px;
          line-height: 12px;
          cursor: pointer;
          z-index: 1;
          i {
            font-size: 12px;
          }
        }
        .right {
          float: right;
          font-size: 12px;
          color: #333333;
          line-height: 17px;
        }
        .title {
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 22px;
          color: #333;
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
          textarea {
            flex: 1;
            border: none;
            outline: none;
            padding: 10px;
            font-size: 12px;
            resize: none;
            box-sizing: border-box;
          }
        }

        .error {
          margin-bottom: 30px;
          font-size: 12px;
          height: 17px;
          color: #E55D5D;
        }

        .remark-box {
          margin-bottom: 25px;
          padding: 15px;
          width: 100%;
          height: 90px;
          background-color: #f2f2f2;
          color: #888;
          font-size: 12px;
          box-sizing: border-box;
        }

        .private-user {
          margin-top: 8px;
          font-size: 12px;
          color: #888;
          line-height: 17px;
        }

        .btn {
          margin: auto;
          margin-top: 25px;
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

        // 找他接单
        .order-designer {
          padding-bottom: 40px;
          img {
            display: block;
            margin: auto;
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
          .name {
            margin-top: 10px;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #333;
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
