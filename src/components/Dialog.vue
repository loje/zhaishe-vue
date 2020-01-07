<template>
  <transition name="fade">
    <div class="dialog-layer" v-if="dialogShow">
      <div class="dialog-flex">
        <div class="dialog-block" :style="{width: `${dialogWidth}px`}">
          <span class="close" @click="dialogShow = false">
            <i class="iconfont">&#xea13;</i>
          </span>
          <div class="dialog-title">{{dialogTitle}}</div>
          <div class="dialog-content"></div>
          <div
            class="dialog-btn"
            :style="{width: `${btnWidth}px`}"
            @click="dialogShow = false"
          >{{btnText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>