<template>
  <div class="activity-page">
    <div class="max-width">
      <div class="activity-detail">
        <div class="activity-info">
          <div class="info-left">
            <div class="info-img" :style="{backgroundImage: `url(${info.imgSrc})`}"></div>
            <div class="the-info">
              <div class="info-title">
                活动时间：
                <span>{{info.starttime}} - {{info.endtime}}</span>
              </div>
              <div class="info-title">
                活动地点：
                <span>{{info.address || '地点不限'}}</span>
              </div>
              <div class="info-title">
                报名人数：
                <span>{{info.number}} / {{info.count}}人</span>
              </div>
            </div>
          </div>
          <div class="info-right">
            <div class="title">{{info.title}}</div>
            <div class="desc">{{info.desc}}</div>

            <div class="price-bar">
              <!-- <div class="the-price">
                价格
                <span
                  class="val"
                  v-if="!info.maxPrice || !info.maxPrice || (info.maxPrice === info.minPrice)"
                >{{info.price || info.minPrice}}元</span>
                <span class="val" v-else>{{info.minPrice}} ~ {{info.maxPrice}}元</span>
              </div> -->

                <template v-if="info.maxPrice !== undefined && info.minPrice !== undefined">
                  <div class="the-price">
                    价格
                  <template v-if="info.maxPrice === info.minPrice">
                    <span class="val" v-if="info.minPrice > 0">{{info.minPrice}}元</span>
                    <span class="val" v-else>免费</span>
                  </template>
                  <span class="val" v-else>{{info.minPrice}} ~ {{info.maxPrice}}元</span>
                  </div>
                </template>
                <template v-else>
                  <div class="the-price">
                  尚未设置价格
                  </div>
                </template>


              <div :class="info.isliked ? 'like isliked' : 'like'" @click="bindlike(info)">
                <i class="iconfont">&#xe602;</i>
                {{info.likes}}
              </div>
            </div>

            <div class="edit-sku" v-if="!info.isShow">
              <div class="title">选择购买套餐</div>
              <div class="attrs">
                <template v-for="(item, $index) in attrs">
                  <div
                    :class="info.actStatus === 2  && item.attrNum > 0  ? (selectAttr.objectId === item.objectId ? 'attr active':'attr') : 'attr disabled'"
                    :key="$index"
                    @click="selSku(item)"
                  >{{item.attrName}}-{{item.attrPrice}}元</div>
                </template>
              </div>
            </div>
            <div class="edit-sku" v-else>
              <div class="attrs">
                <div class="attr disabled">活动公示</div>
              </div>
            </div>

            <div class="activity-status">
              <template v-if="info.actStatus === 1">活动未开始</template>
              <template v-else-if="info.actStatus === 3">活动已经结束</template>
            </div>
          </div>
        </div>

        <div class="activity-agenda" v-if="info.agendaList">
          <div class="activity-title">分享阵容</div>
          <div class="agenda-layer">
            <div class="speaker-list">
              <div class="speaker" v-for="(i, $i) in info.agendaList" :key="$i">
                <div class="img" :style="{backgroundImage: `url(${i.imgSrc})`}"></div>
                <div class="speaker-right">
                  <div class="title">{{i.title}}</div>
                  <div class="theme">《{{i.theme}}》</div>
                  <div class="position">{{i.theTitle}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="activity-content">
          <div class="title">活动详情</div>
          <article v-html="info.content"></article>
        </div>
      </div>
    </div>

    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>
<script>
import Tips from "@/components/Tips";

export default {
  data() {
    return {
      info: {},

      attrs: [],
      selectAttr: "",

      tipsText: "",
      tipsType: "",
    };
  },
  components: {
    Tips,
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    selSku(item) {
      if (!localStorage.getItem("memberInfo")) {
        this.tipsText = "请先点右上角登录";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }

      if (item.attrNum === 0) {
        return false;
      }

      if (this.info.actStatus !== 2) {
        return false;
      }

      const that = this;
      const checkSkus = this.$Bmob.Query("skus");
      checkSkus.get(item.objectId).then((res) => {
        if (res.attrNum === 0) {
          that.getInfo();
          that.tipsText = "当前选择套餐已售罄，请选择其他套餐";
          that.tipsType = "error";
          let t = setTimeout(() => {
            that.tipsText = "";
            clearTimeout(t);
          }, 1500);
        } else {
          const payment = {
            id: this.$route.params.id,
            imgSrc: this.info.imgSrc,
            title: this.info.title,
            desc: this.info.desc,
            likes: this.info.likes,
            isliked: this.info.isliked,
            amount: 1,
            attrName: item.attrName,
            selectAttrId: item.objectId,
            price: item.attrPrice,

            starttime: this.info.starttime,
            endtime: this.info.endtime,
            address: this.info.address,
            number: this.info.number,
            count: this.info.count,
          };
          localStorage.setItem("payment", JSON.stringify(payment));
          that.$router.push("/activity/payment");
        }
      });
    },
    getInfo() {
      this.loading = true;
      var query = this.$Bmob.Query("activity");
      query.get(this.$route.params.id).then((res) => {
        this.loading = false;
        for (let key in res.startTime) {
          if (key === "iso") {
            this.info.starttime = res.startTime[key];
          }
        }
        for (let key in res.endTime) {
          if (key === "iso") {
            this.info.endtime = res.endTime[key];
          }
        }

        if (Date.now() < new Date(this.info.starttime).getTime()) {
          this.info.actStatus = 1;
        } else if (
          Date.now() > new Date(this.info.starttime).getTime() &&
          Date.now() < new Date(this.info.endtime).getTime()
        ) {
          this.info.actStatus = 2;
        } else if (Date.now() > new Date(this.info.endtime).getTime()) {
          this.info.actStatus = 3;
        }

        if (res.agenda) {
          res.agendaList = JSON.parse(res.agenda);
        }

        this.info = {
          ...this.info,
          imgSrc: res.imgSrc,
          title: res.title,
          desc: res.desc,
          address: res.address,
          agendaList: res.agendaList,
          content: res.content,
          isShow: res.isShow,
        };

        let skuquery = this.$Bmob.Query("skus");
        skuquery.equalTo("activityId", "===", this.$route.params.id);
        skuquery.find().then((r) => {
          this.attrs = r;
          let ar = [];
          let number = 0;
          for (let o = 0; o < r.length; o += 1) {
            number = r[o].attrNum + number;
            ar.push(r[o].attrPrice);
          }
          this.info = {
            ...this.info,
            number,
            maxPrice: ar.sort(function (a, b) {
              return a - b;
            })[ar.length - 1],
            minPrice: ar.sort(function (a, b) {
              return a - b;
            })[0],
          };
          this.getBuyerCount();
        });

        let likeCountQuery = this.$Bmob.Query("like_list");
        likeCountQuery.equalTo("activity", "==", this.$route.params.id);
        likeCountQuery.find().then((likesCount) => {
          this.$set(this.info, "likes", likesCount.length);

          if (likesCount.length > 0 && localStorage.getItem("memberInfo")) {
            let likeQuery = this.$Bmob.Query("like_list");
            likeQuery.equalTo("activity", "==", this.$route.params.id);
            likeQuery.equalTo(
              "user",
              "==",
              JSON.parse(localStorage.getItem("memberInfo")).objectId
            );
            likeQuery.find().then((like) => {
              if (like.length > 0) {
                this.$set(this.info, "isliked", like[0].objectId);
              }
            });
          }
        });
      });
    },

    getBuyerCount() {
      const pointer = this.$Bmob.Pointer("activity");
      const poiID = pointer.set(this.$route.params.id);

      const buyerCount = this.$Bmob.Query("activity_person");
      buyerCount.equalTo("activity", "==", poiID);
      buyerCount.count().then((count) => {
        console.log(count);
        this.info = {
          ...this.info,
          count,
        };
      });
    },
    bindlike(item) {
      const that = this;
      if (!localStorage.getItem("memberInfo")) {
        alert("请先点右上角登录");
        return false;
      }
      let likeQuery = this.$Bmob.Query("like_list");

      if (item.isliked) {
        likeQuery.destroy(item.isliked).then(() => {
          that.$set(that.info, "isliked", "");
          that.$set(that.info, "likes", item.likes - 1);
        });
      } else {
        let activityPointer = this.$Bmob.Pointer("activity");
        const activityID = activityPointer.set(this.$route.params.id);

        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(
          JSON.parse(localStorage.getItem("memberInfo")).objectId
        );
        likeQuery.set("activity", activityID);
        likeQuery.set("user", userID);
        likeQuery.save().then((res) => {
          that.$set(this.info, "isliked", res.objectId);
          that.$set(this.info, "likes", item.likes + 1);
        });
      }
    },
  },
};
</script>
<style lang="scss" scope>
.activity-page {
  .activity-detail {
    margin: 50px 0;
    padding: 50px 100px;
    background-color: #fff;
    box-sizing: border-box;
    .activity-info {
      display: flex;
      margin-bottom: 40px;
      .info-left {
        width: 300px;
        .info-img {
          width: 300px;
          height: 160px;
          background-position: 50%;
          background-size: cover;
          border: 1px solid #eee;
          box-sizing: border-box;
        }
        .the-info {
          padding: 20px;
          width: 300px;
          border: 1px solid #eee;
          border-top: none;
          box-sizing: border-box;
          .info-title {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #666;
            span {
              font-weight: normal;
            }
          }
        }
      }
      .info-right {
        flex: 1;
        padding-left: 40px;
        box-sizing: border-box;
        .title {
          margin-bottom: 10px;
          font-size: 20px;
          line-height: 32px;
          color: #262626;
          font-weight: 600;
        }
        .desc {
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 24px;
          color: #888;
        }
        .price-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 20px;
          width: 100%;
          height: 60px;
          background-color: #fbfbfb;
          box-sizing: border-box;
          .the-price {
            font-size: 14px;
            line-height: 20px;
            color: #f4751d;
            .val {
              font-size: 20px;
            }
          }
          .like {
            width: 66px;
            height: 26px;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid #d8d8d8;
            color: #888888;
            font-size: 10px;
            line-height: 26px;
            text-align: center;
            cursor: pointer;
            i {
              font-size: 10px;
            }
            &:hover,
            &.isliked {
              border-color: #f4751d;
              color: #f4751d;
            }
          }
        }

        .edit-sku {
          .title {
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            font-weight: bold;
          }
          .attrs {
            display: flex;
            padding-bottom: 20px;
            flex-wrap: wrap;
            .attr {
              margin-right: 30px;
              margin-bottom: 10px;
              width: 240px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #eee;
              color: #333;
              text-align: center;
              font-size: 14px;
              cursor: pointer;
              &:hover,
              &.active {
                border-color: #f47a25;
                color: #f47a25;
              }
              &.disabled {
                color: #999;
                &:hover {
                  color: #999;
                  border-color: #eee;
                }
              }
            }
          }
        }

        .activity-status {
          font-size: 14px;
          line-height: 20px;
          color: #f4751d;
        }
      }
    }
    .activity-agenda {
      margin-bottom: 40px;
      .activity-title {
        font-size: 14px;
        font-weight: 600;
        color: #262626;
        line-height: 32px;
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
            width: 33.3%;
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
    }
    .activity-content {
      .title {
        font-size: 14px;
        font-weight: 600;
        color: #262626;
        line-height: 32px;
      }
    }
  }
}
</style>
