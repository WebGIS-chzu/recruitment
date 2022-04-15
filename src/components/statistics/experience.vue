<template>
  <div id="experience">
    <iframe
      src="./static/GraphExper.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe>
    <div id="map" />
    <div class="left">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>公司类型工作经验统计</span>
        </div>
        <div class="row1chartcontent" id="chart21"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>城市工作经验统计</span>
        </div>
        <div class="row1chartcontent" id="chart22" ref="Chart2"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>职位工作经验统计</span>
        </div>
        <div class="row1chartcontent" id="chart23"></div>
      </div>
    </div>
    <div class="main">
      <!-- <div class="map">-->
      <div class="col-content">
        <div class="row2title">
          <div class="imgBK"></div>
          <span>城市工作经验月变化</span>
        </div>
        <div class="row1chartcontent" id="chart4" ref="Chart4"></div>
      </div>
    </div>
    <div class="right">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>工作经验平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart25"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>工作经验要求统计</span>
        </div>
        <div class="row1chartcontent" id="chart26"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>行业工作经验统计</span>
        </div>
        <div class="row1chartcontent" id="chart27"></div>
      </div>
    </div>
    <selectRegion />
  </div>
</template>

<script>
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
import request from "@/utils/request";
import SelectRegion from "../../components/cityselect/newselectRegion.vue";
import eventBum from "../../components/cityselect/EvebtBus";
export default {
  name: "experience",
  components: {
    wordcloud,
    SelectRegion,
  },
  data() {
    return {
      selectcity: {
        name: "中国",
        level: 0,
      },
      chart26: {
        xdata: [],
        ydata: [],
      },
      cloudData: [
        { value: 1800, name: "纳木措" },
        { value: 1200, name: "西藏" },
        { value: 1000, name: "海拔" },
        { value: 900, name: "景色" },
        { value: 700, name: "湖水" },
        { value: 650, name: "雪山" },
        { value: 630, name: "值得" },
        { value: 610, name: "没有" },
        { value: 600, name: "地方" },
        { value: 543, name: "风景" },
        { value: 523, name: "景区" },
        { value: 500, name: "感觉" },
        { value: 500, name: "高原" },
        { value: 490, name: "湖面" },
        { value: 490, name: "圣湖" },
        { value: 490, name: "小时" },
        { value: 430, name: "湖泊" },
        { value: 430, name: "大圣" },
        { value: 430, name: "美丽" },
        { value: 380, name: "景点" },
        { value: 380, name: "牦牛" },
        { value: 340, name: "时间" },
        { value: 280, name: "咸水湖" },
        { value: 260, name: "天湖" },
        { value: 260, name: "藏民" },
        { value: 200, name: "朋友" },
        { value: 200, name: "蓝天白云" },
        { value: 100, name: "开车" },
        { value: 50, name: "神圣" },
        { value: 40, name: "推荐" },
        { value: 25, name: "限速" },
        { value: 13, name: "距离" },
      ],
      option4: {
        color: [
          "#ff7f50",
          "#87cefa",
          "#da70d6",
          "#32cd32",
          "#6495ed",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c",
          "#ffa500",
          "#40e0d0",
        ],
        tooltip: { trigger: "axis" },
        //图例--折线提示提示
        legend: {
          x: "center",
          y: "top",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#1e90ff", // 图例文字颜色
          },
          data: ["5年以上", "3-4年", "1-2年", "应届生"],
        },
        calculable: true,
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            name: "单位:个",
            min: "0",
            max: "",
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        grid: {
          x: 50,
          y: 40,
          x2: 40,
          y2: 30,
        },
        series: [
          {
            type: "line",
            name: "5年以上",
            data: [],
          },
          {
            type: "line",
            name: "3-4年",
            data: [],
          },
          {
            type: "line",
            name: "1-2年",
            data: [],
          },
          {
            type: "line",
            name: "应届生",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          mouth: "11",
          a: "294",
          b: "956",
          c: "1120",
          d: "150",
          sum: "1000",
        },
        {
          mouth: "12",
          a: "350",
          b: "1020",
          c: "1200",
          d: "200",
          sum: "1000",
        },
        {
          mouth: "1",
          a: "298",
          b: "953",
          c: "1002",
          d: "126",
          sum: "1000",
        },
        {
          mouth: "2",
          a: "385",
          b: "1035",
          c: "1230",
          d: "298",
          sum: "1000",
        },
        {
          mouth: "3",
          a: "423",
          b: "1145",
          c: "1356",
          d: "246",
          sum: "1000",
        },
      ],
    };
  },
  mounted() {
    this.initmap();
    this.typeData();
    this.initChart22();
    // this.initChart23();
    this.initChart24();
    this.eduData();
    let myChart4 = this.$echarts.init(this.$refs.Chart4);
    myChart4.setOption(this.option4);
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      // console.log(this.selectcity);
      if (this.selectcity.name == "南京市") {
        request.post("/api/data/experience", { city: "南京" }).then((res) => {
          this.chart27 = res.data.skill;
          this.chart21 = res.data.company;
          this.chart23 = res.data.job;
          this.initChart21();
          this.initChart23();
          this.initChart27();
          // console.log(this.chart23);
        });
        request.post("/api/data/expCount", { city: "南京" }).then((res) => {
          this.chart25 = res.data.salary;
          for (var i = 0; i < res.data.count.length; i++) {
            this.chart26.xdata[i] = res.data.count[i].name;
            this.chart26.ydata[i] = res.data.count[i].value;
          }
          this.initChart25();
          this.initChart26();
        });
      }
    });
    // this.initChart27();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
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
    typeData() {
      request.post("/api/data/experience", { city: "全国" }).then((res) => {
        this.chart27 = res.data.skill;
        this.chart21 = res.data.company;
        this.chart23 = res.data.job;
        // console.log(this.chart23);
        this.initChart21();
        this.initChart23();
        this.initChart27();
      });
    },
    eduData() {
      request.post("/api/data/expCount", { city: "全国" }).then((res) => {
        this.chart25 = res.data.salary;
        for (var i = 0; i < res.data.count.length; i++) {
          this.chart26.xdata[i] = res.data.count[i].name;
          this.chart26.ydata[i] = res.data.count[i].value;
        }
        this.initChart25();
        this.initChart26();
      });
    },
    initChart25() {
      var myChart = echarts.init(document.getElementById("chart25"));
      let arr = [];
      this.chart25.forEach((element) => {
        arr.push({ value: element.value, name: element.name });
      });
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "2%",
          left: "center",
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            type: "pie",
            center: ["50%", "55%"],
            radius: ["30%", "70%"],
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
                fontSize: "26",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: arr,
          },
        ],
      });
    },
    initChart27() {
      var myChart = echarts.init(document.getElementById("chart27"));
      let arr = [];
      this.chart27.forEach((element) => {
        arr.push({ value: element.value, name: element.name });
      });
      myChart.setOption({
        legend: {
          data: ["博士", "硕士", "本科", "专科", "高中"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        grid: {
          left: "3%",
          top: "15%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            data: [
              "前端开发工程师",
              "数据库工程师",
              "后端开发工程师",
              "GIS开发工程师",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name:"单位：个",
            scale: true,
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            name: "5年以上",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[0].value,
          },
          {
            name: "3-4年",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[1].value,
          },
          {
            name: "1-2年",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[2].value,
          },
          {
            name: "应届生",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[3].value,
          },
          {
            name: "无需",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[4].value,
          },
        ],
      });
    },
    initChart23() {
      let myChart = this.$echarts.init(document.getElementById("chart23"));
      let arr = [];
      this.chart23.forEach((element) => {
        arr.push({ value: element.value, name: element.name });
      });
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        grid: {
          right: "5%",
          top: "25%",
          height: "63%",
          width: "92%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: [
            "前端开发工程师",
            "数据库工程师",
            "后端开发工程师",
            "GIS开发工程师",
          ],
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "5年以上",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: arr[0].value,
          },
          {
            name: "3-4年",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: arr[1].value,
          },
          {
            name: "1-2年",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: arr[2].value,
          },
          {
            name: "应届生",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: arr[3].value,
          },
          {
            name: "无需",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: arr[4].value,
          },
        ],
      });
    },
    initChart24() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option4.xAxis.data.push(this.plan_table[i].mouth);
        this.option4.series[0].data.push(this.plan_table[i].a);

        this.option4.series[1].data.push(this.plan_table[i].b);

        this.option4.series[2].data.push(this.plan_table[i].c);

        this.option4.series[3].data.push(this.plan_table[i].d);
        //Y轴最大值的设置：向上取整并家500
        this.option4.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
    },
    initChart26() {
      var myChart = echarts.init(document.getElementById("chart26"));
      myChart.setOption({
        grid: {
          height: "75%",
          width: "80%",
          top: "15%",
          right: "5%",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          data: this.chart26.xdata,
        },
        yAxis: {
          type: "value",
          name:"单位：个",
          scale: true,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            data: this.chart26.ydata,
            type: "line",
            areaStyle: {
              color: "rgb(115, 215, 228)",
            },
            lineStyle: {
              color: "rgb(115, 215, 228)",
            },
          },
        ],
      });
    },
    // handleResize() {
    //   this.myChart25 && this.myChart25.resize();
    // },
    initChart21() {
      var myChart = echarts.init(document.getElementById("chart21"));
      let arr = [];
      this.chart21.forEach((element) => {
        arr.push({ value: element.value, name: element.name });
      });
      myChart.setOption({
        color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
        // title: {
        //   text: "Customized Radar Chart",
        // },
        legend: {
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        radar: [
          {
            indicator: [
              { text: "外资" },
              { text: "合资" },
              { text: "创业公司" },
              { text: "国企" },
              { text: "上市公司" },
            ],
            center: ["50%", "60%"],
            radius: 70,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            axisName: {
              formatter: "【{value}】",
              color: "#428BD4",
            },
            splitArea: {
              areaStyle: {
                color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4"],
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
          },
        ],
        series: [
          {
            type: "radar",
            emphasis: {
              lineStyle: {
                width: 4,
              },
            },
            data: arr,
          },
        ],
      });
    },

    initChart22() {
      var myChart = echarts.init(document.getElementById("chart22"));
      const city = [
        "北京",
        "11a",
        "12p",
        "上海",
        "1p",
        "2p",
        "南京",
        "3p",
        "4p",
        "深圳",
        "5p",
        "6p",
        "重庆",
        "7p",
        "8p",
        "杭州",
        "7p",
        "8p",
        "广东",
        "7p",
        "8p",
        "郑州",
        "7p",
        "苏州",
      ];
     const days = ["5年以上", "3-4年", "1-2年", "应届生", "无需"];
      // prettier-ignore
      const data = [[0,0,2],[0,1,1],[0,2,2],[0,3,1],[0,4,0],[0,5,1],[0,6,0],[0,7,1],[0,8,1],[0,9,1],[0,10,1],[0,11,2],[0,12,1],[0,13,1],[0,14,1],[0,15,2],[0,16,1],[0,17,1],[0,18,1],[0,19,1],[0,20,1],[0,21,1],[0,22,2],[0,23,1],[1,0,17],[1,1,16],[1,2,18],[1,3,15],[1,4,18],[1,5,26],[1,6,17],[1,7,18],[1,8,25],[1,9,17],[1,10,17],[1,11,25],[1,12,16],[1,13,16],[1,14,19],[1,15,11],[1,16,16],[1,17,17],[1,18,18],[1,19,10],[1,20,15],[1,21,15],[1,22,17],[1,23,18],[2,0,81],[2,1,89],[2,2,42],[2,3,56],[2,4,58],[2,5,77],[2,6,65],[2,7,52],[2,8,56],[2,9,58],[2,10,75],[2,11,65],[2,12,44],[2,13,54],[2,14,58],[2,15,62],[2,16,65],[2,17,59],[2,18,57],[2,19,65],[2,20,71],[2,21,54],[2,22,52],[2,23,48],[3,0,5],[3,1,5],[3,2,2],[3,3,1],[3,4,2],[3,5,5],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,4],[3,14,3],[3,15,2],[3,16,2],[3,17,5],[3,18,5],[3,19,0],[3,20,2],[3,21,2],[3,22,4],[3,23,1],[4,0,20],[4,1,13],[4,2,20],[4,3,21],[4,4,19],[4,5,18],[4,6,15],[4,7,10],[4,8,13],[4,9,12],[4,10,21],[4,11,21],[4,12,12],[4,13,12],[4,14,13],[4,15,11],[4,16,11],[4,17,11],[4,18,21],[4,19,12],[4,20,12],[4,21,11],[4,22,21],[4,23,8],]
      
    .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
      myChart.setOption({
        tooltip: {
          position: "top",
        },
        grid: {
          height: "60%",
          width: "85%",
          top: "5%",
          right: "2%",
        },
        xAxis: {
          type: "category",
          data: city,
          splitArea: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: days,
          splitArea: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "5%",
        },
        series: [
          {
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
      });
    },
  },
};
</script>

<style scoped lang="less">
#experience {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: calc(100% - 45px);
  .left {
    height: 100%;
    width: 25%;
    position: absolute;
    top: 0%;
    left: 3%;
    float: left;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    background: url("../../assets/img/fq/ptbg3.png");
    background-size: 100% 100%;
  }
  .main {
    height: 33.3%;
    width: 46.8%;
    position: absolute;
    float: left;
    bottom: 0%;
    left: 28.1%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    background: url("../../assets/img/fq/ptbg3.png");
    background-size: 100% 100%;
    .col-content {
      margin-bottom: 0.2%;
    }
  }
  .right {
    height: 100%;
    width: 25%;
    bottom: 0%;
    right: 0%;
    position: absolute;
    float: left;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    background: url("../../assets/img/fq/ptbg3.png");
    background-size: 100% 100%;
    // background: rgba(7, 41, 61, 0.637);
  }
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.col-content {
  height: 100%;
  flex: 1;
  margin-bottom: 0;
  width: 100%;
  top: 1%;
  margin-bottom: 0.5%;
  background: url("../../assets/img/fq/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  .row1chartcontent {
    height: 85%;
    width: 100%;
  }
}

.row1title {
  height: 15%;
  width: 100%;
  color: aliceblue;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2%;
  // background-color: rgba(26, 62, 83, 0.623);
  // background-color: #1b3147;
  .imgBK {
    width: 11%;
    height: 39%;
    background: url("../../assets/img/pt/pt_title.png") no-repeat;
    background-size: 100% 100%;
  }
  span {
    // color: rgb(115, 215, 228);
    color: #fff;
    font-size: 13pt;
    margin-left: 1%;
    margin-top: -0.5%;
  }
}
.row2title {
  height: 15%;
  width: 100%;
  color: aliceblue;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2%;
  // background-color: #1b3147;
  .imgBK {
    width: 5.5%;
    height: 38%;
    background: url("../../assets/img/pt/pt_title.png") no-repeat;
    background-size: 100% 100%;
  }
  span {
    // color: rgb(115, 215, 228);
    color: #fff;
    font-size: 13pt;
    margin-left: 0.5%;
    margin-top: -0.3%;
  }
}
.citychoose {
  z-index: 9999;
  position: absolute;
  height: 6%;
  width: 9%;
  top: 1%;
  left: 20.5%;
  background: url("../../assets/img/fq/city.png") no-repeat;
  opacity: 0.7;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  .iconcontent {
    flex: 2;
    color: rgb(92, 235, 216);
    text-align: right;
  }
  .cityname {
    flex: 6;
    color: #fafafa;
    // text-align: left;
  }
}
</style>
