<template>
  <div class="themap">
    <iframe
      :src="mapurl"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mapurl:'../../'
    };
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" scoped>
.themap{
  width: 100%;
  height: calc(100% - 45px);
}
</style>