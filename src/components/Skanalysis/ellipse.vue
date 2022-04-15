<template>
  <div class="com">
    <div id="map" />
    <div class="content">
      <div class="right">
        <div class="title">
          <span>标准差椭圆分析</span>
        </div>
        <div class="toppart">
          <span>时间尺度:</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            popper-class="date-style"
          >
          </el-date-picker>
        </div>
        <div class="spatial">
          <span>空间尺度:</span>
          <el-select v-model="value2" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value2"
              :label="item.label"
              :value="item.value2"
            >
            </el-option>
          </el-select>
        </div>
        <div class="maptool">
          <el-button>请求数据</el-button>
          <el-button>开始分析</el-button>
        </div>

        <div class="bottompart"></div>
      </div>
    </div>
    <!-- <div id="map" /> -->
    <!-- <div class="mapTool1">
      <div class="IDW">标准差椭圆分析</div>
      <div class="DayPicContainer">
        <div class="DayPicTitle">数据日期</div>
        <el-date-picker
          class="DayPic"
          v-model="DateValue"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="IDWtoolContainer">
        <div class="GetMapValue1">请求数据</div>
        <div class="AnaMapValue2">开始分析</div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "deviationellipse",
  data() {
    return {
      DateValue: new Date(),
      value1: "",
      value2: "",
      options: [
        {
          value2: "选项1",
          label: "省份",
        },
        {
          value2: "选项2",
          label: "城市",
        },
      ],
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [105, 35],
        zoom: 3.5,
      });
    },
  },
};
</script>
<style lang="less" scoped>
// @import "../../assets/css/time.css";
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.com {
  position: fixed;
  height: 100%;
  width: 100%;
}
.content {
  height: 90%;
  width: 23%;
  position: absolute;
  z-index: 100;
  top: 2%;
  right: 0.2%;
  display: flex;
  border-radius: 15px;
  flex-direction: row;
  background-color: #11355a75;
  .right {
    height: 100%;
    width: 100%;
    // margin-top: 3%;
    // margin-right: 0.5%;
    background: url("../../assets/img/fq/ptbg1.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    .title {
      // flex: 0.5;
      margin-top: 5%;
      height: 7%;
      width: 100%;
      position: relative;
      left: 4%;
      background: url(../../assets/img/pt/pt_title1.png) no-repeat;
      background-size: 88% 50%;
      font-size: 16pt;
      > span {
        float: left;
        margin-left: 10%;
        font-size: 14pt;
        line-height: 20px;
        color: aliceblue;
        text-shadow: 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff,
          0 0 30px #38e9e0, 0 0 40px #0cf3f3;
      }
    }
    .toppart {
      // position: absolute;
      display: flex;
      flex-direction: column;
      // top: 10%;
      width: 100%;
      > span {
        width: 33%;
        // margin-left: -44%;
        // margin-top: 2%;
        border-left: 5px solid #0cf3f3;
        font-size: 13pt;
        line-height: 22px;
        color: aliceblue;
        // position: absolute;
      }
    }
    .spatial {
      display: flex;
      flex-direction: column;
      width: 100%;
      > span {
        width: 33%;
        border-left: 5px solid #0cf3f3;
        font-size: 13pt;
        line-height: 22px;
        color: aliceblue;
      }
      .el-select {
        width: 80%;
        margin-left: 7%;
      }
    }
    .maptool {
      margin-top: 5%;
    }
    .bottompart {
      position: absolute;
      bottom: 9%;
      width: 100%;
      height: 50%;
    }
  }
}
/deep/.toppart .el-input__inner {
  // left: 20%;
  // position: absolute;
  // display: inline-block;
  -webkit-appearance: none;
  background: transparent;
  border-radius: 4px;
  border: 0px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  // display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 33px;
  // width: 100%;
  margin: 10px 0 10px 25px;
}
/deep/.spatial .el-input__inner {
  border: none;
  font-size: inherit;
  height: 40px;
  line-height: 33px;
  color: #fff;
  background-image: url("../../assets/img/fq/bg9.png");
  background-size: 100% 100%;
  background-color: transparent;
  margin: 10px 0px;
}
/deep/.el-date-editor .el-range-input {
  width: 30%;
  // height: 60%;
  color: #fff;
  background: rgba(82, 173, 209, 0.3);
}
/deep/.el-button {
  // background: rgba(11, 176, 241, 0.493);
  background: url("../../assets/img/fq/wggl_tab.png");
  background-size: 100% 100%;
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
}
/deep/.el-button:focus,
.el-button:hover {
  color: #409eff;
  // border-color: #c6e2ff;
  // background-color: #ecf5ff;
}
/deep/.el-range-editor--small .el-range__close-icon,
.el-range-editor--small .el-range__icon {
  line-height: 24px;
  color: transparent;
}
/deep/.el-icon-date:before {
  color: #fff;
}
// /deep/.el-popper {
//   margin-left: 120px;
//   width: 520px;
// }
// /deep/.el-date-range-picker .el-picker-panel__body {
//   max-width: 520px;
// }
// /deep/.el-picker-panel {
//   background: #1b334b;
//   color: #fff;
// }
</style>
