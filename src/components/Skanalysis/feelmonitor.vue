<template>
  <div class="com">
    <div id="map" />
    <div class="content">
      <div class="right">
        <div class="title">
          <span>客流分析</span>
        </div>
        <div class="crawling">
          <el-select v-model="value" placeholder="数据来源">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-date-picker v-model="date" type="date" placeholder="选择日期">
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

        <div class="space"></div>
        <div class="query">
          <el-input placeholder="请输入关键词" v-model="input" clearable>
          </el-input>

          <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
        </div>
        <el-button>一键爬取</el-button>
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feelmonitor",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "微博",
        },
        {
          value: "选项2",
          label: "小红书",
        },
        {
          value: "选项3",
          label: "马蜂窝",
        },
      ],
      value: "",
      date: "",
      input: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
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
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.com {
  position: fixed;
  height: 100%;
  width: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
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
    .crawling {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      .el-select {
        padding-right: 10px;
      }
    }
    .query {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      .el-input {
        padding-right: 10px;
      }
    }
  }
}
/deep/.el-input__inner {
  border: none;
  font-size: inherit;
  height: 40px;
  line-height: 33px;
  background-image: url("../../assets/img/fq/bg9.png");
  background-size: 100% 100%;
  background-color: transparent;

  margin: 10px 0px;
}
/deep/.el-date-editor .el-range-input {
  width: 30%;
  height: 60%;
  background: rgba(82, 173, 209, 0.3);
}
/deep/.el-button {
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
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
/deep/.el-range-editor--small .el-range__close-icon,
.el-range-editor--small .el-range__icon {
  line-height: 24px;
  color: transparent;
}
</style>
