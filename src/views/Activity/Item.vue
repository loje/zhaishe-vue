<template>
  <div class="activity-page">
    <div class="activity-info">
      <div class="max-width">
        <div class="activity-media">
          <div class="media-left">
            <div class="img" :style="{backgroundImage: `url(${info.imgSrc})`}"></div>
          </div>
          <div class="media-right">
            <div class="title">
              <span>最新活动</span>{{info.title}}</div>
            <div class="desc">{{info.desc}}</div>
            <div class="time">{{info.starttime}} - {{info.endtime}}</div>
            <div class="address">{{info.address}}</div>
          </div>
        </div>


        <template v-if="step === 1">
        <div class="price-bar">
          <div :class="activePrice === 2 ? 'btn active' : 'btn'" v-if="info.birdPrice" @click="selectPrice(2)">早鸟：{{info.birdPrice}}元</div>
          <div :class="activePrice === 1 ? 'btn active' : 'btn'" @click="selectPrice(1)">正常票：{{info.price || 0}}元</div>

          <div class="bar-right">
            <span class="t" v-if="activePrice === 1">你选择是正常票</span>
            <span class="t" v-if="activePrice === 2">你选择是早鸟票</span>

            <span class="price">价格
              <span v-if="activePrice === 1">{{info.price}}</span>
              <span v-if="activePrice === 2">{{info.birdPrice}}</span>
            元</span>
            <div :class="applyBtn !== '您已报名'?'btn active btn-buy':'btn active btn-buyed'" @click="apply">{{applyBtn}}</div>
          </div>
        </div>

        <div class="tips">
          <div class="tips-left">
            <div class="title">报名需知</div>
            <div class="text">活动报名需要添加小编为微信，或者报名后留下您的信息后由小编在24小时内添加您的微信，方便拉群，和您参与的具体信息，由于支付系统还没上线，小编会根据您的选择所报名的选项进行支付宝转账收费，支付成功后报名成功，希望对此流程熟知，感谢对我们的认可</div>
          </div>
          <div class="tips-right">
            <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
          </div>
        </div>
        </template>

        <template v-if="step !== 1">
        <div class="buy-layer">
          <div class="back" @click="back">
            <span class="back-icon">
              <i class="iconfont">&#xe693;</i>
            </span>
            <span class="t">返回</span>
          </div>

          <div class="buy-steps">
            <div class="step">
              <div :class="step === 1 ? 'count active' : 'count'">1</div>
              <div class="step-t">拍下商品</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 2 ? 'count active' : 'count'">2</div>
              <div class="step-t">支付信息</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 3 ? 'count active' : 'count'">3</div>
              <div class="step-t">确认扫码</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div :class="step === 4 ? 'count active' : 'count'">4</div>
              <div class="step-t">支付反馈</div>
            </div>
          </div>

          <div class="buy-box" v-if="step === 2">
            <div class="box-form">
              <div class="input-group">
                <span>姓名</span>
                <input type="text" v-model="dialog.name" placeholder="请填写姓名" />
              </div>
              <div class="input-group">
                <span>可添加微信</span>
                <input type="text" v-model="dialog.wechat" placeholder="请填写微信" />
              </div>
              <div class="input-group">
                <span>电话</span>
                <input type="text" v-model="dialog.phone" placeholder="留下您电话方便联系" :disabled="$store.state.user.mobilePhoneNumber" />
              </div>
              <div class="input-group" style="margin: 0;">
                <span>邮箱</span>
                <input type="text" v-model="dialog.email" placeholder="您的收件邮箱" />
              </div>
              <div class="error">{{dialogError}}</div>

              <div class="text" v-if="activePrice === 1">您选择的是正常票 价格<span>{{info.price}}</span>元</div>
              <div class="text" v-if="activePrice === 2">您选择的是早鸟票 价格<span>{{info.birdPrice}}</span>元</div>

              <div class="btn" @click="payit">
                <i class="iconfont">&#xe629;</i>
                <span>微信支付</span>
              </div>
            </div>
          </div>

          <template v-if="step === 3">
          <div class="select-price" v-if="activePrice === 1">实付<span>{{info.price}}</span>元</div>
          <div class="select-price" v-if="activePrice === 2">实付<span>{{info.birdPrice}}</span>元</div>
          <div class="qrcode-box">
            <wechatPay :out_trade_no="payForm.out_trade_no" :total_fee="payForm.total_fee" :body="payForm.body" @order-success="getReslut" :size="143"></wechatPay>
          </div>
          <div class="wechat-text">微信扫码支付</div>
          </template>

          <template v-if="step === 4">
          <div :class="payReslut.trade_state !== 'SUCCESS' ? 'pay-result fail' : 'pay-result'">
            <i class="iconfont" v-if="payReslut.trade_state === 'SUCCESS'">&#xe607;</i>
            <i class="iconfont" v-else>&#xea13;</i>

            <template v-if="payReslut.trade_state === 'SUCCESS'">
              <div class="t" @click="this.$router.push({
        path: '/user/activity',
        query: {
          code: JSON.parse(localStorage.getItem('memberInfo')).objectId,
        },
      })">{{payReslut.trade_state_desc}}</div>
            </template>
            <template v-else>
              <div class="t">{{payReslut.trade_state_desc}}</div>
            </template>
          </div>
          </template>

        </div>
        <div class="buy-tips">
          <div class="tips-left">
            <img src="http://lc-vwzm34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png" />
          </div>

          <div class="tips-right">
            <div class="title">报名需知</div>
            <div class="text">活动报名需要添加小编为微信，或者报名后留下您的信息后由小编在24小时内添加您的微信，方便拉群，和您参与的具体信息，由于支付系统还没上线，小编会根据您的选择所报名的选项进行支付宝转账收费，支付成功后报名成功，希望对此流程熟知，感谢对我们的认可</div>
          </div>
        </div>
        </template>
      </div>
    </div>

    <div class="activity-detail" v-if="step === 1">
      <div class="max-width">
        <loading v-if="loading === true"></loading>
        <article v-else v-html="info.content"></article>
      </div>
    </div>
  </div>
