<template>
  <div id="theme">
    <div class="aside">
      <el-menu>
        <el-menu-item
          index="1"
          @click="show(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <i class="fa fa-eercast fa-lg"></i>
          <span class="tab" slot="title">聚合</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="show(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <i class="fa fa-sort-amount-desc fa-lg"></i>
          <span class="tab" slot="title">分级</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="show(3)"
          :class="index === 3 ? 'active' : ''"
          plain
        >
          <i class="fa fa-thermometer-0 fa-lg"></i>
          <span class="tab" slot="title">热力</span>
        </el-menu-item>
        
        <el-menu-item
          index="5"
          @click="show(4)"
          :class="index === 4 ? 'active' : ''"
          plain
        >
          <i class="el-icon-menu"></i>
          <span class="tab" slot="title">时序</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="thecontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import gradedcolormap from "../components/thememap/gradedcolormap.vue";
import pointgather from "../components/thememap/pointgather.vue";
import heatmap from "../components/thememap/heatmap.vue";
import timemap from "../components/thememap/timemap.vue";
// import multimap from "../components/thememap/multimap.vue";
export default {
  components: { gradedcolormap, pointgather, heatmap, timemap, },
  name: "theme",
  data() {
    return {
      index: 1,
      comp: "pointgather",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "pointgather";
      else if (value === 2) this.comp = "gradedcolormap";
      else if (value === 3) this.comp = "heatmap";
      else if (value === 4) this.comp = "timemap";
    },
  },
};
</script>

<style lang="less">
#theme {
  position: fixed;
  width: 100%;
  height: 100%;
}
.tab {
  height: 38%;
  line-height: 40px;
}
.aside {
  height: 100%;
  z-index: 999999;
  position: absolute;
  width: 3%;
  top: 0;
  left: 0;
  background-color: #0d1f30;
  .el-menu {
    top: 25%;
    width: 100%;
    height: 8%;
    right: 0%;
    background: transparent;
    border: none;
  }
  .el-menu-item.is-active {
    color: #15abc5;
    border-left: 5px solid #0cf3f3;
    background: transparent;
  }
  .el-menu-item {
    color: #fff;
  }
  .el-menu-item:hover {
    background: transparent;
  }
  .span {
    color: aliceblue;
  }
  ul {
    height: 100%;
    list-style-type: none; /*消除黑点*/
    text-align: center;
    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        color: aqua;
        font-size: 12px;
        font-family: Microsoft YaHei;
        // font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        padding-bottom: 20px;
      }
    }
  }
}
.thecontent {
  position: relative;
  z-index: 1;
  left: 3%;
  height: 100%;
  width: 97%;
}
// .select {
//   z-index: 999;
//   background: url(../assets/img/fq/wggl_tab.png) no-repeat;
//   background-size: 100% 100%;
//   position: absolute;
//   z-index: 999999;
//   right: 5px;
//   bottom: 3%;
//   width: 14%;
//   height: 38%;
//   .el-button {
//     background: url(../assets/img/themebutton.png) no-repeat;
//     border: 0ch;
//     margin-left: 0px;
//     width: 180px;
//     font-size: 18px;
//     color: #64e9ef;
//   }
//   .el-button:nth-child(1) {
//     margin-top: 10%;
//   }
//   .el-button:nth-child(5) {
//     margin-bottom: 10%;
//   }
//   .el-button.is-plain:focus,
//   .el-button.is-plain:hover {
//     color: aliceblue;
//     background: url(../assets/img/themebuttonfocus.png) no-repeat;
//   }
// }
</style>
