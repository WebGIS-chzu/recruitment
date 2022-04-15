<template>
  <div class="grid-container">
    <div class="item item1">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">学历要求雷达图</div>
          </div>
        </div>
        <div class="chart">
          <div id="chart1" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item2">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">学历要求折线图</div>
          </div>
          <div class="select">
            <el-dropdown>
              <span class="el-dropdown-link">
                选择城市
                <i class="fa fa-angle-down"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="(ct1 = 1), fetchData1(ct1)"
                    :class="{ active: ct1 == 1 }"
                    >全国</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 2), fetchData1(ct1)"
                    :class="{ active: ct1 == 2 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 3), fetchData1(ct1)"
                    :class="{ active: ct1 == 3 }"
                    >上海
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="(ct1 = 4), fetchData1(ct1)"
                    :class="{ active: ct1 == 4 }"
                    >广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 5), fetchData1(ct1)"
                    :class="{ active: ct1 == 5 }"
                    >深圳</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="chart">
          <div id="chart2" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item3">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">学历要求柱状图</div>
          </div>
          <div class="select">
            <el-dropdown>
              <span class="el-dropdown-link">
                选择城市
                <i class="fa fa-angle-down"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="(ct1 = 1), fetchData1(ct1)"
                    :class="{ active: ct1 == 1 }"
                    >全国</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 2), fetchData1(ct1)"
                    :class="{ active: ct1 == 2 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 3), fetchData1(ct1)"
                    :class="{ active: ct1 == 3 }"
                    >上海
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="(ct1 = 4), fetchData1(ct1)"
                    :class="{ active: ct1 == 4 }"
                    >广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 5), fetchData1(ct1)"
                    :class="{ active: ct1 == 5 }"
                    >深圳</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="chart">
          <div id="chart3" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item4">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">学历要求占比图</div>
          </div>
          <div class="select">
            <el-dropdown>
              <span class="el-dropdown-link">
                选择城市
                <i class="fa fa-angle-down"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="(ct1 = 1), fetchData1(ct1)"
                    :class="{ active: ct1 == 1 }"
                    >全国</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 2), fetchData1(ct1)"
                    :class="{ active: ct1 == 2 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 3), fetchData1(ct1)"
                    :class="{ active: ct1 == 3 }"
                    >上海
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="(ct1 = 4), fetchData1(ct1)"
                    :class="{ active: ct1 == 4 }"
                    >广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 5), fetchData1(ct1)"
                    :class="{ active: ct1 == 5 }"
                    >深圳</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="chart">
          <div id="chart4" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import "font-awesome/css/font-awesome.css";
