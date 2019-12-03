<template>
  <div class="activity-page">
    <div class="max-width">
      <div class="banner">
        <div class="banner-left">
          <div class="img" :style="{backgroundImage: `url(${imgSrc})`}"></div>
        </div>
        <div class="banner-mid">
          <div class="title">{{title}}</div>
          <div class="sub-title">{{desc}}</div>
          <div class="info">
            <p>活动时间：{{starttime}} ~ {{endtime}}</p>
            <p>活动人数：{{number > 0 ? number : '不限'}}</p>
            <p>活动方式：{{mode}}</p>
            <p>活动费用：{{fee > 0 ? fee : '免费'}}</p>
          </div>
          <div class="pv">浏览量：1000</div>
        </div>
        <div class="banner-right">
          <div class="icon-btn" @click="toRecord">
            <div class="icon" @click="toRecord">会后笔记</div>
          </div>
          <a class="btn" @click="apply">报名</a>
        </div>
      </div>
      <div class="activity-detail">
        <article v-html="content"></article>
      </div>
    </div>

    <div class="dialog" v-if="applyShow">
      <div class="dialog-box">
        <div class="dialog-flex">
          <div class="img" :style="{ backgroundImage: `url(${dialog.img})` }"></div>
          <div class="right">
            <div class="fee">报名费：{{fee > 0 ? fee : '免费'}}</div>
            <div class="form-group">
              <span>姓名</span>
              <input type="text" v-model="dialog.form.name" />
            </div>
            <div class="form-group">
              <span>电话</span>
              <input type="text" v-model="dialog.form.mobilePhoneNumber" />
            </div>
            <div class="form-group">
              <span>微信</span>
              <input type="text" v-model="dialog.form.wechatId"/>
            </div>
            <div class="tips" v-if="tips">{{tips}}</div>
          </div>
        </div>
        <a class="btn" @click="putApply">报名</a>
      </div>
      <div class="dialog-bg"></div>
    </div>

    <div class="dialog" v-if="qrcodeShow">
      <div class="dialog-box">
        <div class="qrcode" style="background-image:url(http://lc-vwzM34py.cn-n1.lcfile.com/2c6d13fd78972b42d924/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191112174429.png)"></div>
        <div class="text">
          报名成功<br/>24小时内小编会联系您进行支付
        </div>
        <span class="close" @click="qrcodeHide">关闭</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      imgSrc: '',
      title: '',
      desc: '',
      starttime: '',
      endtime: '',
      number: 0,
      mode: '',
      fee: '',
      content: '',
      applyShow: false,
      dialog: {
        img: '',
        form: {
          name: '',
          mobilePhoneNumber: '',
          wechatId: '',
        },
      },
      qrcodeShow: false,
      tips: '',
    }
  },
  mounted() {
    const that = this;
    var query = new this.$AV.Query('activity');
    var activityModeQuery = new this.$AV.Query('activity_mode');
    var img = new this.$AV.Query('_File');

    query.get(this.$route.query.id).then((res) => {
      img.get(res.get('img').id).then((src) => {
        that.imgSrc = src.get('url') || '';
      });
      that.title = res.get('title') || '';
      that.desc = res.get('desc') || '';
      that.starttime = that.$moment(res.get('startTime')).format('YYYY-MM-DD HH:mm') || '';
      that.endtime = that.$moment(res.get('endTime')).format('YYYY-MM-DD HH:mm') || '';
      that.number = res.get('number') || 0;
      activityModeQuery.get(res.get('mode').id).then((mode) => {
        that.mode = mode.get('mode');
      });
      that.fee = res.get('fee') || '';
      that.content = res.get('content') || '';
    });
  },
  methods: {
    apply() {
      this.dialog.img = this.imgSrc;
      this.applyShow = true;
    },
    putApply() {
      if (!this.dialog.form.name) {
        this.tips = '请填写名字';
        return false;
      }
      if (!this.dialog.form.mobilePhoneNumber) {
        this.tips = '请填写手机号码';
        return false;
      }
      if (this.dialog.form.mobilePhoneNumber.length !== 11) {
        this.tips = '手机号码格式错误';
        return false;
      }
      if (!this.dialog.form.wechatId) {
        this.tips = '请填写微信';
        return false;
      }
      const that = this;
      var User = this.$AV.Object.extend('_User');
      var user = new User();

      var activityObject = this.$AV.Object.createWithoutData('activity', that.$route.query.id);
      user.set(that.dialog.form);
      user.set('username', that.dialog.form.name);
      user.set('password', '123456');
      user.save().then(function (user) {
        console.log(user);
        var userObject = that.$AV.Object.createWithoutData('_User', user.id);
        var ActivityPerson = new that.$AV.Object('activity_person');
        ActivityPerson.set('activity', activityObject);
        ActivityPerson.set('user', userObject);
        ActivityPerson.save().then((res) => {
          console.log(res);
          that.applyShow = false;
          that.qrcodeShow = true;
        });
      }, (error) => {
        console.log(error);
        that.tips = '保存失败，手机号/微信号或已被占用'
        // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
      }).catch((err) => {
        console.log(err);
      });
    },
    qrcodeHide() {
      this.qrcodeShow = false;
    },
    toRecord() {
      this.$router.push('/activity/record');
    },
  },
};
</script>
<style lang="scss" scope>
  .banner {
    display: flex;
    align-items: top;
    margin-top: 20px;
    width: 100%;
    height: 426px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .banner-left {
      width: 428px;
      height: 100%;
      background-color: #FFCB2B;
      .img {
        width: 100%;
        height: 100%;
        background-position: 50%;
        background-size: cover;
      }
    }
    .banner-mid {
      padding: 30px;
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      .title {
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: rgba(102,102,102,1);
        line-height: 24px;
      }
      .sub-title {
        margin-top: 20px;
        font-size: 14px;
        font-family: PingFang SC Regular;
        color: rgba(51,51,51,1);
        line-height: 24px;
      }
      .info {
        margin-top: 30px;
        p {
          margin-top: 14px;
          margin-bottom: 0;
          line-height: 17px;
          color: #999;
        }
      }
      .pv {
        margin-top: 50px;
      }
    }
    .banner-right {
      position: relative;
      text-align: right;
      padding: 30px 30px 30px 0;
      width: 210px;
      box-sizing: border-box;
      .icon-btn {
        position: relative;
        .icon {
          display: inline-block;
          padding: 0 15px;
          height: 32px;
          line-height: 32px;
          border-radius: 6px;
          background-color: #EBEBEB;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }
        .tips {
          position: absolute;
          right: 0;
          top: 50px;
          width: 169px;
          height: 65px;
        }
      }
      .btn {
        position: absolute;
        right: 30px;
        bottom: 30px;
        display: block;
        width: 170px;
        height: 50px;
        line-height: 50px;
        background-color: #FFCB2B;
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        cursor: pointer;
      }
    }
  }
  .activity-detail {
    margin-top: 30px;
    margin-bottom: 138px;
    padding: 86px 155px 105px 155px;
    min-height: 1274px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    article {
      width: 100%;
      box-sizing: border-box;
      img {
        max-width: 100%;
      }
    }
  }

  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.34);
    z-index: 3;
    .dialog-box {
      position: relative;
      margin: auto;
      padding: 59px 54px 30px 48px;
      background-color: #fff;
      border-radius: 10px;
      z-index: 1;
      .dialog-flex {
        display: inline-flex;
        .img {
          width: 300px;
          height: 300px;
          border-radius: 10px;
          background-color: #E7C352;
          background-position: 50%;
          background-size: cover;
        }
        .right {
          padding-left: 57px;
          .fee {
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
          .form-group {
            margin-top: 23px;
            width: 382px;
            span {
              font-size: 18px;
              letter-spacing: 3px;
              font-family: PingFang SC Regular;
              color: #333;
            }
            input {
              margin-left: 9px;
              padding: 0;
              width: 330px;
              height: 47px;
              border: none;
              outline: none;
              border-bottom: 1px solid #DDD;
            }
          }
          .tips {
            margin-top: 27px;
            font-size: 18px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
        }
      }

      .btn {
        display: block;
        margin: auto;
        margin-top: 46px;
        width: 400px;
        height: 50px;
        line-height: 50px;
        background-color: rgba(241,196,74,1);
        font-family: PingFang SC Regular;
        color: #333;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }

      .qrcode {
        width: 340px;
        height: 340px;
        background-position: 50%;
        background-size: cover;
      }
      .text {
        text-align: center;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: #333;
        line-height: 24px;
      }
      .close {
        position: absolute;
        right: 47px;
        top: 39px;
        font-size: 18px;
        font-family: PingFang SC Regular;
        color: #333;
        cursor: pointer;
        z-index: 2;
      }
    }
    .dialog-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
</style>
