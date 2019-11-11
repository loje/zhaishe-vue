<template>
  <div class="max-width">
    <swiper :options="swiperOption" ref="mySwiper" style="margin-top: 20px;">
      <!-- slides -->
      <swiper-slide>
        <div class="swiper-box">
          <div class="box-left"></div>
          <div class="box-right">
            <div class="box-top"></div>
            <div class="box-btm"></div>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="layer">
      <div class="title">
        <span>工具推荐</span>
      </div>
    </div>
  </div>
</template>

<script>
import './../assets/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          pagination: {
            el: '.swiper-pagination',
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
}
</script>

<style lang="scss" scope>
  .swiper-container{
    height: 380px;
    .swiper-box {
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      .box-left {
        width: 761px;
        height: 100%;
        background-color: #707A81;
      }
      .box-right {
        width: 435px;
        .box-top {
          width: 100%;
          height: 190px;
          background-color: #E3BE4C;
        }
        .box-btm {
          width: 100%;
          height: 190px;
          background-color: #648094;
        }
      }
    }
  }
  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
  .layer {
    margin-top: 42px;
    .title {
      font-size: 30px;
    }
  }
</style>
