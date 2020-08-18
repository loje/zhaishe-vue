<template>
  <div class="tools-page">
    <Search></Search>

    <div class="max-width">
      <div class="tool-detail">
        <div class="tool-info">
          <div class="info-left">
            <div class="info-img" :style="{backgroundImage: `url(${info.imgSrc})`}"></div>
            <div class="the-info">
              <div class="t">官方信息</div>
              <a class="url" :href="info.website" target="blank">{{info.website}}</a>
              <div class="t">支持系统</div>
              <div class="tag-list">
                <div class="tag" v-for="(item, $index) in info.system" :key="$index">{{item}}</div>
              </div>
              <div class="sell">已销售 {{info.count}} 份</div>
            </div>
          </div>
          <div class="info-right">
            <div class="title">{{info.title}}</div>
            <div class="desc">{{info.desc}}</div>

            <div class="price-bar">
              <div class="the-price">
                价格
                <template v-if="!selectAttr">
                  <span class="val" v-if="info.maxPrice === info.minPrice">{{info.minPrice}}元</span>
                  <span class="val" v-else>{{info.minPrice}} ~ {{info.maxPrice}}元</span>
                </template>
                <template v-else>
                  <span class="val">{{selectAttr.attrPrice}}元</span>
                </template>
              </div>
              <div :class="info.isliked ? 'like isliked' : 'like'" @click="bindlike(info)">
                <i class="iconfont">&#xe602;</i>
                {{info.likes}}
              </div>
            </div>

            <div class="edit-sku">
              <div class="title">选择购买套餐</div>
              <div class="attrs">
                <template v-for="(item, $index) in attrs">
                  <div
                    :class="selectAttr.objectId === item.objectId ? 'attr active':'attr'"
                    :key="$index"
                    @click="selSku(item)"
                  >{{item.attrName}}-{{item.attrPrice}}元</div>
                </template>
              </div>

              <div class="sell-tips" v-if="info.groupCount === 1">
                <span class="tips-left">
                  今日团购：
                  <span class="count">{{info.count}}人</span>
                </span>
                <span class="tips-right">每日18:00左右发码</span>
              </div>

              <div class="sell-func">
                <div :class="amount > 0 ? 'btn':'btn disabled'" @click="toPayment">确定</div>
                <div class="count-control">
                  <input type="text" v-model="amount" @change="changeAmount" />
                  <div class="control">
                    <span @click="addAmount">+</span>
                    <span @click="minus">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tool-content">
          <div class="title">工具详情</div>
          <article v-html="info.content"></article>
        </div>
      </div>
    </div>

    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Tips from "@/components/Tips";

