<template>
  <div class="card-list">
    <template v-for="(item, $index) in productOrderList">
      <div class="the-card" :key="$index">
        <div class="card-left">
          <div class="img" :style="{backgroundImage: `url(${item.product.imgSrc})`}"></div>
          <div class="title">{{item.product.title}}</div>
        </div>
        <div class="card-right">
          <div class="time">{{item.year}}/{{item.month}}/{{item.date}}</div>
          <div class="sn">{{item.sn}}</div>
          <div class="sort">{{item.sortName}}</div>
        </div>
      </div>
    </template>
    <div class="the-card add" @click="showTool">
      <div class="add-flex">
        <i class="iconfont">&#xe610;</i>
        <div class="text">添加属于您的工具卡</div>
      </div>
    </div>

    <transition name="fade">
      <div class="dialog-layer" v-if="dialogToolShow">
        <div class="dialog-flex">
          <div class="dialog-block" style="width:370px">
            <span class="close" @click="dialogToolShow = false">
              <i class="iconfont">&#xea13;</i>
            </span>
            <div class="dialog-title">新增工具</div>
            <div class="dialog-content">
              <div class="input-group">
                <span>工具名称</span>
                <select v-model="index" @change="bindPickerChange">
                  <option
                    v-for="(item, $index) in toollist"
                    :key="$index"
                    :value="$index"
                  >{{item.title}}</option>
                </select>
              </div>

              <div class="input-group">
                <span>序列号</span>
                <input type="text" v-model="toolDialog.sn" placeholder="请填写序列号" />
              </div>

              <div class="input-group">
                <span>类型</span>
                <select v-model="toolDialog.sortName">
                  <option v-for="(item, $index) in sortlist" :key="$index" :value="item">{{item}}</option>
                </select>
              </div>

              <div class="input-group">
                <span>图标</span>
                <img v-if="index < (toollist.length - 1)" :src="toollist[index].imgSrc" />
              </div>

              <div class="error" v-if="toolDialog.error">{{toolDialog.error}}</div>
            </div>
            <div class="btn" @click="comfilmTool">提交</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
	data() {
		return {
			productOrderList: [],
			toollist: [],
      sortlist: ["一年", "年度", "月度", "终身"],
      dialogToolShow: false,
      toolDialog: {
        title: "",
        phone: "",
        error: ""
      },
			index: 0,
			
			tipsText: "",
      tipsType: "error",
		}
	},
	mounted() {
		this.getProOrderList();
	},
	methods: {
		getProOrderList() {
      const userPointer = this.$Bmob.Pointer("_User");
      const userID = userPointer.set(this.$store.state.user.objectId);

      const query = this.$Bmob.Query("user_tool");
      query.equalTo("user", "==", userID);
      query.include("product");
      query.find().then(res => {
        for (let i = 0; i < res.length; i += 1) {
          // 时间转换
          res[i].year = new Date(res[i].updatedAt).getFullYear();
          res[i].month =
            new Date(res[i].updatedAt).getMonth() + 1 < 10
              ? "0" + (new Date(res[i].updatedAt).getMonth() + 1)
              : new Date(res[i].updatedAt).getMonth() + 1;
          res[i].date =
            new Date(res[i].updatedAt).getDate() < 10
              ? "0" + new Date(res[i].updatedAt).getDate()
              : new Date(res[i].updatedAt).getDate();
        }
        this.productOrderList = res;
      });
		},
		
		getToolList() {
      const query = this.$Bmob.Query("product");
      query.equalTo("notDelete", "==", true);
      query.find().then(res => {
        this.toollist = res.concat(this.toollist);
      });
    },
    showTool() {
      this.dialogToolShow = true;
      this.toolDialog = {
        title: "",
        phone: "",
        error: ""
      };
      this.getToolList();
    },
    bindPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      this.index = e.target.value;
		},
		comfilmTool() {
      const query = this.$Bmob.Query("user_tool");

      let userPointer = this.$Bmob.Pointer("_User");
      const userID = userPointer.set(
        JSON.parse(localStorage.getItem("memberInfo")).objectId
      );
      query.set("user", userID);

      if (this.index < this.toollist.length - 1) {
        let productPointer = this.$Bmob.Pointer("product");
        const productID = productPointer.set(
          this.toollist[this.index].objectId
        );
        query.set("product", productID);
      } else {
        if (this.toolDialog.title) {
          query.set("title", this.toolDialog.title);
        } else {
					this.toolDialog.error = "请填写标题";
          return false;
        }
      }

      if (this.toolDialog.sn) {
        query.set("sn", this.toolDialog.sn);
      } else {
				this.toolDialog.error = "请填写激活码";
        return false;
      }
      if (this.toolDialog.sortName) {
        query.set("sortName", this.toolDialog.sortName);
      } else {
				this.toolDialog.error = "请选择类型";
        return false;
      }

      if (this.index >= this.toollist.length - 1) {
        if (this.imgSrc) {
          query.set("imgSrc", this.toolDialog.imgSrc);
        } else {
					this.toolDialog.error = "请选择图标";
          return false;
        }
      }

      query.save().then(() => {
				this.tipsType = "success";
				this.tipsText = "😊记录成功！";
				this.dialogToolShow = false;
				this.toolDialog = {
					title: "",
					phone: "",
					error: ""
				};
				this.getProOrderList();
        let t = setTimeout(() => {
          this.tipsText = "";
          clearTimeout(t);
        }, 1500);
      });
    },
	},
}
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  .the-card {
    position: relative;
    margin-right: 30px;
    margin-bottom: 30px;
    padding: 20px;
    width: 310px;
    height: 175px;
    background-color: #ffffff;
    border-radius: 8px;
    box-sizing: border-box;
    &.add {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .add-flex {
        i {
          display: block;
          margin: auto;
          width: 76px;
          height: 76px;
          line-height: 76px;
          text-align: center;
          border: 1px solid #d8d8d8;
          border-radius: 50%;
          font-size: 24px;
          color: #d8d8d8;
        }
        .text {
          margin-top: 20px;
          font-size: 12px;
          font-weight: bold;
          color: #333333;
          line-height: 17px;
        }
      }
    }
    .card-left {
      position: absolute;
      left: 20px;
      bottom: 20px;
      width: 78px;
      .img {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        background-size: cover;
      }
      .title {
        margin-top: 15px;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        text-align: center;
      }
    }
    .card-right {
      position: absolute;
      right: 0;
      top: 0;
      padding-top: 20px;
      padding-right: 20px;
      width: calc(100% - 98px);
      height: 100%;
      text-align: right;
      box-sizing: border-box;
      .time {
        font-size: 12px;
        color: #333333;
        line-height: 17px;
      }
      .sn {
        font-size: 10px;
        font-weight: bold;
        color: #4f6ff9;
        line-height: 14px;
      }
      .sort {
        position: absolute;
        right: 20px;
        bottom: 20px;
        font-size: 20px;
        color: #666666;
        line-height: 28px;
      }
    }
  }
}

