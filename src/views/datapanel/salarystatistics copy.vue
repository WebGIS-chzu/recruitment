<template>
  <div class="grid-container">
    <div class="item item1">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">区域城市薪资Top10</div>
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
                    @click="(ct1 = 1), fetchData(ct1)"
                    :class="{ active: ct1 == 1 }"
                    >全国</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 2), fetchData(ct1)"
                    :class="{ active: ct1 == 2 }"
                    >北京</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 3), fetchData(ct1)"
                    :class="{ active: ct1 == 3 }"
                    >上海
                  </el-dropdown-item>
                  <el-dropdown-item
                    @click="(ct1 = 4), fetchData(ct1)"
                    :class="{ active: ct1 == 4 }"
                    >上海>广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 5), fetchData(ct1)"
                    :class="{ active: ct1 == 5 }"
                    >上海>深圳</el-dropdown-item
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
            <div class="title_text">城市薪资区间词云</div>
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
          <div id="chart2" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item3">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">城市区县薪资柱状图</div>
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
            <div class="title_text">行业平均月薪雷达图</div>
          </div>
        </div>
        <div class="chart">
          <div id="chart4" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item5">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">城市职位薪资极差图</div>
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
          <div id="chart5" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item6">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">城市职位薪资Top15</div>
          </div>
        </div>
        <div class="chart">
          <div id="chart6" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <!-- <div class="item item5">5</div> -->
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
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/heatmap");
require("echarts/lib/chart/funnel");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/visualMap");
export default {
  name: "salary",
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
    this.fetchData(1);
    this.showct1();
    this.showct2();
    this.showct4();
    this.showct3();
  },
  methods: {
    fetchData(ct1) {
      var sendData = ct1;
      var code = JSON.stringify(sendData);
      console.log(code);
      request.post("/api/data/querySalary", { code }).then((res) => {
        this.chartdata1.ydata = res.data.data.ct1;
        // this.chartdata1.xdata = res.data.data.ct1;
        // console.log(this.chartdata1);
        //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
        this.$nextTick(() => {
          this.showct1();
          this.showct2();
          this.showct4();
          this.showct3();
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
          name: "单位：千",
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
            type: "bar",
            showBackground: true,
            data: [5.85, 6.67, 7.85, 8.12, 9.16, 13.99, 17.25, 23.8],
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
            itemStyle: {
              normal: {
                color: "#1BFEFE",
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
          data: ["A", "B", "C", "D", "E"],
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
            center: ["60%", "55%"],
            radius: ["70%", "50%"],
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
                length: 50,
                length2: 10,
              },
            },
            data: [
              { value: 1111, name: "A" },
              { value: 735, name: "B" },
              { value: 580, name: "C" },
              { value: 484, name: "D" },
              { value: 300, name: "E" },
            ],
          },
        ],
      });
    },
    showct3() {
      // 绘制图表
      var chart3 = echarts.init(document.getElementById("chart3"));
      chart3.resize();
      chart3.setOption({
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
          name: "单位：千",
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
            data: [5.85, 6.67, 7.85, 8.12, 9.16, 13.99, 17.25, 23.8],
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
            itemStyle: {
              normal: {
                color: '#fafa96',
              },
            },
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
    "pt1 pt3 pt5 "
    "pt2 pt4 pt6 ";
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
        .title_text {
          margin: 6% 6% 0% 4%;
        }
        .select {
          position: relative;
          top: 50%;
          left: 6%;
          width: 30%;
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
  }
  .item2 {
    grid-area: pt2;
    margin-bottom: 3%;
    margin-left: 10%;
  }
  .item3 {
    grid-area: pt3;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 3%;
  }
  .item4 {
    grid-area: pt4;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .item5 {
    grid-area: pt5;
    margin-top: 3%;
    margin-right: 10%;
  }
  .item6 {
    grid-area: pt6;
    margin-bottom: 3%;
    margin-right: 10%;
  }
}
</style>
