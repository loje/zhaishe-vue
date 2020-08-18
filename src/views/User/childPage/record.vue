<template>
  <div class="record-layer">
    <table>
      <thead>
        <tr>
          <td></td>
          <td>订单</td>
          <td>购买时间</td>
          <td>费用</td>
          <td>内容</td>
          <td>购买人</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, $index) in recordList" :key="$index">
          <td>{{$index + 1}}</td>
          <td>{{item.payReslut.out_trade_no}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{((item.payReslut.total_fee || 0) / 100).toFixed(2)}}</td>
          <td>
            <template v-if="item.sort === 'product'">{{item.product.title}}</template>
            <template v-else-if="item.sort === 'active'">{{item.activity.title}}</template>
          </td>
          <td>{{item.name || item.user.name}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div class="pages">
      <div class="prev" @click="getOrders(pageOrder - 1)">上一页</div>
      <div class="page-list">
        <div
          :class="pageOrder === item ? 'page active' : 'page'"
          v-for="item in orderPages"
          :key="item"
          @click="getOrders(item)"
        >{{item}}</div>
      </div>
      <div class="next" @click="getOrders(pageOrder + 1)">下一页</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordList: [],
      orderTotal: 0, // 总条数
      orderPages: 0, // 总页数
      orderLimit: 20, // 每页条数
      skipOrder: 0, // 跳过数量
      pageOrder: 1 // 当前页数
    };
  },
  mounted() {
    this.pageOrder = 1;
    this.getOrderCount();
  },
  methods: {
    getOrderCount() {
      var query = this.$Bmob.Query("order_list");
      query.order("-createdAt");
      query.equalTo("user", "==", this.$store.state.user.objectId);
      query.count().then(total => {
        this.orderTotal = total;
        this.orderPages = parseInt(total / this.orderLimit);
        if (total % this.orderLimit > 0) {
          this.orderPages = this.orderPages + 1;
        }
        this.getOrders(this.pageOrder);
      });
    },
    getOrders(page) {
      if (page) {
        if (page > this.orderPages) {
          this.pageOrder = this.orderPages;
        } else if (page < 0) {
          this.pageOrder = 1;
        } else {
          this.pageOrder = page;
        }
      } else {
        this.pageOrder = 1;
      }
      this.skipOrder = this.orderLimit * (this.pageOrder - 1);
      const orderQuery = this.$Bmob.Query("order_list");
      orderQuery.order("-createdAt");
      orderQuery.equalTo("user", "==", this.$store.state.user.objectId);
      orderQuery.include("product", "activity", "user");
      orderQuery.skip(this.skipOrder);
      orderQuery.limit(this.orderLimit);
      orderQuery.find().then(res => {
        this.recordList = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.record-layer {
  padding: 20px;
  background-color: #fff;
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      font-size: 14px;
      font-weight: bold;
      color: #888;
      tr {
        height: 50px;
        td {
          text-align: center;
        }
      }
    }
    tbody {
      font-size: 12px;
      color: #333333;
      line-height: 17px;
      tr {
        height: 50px;
        &:nth-child(2n-1) {
          background-color: #fafafa;
        }
        td {
          text-align: center;
        }
      }
    }
  }

  .pages {
    position: relative;
    width: 100%;
    height: 50px;
    text-align: right;
    box-sizing: border-box;
    .prev,
    .next,
    .last {
      display: inline-block;
      vertical-align: middle;
      line-height: 50px;
      color: #888;
      font-size: 12px;
    }
    .last {
      margin-left: 25px;
    }
    cursor: pointer;
    .page-list {
      display: inline-flex;
      margin: 0 15px;
      line-height: 50px;
      vertical-align: middle;
      .page {
        width: 34px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        color: #000;
        text-align: center;
        cursor: pointer;
        &:hover,
        &.active {
          color: #fff;
          background-color: #f4c51d;
        }
      }
    }
  }
}
</style>