<template>
  <div class="activity-page">
    <div class="page-top">
      <div class="max-width">
        <div class="top-left">深圳同城</div>
        <div class="top-right">
          <div
            :class="actTab === '展览展会' ? 'btn active' : 'btn'"
            @click="toggleTab('展览展会')"
          >
            展览展会
          </div>
          <div
            :class="actTab === '知识分享' ? 'btn active' : 'btn'"
            @click="toggleTab('知识分享')"
          >
            知识分享
          </div>
          <div
            :class="actTab === '休闲娱乐' ? 'btn active' : 'btn'"
            @click="toggleTab('休闲娱乐')"
          >
            休闲娱乐
          </div>
          <div
            :class="actTab === '生活趣味' ? 'btn active' : 'btn'"
            @click="toggleTab('生活趣味')"
          >
            生活趣味
          </div>
        </div>
      </div>
    </div>
    <div class="max-width">
      <div class="activity-list">
        <!-- <template v-else> -->
        <template v-for="(item, $index) in activityList">
          <div class="the-activity" :key="$index" v-if="item">
            <div class="activity-left">
              <div
                class="img"
                :style="{ backgroundImage: `url(${item.imgSrc})` }"
              ></div>
            </div>
            <div class="activity-mid">
              <div
                class="title"
                @click="$router.push(`/activity/item/${item.id}`)"
              >
                {{ item.title }}
              </div>
              <div class="right-info">
                <span
                  class="the-price"
                  v-if="!item.maxPrice && !item.maxPrice && !item.fee"
                  >免费</span
                >
                <span
                  class="the-price"
                  v-else-if="
                    !item.maxPrice ||
                    !item.maxPrice ||
                    item.maxPrice === item.minPrice
                  "
                  >{{ item.minPrice }}元</span
                >
                <span class="the-price" v-else
                  >{{ item.minPrice }} ~ {{ item.maxPrice }}元</span
                >
                <template v-for="(i, $index) in item.mode">
                  <span class="mode" :key="$index">{{ i }}</span>
                </template>
              </div>
              <div class="desc">{{ item.desc }}</div>
              <div class="right-btm">
                <span class="num">报名人数：{{ item.number }}</span>
                <span class="count">已报名：{{ item.count }}</span>
              </div>
            </div>
            <div class="activity-right">
              <div
                class="btn will"
                @click="$router.push(`/activity/item/${item.id}`)"
                v-if="item.actStatus === 1"
              >
                未开始
              </div>
              <div
                class="btn"
                @click="$router.push(`/activity/item/${item.id}`)"
                v-else-if="item.actStatus === 2"
              >
                我要报名 >
              </div>
              <div
                class="btn end"
                @click="$router.push(`/activity/item/${item.id}`)"
                v-else-if="item.actStatus === 3"
              >
                已结束
              </div>

              <div
                class="toggle"
                @click="toggle($index)"
                v-if="item.agendaList"
              >
                活动阵容
              </div>
            </div>
            <div
              class="agenda-layer"
              v-show="item.toggleStatus === true"
              v-if="item.agendaList"
            >
              <swiper :options="agendaSwiperOption" ref="agendaSwiper">
                <template v-for="(is, $index) in item.agendaSwiperList">
                  <swiper-slide :key="$index">
                    <div class="speaker-list">
                      <div class="speaker" v-for="(i, $i) in is" :key="$i">
                        <div
                          class="img"
                          :style="{ backgroundImage: `url(${i.imgSrc})` }"
                        ></div>
                        <div class="speaker-right">
                          <div class="title">{{ i.title }}</div>
                          <div class="theme">《{{ i.theme }}》</div>
                          <div class="position">{{ i.theTitle }}</div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </template>
              </swiper>
              <div class="swiper-agenda swiper-agenda-prev swiper-button-prev">
                <i class="iconfont">&#xe693;</i>
              </div>
              <div class="swiper-agenda swiper-agenda-next swiper-button-next">
                <i class="iconfont">&#xe600;</i>
              </div>
            </div>
          </div>
        </template>
        <!-- </template> -->

        <loading v-if="loading === true"></loading>
      </div>

      <div class="activity-more" v-if="loading === false && activityList.length > 0">
        <svg
          t="1601123457837"
          class="icon"
          viewBox="0 0 1316 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3756"
          width="32"
          height="32"
        >
          <path
            d="M660.066171 593.786006a67.289506 67.289506 0 0 1-41.397675-120.535985L1207.890519 14.218565a67.289506 67.289506 0 0 1 82.795348 106.346676L701.463845 579.596697a67.289506 67.289506 0 0 1-41.397674 14.189309zM658.310792 988.453587h-1.755378a67.289506 67.289506 0 0 1-41.397674-14.189309L25.935717 515.232822a67.289506 67.289506 0 0 1 82.795349-106.200394L658.310792 837.19848l549.579727-428.166052a67.289506 67.289506 0 0 1 82.795348 106.200394L701.463845 974.264278a67.582069 67.582069 0 0 1-43.153053 14.189309zM656.555414 593.932288a67.289506 67.289506 0 0 1-41.397674-14.189309L25.935717 120.565241A67.289506 67.289506 0 0 1 108.731066 14.218565l589.222022 459.031456a67.289506 67.289506 0 0 1-41.397674 120.535985z"
            fill="#f4751d"
            p-id="3757"
          ></path>
        </svg>
        <span @click="getMore">点击加载更多</span>
      </div>
    </div>

    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>
