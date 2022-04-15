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
                    >上海>广州</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="(ct1 = 5), fetchData1(ct1)"
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
            <div class="title_text">城市职位薪资极差图</div>
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
          <div id="chart4" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="item item5">
      <div class="content">
        <div class="title">
          <div class="title_back">
            <div class="title_text">城市职位薪资Top15</div>
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
    <!-- <div class="item item5">5</div> -->
  </div>
</template>

<script>
//import axios from "axios";
import "font-awesome/css/font-awesome.css";
import request from "../../utils/request";

// //词云
// import wordCloud, {
//   translate,
// } from "../../assets/js/echarts-wordcloud-master/dist/echarts-wordcloud";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/chart/treemap"); //极差矩形树图wordcloud
export default {
  name: "salary",
  // wordCloud,
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
    this.fetchData1(1);
    this.showct1();
    this.showct2();
    this.showct4();
    this.showct3();
    this.showct5();
  },
  methods: {
    fetchData(ct1) {
      var sendData = ct1;
      var code = JSON.stringify(sendData);
      console.log(code);
      request.post("/api/data/querySalary", { code }).then((res) => {
        this.chartdata1.ydata = res.data.data;
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
    fetchData1(ct1) {
      var sendData = ct1;
      var code = JSON.stringify(sendData);
      console.log(code);
      request.post("/api/data/salaryAreaTop", { code }).then((res) => {
        this.chartdata1.Xdata = res.data.city;
        this.chartdata1.Ydata = res.data.value;
        // this.chartdata1.xdata = res.data.data.ct1;
        // console.log(this.chartdata1);
        //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
        this.$nextTick(() => {
          this.showct1();
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
        dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
        },
    ],
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
          data: this.chartdata1.Xdata,
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
            data:this.chartdata1.Ydata,
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
      var myChart = echarts.init(document.getElementById("chart2"));

      var option = {
        title: {
          text: "", //标题
          x: "center",
          textStyle: {
            fontSize: 23,
          },
        },
        backgroundColor: translate,
        tooltip: {
          show: true,
        },
        series: [
          {
            name: "热点分析", //数据提示窗标题
            type: "wordCloud",
            sizeRange: [1, 50], //画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [-45, 90], //数据翻转范围
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6,
            },
            drawOutOfBound: true, //词云显示完整，超出画布的也显示
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 360),
                      Math.round(Math.random() * 360),
                      Math.round(Math.random() * 360),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#FFFF",
              },
            },
            data: [
              {
                name: "汽车",
                value: 928,
              },
              {
                name: "视频",
                value: 906,
              },
              {
                name: "电视",
                value: 825,
              },
              {
                name: "Lover Boy 88",
                value: 514,
              },
              {
                name: "动漫",
                value: 486,
              },
              {
                name: "音乐",
                value: 53,
              },
              {
                name: "直播",
                value: 163,
              },
              {
                name: "广播电台",
                value: 86,
              },
              {
                name: "戏曲曲艺",
                value: 17,
              },
              {
                name: "演出票务",
                value: 6,
              },
              {
                name: "给陌生的你听",
                value: 1,
              },
              {
                name: "资讯",
                value: 1437,
              },
              {
                name: "商业财经",
                value: 422,
              },
              {
                name: "娱乐八卦",
                value: 353,
              },
              {
                name: "军事",
                value: 331,
              },
              {
                name: "科技资讯",
                value: 313,
              },
              {
                name: "社会时政",
                value: 307,
              },
              {
                name: "时尚",
                value: 43,
              },
              {
                name: "网络奇闻",
                value: 15,
              },
              {
                name: "旅游出行",
                value: 438,
              },
              {
                name: "景点类型",
                value: 957,
              },
              {
                name: "国内游",
                value: 927,
              },
              {
                name: "远途出行方式",
                value: 908,
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
    showct3() {
      var chart3 = echarts.init(document.getElementById("chart3"));
      chart3.setOption({
        tooltip: { trigger: "item", formatter: "{b}: {c}K/月" },
        series: [
          {
            type: "treemap",
            width: "90%",
            height: "90%",
            top: "0%",
            bottom: "5%",
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            label: { normal: { show: true, position: ["10%", "40%"] } },
            itemStyle: {
              normal: {
                show: true,
                borderWidth: 1,
                borderColor: "#fff",
                textStyle: { color: "#fff", fontSize: 14 },
              },
              emphasis: { label: { show: true } },
            },
            data: [
              { name: "武汉", value: 348.75 },
              { name: "杭州", value: 297.5 },
              { name: "重庆", value: 246.75 },
              { name: "上海", value: 223.75 },
              { name: "北京", value: 163.75 },
              { name: "长沙", value: 123.54 },
              { name: "深圳", value: 72.5 },
              { name: "南京", value: 58.9 },
              { name: "广州", value: 57.29 },
              { name: "西安", value: 36.25 },
              { name: "东莞", value: 34.42 },
              { name: "成都", value: 33.79 },
              { name: "合肥", value: 31.25 },
              { name: "佛山", value: 26.67 },
              { name: "昆明", value: 25.75 },
              { name: "苏州", value: 24.25 },
              { name: "天津", value: 24 },
              { name: "常州", value: 23.92 },
              { name: "嘉兴", value: 23 },
              { name: "宁波", value: 22.5 },
              { name: "郑州", value: 21.25 },
              { name: "福州", value: 20.75 },
              { name: "厦门", value: 20.75 },
              { name: "中山", value: 20 },
              { name: "南昌", value: 19.17 },
              { name: "珠海", value: 43.75 },
              { name: "青岛", value: 23.25 },
              { name: "济南", value: 18.75 },
              { name: "沈阳", value: 18.75 },
              { name: "贵阳", value: 18.5 },
              { name: "无锡", value: 17.08 },
              { name: "兰州", value: 11.25 },
              { name: "石家庄", value: 10 },
              { name: "哈尔滨", value: 9.5 },
              { name: "长春", value: 9 },
              { name: "大连", value: 8.75 },
              { name: "太原", value: 7.75 },
            ],
          },
        ],
      });
    },
    showct4() {
      var chart4 = echarts.init(document.getElementById("chart4"));
      chart4.setOption({
        tooltip: {},
        radar: {
          center: ["50%", "50%"],
          radius: 90,
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "专业服务", max: 16 },
            { name: "政府/公共事业", max: 16 },
            { name: "仪器仪表/工业自动化", max: 16 },
            { name: "环保/资源", max: 16 },
            { name: "机械/设备/重工", max: 16 },
            { name: "计算机软硬件/服务", max: 16 },
            { name: "建筑/建材/工程", max: 16 },
            { name: "交通/运输/物流", max: 15 },
            { name: "石油/化工/矿产/地质", max: 15 },
            { name: "新能源", max: 15 },
          ],
        },
        series: [
          {
            name: "行业薪资",
            type: "radar",
            areaStyle: { normal: { color: "rgba(255, 25, 35, 0.8)" } },
            data: [
              {
                value: [
                  9.87, 14.59, 10.29, 10.01, 12.58, 11.43, 10.81, 13.53, 12.02,
                  12.26,
                ],
                name: "行业平均薪资(K/月)",
              },
            ],
          },
        ],
      });
    },
    showct5() {
      // 绘制图表
      var chart = echarts.init(document.getElementById("chart5"));
      chart.resize();
      chart.setOption({
        tooltip: {
          trigger: "axis", //鼠标经过提示
          formatter: "{b0}:{c0}万", //单位
        },
        dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
        },
    ],
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
          interval:"10%",
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
            barWidth : 20,
            showBackground: true,
            data: [5.85, 6.67, 7.85, 8.12, 9.16, 13.99, 17.25, 23.8],
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
            itemStyle: {
              normal: {
                color: "#7FFFAA",
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
    "pt2 pt4 pt5 ";
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
    margin-bottom: 1.5%;
    margin-left: 2.5%;
    margin-right: 5%;
    margin-top: 1.5%;
    .title_back {
      width: 60%;
      height: 100%;
      background-size: 10% 20%;
      background-position-y: 60%;
      background-position-x: 10%;
      margin-left: 0%;
      .title_text {
        margin: 3% 34% 0% 0% !important;
      }
    }
    .select {
      left: 6% !important;
      width: 30% !important;
    }
  }
  .item4 {
    grid-area: pt4;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .item5 {
    grid-area: pt5;
    margin-bottom: 3%;
    margin-right: 10%;
  }
}
</style>
