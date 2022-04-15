<template>
  <div class="query">
    <div class="left">
      <div class="main"><div id="map"></div></div>
      <div class="bottom">
        <div class="hd">
          <span>123</span>
        </div>
        <div class="ct"></div>
      </div>
    </div>
    <div class="right">
      <div class="pt 4">
        <div class="hd">
          <span>123</span>
        </div>
        <div class="ct"></div>
      </div>
      <div class="pt 5"></div>
      <div class="pt 6"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "query",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.query {
  display: flex;
  height: calc(100% - 50px);
  background-color: transparent;
  .left {
    display: flex;
    height: 100%;
    width: 78%;
    flex-direction: column;
    .main {
      width: 100%;
      height: 60%;
    }
    .pt1 {
      margin-bottom: 15px;
      width: 100%;
      background: url(../assets/img/pt/pt_bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .right {
    display: flex;
    height: 100%;
    width: 22%;
    flex-direction: column;
    justify-items: center;
  }
  .pt {
    height: 215px;
    margin-top: 15px;
    width: 100%;
    background: url(../assets/img/pt/pt_bg.png) no-repeat;
    background-size: 100% 100%;
    .hd {
      display: flex;
      width: 100%;
      height: 30px;
      margin-top: 5px;
      background: url(../assets/img/pt/h_bg.png) no-repeat;
      background-size: 50% 100%;
      span {
        margin-left: 20px;
        line-height: 30px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>