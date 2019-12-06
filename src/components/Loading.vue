<template>
  <div class="loading">
    <svg t="1575598926432" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010"><path d="M537.568 64.32a25.6 25.6 0 0 0 0 51.136c204.48 0 370.816 166.368 370.816 370.816a25.6 25.6 0 0 0 51.136 0c0-232.672-189.312-421.984-421.984-421.984z" p-id="3011"></path></svg>
  </div>
</template>

<style lang="scss" scoped>
  .loading {
    display: flex;
    padding: 15px 0;
    justify-content: center;
    .icon {
      width: 64px;
      height: 64px;
      animation: loading 600ms infinite;
    }
  }
  @keyframes loading
  {
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
  }
</style>
<style scoped>
  path {
    fill: #FFCB2B;
  }
</style>