export default {
  components: {
    Search,
    Tips
  },
  data() {
    return {
      loading: false,
      info: {},

      attrs: [],
      selectAttr: "",
      amount: 1,

      activePrice: 1,
      dialog: {},
      dialogError: "",

      step: 1,
      payForm: {
        out_trade_no: "",
        total_fee: "",
        body: ""
      },

      payReslut: "",

      couponCode: "",
      tipsText: "",
      tipsType: ""
    };
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    selectPrice(i) {
      this.activePrice = i;
    },
    selSku(item) {
      this.selectAttr = item;
      if (this.amount > item.attrNum) {
        this.amount = item.attrNum;
      }
    },
    addAmount() {
      if (this.attrs.length > 0 && this.selectAttr === "") {
        alert("请选择套餐");
        return false;
      }
      if (this.amount < this.selectAttr.attrNum) {
        this.amount += 1;
      }
    },
    minus() {
      if (this.attrs.length > 0 && this.selectAttr === "") {
        alert("请选择套餐");
        return false;
      }
      if (this.amount > 0) {
        this.amount -= 1;
      }
    },
    changeAmount() {
      if (this.amount > this.selectAttr.attrNum) {
        this.amount = this.selectAttr.attrNum;
      }
      if (this.amount < 0) {
        this.amount = 1;
      }
    },
    getinfo() {
      this.loading = true;
      var query = this.$Bmob.Query("product");
      query.get(this.$route.params.id).then(res => {
        this.loading = false;
        this.info = {
          ...this.info,
          imgSrc: res.imgSrc,
          isHot: res.isHot ? res.isHot : 0,
          title: res.title,
          desc: res.desc,
          system: res.system,
          website: res.website ? res.website : "",
          groupCount: res.groupCount || -1,
          content: res.content
        };
        let skuquery = this.$Bmob.Query("skus");
        skuquery.equalTo("productId", "===", this.$route.params.id);
        skuquery.find().then(r => {
          this.attrs = r;
          let ar = [];
          for (let o = 0; o < r.length; o += 1) {
            ar.push(r[o].attrPrice);
          }
          this.info = {
            ...this.info,
            maxPrice: ar.sort(function(a, b) {
              return a - b;
            })[ar.length - 1],
            minPrice: ar.sort(function(a, b) {
              return a - b;
            })[0]
          };
        });

        let likeCountQuery = this.$Bmob.Query("like_list");
        likeCountQuery.equalTo("product", "==", this.$route.params.id);
        likeCountQuery.find().then(likesCount => {
          this.$set(this.info, "likes", likesCount.length);

          if (likesCount.length > 0 && localStorage.getItem("memberInfo")) {
            let likeQuery = this.$Bmob.Query("like_list");
            likeQuery.equalTo("product", "==", this.id);
            likeQuery.equalTo(
              "user",
              "==",
              JSON.parse(localStorage.getItem("memberInfo")).objectId
            );
            likeQuery.find().then(like => {
              if (like && like.length > 0) {
                this.$set(this.info, "isliked", like[0].objectId);
              }
            });
          }
        });
      });

      const pointer = this.$Bmob.Pointer("product");
      const poiID = pointer.set(this.$route.params.id);

      let orderQuery = this.$Bmob.Query("order_list");
      orderQuery.equalTo("product", "==", poiID);
      orderQuery.count().then(count => {
        this.info = {
          ...this.info,
          count
        };
      });
    },

    toPayment() {
      if (!localStorage.getItem("memberInfo")) {
        this.tipsText = "请先点击右上角登录";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      if (this.selectAttr === "") {
        this.tipsText = "请选择购买套餐";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      if (this.amount < 1) {
        this.tipsText = "购买件数不能低于1哦";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      const payment = {
        id: this.$route.params.id,
        imgSrc: this.info.imgSrc,
        title: this.info.title,
        desc: this.info.desc,
        likes: this.info.likes,
        isliked: this.info.isliked,
        amount: this.amount,
        attrName: this.selectAttr.attrName,
        price: this.selectAttr.attrPrice
      };
      localStorage.setItem("payment", JSON.stringify(payment));
      this.$router.push("/tools/payment");
    },

    back() {
      this.step = 1;
    },
    buy() {
      if (!localStorage.getItem("memberInfo")) {
        alert("请先点右上角登录");
        return false;
      }
      this.step = 2;
    },
    payit() {
      if (!this.dialog.name) {
        this.dialogError = "请填写名字";
        return false;
      }
      if (!this.dialog.wechat) {
        this.dialogError = "请填写微信";
        return false;
      }
      if (!this.dialog.phone) {
        this.dialogError = "请填写电话";
        return false;
      }
      if (!this.dialog.email) {
        this.dialogError = "请填写邮箱";
        return false;
      }

      // 邮箱验证正则
      // eslint-disable-next-line no-useless-escape
      const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.dialog.email)) {
        this.dialogError = "邮箱格式不正确";
        return false;
      }

      this.payForm = {
        out_trade_no: `zdesigner${new Date().getTime()}`,
        total_fee:
          this.activePrice === 2 ? this.info.groupPrice : this.info.price,
        body: this.info.title
      };

      this.step = 3;
    },

    getReslut(item) {
      const query = this.$Bmob.Query("order_list");
      query.set("payReslut", item);
      query.set("sort", "product");
      const productPointer = this.$Bmob.Pointer("product");
      const productID = productPointer.set(this.$route.params.id);
      query.set("product", productID);
      const userPointer = this.$Bmob.Pointer("_User");
      const userID = userPointer.set(this.$store.state.user.objectId);
      query.set("user", userID);
      query.set("couponCode", this.couponCode);
      query.set("trade_state", item.trade_state);

      query.set("name", this.dialog.name);
      query.set("phone", this.dialog.phone);
      query.set("email", this.dialog.email);
      query.set("wechatId", this.dialog.wechat);
      if (this.dialog.remark) {
        query.set("remark", this.dialog.remark);
      }
      query.set("delivery", false);

      query
        .save()
        .then(res => {
          const proquery = this.$Bmob.Query("product_person");
          const userPointer = this.$Bmob.Pointer("_User");
          const userID = userPointer.set(this.$store.state.user.objectId);
          proquery.set("user", userID);
          const productPointer = this.$Bmob.Pointer("product");
          const productID = productPointer.set(this.$route.params.id);
          proquery.set("product", productID);
          const orderPointer = this.$Bmob.Pointer("order_list");
          const orderID = orderPointer.set(res.objectId);
          proquery.set("order", orderID);
          proquery.set("couponCode", this.couponCode);

          proquery.save().then(() => {
            this.step = 4;
            this.payReslut = item;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    bindlike(item) {
      const that = this;
      if (!localStorage.getItem("memberInfo")) {
        this.tipsText = "请先点击右上角登录";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      let likeQuery = this.$Bmob.Query("like_list");

      if (item.isliked) {
        likeQuery.destroy(item.isliked).then(() => {
          that.$set(that.info, "isliked", "");
          that.$set(that.info, "likes", item.likes - 1);
        });
      } else {
        let productPointer = this.$Bmob.Pointer("product");
        const productID = productPointer.set(this.$route.params.id);

        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(
          JSON.parse(localStorage.getItem("memberInfo")).objectId
        );
        likeQuery.set("product", productID);
        likeQuery.set("user", userID);
        likeQuery.save().then(res => {
          that.$set(this.info, "isliked", res.objectId);
          that.$set(this.info, "likes", item.likes + 1);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tools-page {
  .tool-detail {
    margin-bottom: 50px;
    padding: 50px 100px;
    background-color: #fff;
    box-sizing: border-box;
    .tool-info {
      display: flex;
      margin-bottom: 40px;
      .info-left {
        width: 300px;
        .info-img {
          width: 300px;
          height: 300px;
          background-position: 50%;
          background-size: contain;
          border: 1px solid #eee;
          box-sizing: border-box;
        }
        .the-info {
          padding: 20px;
          width: 300px;
          border: 1px solid #eee;
          border-top: none;
          box-sizing: border-box;
          .t {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #666;
          }
          .url {
            display: inline-block;
            margin-bottom: 20px;
            font-size: 12px;
            color: #888;
            word-break: break-all;
          }
          .tag-list {
            display: flex;
            margin-bottom: 25px;
            .tag {
              margin-right: 10px;
              padding: 0 10px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: #f5f5f5;
              color: #999;
              font-size: 10px;
            }
          }
          .sell {
            font-size: 12px;
            color: #888;
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
            border-bottom: 1px solid #eee;
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
            }
          }
          .sell-tips {
            margin-top: 20px;
            .tips-left {
              font-size: 14px;
              line-height: 20px;
              color: #262626;
              font-weight: bold;
              .count {
                color: #f47a25;
              }
            }
            .tips-right {
              margin-left: 30px;
              font-size: 12px;
              color: #262626;
            }
          }
          .sell-func {
            display: flex;
            margin-top: 20px;
            .btn {
              margin-right: 40px;
              width: 170px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: #f4751d;
              color: #fff;
              cursor: pointer;
              transition: background-color 250ms ease;
              &.disabled {
                background-color: #999;
              }
            }
            .count-control {
              display: flex;
              width: 100px;
              height: 40px;
              border: 1px solid #eee;
              input {
                width: 80px;
                height: 100%;
                border: none;
                padding: 0;
                box-sizing: border-box;
                outline: none;
                text-align: center;
              }
              .control {
                width: 20px;
                border-left: 1px solid #eee;
                span {
                  display: block;
                  line-height: 20px;
                  text-align: center;
                  color: #333;
                  cursor: pointer;
                  box-sizing: border-box;
                  &:first-child {
                    border-bottom: 1px solid #eee;
                  }
                }
              }
            }
          }
        }
      }
    }
    .tool-content {
      .title {
        margin-bottom: 20px;
        font-size: 20px;
        color: #262626;
        font-weight: bold;
      }
    }
  }
}
</style>