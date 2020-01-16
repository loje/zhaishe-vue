<template>
  <div class="pay-qrcode">
    <div class="pay-flex">
      <!-- <vue-qr :logoSrc="imageUrl" :text="text" :size="200"></vue-qr> -->
      <vue-qr :text="text" :size="200"></vue-qr>
    </div>
  </div>
</template>

<script>
  import vueQr from 'vue-qr'

  import md5 from 'js-md5';
  import xml2js from 'xml2js';

  export default {
    props: {
      // text: {
      //   type: [String],
      //   default: '',
      // },
      out_trade_no: { // 微信会有自己订单号、我们自己的系统需要设置自己的订单号
        type: [String],
        default() {
          return `test${new Date().getTime()}`;
        },
      },
      total_fee: {
        type: [Number],
        default() {
          return 0;
        },
      },
      body: {
        type: [String],
        default: '商品描述',
      },
    },
    data() {
      return {
        // imageUrl: require("http://files.zdesigner.cn/2019/12/28/e7eaec524071ce948069035ac5b91ff7.png"),

        text: '',
      }
    },
    components: {
      vueQr
    },
    mounted() {
      this.getSign();
    },
    methods: {
      // 生成随机字符
      randomString(length, chars) {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
      },

      formMessage(result) {
        const that = this;
        var message = {};
        if (typeof result === 'object') {
          var keys = Object.keys(result);
          for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]];
            var key = keys[i];
            if (!(item instanceof Array) || item.length === 0) {
              continue;
            }
            if (item.length === 1) {
              var val = item[0];
              if (typeof val === 'object') {
                message[key] = this.formMessage(val);
              } else {
                message[key] = (val || '').trim();
              }
            } else {
              message[key] = [];
              for (var j = 0, k = item.length; j < k; j++) {
                message[key].push(that.formMessage(item[j]));
              }
            }
          }
        }
        return message;
      },

      // 生成签名
      getSign() {
        const that = this;
        const appid = 'wx34c87ef5d4d802d9';
        const mch_id = '1570704211';
        const notify_url = 'http://www.zdesigner.cn/';
        const out_trade_no = this.out_trade_no; // 微信会有自己订单号、我们自己的系统需要设置自己的订单号
        const total_fee = this.total_fee; // 注意，单位为分
        const body = this.body;
        const trade_type = 'NATIVE';
        const nonce_str = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        const stringA = `appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonce_str}&notify_url=${notify_url}&out_trade_no=${out_trade_no}&spbill_create_ip=120.77.217.247&total_fee=${total_fee}&trade_type=${trade_type}`;
        const stringSignTemp = stringA + "&key=5f99609225b2944c2e230ade0fa99cc9"; //注：key为商户平台设置的密钥key
        const sign = md5(stringSignTemp).toUpperCase();

        const formData = `<xml>
        <appid>${appid}</appid>
        <body>${body}</body>
        <mch_id>${mch_id}</mch_id>
        <nonce_str>${nonce_str}</nonce_str>
        <notify_url>${notify_url}</notify_url>
        <out_trade_no>${out_trade_no}</out_trade_no>
        <total_fee>${total_fee}</total_fee>
        <spbill_create_ip>120.77.217.247</spbill_create_ip>
        <trade_type>NATIVE</trade_type>
        <sign>${sign}</sign>
        </xml>`;

        let param = {
          funcName: 'unifiedorder',
          data: {
            formData,
          }
        };
        this.$Bmob.functions(param.funcName, param.data).then((resultData) => {
          // xml转json格式
          xml2js.parseString(resultData, function (err, json) {
            if (err) {
              new Error("解析xml报错")
            } else {
              var result = that.formMessage(json.xml); // 转换成正常的json 数据
              console.log(result) //打印出返回的结果
              // return result;
              that.text = result.code_url;
              that.replayOrder();
            }
          })
        });
      },

      replayOrder() {
        const that = this;

        let interval = setInterval(() => {
          const appid = 'wx34c87ef5d4d802d9';
          const mch_id = '1570704211';
          const out_trade_no = this.out_trade_no;
          const nonce_str = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

          const stringA = `appid=${appid}&mch_id=${mch_id}&nonce_str=${nonce_str}&out_trade_no=${out_trade_no}`;
          const stringSignTemp = stringA + "&key=5f99609225b2944c2e230ade0fa99cc9"; //注：key为商户平台设置的密钥key
          const sign = md5(stringSignTemp).toUpperCase();

          const formData = `<xml>
          <appid>${appid}</appid>
          <mch_id>${mch_id}</mch_id>
          <nonce_str>${nonce_str}</nonce_str>
          <out_trade_no>${out_trade_no}</out_trade_no>
          <sign>${sign}</sign>
          </xml>`;

          let param = {
            funcName: 'orderquery',
            data: {
              formData,
            }
          };
          this.$Bmob.functions(param.funcName, param.data).then((resultData) => {
            // xml转json格式
            xml2js.parseString(resultData, function (err, json) {
              if (err) {
                new Error("解析xml报错")
              } else {
                var result = that.formMessage(json.xml); // 转换成正常的json 数据
                console.log(result) //打印出返回的结果
                // return result;
                if (result.trade_state !== 'NOTPAY') {
                  clearInterval(interval);
                }
              }
            })
          });
        }, 5000);
 
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pay-qrcode {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.75);
    z-index: 0;
    .pay-flex {
      flex: 1;
      img {
        display: block!important;
        margin: auto;
      }
    }
  }
</style>