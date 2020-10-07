<template>
  <div class="tools-page">
    <Search @search="searchTool"></Search>

    <div class="the-layout">
      <div class="max-width" :style="{alignItems: isScoll === false ? 'flex-end' : 'inherit'}">
        <div class="layout-left" ref="layoutLeft" :style="{paddingRight: isScoll === true ? '355px': '30px'}">
          <div class="list-top">
            <div class="title">设计师工具</div>

            <div class="tabs">
              <div
                :class="actTab === '付费软件' ? 'tab active' : 'tab'"
                @click="getToolCount('付费软件')"
              >付费软件</div>
              <div :class="actTab === '免费' ? 'tab active' : 'tab'" @click="getToolCount('免费')">免费</div>
            </div>
          </div>
          <div class="tools-list">
            <loading v-if="productLoading"></loading>
            <template v-else v-for="(item, $index) in productList">
              <div
                class="the-tool"
                :key="$index"
                v-if="(item && actTab === '付费软件' && item.maxPrice !== 0) || (item && actTab === '免费' && item.maxPrice === 0)"
              >
                <div class="tool-left">
                  <div class="img" :style="{backgroundImage: `url(${item.imgSrc})`}"></div>
                </div>
                <div class="tool-middle">
                  <div class="title">
                    {{item.title}}
                    <span class="tag" v-if="item.isHot === 1">热门</span>
                  </div>
                  <div class="price">
                    <span class="price-style" v-if="item.tags">{{item.tags}}</span>

                    <template
                      v-if="(item.maxPrice || item.maxPrice === 0) && (item.minPrice || item.minPrice === 0)"
                    >
                      <span
                        class="the-price"
                        v-if="item.maxPrice === item.minPrice"
                      >{{item.minPrice}}元</span>
                      <span class="the-price" v-else>{{item.minPrice}} ~ {{item.maxPrice}}元</span>
                    </template>
                    <template v-else>
                      <span class="the-price">暂未设置价格</span>
                    </template>
                  </div>
                  <div class="desc">{{item.desc}}</div>
                  <div class="middle-btm">
                    <div class="tag-list">
                      <div class="tag" v-for="(i, $index) in item.system" :key="$index">{{i}}</div>
                    </div>
                    <div
                      :class="item.isliked ? 'like isliked' : 'like'"
                      @click="bindlike(item, $index)"
                    >
                      <i class="iconfont">&#xe602;</i>
                      {{item.likes}}
                    </div>
                    <router-link class="btn" :to="`/tools/item/${item.id}`">查看</router-link>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="layout-right" :style="{left: isScoll === true ? fixRight + 'px' : 'inherit', top: isScoll === true ? fixTop + 'px' : 'inherit', position: isScoll === true ? 'fixed' : 'relative'}" v-if="productLoading === false">
          <div class="sell-notice">
            <div class="title">购买消息</div>
            <div class="notice-list">
              <template v-for="(item, $index) in proOrderList">
                <div class="notice" :key="$index">
                  <span class="notice-left">用户{{item.user.nickname}}在宅设购买了{{item.product.title}}</span>
                  <span class="notice-right">{{item.createdAt}}天前</span>
                </div>
              </template>
            </div>
          </div>

          <div class="sell-tips">
            <div class="title">购买需知</div>
            <div class="text">平台可提供优惠购买服务，购买的时请加小编微信：zhaishehui01</div>
            <div class="text">
              <span>团购 -</span>我们需要凑满人数才会统一发出，所以不是第一时间拿到，请联系小编，及时跟进
            </div>
            <div class="text">
              <span>返利券 -</span>小编会给出返利，可以凭优返利购买，记得找请找小编领取
            </div>
            <div class="text">
              <span>无提示 -</span>无优惠，只推荐
            </div>
          </div>

          <div class="contact">
            <div class="contact-left">
              <img
                src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png"
              />
            </div>
            <div class="contact-right">
              <div class="tel">
                <div class="tel-t">客服电话</div>
                <div class="tel-num">186 7551 0353</div>
              </div>
              <div class="tips">欢迎使用微信小程序</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>
<script>
import loading from "@/components/Loading";
import Search from "@/components/Search";
import Tips from "@/components/Tips";