import request from "../../utils/request";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "experience",
  data() {
    return {
      ct1: 1,
      ct2: 1,
      ct3: 1,
      ct4: 1,
      chartdata1: [],
      chartdata2: [],
      chartdata3: [],
      chartdata4: [],
    };
  },
  created() {},
  mounted() {
    // this.fetchData1(1);
    // this.fetchData2(1);
    // this.fetchData3(1);
    // this.fetchData4(1);
    this.showct1();
    this.showct2();
    this.showct3();
    this.showct4();
  },
  methods: {
    // fetchData1(ct1) {
    //   var sendData = ct1;
    //   var code = JSON.stringify(sendData);
    //   console.log(code);
    //   request.post("/api//data/salaryRe", { code }).then((res) => {
    //     this.chartdata1.ydata = res.data[ct1 - 1];
    //     // this.chartdata1.xdata = res.data.data.ct1;
    //     console.log(res.data[ct1]);
    //     //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
    //     this.$nextTick(() => {
    //       this.showct1();
    //       this.showct2();
    //       this.showct4();
    //       this.showct3();
    //     });
    //   });
    // },
    // fetchData2(ct2) {
    //   var code = JSON.stringify(ct2);
    //   console.log(code);
    //   request.post("/api//data/experienceCo", { code }).then((res) => {
    //     this.chartdata2 = res.data.exp;
    //     console.log(res.data[ct2 - 1]);
    //     //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
    //     this.$nextTick(() => {
    //       this.showct2();
    //     });
    //   });
    // },
    showct1() {
      var chart1 = echarts.init(document.getElementById("chart1"));
      chart1.resize();
      chart1.setOption({
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "大专以下", max: 10000 },
            { name: "博士", max: 16000 },
            { name: "大专", max: 30000 },
            { name: "硕士", max: 70000 },
            { name: "本科", max: 80000 },
          ],
        },
        series: [
          {
            name: "学历要求雷达图",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "学历",
                lineStyle: {
                  color: "#97FFFF",
                },
              },{
                value: [1000, 2000, 3000, 10000, 32000, 12000],
                name: "学历",
                lineStyle: {
                  color: "#FFF68F",
                },
              },{
                value: [5200, 8000, 16000, 22000, 43000, 10000],
                name: "学历",
                lineStyle: {
                  color: "#BFEFFF",
                },
              },{
                value: [5800, 3600, 22000, 45000, 23000, 21000],
                name: "学历",
                lineStyle: {
                  color: "#836FFF",
                },
              },{
                value: [4500, 5000, 11000, 35000, 62000, 25000],
                name: "学历",
                lineStyle: {
                  color: "#FFBBFF",
                },
              },{
                value: [6600, 8000, 24000, 48000, 54000, 31000],
                name: "学历",
                lineStyle: {
                  color: "#64DFFF",
                },
              },
            ],
          },
        ],
      });
    },
    showct2() {
      // 绘制图表
      var chart2 = echarts.init(document.getElementById("chart2"));
      chart2.resize();
      chart2.setOption({
        tooltip: {
          trigger: "axis", //鼠标经过提示
          formatter: "{b0}:{c0}人", //单位
        },
        grid: {
          left: "3%",
          top: "12%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["大专以下", "大专", "本科", "硕士", "博士"],
          axisLabel: {
            interval: 0,
          },
          axisLine: {
            //x轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "单位:人",
          axisLine: {
            //y轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
          //y轴刻度横线
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: [220, 332, 501, 474, 300],
            type: "line",
            areaStyle: {
              areaStyle: {
                normal: {
                  //右，下，左，上
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#1BFEFE",
                      },
                      {
                        offset: 1,
                        color: "rgba(207, 247, 255, 0.3)",
                      },
                    ],
                    false
                  ),
                },
              },
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.2, color: "#44C0C1" },
                  { offset: 1, color: "#1BFEFE" },
                ]),
              },
            },
          },
        ],
      });
    },

    showct3() {
      var chart3 = echarts.init(document.getElementById("chart3"));
      chart3.resize();
      chart3.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },

        grid: {
          left: "3%",
          top: "0%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "单位:人",
          boundaryGap: [0, 0.01],
          axisLine: {
            //x轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        yAxis: {
          type: "category",
          data: ["大专以下", "大专", "本科", "硕士", "博士"],
          axisLine: {
            //y轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        series: [
          {
            name: "人数",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.2, color: "#44C0C1" },
                  { offset: 1, color: "#1BFEFE" },
                ]),
              },
            },
          },
        ],
      });
    },
    showct4() {
      // 绘制图表
      var chart4 = echarts.init(document.getElementById("chart4"));
      chart4.resize();
      chart4.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "5%", //图例距离左的距离
          y: "center",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "80%",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 300, name: "大专以下" },
              { value: 420, name: "大专" },
              { value: 800, name: "本科" },
              { value: 500, name: "硕士" },
              { value: 450, name: "博士" },
            ],
          },
        ],
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  height: calc(100% - 45px);
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "pt1 pt1 pt3 pt3 pt3 "
    "pt2 pt2 pt2 pt4 pt4";
  background-color: transparent;
  .el-dropdown {
    width: 70%;
    height: 73%;
    background: url(../../assets/img/pt/button.png) no-repeat;
    background-size: 89% 69%;
  }
  .item {
    background: url(../../assets/img/pt/ptbg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: 30px;
    margin: 2% 2% 2% 2%;
    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      .title {
        height: 60px;
        display: flex;
        flex-direction: row;
        .select {
          position: relative;
          .el-dropdown-link {
            height: 40px;
            font-size: 10pt;
            line-height: 32px;
            text-align: center;
            color: white;
            .el-dropdown-item {
              background-color: aqua;
            }
          }
        }
      }
      .chart {
        height: calc(100% - 60px);
      }
    }
  }
  .item1 {
    grid-area: pt1;
    margin-left: 10%;
    margin-top: 3%;

    /deep/ .title_text {
      margin: 5% 22% 0% 0%;
    }
  }
  .item2 {
    grid-area: pt2;
    margin-bottom: 1.5%;
    margin-left: 7%;
    margin-right: 2.5%;
    margin-top: 1.5%;
    .select {
      top: 15%;
      left: 16%;
      width: 18%;
    }
    /deep/ .title_text {
      margin: 3% 0% 0% -35%;
    }
  }
  .item3 {
    grid-area: pt3;
    margin-bottom: 1.5%;
    margin-left: 2.5%;
    margin-right: 5%;
    margin-top: 1.5%;
    .select {
      top: 15%;
      left: 16%;
      width: 18%;
    }
    /deep/ .title_back {
      width: 60%;
      height: 100%;
      background-size: 10% 20%;
      background-position-y: 62%;
      background-position-x: 0%;
      margin-left: 6%;
      .title_text {
        margin: 3% 2% 0% -54%;
      }
    }
  }
  .item4 {
    grid-area: pt4;
    margin-bottom: 2%;
    margin-left: 1%;
    margin-right: 8%;
    margin-top: 1.5%;
    .select {
      top: 15%;
      left: 10%;
      width: 25%;
    }
    /deep/ .title_back {
      width: 60%;
      height: 100%;
      background-size: 10% 20%;
      background-position-y: 62%;
      background-position-x: 0%;
      margin-left: 6%;
      .title_text {
        margin: 4.5% 43% 0% 0%;
      }
    }
  }
}
</style>
