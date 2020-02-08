<template>
  <div class="user-page">
    <div class="user-top">
      <div class="user-head">
        <div class="img" :style="{backgroundImage: `url(${$store.state.user.imgSrc})`}"></div>
        <div class="name">{{$store.state.user.username}}</div>
      </div>
      <div class="user-bg"></div>
    </div>

    <div class="max-width">
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block ing">宅设第二十期</div>
          <div class="block end">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">您参与过的活动</div>
        <div class="block-list">
          <div class="block">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">购买的工具</div>
        <div class="block-list">
          <div class="block">宅设第二十期</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="order-block">
        <div class="block-title">
          <div class="title">我要接单</div>
          <div class="handle">
            <div class="prev">
              <i class="iconfont">&#xe693;</i>
            </div>
            <div class="next">
              <i class="iconfont">&#xe600;</i>
            </div>
          </div>
        </div>
        <div class="block-list">
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
          <div class="list-item" >
            <div class="icon">
              <i class="iconfont" style="color:#D3D4D4;">&#xeacd;</i>
            </div>
            <div class="title">web设计</div>
            <div class="item-right">2天前发布</div>
          </div>
        </div>
      </div>
      <div class="order-view">
        <div class="view-func">
          <div class="btn">我要发布需求</div>
        </div>
        <div class="view-block">
          <div class="view-t">UI界面设计</div>
          <div class="view-left">
            <div class="view-info">
              <div class="info-l">联系人：</div>
              <div class="info-content">邹先生</div>
            </div>
            <div class="view-info">
              <div class="info-l">电话：</div>
              <div class="info-content">1864755546</div>
            </div>
            <div class="view-info">
              <div class="info-l">微信：</div>
              <div class="info-content">12934213</div>
            </div>
            <div class="view-info">
              <div class="info-l">预算：</div>
              <div class="info-content">1000元</div>
            </div>
          </div>
          <div class="view-right">
            <div class="right-text">需求：dsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsaddsadadsadadsad</div>
          </div>
        </div>
      </div>
    </div>

    <tips :tips="tipsText" tipsBackgroundColor="rgba(255, 0, 24, 0.75)"></tips>
  </div>
</template>

<script>
import tips from '@/components/Tips';

export default {
  components: {
    tips,
  },
  data() {
    return {
      userList: [],
      tipsText: '',
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.getToken();
    } else {
      location.href = '/';
    }
  },
  methods: {
    getToken() {
      if (!localStorage.getItem('memberInfo')) {
        let params = {
          funcName: 'access_token',
          data: {
            code : this.$route.query.code,
          }
        };
        this.$Bmob.functions(params.funcName, params.data).then((respon) => {
          if (respon.errcode === 40163) {
            location.href = '/';
            return false;
          }

          let param = {
            funcName: 'wechatUser',
            data: {
              access_token : respon.access_token,
              openid: respon.openid,
            }
          };
          this.$Bmob.functions(param.funcName, param.data).then((user) => {
            if (user.sucess === false) {
              this.$router.push('/');
              this.tipsText = user.message;
              let t = setTimeout(() => {
                this.tipsText = '';
                clearTimeout(t);
              }, 1500);
              return false;
            }
            this.$Bmob.User.users().then((res) => {
              const userlist = res.results;
              const isWX = userlist.some((item) => item.openid === user.openid && user.openid !== '');
              if (isWX) {
                for (let i = 0; i < userlist.length; i += 1) {
                  if (userlist[i].openid === user.openid) {
                    // localStorage.setItem('bmob', JSON.stringify(userlist[i]));
                    localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                    this.$store.dispatch('getMember', userlist[i]);
                  }
                }
              } else {
                const email = `user${new Date().getTime()}@bmob.cn`;
                let params = {
                  username: user.nickname,
                  password: '123456',
                  email,
                  imgSrc: user.headimgurl,
                  openid: user.openid,
                  sex: user.sex,
                  city: user.city,
                  province: user.province,
                  country: user.country,
                }
                this.$Bmob.User.register(params).then(r => {
                  this.$Bmob.User.users().then(u => {
                    let ul = u.results;
                    for (let i = 0; i < ul.length; i += 1) {
                      if (ul[i].objectId === r.objectId) {
                        // localStorage.setItem('bmob', JSON.stringify(ul[i]));
                        localStorage.setItem('memberInfo', JSON.stringify(userlist[i]));
                        this.$store.dispatch('getMember', ul[i]);
                        location.href = '/user';
                      }
                    }
                  })
                }).catch(err => {
                  console.log(err)
                });
              }
            });
          });
        });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .user-top {
    position: relative;
    padding-bottom: 20px;
    width: 100%;
    .user-head {
      position: relative;
      padding-top: 175px;
      z-index: 1;
      .img {
        margin: auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        background-size: cover;
      }
      .name {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: #242424;
      }
    }
    .user-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 230px;
      background-color: rgba(244,197,29,0.2);
      z-index: 0;
    }
  }

  .user-block {
    padding: 20px 0;
    .block-title {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
      color: #242424;
    }
    .block-list {
      .block {
        display: inline-flex;
        vertical-align: middle;
        align-items: center;
        justify-content: center;
        margin-right: 50px;
        width: 160px;
        height: 70px;
        text-align: center;
        border: 1px solid #F4751D;
        color: #F4751D;
        font-size: 12px;
        line-height: 17px;
        border-radius: 2px;
        box-sizing: border-box;
        transition: all 250ms ease-in-out;
        cursor: pointer;
        &.ing {
          background-color: rgba(244,117,29,0.30);
          border-color: #F4761F;
          color: #F4761F;
        }
      }
    }
  }

  .line {
    margin: 25px 0;
    width: 100%;
    height: 1px;
    background-color: #F2F2F2;
  }

  .order-block {
    display: inline-block;
    padding: 20px 0;
    width: 300px;
    vertical-align: top;
    box-sizing: border-box;
    .block-title {
      position: relative;
      margin-bottom: 20px;
      .title {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #383838;
        line-height: 22px;
        vertical-align: middle;
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
    .block-list {
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
        .icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-position: 50%;
          background-size: cover;
          i {
            display: block;
          }
        }
        .title {
          flex: 1;
          padding-left: 5px;
          height: 20px;
          color: #888;
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
  }

  .order-view {
    display: inline-block;
    padding-left: 50px;
    width: calc(100% - 300px);
    vertical-align: top;
    box-sizing: border-box;
    .view-func {
      margin-bottom: 15px;
      width: 100%;
      text-align: right;
      .btn {
        display: inline-block;
        width: 120px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        background-color: #F4761F;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
    }
    .view-block {
      padding: 25px 50px;
      width: 100%;
      background-color: #f9f9f9;
      color: #262626;
      box-sizing: border-box;
      .view-t {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
      }
      .view-left {
        display: inline-block;
        width: 200px;
        vertical-align: top;
        .view-info {
          margin-top: 15px;
          width: 100%;
          font-size: 12px;
          line-height: 17px;
          .info-l {
            display: inline-block;
            margin-right: 20px;
            vertical-align: middle;
            text-align: justify;
            width: 48px;
          }
          .info-content {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
      .view-right {
        display: inline-block;
        width: calc(100% - 200px);
        vertical-align: top;
        .right-text {
          margin-top: 15px;
          width: 100%;
          font-size: 12px;
          line-height: 17px;
          word-break: break-all;
        }
      }
    }
  }
</style>