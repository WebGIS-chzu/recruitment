<template>
  <div class="grid-container">
    <div class="item item1">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">工作经验-薪资关系折线图</div>
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
                    :class="{ active: ct1 == 1 }"
                    >深圳</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
            <div class="title_text">城市工作经验占比</div>
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
                    @click="(ct2 = 1), fetchData2(ct2)"
                    :class="{ active: ct2 == 1 }"
                    >全国</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct2 = 2), fetchData2(ct2)"
                    :class="{ active: ct2 == 2 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct2 = 3), fetchData2(ct2)"
                    :class="{ active: ct1 == 3 }"
                    >上海
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="(ct2 = 4), fetchData2(ct2)"
                    :class="{ active: ct2 == 4 }"
                    >广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct2 = 5), fetchData2(ct2)"
                    :class="{ active: ct2 == 5 }"
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
            <div class="title_text">工作经验月变化折线图</div>
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
                    @click="(ct2 = 1), fetchData(ct1)"
                    :class="{ active: ct2 == 1 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct2 = 2), fetchData(ct1)"
                    :class="{ active: ct2 == 2 }"
                    >上海</el-dropdown-item
                  >
                  <el-dropdown-item>广州</el-dropdown-item>
                  <el-dropdown-item>深圳</el-dropdown-item>
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
            <div class="title_text">工作经验-薪资关系热力图</div>
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
require("echarts/lib/chart/heatmap");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/visualMap");
export default {
  name: "experience",
  data() {
    return {
      ct1: 1,
      ct2: 1,
      ct3: 1,
      ct4: 1,
      ct5: 1,
      ct6: 1,
      chartdata1: [],
      chartdata2: [],
      chartdata3: [],
      chartdata4: [],
    };
  },
  created() {},
  mounted() {
    this.fetchData1(1);
    this.fetchData2(1);
    // this.fetchData3(1);
    // this.fetchData4(1);
    this.showct1();
    this.showct2();
    this.showct4();
    this.showct3();
  },
  methods: {
    // fetchData1(ct1) {
    //   var sendData = ct1;
    //   var code = JSON.stringify(sendData);
    //   console.log(code);
    //   request.post("/api//data/salaryRe", { code }).then((res) => {
    //     this.chartdata1 = res.data[ct1 - 1];
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
    fetchData1(ct1) {
      var code = JSON.stringify(ct1);
      console.log(code);
      request.post("/api//data/salaryRe", { code }).then((res) => {
        this.chartdata1 = res.data[ct1 - 1];
        console.log(res.data[ct1 - 1]);
        //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
        this.$nextTick(() => {
          this.showct1();
        });
      });
    },
    fetchData2(ct2) {
      var code = JSON.stringify(ct2);
      console.log(code);
      request.post("/api//data/experienceCo", { code }).then((res) => {
        this.chartdata2 = res.data.exp;
        console.log(res.data[ct2 - 1]);
        //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
        this.$nextTick(() => {
          this.showct2();
        });
      });
    },
    showct1() {
      // 绘制图表
      var chart1 = echarts.init(document.getElementById("chart1"));
      chart1.resize();
      chart1.setOption({
        tooltip: {
          trigger: "axis", //鼠标经过提示
          formatter: "{b0}:{c0}万", //单位
        },
        legend: {
          icon: "roundRect", //icon为圆角矩形
          data: ["样例1", "样例2", "样例3"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 16,
          },
        },
        xAxis: {
          type: "category",
          data: [
            "无需",
            "在校/应届",
            "1年",
            "2年",
            "3-4年",
            "5-7年",
            "8-9年",
            "10年以上",
          ],
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
          name: "单位：万",
          //坐标轴范围
          boundaryGap: ["0", "0.1"],
          axisLine: {
            //轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
          //y轴刻度横线
          splitLine: {
            show: false,
          },
        },
        grid: {
          x: 50,
          y: 30,
          x2: 30,
          y2: 40,
        },
        series: [
          {
            type: "line",
            showBackground: true,
            data: this.chartdata1,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.2, color: "#44C0C1" },
                  { offset: 1, color: "#1BFEFE" },
                ]),
              },
            },
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
        ],
      });
    },
    showct2() {
      // 绘制图表
      var chart = echarts.init(document.getElementById("chart2"));
      chart.resize();
      chart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "5%", //图例距离左的距离
          y: "center", //图例上下居中
          data: [
            "无需",
            "在校/应届生",
            "1年",
            "2年",
            "3-4年",
            "5-7年",
            "8-9年",
            "10年以上",
          ],
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
            center: ["65%", "50%"],
            radius: ["0%", "75%"],
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{b}",
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 10,
              },
            },
            data: [
              { value: this.chartdata2[0], name: "无需" },
              { value: this.chartdata2[1], name: "在校/应届生" },
              { value: this.chartdata2[2], name: "1年" },
              { value: this.chartdata2[3], name: "2年" },
              { value: this.chartdata2[4], name: "3-4年" },
              { value: this.chartdata2[5], name: "5-7年" },
              { value: this.chartdata2[6], name: "8-9年" },
              { value: this.chartdata2[7], name: "10年以上" },
            ],
          },
        ],
      });
    },
    showct3() {
      var chart3 = echarts.init(document.getElementById("chart3"));
      chart3.setOption({
        color: [
          "#37a2da",
          "#ff6106",
          "#88e681",
          "#ffff00",
          "#ff9f7f",
          "#fb4d72",
          "#bb99c5",
          "#5449ea",
        ],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "无需",
            "在校/应届",
            "1年",
            "2年",
            "3-4年",
            "5-7年",
            "8-9年",
            "10年以上",
          ],
          textStyle: { fontSize: 12, color: "rgba(255, 255, 255, 0.5)" },
        },
        xAxis: {
          type: "category",
          axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.5)" } },
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            //轴文字颜色
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        grid: {
          x: 60,
          y: 30,
          x2: 30,
          y2: 40,
        },
        series: [
          {
            name: "无需",
            type: "line",
            itemStyle: { color: "#3378bc" },
            data: [0, 0, 18, 183, 109, 6, 12, 216, 5, 13, 64, 370],
          },
          {
            name: "在校/应届",
            type: "line",
            itemStyle: { color: "#ff7274" },
            data: [0, 0, 15, 83, 34, 6, 12, 64, 19, 26, 43, 508],
          },
          {
            name: "1年",
            type: "line",
            itemStyle: { color: "#2cd879" },
            data: [0, 0, 72, 520, 386, 42, 100, 734, 50, 88, 266, 1230],
          },
          {
            name: "2年",
            type: "line",
            itemStyle: { color: "#82d8e1" },
            data: [0, 0, 110, 647, 341, 55, 125, 739, 75, 89, 264, 1229],
          },
          {
            name: "3-4年",
            type: "line",
            itemStyle: { color: "#ef4fef" },
            data: [0, 0, 188, 819, 381, 70, 127, 945, 71, 108, 355, 1778],
          },
          {
            name: "5-7年",
            type: "line",
            itemStyle: { color: "#ffaa00" },
            data: [0, 0, 60, 227, 127, 16, 56, 320, 22, 30, 133, 673],
          },
          {
            name: "8-9年",
            type: "line",
            itemStyle: { color: "#aaaa7f" },
            data: [0, 0, 13, 28, 5, 0, 3, 38, 1, 4, 9, 69],
          },
          {
            name: "10年以上",
            type: "line",
            itemStyle: { color: "#00557f" },
            data: [0, 0, 2, 14, 9, 1, 1, 16, 0, 0, 7, 43],
          },
        ],
      });
    },
    showct4() {
      const hours = [
        "12a",
        "1a",
        "2a",
        "3a",
        "4a",
        "5a",
        "6a",
        "7a",
        "8a",
        "9a",
        "10a",
        "11a",
        "12p",
        "1p",
        "2p",
        "3p",
        "4p",
        "5p",
        "6p",
        "7p",
        "8p",
        "9p",
        "10p",
        "11p",
      ];
      // prettier-ignore
      const days = ['Saturday', 'Friday', 'Thursday','Wednesday', 'Tuesday', 'Monday', 'Sunday'];
      // prettier-ignore
      const data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]]
    .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
      var chart4 = echarts.init(document.getElementById("chart4"));
      chart4.resize();
      var option4;
      option4 = {
        tooltip: {
          position: "top",
        },
        grid: {
          height: "70%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: days,
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "77%",
          top: "-5%",
          right: "5%",
          textStyle: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      chart4.setOption(option4);
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
  height: calc(100% - 45px);
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "pt1 pt3 pt3 "
    "pt2 pt4 pt4 ";
  background-color: transparent;
  .el-dropdown {
    width: 70%;
    height: 73%;
    background: url(../../assets/img/pt/button.png) no-repeat;
    background-size: 89% 69%;
  }
  // div {
  //   // text-align: center;
  //   // font-size: 30px;
  //   // outline: 1px dashed rgb(136, 27, 27);
  // }
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
    //outline: 1px dashed rgb(136, 27, 27);
  }
  .item1 {
    grid-area: pt1;
    margin-left: 10%;
    margin-top: 3%;
    .select {
      top: 50%;
      left: 6%;
      width: 30%;
    }
  }
  .item2 {
    grid-area: pt2;
    margin-bottom: 3%;
    margin-left: 10%;
    .select {
      top: 50%;
      left: 6%;
      width: 30%;
    }
    /deep/ .title_text {
      margin: 6% 6% 0% 0%;
    }
  }
  .item3 {
    grid-area: pt3;
    margin-bottom: 1.5%;
    margin-left: 2.5%;
    margin-right: 5%;
    margin-top: 1.5%;
    .select {
      top: 50%;
      left: 15%;
      width: 15%;
    }
    /deep/ .title_back {
      width: 60%;
      height: 100%;
      background-size: 10% 20%;
      background-position-y: 62%;
      background-position-x: 0%;
      margin-left: 6%;
      .title_text {
        margin: 3% 50% -2% 0%;
      }
    }
  }
  .item4 {
    grid-area: pt4;
    margin-bottom: 2%;
    margin-left: 2.5%;
    margin-right: 5%;
    margin-top: 1%;
    /deep/ .title_back {
      width: 60%;
      height: 100%;
      background-size: 10% 20%;
      background-position-y: 62%;
      background-position-x: 0%;
      margin-left: 6%;
      .title_text {
        margin: 3% 45% 0% 0%;
      }
    }
  }
  // .item5 {
  //   grid-area: pt5;
  //   margin-top: 3%;
  //   margin-right: 10%;
  // }
}
</style>
