<template>
  <div id="education">
    <iframe
      src="./static/GraphEduc.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe>
    <div class="left">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>学历要求统计</span>
        </div>
        <div class="row1chartcontent" id="chart11"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>学历平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart12" ref="Chart2"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>行业学历统计</span>
        </div>
        <div class="row1chartcontent" id="chart13"></div>
      </div>
    </div>
    <div class="main">
      <!-- <div class="map">-->
      <div class="col-content">
        <div class="row2title">
          <div class="imgBK"></div>
          <span>城市学历要求月变化</span>
        </div>
        <div class="row1chartcontent" id="chart4" ref="Chart4"></div>
      </div>
    </div>
    <div class="right">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>公司类型学历统计</span>
        </div>
        <div class="row1chartcontent" id="chart15"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>城市学历统计</span>
        </div>
        <div class="row1chartcontent" id="chart16"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>职位学历统计</span>
        </div>
        <div class="row1chartcontent" id="chart17"></div>
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
  name: "education",
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
      chart12: {
        xdata: [],
        ydata: [],
      },
      cloudData: [
        { value: 1741, name: "1-1.5万/月" },
        { value: 994, name: "1.5-2万/月" },
        { value: 786, name: "6-8千/月" },
        { value: 749, name: "0.8-1万/月" },
        { value: 559, name: "1-2万/月" },
        { value: 559, name: "0.8-1.5万/月" },
        { value: 500, name: "1.5-2.5万/月" },
        { value: 396, name: "0.8-1.2万/月" },
        { value: 342, name: "1.5-3万/月" },
        { value: 338, name: "0.6-1万/月" },
        { value: 327, name: "4.5-6千/月" },
        { value: 257, name: "2-2.5万/月" },
        { value: 243, name: "0.6-1.2万/月" },
        { value: 222, name: "1.2-1.8万/月" },
        { value: 221, name: "0.5-1万/月" },
        { value: 219, name: "1.2-2万/月" },
        { value: 181, name: "5-8千/月" },
        { value: 165, name: "0.7-1.2万/月" },
        { value: 160, name: "4-8千/月" },
        { value: 159, name: "2-3万/月" },
        { value: 157, name: "0.8-1.6万/月" },
        { value: 156, name: "0.7-1万/月" },
        { value: 139, name: "2-4万/月" },
        { value: 139, name: "1-1.8万/月" },
        { value: 135, name: "0.8-1.3万/月" },
        { value: 108, name: "5-7千/月" },
        { value: 107, name: "2.5-3万/月" },
        { value: 105, name: "10-15万/年" },
        { value: 94, name: "15-20万/年" },
        { value: 90, name: "0.7-1.4万/月" },
        { value: 88, name: "6-9千/月" },
        { value: 82, name: "4-6千/月" },
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
          data: ["博士", "硕士", "本科", "专科"],
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
          x: 40,
          y: 40,
          x2: 70,
          y2: 25,
        },
        series: [
          {
            type: "line",
            name: "博士",
            data: [],
          },
          {
            type: "line",
            name: "硕士",
            data: [],
          },
          {
            type: "line",
            name: "本科",
            data: [],
          },
          {
            type: "line",
            name: "专科",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          mouth: "11",
          b: "294",
          a: "150",
          c: "1120",
          d: "1250",
          sum: "1000",
        },
        {
          mouth: "12",
          b: "350",
          d: "1020",
          c: "1200",
          a: "200",
          sum: "1000",
        },
        {
          mouth: "1",
          b: "298",
          d: "953",
          c: "1002",
          a: "126",
          sum: "1000",
        },
        {
          mouth: "2",
          b: "385",
          d: "1135",
          c: "1230",
          a: "298",
          sum: "1000",
        },
        {
          mouth: "3",
          b: "423",
          d: "1345",
          c: "1256",
          a: "246",
          sum: "1000",
        },
      ],
    };
  },
  mounted() {
    // this.initmap();
    // this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    // this.initChart11();
    // this.initChart12();
    this.initChart14();
    let myChart4 = this.$echarts.init(this.$refs.Chart4);
    myChart4.setOption(this.option4);
    this.initChart16();
    this.typeData();
    this.eduData();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      // this.selectcity.code = json.code;
      if (this.selectcity.name == "南京市") {
        request.post("/api/data/education", { city: "南京" }).then((res) => {
          this.chart13 = res.data.skill;
          this.chart15 = res.data.company;
          this.chart17 = res.data.job;
          // console.log(this.chart13);
          this.initChart13();
          this.initChart15();
          this.initChart17();
        });
        request.post("/api/data/eduCount", { city: "南京" }).then((res) => {
          this.chart1 = res.data.count;
          for (var i = 0; i < res.data.salary.length; i++) {
            this.chart12.xdata[i] = res.data.salary[i].name;
            this.chart12.ydata[i] = res.data.salary[i].value;
          }
          this.initChart11();
          this.initChart12();
        });
      }
    });
  },
  methods: {
    // initmap() {
    //   this.$mapboxgl.accessToken =
    //     "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
    //   var map = new this.$mapboxgl.Map({
    //     container: "map",
    //     style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
    //     center: [105, 35],
    //     zoom: 3.5,
    //   });
    // },
    typeData() {
      request.post("/api/data/education", { city: "全国" }).then((res) => {
        this.chart13 = res.data.skill;
        this.chart15 = res.data.company;
        this.chart17 = res.data.job;
        // console.log(this.chart13);
        this.initChart13();
        this.initChart15();
        this.initChart17();
      });
    },
    eduData() {
      request.post("/api/data/eduCount", { city: "全国" }).then((res) => {
        this.chart11 = res.data.count;
        for (var i = 0; i < res.data.salary.length; i++) {
          this.chart12.xdata[i] = res.data.salary[i].name;
          this.chart12.ydata[i] = res.data.salary[i].value;
        }
        this.initChart11();
        this.initChart12();
      });
    },
    initChart11() {
      var myChart = echarts.init(document.getElementById("chart11"));
      let arr = [];
      this.chart11.forEach((element) => {
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
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 0.1,
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
    initChart13() {
      var myChart = echarts.init(document.getElementById("chart13"));
      let arr = [];
      this.chart13.forEach((element) => {
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
          top: "25%",
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
            data: ["电子技术", "互联网", "计算机", "通信"],
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
            name: "博士",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[0].value,
          },
          {
            name: "硕士",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[1].value,
          },
          {
            name: "本科",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[2].value,
          },
          {
            name: "专科",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: arr[3].value,
          },
          {
            name: "高中",
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
    initChart17() {
      let myChart = this.$echarts.init(document.getElementById("chart17"));
      let arr = [];
      this.chart17.forEach((element) => {
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
          top: "20%",
          bottom: "10%",
          left: "31%",
          // containLabel: true,
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
            "Web前端开发工程师",
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
            name: "博士",
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
            name: "硕士",
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
            name: "本科",
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
            name: "专科",
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
            name: "高中",
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
    initChart14() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option4.xAxis.data.push(this.plan_table[i].mouth);
        //大修金额总计
        this.option4.series[0].data.push(this.plan_table[i].a);
        //中修金额
        this.option4.series[1].data.push(this.plan_table[i].b);
        //预防性养护金额合计
        this.option4.series[2].data.push(this.plan_table[i].c);
        //金额总计
        this.option4.series[3].data.push(this.plan_table[i].d);
        //Y轴最大值的设置：向上取整并家500
        this.option4.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
    },
    initChart12() {
      var myChart = echarts.init(document.getElementById("chart12"));
      myChart.setOption({
        grid: {
          height: "75%",
          width: "85%",
          top: "15%",
          right: "5%",
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          data: this.chart12.xdata,
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
            data: this.chart12.ydata,
            type: "bar",
            itemStyle: {
              normal: {
                color: "rgb(115, 215, 228)",
              },
            },
          },
        ],
      });
    },
    // handleResize() {
    //   this.myChart5 && this.myChart5.resize();
    // },
    initChart15() {
      var myChart = echarts.init(document.getElementById("chart15"));
      let arr = [];
      this.chart15.forEach((element) => {
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
              { text: "上市公司" },
              { text: "国企" },
              { text: "创业公司" },
              { text: "合资" },
            ],
            center: ["50%", "60%"],
            radius: 70,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            axisName: {
              // formatter: {[value]},
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

    initChart16() {
      var myChart = echarts.init(document.getElementById("chart16"));
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
      const days = ["博士", "硕士", "本科", "专科", "高中"];

      // prettier-ignore
      const data = [[0,0,2],[0,1,3],[0,2,2],[0,3,1],[0,4,1],[0,5,1],[0,6,1],[0,7,1],[0,8,1],[0,9,1],[0,10,1],[0,11,2],[0,12,1],[0,13,1],[0,14,1],[0,15,2],[0,16,1],[0,17,1],[0,18,1],[0,19,1],[0,20,1],[0,21,1],[0,22,2],[0,23,1],[1,0,7],[1,1,6],[1,2,8],[1,3,5],[1,4,8],[1,5,6],[1,6,7],[1,7,8],[1,8,5],[1,9,7],[1,10,7],[1,11,5],[1,12,6],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,10],[1,20,5],[1,21,5],[1,22,7],[1,23,8],[2,0,81],[2,1,89],[2,2,42],[2,3,56],[2,4,58],[2,5,77],[2,6,65],[2,7,52],[2,8,56],[2,9,58],[2,10,75],[2,11,65],[2,12,44],[2,13,54],[2,14,58],[2,15,62],[2,16,65],[2,17,59],[2,18,57],[2,19,65],[2,20,71],[2,21,54],[2,22,52],[2,23,48],[3,0,57],[3,1,53],[3,2,50],[3,3,60],[3,4,50],[3,5,50],[3,6,60],[3,7,50],[3,8,51],[3,9,50],[3,10,55],[3,11,54],[3,12,57],[3,13,54],[3,14,53],[3,15,52],[3,16,59],[3,17,65],[3,18,65],[3,19,60],[3,20,56],[3,21,54],[3,22,54],[3,23,61],[4,0,2],[4,1,3],[4,2,0],[4,3,2],[4,4,1],[4,5,1],[4,6,1],[4,7,0],[4,8,1],[4,9,2],[4,10,1],[4,11,2],[4,12,2],[4,13,2],[4,14,1],[4,15,1],[4,16,1],[4,17,1],[4,18,2],[4,19,2],[4,20,2],[4,21,1],[4,22,2],[4,23,0],]
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
#education {
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
.map {
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
</style>
