<template>
  <div class="payment-page">
    <div class="max-width">
      <div class="payment-top">
        <div class="top-left">
          <div class="img" :style="{backgroundImage: `url(${paymentInfo.imgSrc})`}"></div>
        </div>
        <div class="top-right">
          <div class="title">{{paymentInfo.title}}</div>
          <div class="desc">{{paymentInfo.desc}}</div>
          <div class="info">
            <div class="info-left">您拍下了{{paymentInfo.amount}}份</div>
            <div class="info-right">
              <i class="iconfont">&#xe602;</i> 1020
            </div>
          </div>
          <div class="process">
            <div class="t">支付流程</div>
            <div class="list">
              <div class="item">
                <div class="circle">1</div>
                <div class="text">拍下商品</div>
              </div>
              <div class="line"></div>
              <div class="item ing">
                <div class="circle">2</div>
                <div class="text">支付信息</div>
              </div>
              <div class="line"></div>
              <div class="item">
                <div class="circle">3</div>
                <div class="text">扫码支付</div>
              </div>
              <div class="line"></div>
              <div class="item">
                <div class="circle">4</div>
                <div class="text">支付反馈</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-block">
        <div class="block-top">
          <div class="back" @click="back">
            <span class="back-icon">
              <i class="iconfont">&#xe693;</i>
            </span>
            <span class="t">返回</span>
          </div>
          <span class="title">购买人信息</span>
          <div class="add-btn" @click="add">
            <i class="iconfont">&#xe610;</i>
            <span>添加一个</span>
          </div>
        </div>
        <div class="block-list">
          <template v-for="(item, $index) in paymentInfo.amount">
          <div class="the-block" :key="$index">
            <div class="num">{{$index + 1}}</div>
            <div class="name">
              <div class="input-group">
                <span>姓名</span>
                <input type="text" v-model="buyerList[$index].name"/>
              </div>
            </div>
            <div class="email">
              <div class="input-group">
                <span>邮箱</span>
                <input type="text" v-model="buyerList[$index].email"/>
              </div>
            </div>
            <div class="wechat">
              <div class="input-group">
                <span>微信</span>
                <input type="text" v-model="buyerList[$index].wechat"/>
              </div>
            </div>
            <div class="phone">
              <div class="input-group">
                <span>电话</span>
                <input type="text" v-model="buyerList[$index].phone"/>
              </div>
            </div>
            <div class="control">
              <i class="iconfont" @click="del($index)">&#xe641;</i>
            </div>
          </div>
          </template>
        </div>
        <div class="block-remark">
          <textarea placeholder="备注"></textarea>
        </div>
        <div class="block-wechat">
          <div class="input-group">
            <span>推荐人微信</span>
            <input type="text" v-model="referrer"/>
          </div>
        </div>
        <div class="block-total">
          一共需支付<span>{{paymentInfo.price * paymentInfo.amount}}元</span>
        </div>
        <div class="block-wechatpay">
          <div class="btn">
            <i class="iconfont">&#xe629;</i>
            <span>微信支付</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentInfo: "",
      buyerList: [],
      referrer: '',
    };
  },
  mounted() {
    this.paymentInfo = JSON.parse(localStorage.getItem('payment'));
    for (let i = 0; i < this.paymentInfo.amount; i += 1) {
      this.buyerList.push({
        name: '',
        email: '',
        wechat: '',
        phone: '',
      })
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    add() {
      this.paymentInfo.amount += 1;
      this.buyerList.push({
        name: '',
        email: '',
        wechat: '',
        phone: '',
      })
    },
    del(i) {
      this.paymentInfo.amount -= 1;
      this.buyerList.splice(i,1);
    },
  },
};
</script>

