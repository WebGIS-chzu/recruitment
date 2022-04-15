<template>
  <div class="mapcom">
    <div class="mapcontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
    <div class="mapcontral">
      <div class="selecttitle">
        <!-- <div class="title-img"></div> -->
        <div class="title-text">专题图选择</div>
      </div>
      <el-menu>
        <el-menu-item
          style="padding: 1%"
          index="1"
          @click="showmap(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <el-radio v-model="mapchange" label="1">&ensp;</el-radio>
          <div class="mapimg map1"></div>
          <span class="tab" slot="title">聚合图</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="showmap(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <el-radio v-model="mapchange" label="2">&ensp;</el-radio>
          <div class="mapimg map2"></div>
          <span class="tab" slot="title">分级图</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="showmap(3)"
          :class="index === 3 ? 'active' : ''"
          plain
        >
          <el-radio v-model="mapchange" label="3">&ensp;</el-radio>
          <div class="mapimg map3"></div>
          <span class="tab" slot="title">热力图</span>
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="showmap(4)"
          :class="index === 4 ? 'active' : ''"
          plain
        >
          <el-radio v-model="mapchange" label="4">&ensp;</el-radio>
          <div class="mapimg map4"></div>
          <span class="tab" slot="title">时序图</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import gradedcolormap from "./thememap/gradedcolormap.vue";
import pointgather from "./thememap/pointgather.vue";
import heatmap from "./thememap/heatmap.vue";
import timemap from "./thememap/timemap.vue";
const mapboxgl = require("mapbox-gl");
// import multimap from "../components/thememap/multimap.vue";
export default {
  components: { gradedcolormap, pointgather, heatmap, timemap },
  name: "theme",
  data() {
    return {
      index: 1,
      comp: "pointgather",
      isShow: true,
      //地图切换
      index: "1",
      mapchange: "1",
    };
  },
  mounted() {
    this.showmap(1);
  },
  methods: {
    showmap(value) {
      this.mapchange = value.toString();
      if (value === 1) this.comp = "pointgather";
      else if (value === 2) this.comp = "gradedcolormap";
      else if (value === 3) this.comp = "heatmap";
      else if (value === 4) this.comp = "timemap";
    },
  },
};
</script>
<style lang="less" scoped>
.mapcom {
  z-index: 1;
}
.mapcontent {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  bottom: 0%;
}
.mapcontral {
  position: absolute;
  z-index: 1;
  width: 47%;
  height: 4%;
  bottom: 33.3%;
  left: 28%;
  background: linear-gradient(#1edaeb) left top no-repeat,
    linear-gradient(#1edaeb) left top no-repeat,
    linear-gradient(#1edaeb) right top no-repeat,
    linear-gradient(#1edaeb) right top no-repeat,
    linear-gradient(#1edaeb) left bottom no-repeat,
    linear-gradient(#1edaeb) left bottom no-repeat,
    linear-gradient(#1edaeb) right bottom no-repeat,
    linear-gradient(#1edaeb) right bottom no-repeat;
  //linear-gradient(to left, #f00, #f00) right bottom no-repeat;//四个角的边框 to left 代表颜色渐变的方向
  background-size: 2px 5px, 5px 2px, 2px 5px, 5px 2px;
  .selecttitle {
    float: left;
    width: 15%;
    height: 100%;
    background-color: #12526ea9;
    .title-text {
      width: 100%;
      float: left;
      height: 100%;
      color: #dae2e2;
      font-size: 11pt;
      line-height: 32px;
    }
  }
  .el-menu {
    float: left;
    width: 85%;
    height: 100%;
    right: 0%;
    background-color: #12526ea9;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mapimg {
      width: 25%;
      height: 65%;
    }
    .map1 {
      width: 11%;
      height: 95%;
      //   background: url("../assets/img/theme/聚合.png") no-repeat;
      //   background-size: 100% 100%;
    }
    .map2 {
      width: 18%;
      //   background: url("../assets/img/theme/分级.png") no-repeat;
      //   background-size: 100% 100%;
    }
    .map3 {
      width: 18%;
      //   background: url("../assets/img/theme/热力图.png") no-repeat;
      //   background-size: 100% 100%;
    }
    .map4 {
      width: 18%;
      //   background: url("../assets/img/theme/时间.png") no-repeat;
      //   background-size: 100% 100%;
    }
    .el-radio {
      margin-right: 0;
      .el-radio__label {
        padding-left: 2px;
      }
    }
    /deep/.el-radio__input.is-checked .el-radio__inner {
      border-color: #5ddaf0;
      background: #32b3b8;
    }
    /deep/.el-radio__label {
      padding-left: 5px;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background: transparent;
    }
    .tab {
      height: 100%;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: row;
    }
  }
  .el-menu-item.is-active {
    // color: #15c5c5;
    // background: transparent;
    // border-bottom: 3px solid #c6e2ff;
  }
  .el-menu-item {
    width: 20%;
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
      flex-direction: row;
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
</style>