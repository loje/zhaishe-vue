<template>
  <div class="user-page">
    <div class="user-top">
      <div class="user-head">
        <div class="img"></div>
        <div class="name"></div>
      </div>
      <div class="user-bg"></div>
    </div>

    <div class="max-width">
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block active">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">正在举办的活动</div>
        <div class="block-list">
          <div class="block ing">宅设第二十期</div>
          <div class="block end">宅设第二十期</div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-title">您参与的过活动</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.getToken();
    }
  },
  methods: {
    getToken() {
      this.$axios.get(`/weixin/sns/oauth2/access_token?appid=wx9a76b368090721eb&secret=f17b3a8b2b6f23e998b8af0372fd7774&code=${this.$route.query.code}&grant_type=authorization_code`).then((res) => {
        if (res.data.errcode === 40163) {
          location.href = '/';
          return false;
        }
        console.log('取token');
        console.log(res);
        this.$axios.get(`/weixin/sns/userinfo?access_token=${res.data.access_token}&openid=${res.data.openid}`).then((user) => {
          console.log('微信用户信息');
          console.log(user);
          this.$Bmob.User.users().then(res => {
            console.log(res);
            const userlist = res.results;
            for (let i = 0; i < userlist.length; i += 1) {
              if (userlist[i].openid === user.data.openid) {
                localStorage.setItem('bmob', JSON.stringify(userlist[i]));
                this.$store.dispatch('getUser', userlist[i]);
              }
            }
            // const isWX = userlist.some((item) => item.openid === user.data.openid);
            // if (isWX) {
            //   localStorage.setItem('bmob', JSON.stringify(isWX));
            //   console.log('已有这个用户');
            //   return false;
            // }

            console.log('还没有这个用户');
          }).catch(err => {
            console.log(err)
          })
        });
      });
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
</style>