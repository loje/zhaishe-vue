import md5 from 'js-md5';
import xml2js from 'xml2js';

// 生成随机字符
function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const appid = 'wx34c87ef5d4d802d9';
const mch_id = '1570704211';
const notify_url = 'http://www.zdesigner.cn/';
const out_trade_no = 'z000001'; // 微信会有自己订单号、我们自己的系统需要设置自己的订单号
const total_fee = 1; // 注意，单位为分
const body = 'test';
const trade_type = 'NATIVE';
const nonce_str = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
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


var formMessage = function (result) {
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
          message[key] = formMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        for (var j = 0, k = item.length; j < k; j++) {
          message[key].push(formMessage(item[j]));
        }
      }
    }
  }
  return message;
}

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
      var result = formMessage(json.xml); // 转换成正常的json 数据
      console.log(result) //打印出返回的结果
      return result;
    }
  })
});