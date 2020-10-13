<template>
  <div class="payment-page">
    <div class="max-width">
      <div class="payment-top">
        <div class="top-left">
          <!-- <div class="img" :style="{backgroundImage: `url(${paymentInfo.imgSrc})`}"></div> -->
          <div
            class="info-img"
            :style="{ backgroundImage: `url(${paymentInfo.imgSrc})` }"
          ></div>
          <div class="the-info">
            <div class="info-title">
              活动时间：
              <span
                >{{ paymentInfo.starttime }} - {{ paymentInfo.endtime }}</span
              >
            </div>
            <div class="info-title">
              活动地点：
              <span>{{ paymentInfo.address || "地点不限" }}</span>
            </div>
            <div class="info-title">
              报名人数：
              <span>{{ paymentInfo.number }} / {{ paymentInfo.count }}人</span>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="title">{{ paymentInfo.title }}</div>
          <div class="desc">{{ paymentInfo.desc }}</div>

          <div class="price-bar">
            <div class="the-price">
              价格
              <span class="val">{{ paymentInfo.price }}元</span>
            </div>
            <div
              :class="paymentInfo.isliked ? 'like isliked' : 'like'"
              @click="bindlike(paymentInfo)"
            >
              <i class="iconfont">&#xe602;</i>
              {{ paymentInfo.likes }}
            </div>
          </div>
          <div class="process">
            <!-- <div class="t">支付流程</div> -->
            <div class="list">
              <div class="item">
                <div class="circle">1</div>
                <div class="text">活动报名</div>
              </div>
              <div class="line"></div>
              <div :class="status === 'typein' ? 'item ing' : 'item'">
                <div class="circle">2</div>
                <div class="text">报名信息</div>
              </div>
              <template v-if="paymentInfo.price > 0">
                <div class="line"></div>
                <div :class="status === 'scan' ? 'item ing' : 'item'">
                  <div class="circle">3</div>
                  <div class="text">扫码支付</div>
                </div>
              </template>
              <div class="line"></div>
              <div :class="status === 'complate' ? 'item ing' : 'item'">
                <template v-if="paymentInfo.price > 0">
                  <div class="circle">4</div>
                </template>
                <template v-else>
                  <div class="circle">3</div>
                </template>
                <div class="text">支付反馈</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-if="status === 'typein'">
        <div class="payment-block">
          <div class="block-top">
            <div class="back" @click="back">
              <span class="back-icon">
                <i class="iconfont">&#xe693;</i>
              </span>
              <span class="t">返回</span>
            </div>
            <span class="title">购买人信息</span>
          </div>
          <div class="block-list">
            <template v-for="(item, $index) in paymentInfo.amount">
              <div class="the-block" :key="$index">
                <div class="num">{{ $index + 1 }}</div>
                <div class="block-group">
                  <div
                    :class="
                      errorList[$index].name
                        ? 'input-group error'
                        : 'input-group'
                    "
                  >
                    <span>姓名</span>
                    <input type="text" v-model="buyerList[$index].name" />
                  </div>
                </div>
                <div class="block-group">
                  <div
                    :class="
                      errorList[$index].email
                        ? 'input-group error'
                        : 'input-group'
                    "
                  >
                    <span>邮箱</span>
                    <input type="text" v-model="buyerList[$index].email" />
                  </div>
                </div>
                <div class="block-group">
                  <div
                    :class="
                      errorList[$index].wechat
                        ? 'input-group error'
                        : 'input-group'
                    "
                  >
                    <span>微信</span>
                    <input type="text" v-model="buyerList[$index].wechat" />
                  </div>
                </div>
                <div class="block-group">
                  <div
                    :class="
                      errorList[$index].phone
                        ? 'input-group error'
                        : 'input-group'
                    "
                  >
                    <span>电话</span>
                    <input
                      type="text"
                      v-model="buyerList[$index].phone"
                      maxlength="11"
                    />
                  </div>
                </div>
                <div class="control">
                  <i class="iconfont" @click="del($index)">&#xe641;</i>
                </div>
              </div>
            </template>
            <div class="add-btn" @click="add">
              <i class="iconfont">&#xe610;</i>
              <span>添加一个</span>
            </div>
          </div>
          <div class="block-remark">
            <textarea placeholder="备注" v-model="remark"></textarea>
          </div>
          <div class="block-wechat">
            <div class="input-group">
              <span>推荐人微信</span>
              <input type="text" v-model="referrer" />
            </div>
          </div>
          <div class="block-total">
            一共需支付
            <span>{{ paymentInfo.price * paymentInfo.amount }}元</span>
          </div>
          <div class="block-wechatpay">
            <div class="btn" @click="payit">
              <i class="iconfont">&#xe629;</i>
              <span>微信支付</span>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="status === 'scan'">
        <div class="payment-block">
          <div class="block-top">
            <div class="back" @click="back">
              <span class="back-icon">
                <i class="iconfont">&#xe693;</i>
              </span>
              <span class="t">返回</span>
            </div>
            <span class="title">扫码支付</span>
          </div>
          <div class="block-qrcode">
            <div class="money">
              实付
              <span>{{ paymentInfo.price * paymentInfo.amount }}</span
              >元
            </div>

            <div class="qrcode">
              <wechatPay
                :out_trade_no="payForm.out_trade_no"
                :total_fee="payForm.total_fee"
                :body="payForm.body"
                @order-success="getReslut"
                :size="280"
              ></wechatPay>
            </div>

            <div class="title">微信扫码支付</div>
          </div>
          <div class="block-tips">
            <div class="qrcode">
              <img
                src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png"
              />
            </div>
            <div class="tips-right">
              <div class="title">购买需知</div>
              <div class="text">
                所有优惠购买的活动都是通过微信团购、或者返利形式给到大家优惠，所以购买时需要填写您的可添加微信，这样方便小编第一时间加到您，添加您到优惠队列中，所有购买不会第一时间拿到，请大家购买前注意
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="status === 'complate'">
        <div class="payment-block">
          <div class="block-img"></div>
          <div class="block-title">支付成功</div>
          <div class="block-text">
            跳转到个人中心查看
            <span>支付记录</span>
          </div>
          <div class="block-tips">
            <div class="qrcode">
              <img
                src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png"
              />
            </div>
            <div class="tips-right">
              <div class="title">活动注意事项</div>
              <div class="text">
                活动由宅设发布，真实有效，报名请仔细看清楚活动详情后报名，如有不理解请扫二维码咨询
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <Tips :tips="tipsText" :tipsType="tipsType"></Tips>
  </div>