<style lang="scss" scoped>
	.payment-page {
		padding-top: 50px;
		.max-width {
			padding: 50px 100px;
			background-color: #fff;
			box-sizing: border-box;
			.payment-top {
				display: flex;
        padding-bottom: 30px;
        border-bottom: 1px solid #EEEEEE;
				.top-left {
          width: 300px;
          .img {
            width: 300px;
            height: 300px;
            background-position: 50%;
            background-size: contain;
            border: 1px solid #eee;
            box-sizing: border-box;
          }
          // .the-info {
          //   padding: 20px;
          //   width: 300px;
          //   border: 1px solid #eee;
          //   border-top: none;
          //   box-sizing: border-box;
          //   .t {
          //     margin-bottom: 10px;
          //     font-size: 14px;
          //     font-weight: bold;
          //     color: #666;
          //   }
          //   .url {
          //     margin-bottom: 20px;
          //     font-size: 12px;
          //     color: #888;
          //     word-break: break-all;
          //   }
          //   .tag-list {
          //     display: flex;
          //     margin-bottom: 25px;
          //     .tag {
          //       margin-right: 10px;
          //       width: 50px;
          //       height: 20px;
          //       line-height: 20px;
          //       text-align: center;
          //       background-color: #f5f5f5;
          //       color: #999;
          //       font-size: 10px;
          //     }
          //   }
          //   .sell {
          //     font-size: 12px;
          //     color: #888;
          //   }
          // }
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
          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 0 20px;
            width: 100%;
            height: 54px;
            background-color: #FBFBFB;
            box-sizing: border-box;
            .info-left {
              font-size: 12px;
              line-height: 17px;
              color: #262626;
            }
            .info-right {
              width: 66px;
              height: 26px;
              background-color: #fff;
              border-radius: 2px;
              border:1px solid #F4751D;
              font-size: 10px;
              line-height: 26px;
              text-align: center;
              color: #F4751D;
              cursor: pointer;
              i {
                font-size: 10px;
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
                    border: 1px solid #FF5D01;
                    background-color: #FF5D01;
                    color: #fff;
                  }
                }
              }
              .line {
                margin-top: 19px;
                width: 52px;
                height: 1px;
                background-color: #F4F4F4;
              }
            }
          }



          // .edit-sku {
          //   .title {
          //     margin-bottom: 10px;
          //     font-size: 14px;
          //     line-height: 20px;
          //     color: #333;
          //     font-weight: bold;
          //   }
          //   .attrs {
          //     display: flex;
          //     padding-bottom: 20px;
          //     flex-wrap: wrap;
          //     border-bottom: 1px solid #eee;
          //     .attr {
          //       margin-right: 30px;
          //       margin-bottom: 10px;
          //       width: 240px;
          //       height: 40px;
          //       line-height: 40px;
          //       border: 1px solid #eee;
          //       color: #333;
          //       text-align: center;
          //       font-size: 14px;
          //       cursor: pointer;
          //       &:hover, &.active {
          //         border-color: #F47A25;
          //         color: #F47A25;
          //       }
          //     }
          //   }
          //   .sell-tips {
          //     margin-top: 20px;
          //     .tips-left {
          //       font-size: 14px;
          //       line-height: 20px;
          //       color: #262626;
          //       font-weight: bold;
          //       .count {
          //         color: #F47A25;
          //       }
          //     }
          //     .tips-right {
          //       margin-left: 30px;
          //       font-size: 12px;
          //       color: #262626;
          //     }
          //   }
          //   .sell-func {
          //     display: flex;
          //     margin-top: 20px;
          //     .btn {
          //       margin-right: 40px;
          //       width: 170px;
          //       height: 40px;
          //       line-height: 40px;
          //       text-align: center;
          //       background-color: #F4751D;
          //       color: #fff;
          //       cursor: pointer;
          //     }
          //     .count-control {
          //       display: flex;
          //       width: 100px;
          //       height: 40px;
          //       border: 1px solid #eee;
          //       input {
          //         width: 80px;
          //         height: 100%;
          //         border: none;
          //         padding: 0;
          //         box-sizing: border-box;
          //         outline: none;
          //         text-align: center;
          //       }
          //       .control {
          //         width: 20px;
          //         border-left: 1px solid #eee;
          //         span {
          //           display: block;
          //           line-height: 20px;
          //           text-align: center;
          //           color: #333;
          //           cursor: pointer;
          //           box-sizing: border-box;
          //           &:first-child {
          //             border-bottom: 1px solid #eee;
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
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
          .title {
            margin-left: 30px;
            font-size: 20px;
            line-height: 32px;
            color: #333;
            font-weight: 600;
          }
          .add-btn {
            position: absolute;
            right: 0;
            bottom: 35px;
            display: flex;
            padding: 0 10px;
            height: 30px;
            background-color: #F4C51D;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;
            cursor: pointer;
            i {
              margin-right: 10px;
              line-height: 30px;
            }
            span {
              line-height: 30px;
            }
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
            .name {
              padding: 0 10px;
              box-sizing: border-box;
              .input-group {
                display: flex;
                padding: 0 10px;
                width: 160px;
                box-sizing: border-box;
                background-color: #F4F4F4;
                span {
                  font-size: 12px;
                  color: #888;
                  line-height: 36px;
                  word-break: keep-all;;
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
            .email {
              padding: 0 10px;
              box-sizing: border-box;
              .input-group {
                display: flex;
                padding: 0 10px;
                width: 160px;
                box-sizing: border-box;
                background-color: #F4F4F4;
                span {
                  font-size: 12px;
                  color: #888;
                  line-height: 36px;
                  word-break: keep-all;;
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
            .wechat {
              padding: 0 10px;
              box-sizing: border-box;
              .input-group {
                display: flex;
                padding: 0 10px;
                width: 160px;
                box-sizing: border-box;
                background-color: #F4F4F4;
                span {
                  font-size: 12px;
                  color: #888;
                  line-height: 36px;
                  word-break: keep-all;;
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
            .phone {
              padding: 0 10px;
              box-sizing: border-box;
              .input-group {
                display: flex;
                padding: 0 10px;
                width: 160px;
                box-sizing: border-box;
                background-color: #F4F4F4;
                span {
                  font-size: 12px;
                  color: #888;
                  line-height: 36px;
                  word-break: keep-all;;
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
              &:hover{
                color: #cc0033;
              }
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
            background-color: #F4F4F4;
            span {
              font-size: 12px;
              color: #888;
              line-height: 36px;
              word-break: keep-all;;
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
            color: #F4751D;
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
              color: #09BB07;
            }
            span {
              color: #333333;
              font-size: 14px;
            }
          }
        }
      }
		}
	}
</style>