export default {
  components: {
    loading,
    Search,
    Tips
  },
  data() {
    return {
      actTab: "付费软件",
      productList: [],
      productLoading: false,

      fixRight: 0,
      fixTop: 0,

      proOrderList: [],

      tipsText: "",
      tipsType: "",

      isScoll: true,
    };
  },
  activated() {
    this.getProducts();
    this.fixRight = this.$refs.layoutLeft.getBoundingClientRect().right - 325;
    this.fixTop = this.$refs.layoutLeft.getBoundingClientRect().top;
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      // console.log("onresize");
      // console.log(that.$refs.layoutLeft.getBoundingClientRect().right);
      that.fixRight = that.$refs.layoutLeft.getBoundingClientRect().right - 325;
    };
    window.addEventListener("scroll", this.windowScroll);
    this.getProOrderList();
  },
  methods: {
    searchTool(e) {
      this.getProducts(e);
    },
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop + window.innerHeight > document.body.scrollHeight - 321) {
        this.isScoll = false;
      } else {
        this.isScoll = true;
        if (scrollTop > 160) {
          this.fixTop = 60;
        } else {
          this.fixTop = this.$refs.layoutLeft.getBoundingClientRect().top;
        }
      }
    },
    getToolCount(tab) {
      this.actTab = tab;
      this.proOrderList = [];
      this.getProducts();
    },

    getProducts(keyword) {
      var query = this.$Bmob.Query("product");

      let arr = [];
      query.order("-updatedAt");
      query.equalTo("notDelete", "==", true);
      query.equalTo("status", "==", 0);

      if (keyword !== undefined) {
        query.equalTo("title", "==", { $regex: "" + keyword + ".*" });
      }

      this.productLoading = true;
      query.find().then(res => {
        this.productLoading = false;
        for (let i = 0; i < res.length; i += 1) {
          let skuquery = this.$Bmob.Query("skus");
          skuquery.equalTo("productId", "===", res[i].objectId);
          skuquery.find().then(r => {
            let ar = [];
            for (let o = 0; o < r.length; o += 1) {
              ar.push(r[o].attrPrice);
            }

            let likeCountQuery = this.$Bmob.Query("like_list");
            likeCountQuery.equalTo("product", "==", res[i].objectId);
            likeCountQuery.find().then(likesCount => {
              if (localStorage.getItem("memberInfo")) {
                let likeQuery = this.$Bmob.Query("like_list");
                likeQuery.equalTo("product", "==", res[i].objectId);

                likeQuery.equalTo(
                  "user",
                  "==",
                  JSON.parse(localStorage.getItem("memberInfo")).objectId
                );
                likeQuery.find().then(like => {
                  const json = {
                    id: res[i].objectId,
                    imgSrc: res[i].imgSrc,
                    title: res[i].title,
                    desc: res[i].desc,
                    skus: r,
                    isHot: res[i].isHot || 0,
                    system: res[i].system || [],
                    tags: res[i].tags ? res[i].tags.join(" | ") : "",
                    maxPrice: ar.sort(function(a, b) {
                      return a - b;
                    })[ar.length - 1],
                    minPrice: ar.sort(function(a, b) {
                      return a - b;
                    })[0],
                    likes:
                      likesCount.length > 0 &&
                      localStorage.getItem("memberInfo")
                        ? likesCount.length
                        : 0,
                    isliked:
                      like && like.length > 0 ? like[0].objectId : undefined
                  };
                  this.$set(arr, i, json);
                });
              } else {
                const json = {
                  id: res[i].objectId,
                  imgSrc: res[i].imgSrc,
                  title: res[i].title,
                  desc: res[i].desc,
                  skus: r,
                  isHot: res[i].isHot || 0,
                  system: res[i].system || [],
                  tags: res[i].tags ? res[i].tags.join(" | ") : "",
                  maxPrice: ar.sort(function(a, b) {
                    return a - b;
                  })[ar.length - 1],
                  minPrice: ar.sort(function(a, b) {
                    return a - b;
                  })[0],
                  likes: likesCount.length > 0 ? likesCount.length : 0
                };
                this.$set(arr, i, json);
              }
            });
          });
        }

        this.productList = arr;
      });
    },

    getProOrderList() {
      const orderQuery = this.$Bmob.Query("order_list");
      orderQuery.order("-createdAt");
      orderQuery.equalTo("sort", "==", "product");
      orderQuery.include("user", "product");
      orderQuery.limit(4);
      orderQuery.find().then(res => {
        // console.log(res);
        for (let i = 0; i < res.length; i += 1) {
          let day = parseInt(
            (new Date().getTime() - new Date(res[i].createdAt).getTime()) /
              86400000
          );
          let hour = parseInt(
            (new Date().getTime() - new Date(res[i].createdAt).getTime()) /
              86400000 /
              24
          );
          if (day > 1) {
            res[i].createdAt = `${day}`;
          } else {
            res[i].createdAt = `${hour}`;
          }
        }
        this.proOrderList = res;
      });
    },

    bindlike(item, i) {
      if (!localStorage.getItem("memberInfo")) {
        this.tipsText = "请先点击右上角登录";
        this.tipsType = "error";
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
        return false;
      }
      const that = this;
      let likeQuery = this.$Bmob.Query("like_list");

      if (item.isliked) {
        likeQuery.destroy(item.isliked).then(() => {
          that.$set(that.productList[i], "isliked", "");
          that.$set(that.productList[i], "likes", item.likes - 1);
        });
      } else {
        let productPointer = this.$Bmob.Pointer("product");
        const productID = productPointer.set(item.id);

        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(
          JSON.parse(localStorage.getItem("memberInfo")).objectId
        );
        likeQuery.set("product", productID);
        likeQuery.set("user", userID);
        likeQuery.save().then(res => {
          that.$set(that.productList[i], "isliked", res.objectId);
          that.$set(that.productList[i], "likes", item.likes + 1);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tools-page {
  .the-layout {
    padding-bottom: 60px;
    width: 100%;
    .max-width {
      display: flex;
      .layout-left {
        flex: 1;
        // padding-right: 355px;
        padding-right: 30px;
        box-sizing: border-box;

        .list-top {
          display: flex;
          padding: 0 15px;
          width: 100%;
          height: 50px;
          background-color: #fff;
          border-bottom: 1px solid #f5f5f5;
          box-sizing: border-box;
          .title {
            color: #383838;
            line-height: 50px;
            font-size: 18px;
            font-weight: bold;
          }
          .tabs {
            display: flex;
            padding-left: 100px;
            height: 100%;
            .tab {
              margin-right: 50px;
              line-height: 50px;
              height: 50px;
              color: #333;
              font-size: 16px;
              cursor: pointer;
              box-sizing: border-box;
              &.active {
                color: #f4c51d;
                border-bottom: 4px solid #f4c51d;
              }
            }
          }
        }
        .tools-list {
          padding: 0 15px;
          width: 100%;
          background-color: #fff;
          box-sizing: border-box;
          .the-tool {
            display: flex;
            padding: 20px 0;
            width: 100%;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            .tool-left {
              width: 180px;
              height: 180px;
              .img {
                width: 100%;
                height: 100%;
                background-position: 50%;
                background-size: contain;
                background-repeat: no-repeat;
                border-radius: 2px;
                box-sizing: border-box;
              }
            }
            .tool-middle {
              position: relative;
              flex: 1;
              padding-left: 20px;
              box-sizing: border-box;
              .title {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: bold;
                color: #383838;
                line-height: 22px;
                .tag {
                  display: inline-block;
                  margin-left: 5px;
                  padding: 0 4px;
                  height: 20px;
                  line-height: 18px;
                  color: #ff5d01;
                  font-weight: normal;
                  font-size: 12px;
                  border: 1px solid #ff5d01;
                  border-radius: 2px;
                  box-sizing: border-box;
                }
              }
              .price {
                margin-top: 10px;
                color: #f4751d;
                .price-style {
                  margin-right: 10px;
                  font-size: 14px;
                }
                .the-price {
                  font-size: 20px;
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
              .middle-btm {
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                padding-left: 20px;
                width: 100%;
                box-sizing: border-box;
                .tag-list {
                  flex: 1;
                  display: flex;
                  flex-wrap: wrap;
                  .tag {
                    margin-top: 6px;
                    margin-right: 6px;
                    padding: 0 5px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background-color: #f5f5f5;
                    font-size: 10px;
                    color: #999;
                  }
                }
                .like {
                  margin-right: 18px;
                  width: 66px;
                  height: 26px;
                  line-height: 24px;
                  border: 1px solid #d8d8d8;
                  color: #888888;
                  font-size: 10px;
                  text-align: center;
                  border-radius: 12px;
                  box-sizing: border-box;
                  transition: all 250ms ease;
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
                .btn {
                  width: 100px;
                  height: 26px;
                  line-height: 26px;
                  background-color: #f4751d;
                  text-align: center;
                  color: #fff;
                  font-size: 10px;
                  border-radius: 13px;
                }
              }
            }
          }
        }
      }
      .layout-right {
        width: 325px;
        box-sizing: border-box;
        .sell-notice {
          padding: 20px 20px 20px 30px;
          background-color: #fff;
          box-sizing: border-box;
          .title {
            font-size: 16px;
            color: #383838;
            line-height: 22px;
            font-weight: bold;
          }
          .notice-list {
            width: 100%;
            .notice {
              margin-top: 10px;
              font-size: 12px;
              color: #888;
              .notice-right {
                float: right;
              }
            }
          }
        }
        .sell-tips {
          margin-top: 20px;
          padding: 20px 20px 20px 30px;
          background-color: #fff;
          box-sizing: border-box;
          .title {
            margin-bottom: 10px;
            color: #383838;
            font-size: 16px;
            line-height: 22px;
            font-weight: bold;
          }
          .text {
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 24px;
            color: #888;
            span {
              color: #383838;
              font-weight: bold;
            }
          }
        }

        .contact {
          display: flex;
          margin-top: 20px;
          padding: 20px 20px 20px 20px;
          width: 100%;
          background-color: #fff7d9;
          box-sizing: border-box;
          .contact-left {
            width: 105px;
            height: 105px;
            img {
              max-width: 100%;
            }
          }
          .contact-right {
            position: relative;
            padding-left: 15px;
            .tel {
              .tel-t {
                font-size: 16px;
                line-height: 22px;
                color: #333;
              }
              .tel-num {
                margin-top: 5px;
                font-size: 22px;
                line-height: 30px;
                color: #333;
              }
            }
            .tips {
              position: absolute;
              left: 15px;
              bottom: 0;
              padding: 0 10px;
              height: 30px;
              line-height: 30px;
              background-color: #ffeca7;
              color: #333;
              font-size: 14px;
              border-radius: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