</template>

<script>
import wechatPay from "@/components/WechatPay";
import Tips from "@/components/Tips";

export default {
  data() {
    return {
      paymentInfo: "",
      buyerList: [],
      remark: "",
      referrer: "",

      status: "typein",

      payForm: {},

      errorList: [],

      tipsText: "",
      tipsType: "",
    };
  },
  components: {
    wechatPay,
    Tips,
  },
  mounted() {
    this.paymentInfo = JSON.parse(localStorage.getItem("payment"));
    for (let i = 0; i < this.paymentInfo.amount; i += 1) {
      this.buyerList.push({
        name: "",
        email: "",
        wechat: "",
        phone: "",
      });
      this.errorList.push({
        name: undefined,
        email: undefined,
        wechat: undefined,
        phone: undefined,
      });
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    add() {
      this.paymentInfo.amount += 1;
      this.buyerList.push({
        name: "",
        email: "",
        wechat: "",
        phone: "",
      });
      this.errorList.push({
        name: undefined,
        email: undefined,
        wechat: undefined,
        phone: undefined,
      });
    },
    del(i) {
      this.paymentInfo.amount -= 1;
      this.buyerList.splice(i, 1);
      this.errorList.splice(i, 1);
    },

    payit() {
      const that = this;

      if (this.buyerList.length === 0) {
        alert("请添加购买人信息");
        return false;
      }

      if (this.buyerList.length > this.paymentInfo.number - this.paymentInfo.count) {
        alert("库存不足");
        return false;
      }

      let i = 0;
      this.buyerList.forEach((item, index) => {
        if (item.name.length === 0) {
          i = i + 1;
          this.errorList[index].name = "名字不能为空";
        } else {
          this.errorList[index].name = undefined;
        }
        if (item.email.length === 0) {
          i = i + 1;
          this.errorList[index].email = "邮箱不能为空";
        } else {
          this.errorList[index].email = undefined;

          // 邮箱验证正则
          // eslint-disable-next-line no-useless-escape
          const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
          if (!reg.test(item.email)) {
            i = i + 1;
            this.errorList[index].email = "邮箱格式不正确";
          } else {
            this.errorList[index].email = undefined;
          }
        }

        if (item.wechat.length === 0) {
          i = i + 1;
          this.errorList[index].wechat = "微信不能为空";
        } else {
          this.errorList[index].wechat = undefined;
        }
        if (item.phone.length === 0) {
          i = i + 1;
          this.errorList[index].phone = "电话不能为空";
        } else {
          this.errorList[index].phone = undefined;

          if (item.phone.length !== 11) {
            i = i + 1;
            this.errorList[index].phone = "手机号码格式有误";
          } else {
            this.errorList[index].phone = undefined;
          }
        }
      });

      const checkSkus = this.$Bmob.Query("skus");
      checkSkus.get(this.paymentInfo.selectAttrId).then((res) => {
        if (res.attrNum === 0) {
          that.tipsText = `当前选择套餐【${res.attrName}】已售罄，请点击返回选择其他套餐`;
          that.tipsType = "error";
          let t = setTimeout(() => {
            that.tipsText = "";
            clearTimeout(t);
          }, 1500);
        } else if (res.attrNum < that.buyerList.length) {
          that.tipsText = `当前选择套餐【${res.attrName}】仅剩${res.attrNum}张，请减少购买人数量`;
          that.tipsType = "error";
          let t = setTimeout(() => {
            that.tipsText = "";
            clearTimeout(t);
          }, 1500);
        } else {
          if (i == 0) {
            that.payForm = {
              out_trade_no: `zdesigner${new Date().getTime()}`,
              total_fee: that.paymentInfo.price * that.paymentInfo.amount,
              body: `${that.paymentInfo.title}-${that.paymentInfo.attrName}`,
            };

            if (that.paymentInfo.price > 0) {
              that.status = "scan";
            } else {
              that.status = "complate";
              that.getReslut({});
            }
          }
        }
      });
    },

    async getReslut(item) {
      const queryArray = new Array();
      // 构造含有50个对象的数组
      for (var a = 0; a < this.buyerList.length; a++) {
        var query = this.$Bmob.Query("order_list");
        query.set("payReslut", item);
        query.set("sort", "activity");
        query.set("buyerCount", this.buyerList.length);
        const activityPointer = this.$Bmob.Pointer("activity");
        const activityID = activityPointer.set(this.paymentInfo.id);
        query.set("activity", activityID);

        // 多订单批量保存
        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(this.$store.state.user.objectId);
        query.set("user", userID);
        query.set("trade_state", item.trade_state || "SUCCESS");

        query.set("name", this.buyerList[a].name);
        query.set("phone", this.buyerList[a].phone);
        query.set("email", this.buyerList[a].email);

        // 查询该用户的微信号是否存在，若存在则直接获得微信的objectid，若不存在则新建一个新的微信objectid
        let wechatQuery = this.$Bmob.Query("user_wechat");
        wechatQuery.equalTo("user", "==", userID);
        wechatQuery.equalTo("wechatId", "==", this.buyerList[a].wechat);
        let wechatList = await wechatQuery.find();
        if (wechatList.length > 0) {
          const wechatPointer = this.$Bmob.Pointer("user_wechat");
          const wechatID = wechatPointer.set(wechatList[0].objectId);
          query.set("userWechat", wechatID);
        } else {
          wechatQuery.set("user", userID);
          wechatQuery.set("wechatId", this.buyerList[a].wechat);
          let wechat = await wechatQuery.save();

          const wechatPointer = this.$Bmob.Pointer("user_wechat");
          const wechatID = wechatPointer.set(wechat.objectId);

          query.set("userWechat", wechatID);
        }

        query.set("attrName", this.paymentInfo.attrName);

        // query.set("wechatId", this.buyerList[i].wechat);
        if (this.remark) {
          query.set("remark", this.remark);
        }
        if (this.referrer) {
          query.set("referrer", this.referrer);
        }
        query.set("delivery", false);
        queryArray.push(query);
      }

      // 传入刚刚构造的数组
      let res = await this.$Bmob.Query("order_list").saveAll(queryArray);

      const proQueryArray = new Array();
      for (var b = 0; b < res.length; b++) {
        const proquery = this.$Bmob.Query("activity_person");

        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(this.$store.state.user.objectId);
        proquery.set("user", userID);

        const activityPointer = this.$Bmob.Pointer("activity");
        const activityID = activityPointer.set(this.paymentInfo.id);
        proquery.set("activity", activityID);

        const orderPointer = this.$Bmob.Pointer("order_list");
        const orderID = orderPointer.set(res[b].success.objectId);
        proquery.set("order", orderID);

        const orderQuery = this.$Bmob.Query('order_list');
        let r = await orderQuery.get(res[b].success.objectId);

        const wechatPointer = this.$Bmob.Pointer("user_wechat");
        const wechatID = wechatPointer.set(r.userWechat.objectId);
        proquery.set("userWechat", wechatID);

        // let wechatQuery = this.$Bmob.Query("user_wechat");
        // wechatQuery.equalTo("user", "==", userID);
        // wechatQuery.equalTo("wechatId", "==", this.buyerList[a].wechat);
        // let wechatList = await wechatQuery.find();
        // if (wechatList.length > 0) {
        //   const wechatPointer = this.$Bmob.Pointer("user_wechat");
        //   const wechatID = wechatPointer.set(wechatList[0].objectId);
        //   proquery.set("userWechat", wechatID);
        // }

        proquery.set("isApply", true);
        proquery.set("isPaid", true);

        proQueryArray.push(proquery);
      }
      this.$Bmob
        .Query("activity_person")
        .saveAll(proQueryArray)
        .then(() => {
          this.status = "complate";
          this.payReslut = item;
        })
        .catch((error) => {
          console.log(error);
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
          that.$set(that.paymentInfo, "isliked", "");
          that.$set(that.paymentInfo, "likes", item.likes - 1);
        });
      } else {
        let activityPointer = this.$Bmob.Pointer("activity");
        const activityID = activityPointer.set(item.id);

        const userPointer = this.$Bmob.Pointer("_User");
        const userID = userPointer.set(
          JSON.parse(localStorage.getItem("memberInfo")).objectId
        );
        likeQuery.set("activity", activityID);
        likeQuery.set("user", userID);
        likeQuery.save().then((res) => {
          that.$set(this.paymentInfo, "isliked", res.objectId);
          that.$set(this.paymentInfo, "likes", item.likes + 1);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-page {
  padding: 50px 0;
  .max-width {
    padding: 50px 100px;
    background-color: #fff;
    box-sizing: border-box;
    .payment-top {
      display: flex;
      padding-bottom: 30px;
      border-bottom: 1px solid #eeeeee;

      .top-left {
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
      .top-right {
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

        .process {
          padding-top: 20px;
          .t {
            padding-bottom: 25px;
            font-size: 14px;
            color: #333;
            line-height: 20px;
          }
          .list {
            display: flex;
            .item {
              .circle {
                margin: auto;
                width: 38px;
                height: 38px;
                line-height: 36px;
                text-align: center;
                border-radius: 50%;
                border: 1px solid #eee;
                font-size: 16px;
                font-weight: 500;
                color: #262626;
                box-sizing: border-box;
              }
              .text {
                margin-top: 10px;
                text-align: center;
                font-size: 12px;
                line-height: 17px;
                color: #262626;
              }
              &.ing {
                .circle {
                  border: 1px solid #ff5d01;
                  background-color: #ff5d01;
                  color: #fff;
                }
              }
            }
            .line {
              margin-top: 19px;
              width: 52px;
              height: 1px;
              background-color: #f4f4f4;
            }
          }
        }
      }
    }

    .payment-block {
      width: 100%;
      .block-top {
        position: relative;
        padding-top: 30px;
        padding-bottom: 35px;
        .back {
          display: inline-block;
          cursor: pointer;
          .back-icon {
            display: inline-block;
            width: 20px;
            height: 28px;
            line-height: 28px;
            border: 1px solid #f2f2f2;
            border-radius: 2px;
            color: #f4c51d;
            font-size: 12px;
            text-align: center;
          }
          .t {
            margin-left: 10px;
            line-height: 28px;
            font-size: 12px;
            color: #262626;
          }
        }
        .title {
          margin-left: 30px;
          font-size: 20px;
          line-height: 32px;
          color: #333;
          font-weight: 600;
        }
      }
      .block-list {
        width: 100%;
        .the-block {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
          .num {
            width: 20px;
            line-height: 36px;
            font-size: 16px;
            color: #262626;
            font-weight: 500;
          }
          .block-group {
            padding: 0 10px;
            box-sizing: border-box;
            .input-group {
              position: relative;
              width: 160px;
              box-sizing: border-box;
              overflow: hidden;
              span {
                position: absolute;
                left: 10px;
                top: 0;
                font-size: 12px;
                color: #888;
                line-height: 36px;
                word-break: keep-all;
                z-index: 1;
              }
              input {
                position: relative;
                z-index: 0;
                padding: 0;
                padding-left: 39px;
                width: 100%;
                height: 36px;
                border: none;
                outline: none;
                background-color: #f4f4f4;
                border: 1px solid #f4f4f4;
                border-radius: 2px;
                box-sizing: border-box;
                transition: all 500ms ease;
                &:focus {
                  border-radius: 2px !important;
                  outline: none;
                  border: 1px solid #ffcb2b !important;
                  background-color: #f4f4f4 !important;
                }
              }

              &.error {
                input {
                  border-color: #e80000;
                  background-color: #fff7f7;
                  border-radius: 6px;
                }
              }
            }
          }

          .control {
            width: 30px;
            text-align: center;
            color: #cccccc;
            cursor: pointer;
            transition: all 250ms ease;
            i {
              font-size: 18px;
              line-height: 36px;
            }
            &:hover {
              color: #cc0033;
            }
          }
        }
        .add-btn {
          display: inline-flex;
          padding: 0 30px;
          height: 36px;
          background-color: #f4c51d;
          color: #fff;
          font-size: 12px;
          border-radius: 2px;
          cursor: pointer;
          i {
            margin-right: 10px;
            line-height: 36px;
          }
          span {
            line-height: 36px;
          }
        }
      }
      .block-remark {
        margin-top: 30px;
        width: 400px;
        height: 80px;
        background-color: #f4f4f4;
        textarea {
          padding: 10px;
          width: 100%;
          height: 100%;
          border: none;
          resize: none;
          background-color: transparent;
          outline: none;
          box-sizing: border-box;
        }
      }
      .block-wechat {
        margin-top: 30px;
        .input-group {
          display: flex;
          padding: 0 10px;
          width: 240px;
          box-sizing: border-box;
          background-color: #f4f4f4;
          span {
            font-size: 12px;
            color: #888;
            line-height: 36px;
            word-break: keep-all;
          }
          input {
            flex: 1;
            padding: 0;
            padding-left: 5px;
            height: 36px;
            border: none;
            outline: none;
            background-color: transparent;
            border-radius: 2px;
            box-sizing: border-box;
          }
        }
      }
      .block-total {
        margin-top: 40px;
        font-size: 16px;
        color: #262626;
        span {
          margin-left: 15px;
          color: #f4751d;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .block-wechatpay {
        margin-top: 15px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fbfbfb;
        border-radius: 2px;
        .btn {
          display: flex;
          width: 163px;
          height: 38px;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid #6bcc03;
          border-radius: 2px;
          cursor: pointer;
          i {
            margin-right: 8px;
            color: #09bb07;
          }
          span {
            color: #333333;
            font-size: 14px;
          }
        }
      }

      .block-qrcode {
        .money {
          margin-bottom: 20px;
          font-size: 14px;
          color: #262626;
          line-height: 20px;
          text-align: center;
          span {
            font-size: 20px;
            font-weight: bold;
            color: #ff5d01;
          }
        }
        .title {
          font-size: 16px;
          line-height: 22px;
          color: #262626;
          text-align: center;
        }
      }

      .block-img {
        margin: auto;
        margin-top: 60px;
        margin-bottom: 20px;
        width: 218px;
        height: 218px;
        background-color: #d8d8d8;
      }
      .block-title {
        margin-bottom: 10px;
        text-align: center;
        font-size: 20px;
        color: #262626;
        font-weight: bold;
      }
      .block-text {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        span {
          color: #ff5d01;
        }
      }
      .block-tips {
        display: flex;
        margin-top: 70px;
        padding: 25px;
        width: 100%;
        background-color: #fcfcfc;
        box-sizing: border-box;
        .tips-right {
          padding-left: 40px;
          .title {
            font-size: 14px;
            line-height: 32px;
            font-weight: bold;
          }
          .text {
            font-size: 14px;
            line-height: 24px;
            color: #888888;
          }
        }
      }
    }
  }
}
</style>
