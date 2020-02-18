<template>
  <div class="user-info">
    <div class="func-btn">
      <div class="back" @click="back">
        <i class="iconfont">&#xe693;</i>
        <span>返回</span>
      </div>
      <div class="btn">保存</div>
    </div>
    <div class="line"></div>
    <div class="info-title">基本信息</div>
    <div class="info-form">
      <div class="form-t">用户名</div>
      <div class="form-i">
        <input type="text" v-model="form.username" disabled />
      </div>
    </div>
    <div class="info-form">
      <div class="form-t">性别</div>
      <div class="form-i">
        <select v-model="form.sex">
          <option value="0">未知</option>
          <option value="1">男</option>
          <option value="2">女</option>
        </select>
      </div>
    </div>
    <div class="info-form">
      <div class="form-t">邮箱</div>
      <div class="form-i">
        <input type="text" v-model="form.email" />
      </div>
    </div>
    <div class="info-form">
      <div class="form-t">所在地</div>
      <div class="form-i">{{form.province}} - {{form.city}}</div>
    </div>
    <div class="info-form">
      <div class="form-t">职业</div>
      <div class="form-i">
        <input type="text" v-model="form.profession" />
      </div>
    </div>
    <div class="info-title">联系方式</div>
    <div class="info-form">
      <div class="form-t">QQ</div>
      <div class="form-i">
        <input type="text" v-model="form.qq" />
      </div>
    </div>
    <div class="info-form">
      <div class="form-t">微信</div>
      <div class="form-i">
        <input type="text" v-model="form.wechatId" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: '',
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    back() {
      
    },
    getUserInfo() {
      const openid = JSON.parse(localStorage.getItem('memberInfo')).openid;
      this.$Bmob.User.users().then((res) => {
        const userlist = res.results;
        const isWX = userlist.some((item) => item.openid === openid && openid !== '');
        if (isWX) {
          for (let i = 0; i < userlist.length; i += 1) {
            if (userlist[i].openid === openid) {
              this.form = userlist[i];
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .user-info {
    padding-top: 60px;
    .func-btn {
      position: relative;
      padding-bottom: 10px;
      height: 50px;
      box-sizing: border-box;
      .back {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 2px;
        color: #333;
        cursor: pointer;
        i {
          display: inline-block;
          vertical-align: middle;
          color: #F4C51D;
        }
        span {
          margin-left: 5px;
          display: inline-block;
          vertical-align: middle;
          line-height: 28px;
          font-size: 14px;
        }
      }
      .btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        height: 38px;
        line-height: 38px;
        background-color: #F4C51D;
        border: 1px solid #F4C51D;
        color: #262626;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        transition: background-color 0.2s ease;
        cursor: pointer;
        &:hover {
          background-color: rgba(244, 197, 29, 0.3);
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
    .info-title {
      margin-top: 40px;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      line-height: 22px;
    }
    .info-form {
      display: flex;
      margin-top: 25px;
      font-size: 14px;

      .form-t {
        width: 64px;
        text-align: right;
        color: #888;
        line-height: 32px;
      }
      .form-i {
        flex: 1;
        padding-left: 60px;
        line-height: 32px;
        input, select {
          padding: 0 10px;
          width: 180px;
          height: 32px;
          border: 1px solid #979797;
          border-radius: 4px;
          box-sizing: border-box;
          outline: none;
        }
      }
    }
  }
</style>