</template>
<script>
import loading from '@/components/Loading';
import wechatPay from '@/components/WechatPay';

export default {
  components: {
    loading,
    wechatPay,
  },
  data() {
    return {
      applyBtn: '我要报名',
      loading: false,
      info: {},

      activePrice: 1,
      dialog: {},
      dialogError: '',

      step: 1,
      payForm: {
        out_trade_no: '',
        total_fee: '',
        body: '',
      },

      payReslut: '',
    }
  },
  mounted() {
    this.getInfo();
    this.checkApply();
  },
  methods: {
    selectPrice(i) {
      this.activePrice = i;
    },
    getInfo() {
      this.loading = true;
      var query = this.$Bmob.Query('activity');
      query.get(this.$route.params.id).then((res) => {
        this.loading = false;
        for (let key in res.startTime) {
          if (key === 'iso') {
            this.info.starttime = res.startTime[key];
          }
        }
        for (let key in res.endTime) {
          if (key === 'iso') {
            this.info.endtime = res.endTime[key];
          }
        }
        this.info = {
          ...this.info,
          imgSrc: res.imgSrc,
          title: res.title,
          desc: res.desc,
          address: res.address,
          birdPrice: res.birdPrice || 0,
          price: res.fee || 0,
          content: res.content,
        };
        if (res.birdPrice && res.birdPrice > 0) {
          this.activePrice = 2;
        } else if (res.fee && res.fee > 0) {
          this.activePrice = 1;
        }
      });
    },

    checkApply() {
      if (this.$store.state.user) {
        const query = this.$Bmob.Query('activity_person');
        query.equalTo('user', '==', this.$store.state.user.objectId);
        query.equalTo('activity', '==', this.$route.params.id);
        query.find().then((res) => {
          if (res.length > 0) {
            if (res[0].isApply === false) {
              this.applyBtn = '再次报名';
            } else {
              this.applyBtn = '您已报名';
            }
          } else {
            this.applyBtn = '我要报名';
          }
        });
      }
    },
    back() {
      this.checkApply();
      this.step = 1;
    },
    apply() {
      if (!localStorage.getItem('memberInfo')) {
        alert('请先点右上角登录');
        return false;
      }
      if (this.applyBtn !== '您已报名') {
        this.step = 2;
        console.log(this.$store.state.user);
        this.dialog = {
          name: this.$store.state.user.name,
          wechat: this.$store.state.user.wechatId,
          phone: this.$store.state.user.mobilePhoneNumber,
          email: this.$store.state.user.email.indexOf('@bmob.cn') !== -1 ? undefined : this.$store.state.user.email,
        };
      }
    },
    payit() {
      if (!this.dialog.name) {
        this.dialogError = '请填写名字';
        return false;
      }
      if (!this.dialog.wechat) {
        this.dialogError = '请填写微信';
        return false;
      }
      if (!this.dialog.phone) {
        this.dialogError = '请填写电话';
        return false;
      }
      if (!this.dialog.email) {
        this.dialogError = '请填写邮箱';
        return false;
      }

      this.payForm = {
        out_trade_no: `test${new Date().getTime()}`,
        total_fee: this.activePrice === 2 ? this.info.birdPrice : this.info.price,
        body: this.info.title,
      };

      const query = this.$Bmob.Query('_User');
      query.get(this.$store.state.user.objectId).then(user => {
        user.set('name', this.dialog.name);
        user.set('mobilePhoneNumber', this.dialog.phone);
        user.set('email', this.dialog.email);
        user.set('wechatId', this.dialog.wechat);
        user.save().then(() => {
          this.step = 3;
        }).catch(err => {
          console.log(err);
          if (err.code === 209) {
            this.dialogError = '该手机号码已经存在';
          }
          if (err.code === 301) {
            this.dialogError = '邮箱格式不正确';
          }
        });
      })
    },

    getReslut(item) {
      const query = this.$Bmob.Query('order_list');
      query.set("payReslut", item);
      query.set("sort", 'active');
      const activityPointer = this.$Bmob.Pointer('activity');
      const activityID = activityPointer.set(this.$route.params.id);
      query.set('activity', activityID);
      const userPointer = this.$Bmob.Pointer('_User');
      const userID = userPointer.set(this.$store.state.user.objectId);
      query.set('user', userID);
      query.set('delivery', false);
      query.save().then(res => {
        console.log(res);
        const apquery = this.$Bmob.Query('activity_person');
        const userPointer = this.$Bmob.Pointer('_User')
        const userID = userPointer.set(this.$store.state.user.objectId)
        apquery.set('user', userID);
        const activityPointer = this.$Bmob.Pointer('activity')
        const activityID = activityPointer.set(this.$route.params.id)
        apquery.set('activity', activityID);
        apquery.set('isApply', true);
        apquery.save().then(() => {
          this.step = 4;
          this.payReslut = item;
        });
      }).catch(err => {
        console.log(err);
      });
    },
  },
};
</script>
<style lang="scss" scope>
  .activity-info {
    padding-top: 50px;
    .max-width {
      padding: 40px 80px;
      background-color: #fff;
      box-sizing: border-box;
      .activity-media {
        display: flex;
        width: 100%;
        .media-left {
          .img {
            width: 280px;
            height: 160px;
            background-position: 50%;
            background-size: cover;
          }
        }
        .media-right {
          flex: 1;
          padding: 10px 0 0 20px;
          box-sizing: border-box;
          .title {
            font-size: 20px;
            line-height: 32px;
            color: #262626;
            font-weight: bold;
            span {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              padding: 0 4px;
              height: 20px;
              line-height: 18px;
              font-size: 12px;
              color: #FF5D01;
              border: 1px solid #FF5D01;
              border-radius: 2px;
              box-sizing: border-box;
            }
          }
          .desc {
            margin-top: 10px;
            font-size: 14px;
            line-height: 24px;
            color: #888;
          }
          .time {
            margin-top: 20px;
            font-size: 12px;
            line-height: 17px;
            color: #888;
          }
          .address {
            margin-top: 5px;
            font-size: 12px;
            line-height: 17px;
            color: #888;
          }
        }
      }

      .price-bar {
        margin-top: 50px;
        padding: 17px 24px;
        width: 100%;
        background-color: #FCFCFC;
        box-sizing: border-box;
        .btn {
          display: inline-block;
          vertical-align: middle;
          margin-right: 40px;
          width: 112px;
          height: 36px;
          font-size: 14px;
          line-height: 34px;
          border: 1px solid #DCDCDC;
          color: #262626;
          text-align: center;
          border-radius: 2px;
          font-weight: bold;
          box-sizing: border-box;
          cursor: pointer;
          &.active {
            border-color: #F4751D;
            color: #F4751D;
          }
        }
        input {
          display: inline-block;
          vertical-align: middle;
          padding: 0 15px;
          height: 36px;
          box-sizing: border-box;
          outline: none;
          border: 1px solid #DCDCDC;
          text-align: center;
          box-sizing: border-box;
        }

        .bar-right {
          float: right;
          display: flex;
          color: #262626;
          font-size: 12px;
          line-height: 36px;
          height: 36px;
          .t {
            line-height: 36px;
          }
          .price{
            margin-left: 10px;
            span {
              margin: 0 5px;
              font-size: 18px;
            }
          }
          .btn {
            margin-left: 50px;
            &.btn-buy {
              margin-right: 0;
              background-color: #F4751D;
              color: #fff;
            }
            &.btn-buyed {
              margin-right: 0;
            }
          }
          
        }
      }

      .tips {
        display: flex;
        margin-top: 30px;
        padding: 0 24px;
        width: 100%;
        box-sizing: border-box;
        .tips-left {
          flex: 1;
          padding-right: 10px;
          box-sizing: border-box;
          .title {
            color: #262626;
            font-size: 14px;
            line-height: 32px;
          }
          .text {
            color: #888888;
            font-size: 14px;
            line-height: 24px;
          }
        }
        .tips-right {
          width: 90px;
          img {
            width: 90px;
          }
        }
      }

      .buy-layer {
        position: relative;
        margin-top: 50px;
        padding: 25px 0 63px 0;
        border-top: 1px solid #F2F2F2;
        box-sizing: border-box;
        .back {
          position: absolute;
          left: 80px;
          top:25px;
          cursor: pointer;
          .back-icon {
            display: inline-block;
            width: 20px;
            height: 28px;
            line-height: 28px;
            border: 1px solid #F2F2F2;
            border-radius: 2px;
            color: #F4C51D;
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
        .buy-steps {
          width: 100%;
          text-align: center;
          .step {
            display: inline-block;
            vertical-align: middle;
            padding: 0 16px;
            .count {
              margin: auto;
              width: 38px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              border-radius: 50%;
              border: 1px solid #979797;
              font-size: 16px;
              color: #262626;
              &.active {
                background-color: #FF5D01;
                border: 1px solid #FF5D01;
                color: #fff;
              }
            }
            .step-t {
              margin-top: 13px;
              font-size: 12px;
              line-height: 17px;
              text-align: center;
              color: #262626;
            }
          }
          .line {
            display: inline-block;
            vertical-align: top;
            margin-top: 19px;
            width: 52px;
            height: 1px;
            background-color: #979797;
          }
        }

        .buy-box {
          padding-top: 50px;
          .box-form {
            margin: auto;
            width: 320px;
            .input-group {
              display: flex;
              margin-bottom: 20px;
              padding: 0px 10px;
              width: 320px;
              height: 36px;
              line-height: 34px;
              border: 1px solid #979797;
              font-size: 12px;
              box-sizing: border-box;
              &:last-child {
                margin-bottom: 0;
              }
              span {
                color: #888;
                width: 70px;
              }
              input {
                padding: 0;
                height: 34px;
                border: none;
                outline: none;
                box-sizing: border-box;
              }
            }
            .error {
              margin: 10px 0 30px 0;
              font-size: 12px;
              height: 17px;
              color: #E55D5D;
            }
            .text {
              margin-bottom: 17px;
              text-align: center;
              color: #262626;
              font-size: 14px;
              line-height: 20px;
              span {
                margin: 0 10px;
                font-size: 24px;
                color: #FF5D01;
              }
            }
            .btn {
              width: 320px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border: 1px solid #6BCC03;
              border-radius: 2px;
              font-size: 14px;
              color: #333333;
              cursor: pointer;
              i {
                color: #09BB07;
                margin-right: 10px;
              }
            }
          }
        }

        .select-price {
          margin-top: 50px;
          margin-bottom: 11px;
          text-align: center;
          color: #262626;
          font-size: 14px;
          line-height: 20px;
          span {
            margin: 0 10px;
            font-size: 24px;
            color: #FF5D01;
          }
        }
        .qrcode-box {
          margin:auto;
          // width:143px;
          // height:143px;
        }
        .wechat-text {
          margin-top: 15px;
          font-size:16px;
          line-height: 22px;
          text-align: center;
          color: #262626;
        }
        .pay-result {
          padding: 50px 0;
          text-align: center;
          i {
            color: #00c250;
            font-size:48px;
          }
          .t {
            margin-top: 30px;
            color: #FF5D01;
            font-size: 16px;
            line-height: 22px;
          }
          &.fail {
            i {
              color: #262626;
            }
            .t {
              color: #262626;
            }
          }
        }
        // .buy-flex {
        //   width: 50%;
        //   box-sizing: border-box;
        //   .wechat-qrcode {
        //     display: inline-block;
        //     width: 170px;
        //     height: 170px;
        //     img {
        //       display: block;
        //       width: 100%;
        //     }
        //     .text {
        //       text-align: center;
        //       font-size: 12px;
        //       color: #979797;
        //     }
        //   }
        //   .title {
        //     margin-bottom: 30px;
        //     font-size: 12px;
        //     font-family: PingFangSC;
        //     color: #262626;
        //     line-height: 17px;
        //     .t {
        //       margin-right: 10px;
        //       span {
        //         font-size: 24px;
        //         color: #FF5D01;
        //       }
        //     }
        //   }
        //   .input-group {
        //     display: flex;
        //     margin-bottom: 20px;
        //     padding: 0px 10px;
        //     width: 280px;
        //     height: 36px;
        //     line-height: 34px;
        //     border: 1px solid #979797;
        //     font-size: 12px;
        //     box-sizing: border-box;
        //     span {
        //       color: #888;
        //       width: 70px;
        //     }
        //     input {
        //       padding: 0;
        //       height: 34px;
        //       border: none;
        //       outline: none;
        //       box-sizing: border-box;
        //     }
        //   }
        //   .error {
        //     margin-bottom: 30px;
        //     font-size: 12px;
        //     height: 17px;
        //     color: #E55D5D;
        //   }
        //   .btn {
        //     width: 280px;
        //     height: 40px;
        //     line-height: 40px;
        //     text-align: center;
        //     background-color: rgba(244,117,29,0.30);
        //     border: 1px solid #F4751D;
        //     border-radius: 2px;
        //     color: #F4751D;
        //     cursor: pointer;
        //   }
        // }
      }

      .buy-tips {
        display: flex;
        padding: 29px 56px 29px 34px;
        border: 1px solid #979797;
        box-sizing: border-box;
        .tips-left {
          width: 104px;
          img {
            display: block;
            width: 100%;
          }
        }
        .tips-right {
          flex: 1;
          padding-left: 22px;
          box-sizing: border-box;
          .title {
            font-size: 14px;
            line-height: 32px;
            color: #262626;
            font-weight: bold;
          }
          .text {
            font-size: 14px;
            line-height: 24px;
            color: #888;
          }
        }
      }
    }
  }

  .activity-detail {
    margin-top: 15px;
    margin-bottom: 20px;
    padding-top: 40px;
    min-height: 800px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    .max-width {
      max-width: 900px;
      article {
        width: 100%;
        box-sizing: border-box;
        img {
          max-width: 100%;
        }
        p {
          width: 100%;
          img {
            max-width: 100%;
          }
        }
      }
    }
  }

  // .dialog-layer {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.5);
  //   z-index: 2;
  //   .dialog-flex {
  //     flex: 1;
  //     .dialog-block {
  //       position: relative;
  //       display: block;
  //       margin: auto;
  //       padding: 25px 30px 35px 30px;
  //       width: 340px;
  //       background-color: #fff;
  //       border-radius: 2px;
  //       box-sizing: border-box;
  //       .close {
  //         position: absolute;
  //         right: 16px;
  //         top: 12px;
  //         cursor: pointer;
  //         z-index: 1;
  //       }
  //       .title {
  //         margin-bottom: 30px;
  //         font-size: 16px;
  //         line-height: 22px;
  //         color: #333;
  //         text-align: center;
  //         font-weight: bold;
  //       }
  //       .input-group {
  //         display: flex;
  //         align-items: center;
  //         margin-bottom: 20px;
  //         width: 100%;
  //         height: 36px;
  //         line-height: 36px;
  //         border: 1px solid #979797;
  //         border-radius: 2px;
  //         box-sizing: border-box;
  //         span {
  //           display: block;
  //           padding-left: 10px;
  //           width: 36px;
  //           font-size: 12px;
  //           color: #888;
  //         }
  //         input {
  //           flex: 1;
  //           border: none;
  //           outline: none;
  //           padding: 0;
  //           font-size: 12px;
  //         }
  //       }

  //       .btn {
  //         margin: auto;
  //         margin-top: 45px;
  //         width: 100px;
  //         height: 38px;
  //         line-height: 38px;
  //         text-align: center;
  //         background-color: #F4C51D;
  //         color: #000;
  //         font-size: 14px;
  //         border-radius: 2px;
  //         cursor: pointer;
  //       }

  //       // 版权
  //       .cop-title {
  //         padding-top: 15px;
  //         color: #333;
  //         font-size: 16px;
  //         line-height: 22px;
  //         font-weight: bold;
  //         word-break: break-all;
  //       }
  //       .cop-content {
  //         color: #888;
  //         font-size: 12px;
  //         line-height: 18px;
  //       }

  //       // 反馈
  //       .feedback-content {
  //         img {
  //           display: block;
  //           margin: auto;
  //           width: 118px;
  //         }
  //         .title {
  //           margin-top: 36px;
  //           text-align: center;
  //           font-size: 16px;
  //           line-height: 22px;
  //           color: #333;
  //         }
  //         .content {
  //           padding: 0 15%;
  //           font-size: 12px;
  //           line-height: 17px;
  //           color: #333;
  //           text-align: center;
  //           box-sizing: border-box;
  //         }
  //       }
  //     }
  //   }
  // }

  // /* 可以设置不同的进入和离开动画 */
  // /* 设置持续时间和动画函数 */
  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity 0.25s, transform 0.25s;
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  //   opacity: 0;
  //   transform: translate(0, -15px);
  // }
  // .fade-leave, .fade-enter-to {
  //   transform: translate(0, 0);
  // }
  // .banner {
  //   display: flex;
  //   align-items: top;
  //   margin-top: 20px;
  //   width: 100%;
  //   height: 330px;
  //   border-radius: 10px;
  //   background-color: #fff;
  //   overflow: hidden;
  //   .banner-left {
  //     width: 330px;
  //     height: 100%;
  //     background-color: #eee;
  //     .img {
  //       width: 100%;
  //       height: 100%;
  //       background-position: 50%;
  //       background-size: cover;
  //     }
  //   }
  //   .banner-mid {
  //     padding: 30px;
  //     flex: 1;
  //     height: 100%;
  //     box-sizing: border-box;
  //     .title {
  //       font-size: 16px;
  //       font-family: PingFang SC Regular;
  //       color: rgba(102,102,102,1);
  //       line-height: 24px;
  //     }
  //     .sub-title {
  //       margin-top: 10px;
  //       font-size: 14px;
  //       font-family: PingFang SC Regular;
  //       color: rgba(51,51,51,1);
  //       line-height: 24px;
  //     }
  //     .info {
  //       margin-top: 30px;
  //       p {
  //         margin-top: 14px;
  //         margin-bottom: 0;
  //         line-height: 17px;
  //         color: #999;
  //       }
  //     }
  //   }
  //   .banner-right {
  //     position: relative;
  //     text-align: right;
  //     padding: 30px;
  //     // width: 210px;
  //     box-sizing: border-box;
  //     .icon-btn {
  //       position: relative;
  //       .icon {
  //         display: inline-block;
  //         padding: 0 15px;
  //         height: 32px;
  //         line-height: 32px;
  //         border-radius: 10px;
  //         background-color: #EBEBEB;
  //         cursor: pointer;
  //         font-size: 14px;
  //         color: #666;
  //       }
  //       .tips {
  //         position: absolute;
  //         right: 0;
  //         top: 50px;
  //         width: 169px;
  //         height: 65px;
  //       }
  //     }
  //     .btn {
  //       position: absolute;
  //       right: 30px;
  //       bottom: 30px;
  //       display: block;
  //       width: 120px;
  //       height: 40px;
  //       line-height: 40px;
  //       background-color: #FFCB2B;
  //       border-radius: 10px;
  //       text-align: center;
  //       font-size: 16px;
  //       font-family: PingFang SC Regular;
  //       color: #333;
  //       cursor: pointer;
  //       &.disabled {
  //         background: #EBEBEB;
  //       }
  //     }
  //   }
  // }
  // .activity-detail {
  //   margin-top: 15px;
  //   margin-bottom: 20px;
  //   padding: 30px;
  //   min-height: 400px;
  //   width: 100%;
  //   background-color: #fff;
  //   box-sizing: border-box;
  //   article {
  //     width: 100%;
  //     box-sizing: border-box;
  //     img {
  //       max-width: 100%;
  //     }
  //   }
  // }

  // .dialog {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.34);
  //   z-index: 3;
  //   .dialog-box {
  //     position: relative;
  //     margin: auto;
  //     padding: 30px;
  //     background-color: #fff;
  //     border-radius: 10px;
  //     z-index: 1;
  //     .dialog-flex {
  //       display: inline-flex;
  //       .img {
  //         width: 300px;
  //         height: 300px;
  //         border-radius: 10px;
  //         background-color: #E7C352;
  //         background-position: 50%;
  //         background-size: cover;
  //       }
  //       .right {
  //         padding-left: 30px;
  //         .fee {
  //           font-size: 16px;
  //           font-family: PingFang SC Regular;
  //           color: rgba(243,107,107,1);
  //         }
  //         .form-group {
  //           margin-top: 15px;
  //           span {
  //             font-size: 16px;
  //             letter-spacing: 3px;
  //             font-family: PingFang SC Regular;
  //             color: #333;
  //           }
  //           input {
  //             margin-left: 9px;
  //             padding: 0;
  //             font-size: 16px;
  //             width: 330px;
  //             height: 40px;
  //             line-height: 40px;
  //             border: none;
  //             outline: none;
  //             border-bottom: 1px solid #DDD;
  //           }
  //         }
  //         .tips {
  //           margin-top: 15px;
  //           font-size: 16px;
  //           font-family: PingFang SC Regular;
  //           color: rgba(243,107,107,1);
  //         }
  //       }
  //     }

  //     .btn {
  //       display: block;
  //       margin: auto;
  //       margin-top: 15px;
  //       width: 300px;
  //       height: 40px;
  //       line-height: 40px;
  //       background-color: rgba(241,196,74,1);
  //       font-family: PingFang SC Regular;
  //       color: #333;
  //       text-align: center;
  //       border-radius: 10px;
  //       cursor: pointer;
  //     }

  //     .qrcode {
  //       width: 340px;
  //       height: 340px;
  //       background-position: 50%;
  //       background-size: cover;
  //     }
  //     .text {
  //       text-align: center;
  //       font-size: 16px;
  //       font-family: PingFang SC Regular;
  //       color: #333;
  //       line-height: 24px;
  //     }
  //     .close {
  //       position: absolute;
  //       right: 15px;
  //       top: 15px;
  //       font-size: 16px;
  //       font-family: PingFang SC Regular;
  //       color: #999;
  //       cursor: pointer;
  //       z-index: 2;
  //     }
  //   }
  //   .dialog-bg {
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 0;
  //   }
  // }
</style>