<script>
import loading from "@/components/Loading";
import Tips from "@/components/Tips";
import "@/assets/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      loading: false,
      actTab: "展览展会",

      activityList: [],
      agendaSwiperOption: {
        autoplay: true,
        loop: false,
        delay: 1000,
        navigation: {
          nextEl: ".swiper-agenda-next",
          prevEl: ".swiper-agenda-prev",
        },
      },
      skipAct: 0,
      skipLimit: 5,

      tipsText: "",
      tipsType: "",
    };
  },
  components: {
    loading,
    Tips,
    swiper,
    swiperSlide,
  },
  activated() {
    this.toggleTab("展览展会");
  },
  mounted() {
    // window.addEventListener("scroll", this.windowScroll);
  },

  methods: {
    // windowScroll() {
    //   // 滚动条距离页面顶部的距离
    //   // 以下写法原生兼容
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;

    //   // if (scrollTop + window.innerHeight > document.body.scrollHeight - 321) {
    //   //   this.isScoll = false;
    //   // } else {
    //   //   this.isScoll = true;
    //   //   if (scrollTop > 160) {
    //   //     this.fixTop = 60;
    //   //   } else {
    //   //     this.fixTop = this.$refs.layoutLeft.getBoundingClientRect().top;
    //   //   }
    //   // }
    //   if (scrollTop + window.innerHeight === document.body.scrollHeight) {
    //     this.skipAct = this.skipAct + 5;
    //     this.getActivity(this.actTab);
    //   }
    // },
    toggle(i) {
      for (let x = 0; x < this.activityList.length; x += 1) {
        if (x !== i) {
          this.activityList[x].toggleStatus = false;
        }
      }
      this.activityList[i].toggleStatus = !this.activityList[i].toggleStatus;
		},
		toggleTab(actTab) {
			this.actTab = actTab;
			this.skipAct = 0;
			this.activityList = [];
			this.getActivity();
		},
    async getActivity() {
			this.loading = true;
			let arr = [];

      // 获取活动列表
      const query = this.$Bmob.Query("activity");
      query.order("-endTime");
      query.equalTo("notDelete", "==", true);
      query.equalTo("status", "==", 1);
      query.skip(this.skipAct);
      query.limit(this.skipLimit);
      if (this.actTab === "展览展会") {
        query.equalTo("sort", "==", 1);
      } else if (this.actTab === "知识分享") {
        query.equalTo("sort", "==", 2);
      } else if (this.actTab === "休闲娱乐") {
        query.equalTo("sort", "==", 3);
      } else if (this.actTab === "生活趣味") {
        query.equalTo("sort", "==", 4);
      }
      query.order("-endTime");
      let res = await query.find();

      for (let i = 0; i < res.length; i += 1) {
        for (let key in res[i].startTime) {
          if (key === "iso") {
            res[i].startTime = res[i].startTime[key];
          }
        }
        for (let key in res[i].endTime) {
          if (key === "iso") {
            res[i].endTime = res[i].endTime[key];
          }
        }

        if (res[i].agenda) {
          let index = 0;
          let newArray = [];
          while (index < JSON.parse(res[i].agenda).length) {
            newArray.push(JSON.parse(res[i].agenda).slice(index, (index += 3)));
          }
          res[i].agendaSwiperList = newArray;
        }

        if (Date.now() < new Date(res[i].startTime).getTime()) {
          res[i].actStatus = 1;
        } else if (
          Date.now() > new Date(res[i].startTime).getTime() &&
          Date.now() < new Date(res[i].endTime).getTime()
        ) {
          res[i].actStatus = 2;
        } else if (Date.now() > new Date(res[i].endTime).getTime()) {
          res[i].actStatus = 3;
        }
			}
			
			for (let i = 0; i < res.length; i += 1) {
				const skusQuery = this.$Bmob.Query('skus');
				let activityPointer = this.$Bmob.Pointer('activity');
				const activityID = activityPointer.set(res[i].objectId);
				skusQuery.equalTo('activityId', '==', activityID);
				let respon = await skusQuery.find();

				var apQuery = this.$Bmob.Query('activity_person');
				apQuery.equalTo('activity', '==', activityID);
				let count = await apQuery.count();

				this.activityLoading = false;
				let ar = [];
				let num = 0;
				for (let j = 0; j < respon.length; j += 1) {
					num = respon[j].attrNum + num;
					ar.push(respon[j].attrPrice);
				}
				if (ar.length > 0) {
					res[i].maxPrice = ar.sort(function(a,b){return a-b})[ar.length - 1];
					res[i].minPrice = ar.sort(function(a,b){return a-b})[0];
				}

				const jsonData = {
					id: res[i].objectId,
					title: res[i].title,
					imgSrc: res[i] && res[i].imgSrc ? res[i].imgSrc : '',
					desc: res[i].desc,
					number: num,
					count,
					maxPrice: res[i].maxPrice,
					minPrice: res[i].minPrice,
					status: res[i].status,
					sort: res[i].sort,
					mode: res[i].mode || [],
					startTime: res[i].startTime,
					endTime: res[i].endTime,
					actStatus: res[i].actStatus,
					toggleStatus: false,
					agendaList: res[i].agenda ? JSON.parse(res[i].agenda) : undefined,
					agendaSwiperList: res[i].agenda ? res[i].agendaSwiperList : undefined,
				};
				this.$set(arr, i, jsonData);
			}

      if (res.length === this.skipLimit) {
        this.activityList = this.activityList.concat(arr);
      } else {
				if (this.activityList.length > 0) {
        this.skipAct = this.skipAct - this.skipLimit;
        this.tipsText = "所有活动已加载完";
        this.tipsType = "success";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1000);
				} else {
        this.skipAct = 0;
        this.tipsText = "该分类下暂无活动";
        this.tipsType = "success";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1000);
				}
			}
      this.loading = false;
			
    },

    getMore() {
      this.skipAct = this.skipAct + this.skipLimit;
      this.getActivity(this.actTab);
    },
    // getActivity(actTab) {
    //   this.loading = true;
    //   this.actTab = actTab;

    //   let arr = [];

    //   const query = this.$Bmob.Query('activity');
    //   query.order('-endTime');
    //   query.equalTo('notDelete', '==', true);
    //   query.equalTo('status', '==', 1);
    //   query.skip(this.skipAct);
    //   query.limit(5)

    //   if (actTab === '展览展会') {
    //     query.equalTo('sort', '==', 1);
    //   } else if (actTab === '知识分享') {
    //     query.equalTo('sort', '==', 2);
    //   } else if (actTab === '休闲娱乐') {
    //     query.equalTo('sort', '==', 3);
    //   } else if (actTab === '生活趣味') {
    //     query.equalTo('sort', '==', 4);
    //   }
    //   query.order('-endTime');
    //   query.find().then((res) => {
    //     this.loading = false;
    //     for (let i = 0; i < res.length; i += 1) {
    //       for (let key in res[i].startTime) {
    //         if (key === 'iso') {
    //           res[i].startTime = res[i].startTime[key];
    //         }
    //       }
    //       for (let key in res[i].endTime) {
    //         if (key === 'iso') {
    //           res[i].endTime = res[i].endTime[key];
    //         }
    //       }

    //       if (res[i].agenda) {
    //         let index = 0;
    //         let newArray = [];
    //         while(index < JSON.parse(res[i].agenda).length) {
    //           newArray.push(JSON.parse(res[i].agenda).slice(index, index += 3));
    //         }
    //         res[i].agendaSwiperList = newArray;
    //       }
    //       if (Date.now() < new Date(res[i].startTime).getTime()) {
    //         res[i].actStatus = 1
    //       } else if (Date.now() > new Date(res[i].startTime).getTime() && Date.now() < new Date(res[i].endTime).getTime()) {
    //         res[i].actStatus = 2
    //       } else if (Date.now() > new Date(res[i].endTime).getTime()) {
    //         res[i].actStatus = 3
    //       }

    //       const skusQuery = this.$Bmob.Query('skus');
    //       let activityPointer = this.$Bmob.Pointer('activity');
    //       const activityID = activityPointer.set(res[i].objectId);
    //       skusQuery.equalTo('activityId', '==', activityID);
    //       skusQuery.find().then((respon) => {

    //         var apQuery = this.$Bmob.Query('activity_person');
    //         apQuery.equalTo('activity', '==', activityID);
    //         apQuery.count().then((count) => {
    //           this.activityLoading = false;
    //           let ar = [];
    //           let num = 0;
    //           for (let j = 0; j < respon.length; j += 1) {
    //             num = respon[j].attrNum + num;
    //             ar.push(respon[j].attrPrice);
    //           }
    //           if (ar.length > 0) {
    //             res[i].maxPrice = ar.sort(function(a,b){return a-b})[ar.length - 1];
    //             res[i].minPrice = ar.sort(function(a,b){return a-b})[0];
    //           }

    //           const jsonData = {
    //             id: res[i].objectId,
    //             title: res[i].title,
    //             imgSrc: res[i] && res[i].imgSrc ? res[i].imgSrc : '',
    //             desc: res[i].desc,
    //             number: num,
    //             count,
    //             maxPrice: res[i].maxPrice,
    //             minPrice: res[i].minPrice,
    //             status: res[i].status,
    //             sort: res[i].sort,
    //             mode: res[i].mode || [],
    //             startTime: res[i].startTime,
    //             endTime: res[i].endTime,
    //             actStatus: res[i].actStatus,
    //             toggleStatus: false,
    //             agendaList: res[i].agenda ? JSON.parse(res[i].agenda) : undefined,
    //             agendaSwiperList: res[i].agenda ? res[i].agendaSwiperList : undefined,
    //           };
    //           this.$set(arr, i, jsonData);
    //         });
    //       });
    //     }
    //     this.activityList = arr;
    //   })
    // },
  },
};
</script>
<style lang="scss" scope>
.activity-page {
  .page-top {
    width: 100%;
    height: 90px;
    background-color: #fff;
    box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.05);
    .max-width {
      display: flex;
      height: 100%;
      align-items: center;
      .top-left {
        color: #383838;
        font-size: 18px;
        line-height: 25px;
        font-weight: 600;
      }
      .top-right {
        display: flex;
        padding-left: 140px;
        .btn {
          margin-right: 20px;
          width: 110px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #eee;
          font-size: 12px;
          color: #333;
          border-radius: 2px;
          cursor: pointer;
          transition: all 250ms ease;
          &:hover,
          &.active {
            color: #f4c51d;
            border-color: #f4c51d;
          }
        }
      }
    }
  }
  .activity-list {
    padding-top: 50px;
    .the-activity {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
      padding: 25px;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      .activity-left {
        width: 260px;
        height: 160px;
        border-radius: 2px;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          background-position: 50%;
          background-size: auto 100%;
          background-repeat: no-repeat;
          transition: all 250ms ease;
          &:hover {
            background-size: auto 120%;
          }
        }
      }
      .activity-mid {
        position: relative;
        flex: 1;
        padding-left: 30px;
        .title {
          font-size: 20px;
          line-height: 32px;
          color: #333;
          cursor: pointer;
          transition: all 250ms ease;
        }
        .right-info {
          display: flex;
          align-items: flex-end;
          margin-top: 10px;
          color: #f4751d;
          .the-price {
            margin-right: 20px;
            font-size: 20px;
          }
          .mode {
            margin-right: 10px;
            padding: 0 10px;
            height: 20px;
            line-height: 20px;
            background-color: #f5f5f5;
            color: #999999;
            font-size: 10px;
          }
        }
        .desc {
          margin-top: 10px;
          font-size: 14px;
          color: #888;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .right-btm {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          padding-left: 30px;
          width: 100%;
          box-sizing: border-box;
          .num,
          .count {
            font-size: 14px;
            color: #888;
          }
          .count {
            margin-left: 30px;
          }
        }
      }
      .activity-right {
        position: relative;
        width: 100px;
        height: 165px;
        text-align: right;
        .btn {
          display: inline-block;
          width: 100px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          border-radius: 19px;
          font-size: 14px;
          color: #fff;
          background-color: #f4751d;
          box-sizing: border-box;
          cursor: pointer;
          &.end,
          &.will {
            background-color: #f5f5f5;
            color: #9b9b9b;
          }
        }
        .toggle {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 73px;
          height: 25px;
          line-height: 25px;
          color: #f4c51d;
          font-size: 12px;
          border: 1px solid #eeeeee;
          border-radius: 2px;
          text-align: center;
          cursor: pointer;
        }
      }
      .agenda-layer {
        position: relative;
        margin-top: 20px;
        padding: 0 100px;
        width: 100%;
        background-color: #fcfcfc;
        box-sizing: border-box;
        .speaker-list {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          .speaker {
            padding: 19px 0;
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
                color: #2b2b2b;
              }
              .theme {
                margin-top: 10px;
                font-size: 12px;
                line-height: 17px;
                color: #2b2b2b;
              }
              .position {
                margin-top: 5px;
                font-size: 12px;
                line-height: 17px;
                color: #999999;
              }
            }
          }
        }
      }
      &:hover {
        .activity-mid {
          .title {
            color: #f4c51d;
          }
        }
      }
    }
  }

  .activity-more {
    display: flex;
    margin-bottom: 30px;
    padding: 15px 0;
    justify-content: center;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
    }
    span {
      margin-left: 10px;
      cursor: pointer;
      font-size: 14px;
      color: #f4751d;
    }
  }
}
</style>
