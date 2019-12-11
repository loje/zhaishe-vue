<template>
  <div class="activity-page">
    <div class="max-width">
      <div class="banner">
        <div class="banner-left">
          <loading class="img" v-if="loading === true"></loading>
          <div v-else class="img" :style="{backgroundImage: `url(${imgSrc})`}"></div>
        </div>
        <loading v-if="loading === true"></loading>
        <template v-else>
        <div class="banner-mid">
          <div class="title">{{title}}</div>
          <div class="sub-title">{{desc}}</div>
          <div class="info">
            <p>活动时间：{{starttime}} ~ {{endtime}}</p>
            <p>活动人数：{{number > 0 ? number : '不限'}}</p>
            <p>活动方式：{{mode}}</p>
            <p>活动费用：{{fee > 0 ? fee : '免费'}}</p>
          </div>
          <!-- <div class="pv">浏览量：1000</div> -->
        </div>
        <div class="banner-right">
          <div class="icon-btn" @click="toRecord">
            <div class="icon" @click="toRecord">会后笔记</div>
          </div>
          <a class="btn disabled" v-if="status === 0">未开放</a>
          <a class="btn" v-else-if="status === 1" @click="apply">可报名</a>
          <a class="btn disabled" v-else-if="status === 2">已结束</a>
        </div>
        </template>
      </div>
      <div class="activity-detail">
        <loading v-if="!content"></loading>
        <article v-else v-html="content"></article>
      </div>
    </div>

    <div class="dialog" v-if="applyShow">
      <div class="dialog-box">
        <span class="close" @click="applyHide">关闭</span>
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
import loading from '@/components/Loading';
export default {
  components: {
    loading,
  },
  data() {
    return {
      loading: false,
      imgSrc: '',
      title: '',
      desc: '',
      starttime: '',
      endtime: '',
      number: 0,
      mode: '',
      status: 0,
      fee: '',
      modeList: [
        {
          label: '线下活动',
          value: 1,
        },
        {
          label: '线上直播',
          value: 2,
        },
      ],
      sortList: [
        {
          label: '宅设主办',
          value: 1,
        },
        {
          label: '推荐活动',
          value: 2,
        },
        {
          label: '合作活动',
          value: 3,
        },
        {
          label: '探讨会',
          value: 4,
        },
      ],
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
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.loading = true;
      var query = this.$Bmob.Query('activity');
      query.get(this.$route.query.id).then((res) => {
        for (let key in res.startTime) {
          if (key === 'iso') {
            this.starttime = res.startTime[key];
          }
        }
        for (let key in res.endTime) {
          if (key === 'iso') {
            this.endtime = res.endTime[key];
          }
        }
        this.loading = false;
        this.imgSrc = res.imgSrc || '';
        this.title = res.title || '';
        this.desc = res.desc || '';
        this.number = res.number || 0;
        this.mode = this.modeList[res.mode - 1].label;
        this.fee = res.fee || '';
        this.content = res.content || '';
        this.status = res.status;
      });
    },
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
      if (this.dialog.form.mobilePhoneNumber.length === 11) {
        let apQuery = this.$Bmob.Query('activity_person');
        
        let userQuery = this.$Bmob.Query('_User');
        userQuery.equalTo('mobilePhoneNumber', '==', this.dialog.form.mobilePhoneNumber);
        userQuery.find().then((user) => {
          if (user.length > 0) {
            if (user[0].name !== this.dialog.form.name) {
              this.tips = '名字或手机号有误，请检查或联系管理员';
              return false;
            }
            if (user[0].wechatId !== this.dialog.form.wechatId) {
              this.tips = '微信号或手机号有误，请检查或联系管理员';
              return false;
            }

            const userPointer = this.$Bmob.Pointer('_User')
            const userID = userPointer.set(user[0].objectId)
            apQuery.equalTo("user","==", userID);
            apQuery.find().then((ap) => {
              if (ap.length > 0) {
                this.tips = '您已经报名啦，请等候管理员联系您';
              } else {
                let ActivityPerson = this.$Bmob.Query('activity_person');
                const activityPointer = this.$Bmob.Pointer('activity')
                const activityID = activityPointer.set(this.$route.query.id)

                ActivityPerson.set('activity', activityID);
                ActivityPerson.set('user', userID);
                ActivityPerson.save().then(() => {
                  this.tips = '';
                  this.dialog = {
                    form: {
                      name: '',
                      mobilePhoneNumber: '',
                      wechatId: '',
                    },
                  };
                  this.applyShow = false;
                  this.qrcodeShow = true;
                });
              }
            });
          } else {
            console.log('创建新用户');
            userQuery.set('name', this.dialog.form.name);
            userQuery.set('mobilePhoneNumber', this.dialog.form.mobilePhoneNumber);
            userQuery.set('wechatId', this.dialog.form.wechatId);
            userQuery.set('username', this.dialog.form.name);
            userQuery.set('password', '123456');
            userQuery.save().then((newUser) => {
              console.log('-----------newUser------------------');
              console.log(newUser);

              let ActivityPerson = this.$Bmob.Query('activity_person');
              
              const activityPointer = this.$Bmob.Pointer('activity')
              const activityID = activityPointer.set(this.$route.query.id)

              const userPointer = this.$Bmob.Pointer('_User')
              const userID = userPointer.set(newUser.objectId)

              ActivityPerson.set('activity', activityID);
              ActivityPerson.set('user', userID);
              ActivityPerson.save().then(() => {
                this.applyShow = false;
                this.qrcodeShow = true;
              });
            }).catch((err) => {
              console.log(err);
            });
          }
        });
      }
    },
    applyHide() {
      this.applyShow = false;
    },
    qrcodeHide() {
      this.qrcodeShow = false;
    },
    toRecord() {
      this.$router.push({
        path: '/activity/record',
        query: {
          id: this.$route.query.id,
        },
      });
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
    height: 330px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .banner-left {
      width: 330px;
      height: 100%;
      background-color: #eee;
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
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: rgba(102,102,102,1);
        line-height: 24px;
      }
      .sub-title {
        margin-top: 10px;
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
      padding: 30px;
      // width: 210px;
      box-sizing: border-box;
      .icon-btn {
        position: relative;
        .icon {
          display: inline-block;
          padding: 0 15px;
          height: 32px;
          line-height: 32px;
          border-radius: 10px;
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
        width: 120px;
        height: 40px;
        line-height: 40px;
        background-color: #FFCB2B;
        border-radius: 10px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        cursor: pointer;
        &.disabled {
          background: #EBEBEB;
        }
      }
    }
  }
  .activity-detail {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 30px;
    min-height: 400px;
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
      padding: 30px;
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
          padding-left: 30px;
          .fee {
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
          .form-group {
            margin-top: 15px;
            // width: 382px;
            span {
              font-size: 16px;
              letter-spacing: 3px;
              font-family: PingFang SC Regular;
              color: #333;
            }
            input {
              margin-left: 9px;
              padding: 0;
              font-size: 16px;
              width: 330px;
              height: 40px;
              line-height: 40px;
              border: none;
              outline: none;
              border-bottom: 1px solid #DDD;
            }
          }
          .tips {
            margin-top: 15px;
            font-size: 16px;
            font-family: PingFang SC Regular;
            color: rgba(243,107,107,1);
          }
        }
      }

      .btn {
        display: block;
        margin: auto;
        margin-top: 15px;
        width: 300px;
        height: 40px;
        line-height: 40px;
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
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #333;
        line-height: 24px;
      }
      .close {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 16px;
        font-family: PingFang SC Regular;
        color: #999;
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
