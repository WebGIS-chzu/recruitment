<template>
  <div class="data">
    <div id="map" />
    <div class="left-part">
      <div class="pt pt1">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart1" :style="{ width: '110%', height: '100%' }"></div>
        </div>
      </div>
      <div class="pt pt2">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart2" :style="{ width: '110%', height: '100%' }"></div>
        </div>
      </div>
      <div class="pt pt3">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart3" :style="{ width: '110%', height: '100%' }"></div>
        </div>
      </div>
    </div>
    <div class="right-part">
      <div class="pt pt4">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart4" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
      <div class="pt pt5">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart5" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
      <div class="pt pt6">
        <div class="hd">
          <span>TOP10城市薪资水平</span>
        </div>
        <div class="Lechartcontent">
          <div id="chart6" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/funnel");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

const mapboxgl = require("mapbox-gl");
export default {
  name: "data",
  data() {},
  mounted() {
    this.initmap();
    this.chart1();
    this.chart2();
    this.chart3();
    this.chart4();
    this.chart5();
    this.chart6();
    //禁止页面滑动
    let m = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", m, { passive: false });
  },
  methods: {
    //地图服务初始化
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [105, 35],
        zoom: 3.5,
      });
    },

    chart1() {
      // 基于准备好的dom，初始化echarts实例
      let Chart1 = echarts.init(document.getElementById("chart1"));
      // 绘制图表
      var option;
      option = {
        color: ["#61a0a8"],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: ["0", "0.1"],
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
          //y轴刻度横线 ：false
          splitLine: {
            show: false,
          },
        },
        grid: {
          x: 40,
          y: 20,
          x2: 80,
          y2: 40,
        },
        series: [
          {
            barWidth: "60%",
            data: [120, 50, 150, 80, 70, 110],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // { offset: 0.4, color: "#1BFEFE" },
                  // { offset: 1, color: "#1BFEFE" },
                  { offset: 0.2, color: "#44C0C1" }, //柱图渐变色
                  { offset: 1, color: "#1BFEFE" },
                ]),
              },
            },
          },
        ],
      };
      option && Chart1.setOption(option);
    },
    chart2() {
      // 基于准备好的dom，初始化echarts实例
      let Chart2 = echarts.init(document.getElementById("chart2"));
      // 绘制图表
      var option;
      option = {
        color: ["#61a0a8"],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: ["0", "0.1"],
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
          //y轴刻度横线 ：false
          splitLine: {
            show: false,
          },
        },
        grid: {
          x: 40,
          y: 20,
          x2: 80,
          y2: 40,
        },
        series: [
          {
            barWidth: "60%",
            data: [120, 50, 150, 80, 70, 110],
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.1)",
            },
          },
        ],
      };
      option && Chart2.setOption(option);
    },
    chart3() {
      // 基于准备好的dom，初始化echarts实例
      let Chart3 = echarts.init(document.getElementById("chart3"));
      // 绘制图表
      var option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "55%", //图例距离左的距离
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
            center: ["30%", "53%"],
            radius: ["30%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#black",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "A" },
              { value: 735, name: "B" },
              { value: 580, name: "C" },
              { value: 484, name: "D" },
              { value: 300, name: "E" },
            ],
          },
        ],
      };
      option && Chart3.setOption(option);
    },
    chart4() {
      //基于准备好的dom，初始化echarts实例
      let Chart4 = echarts.init(document.getElementById("chart4"));
      var option;
      option = {
        color: ["#1E90FF"],
        xAxis: {
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        yAxis: {
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        grid: {
          x: 40,
          y: 20,
          x2: 40,
          y2: 40,
        },
        series: [
          {
            symbolSize: 12,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
          },
        ],
      };

      option && Chart4.setOption(option);
    },
    chart5() {
      // 基于准备好的dom，初始化echarts实例
      let Chart5 = echarts.init(document.getElementById("chart5"));
      var option;
      option = {
        // title: {
        //   text: "Funnel",
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        legend: {
          data: ["S", "C", "V", "I", "O"],
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 40,
            bottom: 40,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "90%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 15,
              },
            },
            data: [
              { value: 60, name: "V" },
              { value: 40, name: "I" },
              { value: 20, name: "O" },
              { value: 80, name: "C" },
              { value: 100, name: "S" },
            ],
          },
        ],
      };

      option && Chart5.setOption(option);
    },
    chart6() {
      // 基于准备好的dom，初始化echarts实例
      let Chart6 = echarts.init(document.getElementById("chart6"));
      var option;
      option = {
        color: ["#4169E1"],
        dataset: {
          source: [
            ["score", "amount", "product"],
            [89.3, 58212, "Matcha"],
            [57.1, 78254, "Milk"],
            [74.4, 41032, "Chees"],
            [50.1, 12755, "Cheese"],
            [89.7, 20145, "Matcha"],
            [68.1, 79146, "Tea"],
            [19.6, 91852, "Orange"],
            [10.6, 101852, "Lemon"],
            [32.7, 20112, "Walnut"],
          ],
        },
        grid: {
          x: 20,
          y: 20,
          x2: 20,
          y2: 10,
          containLabel: true,
        },
        xAxis: {
          name: "amount",
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        yAxis: {
          type: "category",
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #999999",
            },
          },
        },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["High Score", "Low Score"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product",
            },
          },
        ],
      };
      option && Chart6.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.data {
  position: fixed;
  height: 100%;
  width: 100%;
}
#map {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 0;
}
.Lechartcontent {
  height: 100%;
  width: 100%;
}
.left-part {
  position: absolute;
  height: 91%;
  width: 22%;
  left: 0px;
  top: 0px;
  float: left;
  display: flex;
  flex-direction: column;
  opacity: 1;
  .pt1 {
    width: 100%;
    height: 33%;
  }
  .pt2 {
    width: 100%;
    height: 33%;
  }
  .pt3 {
    width: 100%;
    height: 33%;
  }
}
.right-part {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 90%;
  width: 22%;
  float: left;
  display: flex;
  flex-direction: column;
  opacity: 1;
  .pt4 {
    width: 100%;
    height: 33%;
  }
  .pt5 {
    width: 100%;
    height: 33%;
  }
  .pt6 {
    width: 100%;
    height: 33%;
  }
}
.pt {
  flex: 1;
  width: 100%;
  height: 100%;
  margin: 10px 0px 0px 10px;
  background: url(../assets/img/pt/ptbg.png) no-repeat;
  background-size: 100% 100%;
  .hd {
    display: flex;
    width: 75%;
    margin: 10px;
    height: 28px;
    background: url(../assets/img/pt/pt_title1.png) no-repeat;
    background-size: 100% 82%;
    span {
      font-size: 17px;
      margin-left: 23px;
      line-height: 23px;

      color: #fff;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #38e9e0,
        0 0 70px #0cf3f3;
    }
  }
}
</style>
