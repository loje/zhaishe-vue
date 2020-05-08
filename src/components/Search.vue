<template>
	<div class="layout-top">
		<div class="max-width">
			<div class="search-bar">
				<input type="text" v-model="keyword" />
				<i class="iconfont">&#xe652;</i>
			</div>

			<div class="cooperation-layer">
				<div class="cooperation-left">
					<i class="iconfont">&#xe61d;</i>
				</div>
				<div class="cooperation-right">
					<div class="title">欢迎合作</div>
					<div class="email">zoupengyu@zdesiger.cn</div>
				</div>
			</div>

			<div class="tools-func">
				<div class="the-func">自媒体</div>
				<div class="the-func">社区</div>
				<div class="the-func">社群群主</div>
				<div class="the-func">好工具</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default() {
        return ''
      },
    },
  },
}
</script>

<style lang="scss" scoped>
    .layout-top {
      margin-bottom: 50px;
      width: 100%;
      height: 120px;
      background-color: #fff;
      box-shadow: 0px 10px 14px -6px rgba(0,0,0,0.05);
      .max-width {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        .search-bar {
          display: flex;
          padding: 0 16px;
          width: 295px;
          height: 30px;
          line-height: 30px;
          background-color: #f4f4f4;
          border-radius: 4px;
          color: #888;
          box-sizing: border-box;
          transition: all ease 250ms;
          &:hover {
            background-color: #eee;
          }
          input {
            flex: 1;
            border: none;
            background-color: transparent;
            outline: none;
          }
          i{
            transition: all ease 250ms;
            cursor: pointer;
            &:hover {
              color: #F4C51D;
            }
          }
        }
        .cooperation-layer {
          display: flex;
          .cooperation-left {
            i {
              font-size: 40px;
              color: #F4C51D;
            }
          }
          .cooperation-right {
            padding-left: 24px;
            .title {
              font-size: 12px;
              line-height: 17px;
              color: 333;
            }
            .email {
              font-size: 14px;
              line-height: 20px;
              color: #888;
            }
          }
        }

        .tools-func {
          display: flex;
          flex-wrap: wrap;
          width: 300px;
          height: 70px;
          .the-func {
            margin-left: 10px;
            margin-bottom: 10px;
            width: 140px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #eee;
            text-align: center;
            font-size: 12px;
            color: #333;
            box-sizing: border-box;
            cursor: pointer;
          }
        }
      }
    }
</style>