.dialog-layer {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .dialog-flex {
    flex: 1;
    .dialog-block {
      position: relative;
      display: block;
      margin: auto;
      padding: 40px 50px 35px 50px;
      width: 370px;
      background-color: #fff;
      border-radius: 2px;
      box-sizing: border-box;
      .close {
        position: absolute;
        right: 16px;
        top: 12px;
        cursor: pointer;
        z-index: 1;
      }
      .right {
        float: right;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
      }
      .dialog-title {
        margin-bottom: 16px;
        font-size: 16px;
        line-height: 22px;
        color: #333;
      }
      .input-group {
        position: relative;
        display: flex;
        margin-bottom: 20px;
        width: 100%;
        border: 1px solid #979797;
        border-radius: 2px;
        box-sizing: border-box;
        z-index: 0;
        span {
          position: relative;
          display: block;
          padding: 0 10px;
          min-width: 36px;
          font-size: 12px;
          color: #888;
          height: 34px;
          line-height: 34px;
          z-index: 1;
        }
        img {
          width: 135px;
          height: 135px;
        }
        select {
          flex: 1;
          border: none;
          outline: none;
        }
        input,
        .select-value {
          position: relative;
          flex: 1;
          border: none;
          outline: none;
          padding: 0;
          font-size: 12px;
          height: 34px;
          line-height: 34px;
          z-index: 1;
          &:disabled {
            background-color: #fff;
          }
        }
        input {
          z-index: 3;
        }

        .select-layer {
          position: absolute;
          left: 0;
          top: 0;
          padding-top: 36px;
          width: 100%;
          z-index: 2;
          .option-list {
            padding: 14px 0;
            box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
            background-color: #fff;
            .option {
              width: 100%;
              color: #888;
              height: 36px;
              line-height: 36px;
              text-align: center;
              font-size: 12px;
              cursor: pointer;
              &:hover {
                background-color: #f4c51d;
                color: #fff;
              }
            }
          }
        }

        textarea {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 12px;
          resize: none;
          box-sizing: border-box;
        }
      }

      .remark-box {
        margin-bottom: 25px;
        padding: 15px;
        width: 100%;
        height: 90px;
        background-color: #f2f2f2;
        color: #888;
        font-size: 12px;
        box-sizing: border-box;
      }
      .private-user {
        margin-top: 8px;
        font-size: 12px;
        color: #888;
        line-height: 17px;
      }
      .error {
        margin: 10px 0 30px 0;
        font-size: 12px;
        height: 17px;
        color: #e55d5d;
      }
      .btn {
        margin: auto;
        margin-top: 45px;
        width: 100px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #f4c51d;
        color: #000;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
  transform: translate(0, -15px);
}
.fade-leave,
.fade-enter-to {
  transform: translate(0, 0);
}
</style>