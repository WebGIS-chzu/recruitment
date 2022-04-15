<template>
  <div id="salary">
    <div id="map" />
    <div class="left">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>城市平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart1"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>职位平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart2"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>公司类型平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart3"></div>
      </div>
    </div>
    <div class="main">
      <div class="col-content">
        <div class="row2title">
          <div class="imgBK"></div>
          <span>热门职位平均薪资月变化</span>
        </div>
        <div class="row1chartcontent" id="chart4" ref="Chart4"></div>
      </div>
    </div>
    <div class="right">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>区县平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart5"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>薪资区间词云</span>
        </div>
        <div class="row1chartcontent" id="chart6" ref="cloudEl"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>行业平均薪资统计</span>
        </div>
        <div class="row1chartcontent" id="chart7"></div>
      </div>
    </div>
  </div>
</template>
<script>
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
import request from "@/utils/request";
export default {
  name: "salary",
  components: {
    wordcloud,
  },
  data() {
    return {
      chart5: {
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
      // option: {
      //   tooltip: {
      //     trigger: "axis",
      //     formatter: (params) => {
      //       return (
      //         params[0].seriesName +
      //         ": " +
      //         params[0].data +
      //         "<br>" +
      //         params[1].seriesName +
      //         ": " +
      //         params[1].data +
      //         "%"
      //       );
      //     },
      //   },
      //   legend: {
      //     data: ["城市形象", "全国平均水平"],
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [
      //         "交通",
      //         "住宿",
      //         "地理位置",
      //         "旅行体验",
      //         "景区环境",
      //         "景区设施",
      //         "服务",
      //         "饮食",
      //       ],
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       splitLine: { show: false },
      //       type: "value",
      //       name: "数量",
      //       interval: 50,
      //       axisLabel: {
      //         formatter: "{value} ",
      //       },
      //     },
      //   ],
      //   series: [
      //     {
      //       name: "城市形象",
      //       type: "bar",
      //       /*设置柱状图颜色*/
      //       itemStyle: {
      //         normal: {
      //           color: function (params) {
      //             // build a color map as your need.
      //             var colorList = [
      //               "#fe4f4f",
      //               "#fead33",
      //               "#feca2b",
      //               "#fef728",
      //               "#c5ee4a",
      //               "#87ee4a",
      //               "#46eda9",
      //               "#47e4ed",
      //               "#4bbbee",
      //               "#7646d8",
      //               "#924ae2",
      //               "#C6E579",
      //               "#F4E001",
      //               "#F0805A",
      //               "#26C0C0",
      //             ];
      //             return colorList[params.dataIndex];
      //           },
      //           /*信息显示方式*/
      //           label: {
      //             show: true,
      //             position: "top",
      //             formatter: "{b}\n{c}",
      //           },
      //         },
      //       },
      //       data: [0.28, 0.278, 0.478, 0.637, 0.669, 0.369, 0.547, 0.372],
      //     },
      //     {
      //       name: "全国平均水平",
      //       yAxisIndex: 0, //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
      //       type: "line",
      //       itemStyle: {
      //         /*设置折线颜色*/
      //         normal: {
      //           // color:'#c4cddc'
      //         },
      //       },
      //       data: [0.193, 0.178, 0.512, 0.683, 0.721, 0.358, 0.432, 0.498],
      //     },
      //   ],
      // },
      option4: {
        // title: {
        //   x: "150", // 水平安放位置，默认为左对齐，可选为：
        //   // 'center' ¦ 'left' ¦ 'right'
        //   // ¦ {number}（x坐标，单位px）
        //   y: "top",
        //   //textAlign: null
        //   backgroundColor: "rgba(0,0,0,0)",
        //   borderColor: "#ccc", // 标题边框颜色
        //   borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
        //   padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
        //   itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
        //   textStyle: {
        //     fontSize: 18,
        //     fontWeight: "bolder",
        //     color: "#ff6666", // 主标题文字颜色
        //   },
        //   text: "全省大中修资金统计",
        // },
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
          y: "30",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#1e90ff", // 图例文字颜色
          },
          data: ["大修金额", "中修沥青砼金额", "预防性养护金额", "金额总计"],
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
            name: "单位:万元",
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
          x2: 30,
          y2: 30,
        },
        series: [
          {
            type: "line",
            name: "大修金额",
            data: [],
          },
          {
            type: "line",
            name: "中修沥青砼金额",
            data: [],
          },
          {
            type: "line",
            name: "预防性养护金额",
            data: [],
          },
          {
            type: "line",
            name: "金额总计",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          xxx: "1",
          d: "200",
          z: "300",
          y: "400",
          sum: "500",
        },
        {
          xxx: "2",
          d: "100",
          z: "400",
          y: "50",
          sum: "500",
        },
        {
          xxx: "3",
          d: "150",
          z: "410",
          y: "250",
          sum: "500",
        },
        {
          xxx: "4",
          d: "200",
          z: "450",
          y: "350",
          sum: "500",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.fetchData();
    this.initmap();
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    this.initChart1();
    this.initChart2();
    this.typeData();
    this.initChart4();
    let myChart4 = this.$echarts.init(this.$refs.Chart4);
    myChart4.setOption(this.option4);

    this.initChart7();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
  },
  methods: {
    fetchData() {
      request.post("/api/data/querySa", { city: "北京" }).then((res) => {
        // console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          this.chart5.xdata[i] = res.data[i].region;
          this.chart5.ydata[i] = res.data[i].avgsalary;
          // console.log(this.chart5.xdata[i]);
        }
        this.initChart5();
      });
    },
    typeData() {
      request.post("/api/data/typeSa", { city: "上海" }).then((res) => {
        this.chart3 = res.data;
        // console.log(this.chart3);
        this.initChart3();
      });
    },
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
    initChart1() {
      var myChart = echarts.init(document.getElementById("chart1"));
      myChart.setOption({
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: ["深圳", "广州", "成都", "南昌", "宁波", "上海", "南京"],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        legend: {
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
        },
        color: "#1BFEFE",
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      });
    },
    initChart3() {
      var myChart = echarts.init(document.getElementById("chart3"));
      let arr = [];
      this.chart3.forEach((element)=>{
        arr.push({value: element.salary,
        name:element.name,})
      })
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "right",
          top: "top",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "Radius Mode",
            type: "pie",
            radius: [20, 80],
            center: ["50%", "57%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: arr,
          },
        ],
      });
    },
    initChart2() {
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      myChart.setOption({
        title: {
          text: "      职位平均薪资占比排行中,最高为数据库管理员,最低为助理规划师",
          textStyle: {
            color: "rgba(255, 255, 255, .8)",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
        },
        grid: {
          top: "25%", //距上边距
          left: "15%", //距离左边距
          right: "55%", //距离右边距
          bottom: "20%", //距离下边距
        },
        calculable: false,
        series: [
          {
            name: "矩形图",
            type: "treemap",
            radius: "85%",
            center: ["50%", "50%"],
            breadcrumb: false, //矩形图下的提示显示与否
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}:{c}%",
                  fontSize: 10,
                },
                borderWidth: 0,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: [
              {
                name: "数据库管理员",
                value: 9.06,
              },
              {
                name: "前端开发工程师",
                value: 7.74,
              },
              {
                name: "微博",
                value: 7.25,
              },
              {
                name: "病例",
                value: 6.95,
              },
              {
                name: "新冠",
                value: 6.88,
              },
              {
                name: "确诊",
                value: 6.59,
              },
              {
                name: "武汉",
                value: 5.2,
              },
              {
                name: "视频",
                value: 4.86,
              },
              {
                name: "冠状病毒",
                value: 4.34,
              },
              {
                name: "口罩",
                value: 4.28,
              },
              {
                name: "新型",
                value: 3.49,
              },
              {
                name: "患者",
                value: 3.05,
              },
              {
                name: "防控",
                value: 2.92,
              },
              {
                name: "感染",
                value: 2.81,
              },
              {
                name: "医院",
                value: 2.73,
              },
              {
                name: "新增",
                value: 2.43,
              },
              {
                name: "隔离",
                value: 2.19,
              },
              {
                name: "出院",
                value: 2.17,
              },
              {
                name: "湖北",
                value: 2.1,
              },
              {
                name: "病毒",
                value: 1.79,
              },
              {
                name: "累计",
                value: 1.79,
              },
              {
                name: "加油",
                value: 1.6,
              },
              {
                name: "哈哈哈",
                value: 1.53,
              },
              {
                name: "韩国",
                value: 1.39,
              },
              {
                name: "医护人员",
                value: 1.35,
              },
              {
                name: "治愈",
                value: 1.3,
              },
              {
                name: "人员",
                value: 1.28,
              },
              {
                name: "死亡",
                value: 1.23,
              },
              {
                name: "投票",
                value: 1.2,
              },
              {
                name: "武汉市",
                value: 1.19,
              },
              {
                name: "工作",
                value: 1.18,
              },
              {
                name: "科比",
                value: 1.39,
              },
              {
                name: "复工",
                value: 1.17,
              },
              {
                name: "密切接触者",
                value: 1.16,
              },
              {
                name: "抗疫",
                value: 1.15,
              },
              {
                name: "疑似病例",
                value: 1.14,
              },
              {
                name: "中国",
                value: 1.23,
              },
              {
                name: "防疫",
                value: 1.13,
              },
              {
                name: "治疗",
                value: 1.12,
              },
              {
                name: "检测",
                value: 1.1,
              },
              {
                name: "目前",
                value: 1.09,
              },
              {
                name: "物资",
                value: 1.08,
              },
              {
                name: "医学观察",
                value: 1.07,
              },
              {
                name: "例新冠状",
                value: 1.06,
              },
              {
                name: "发热",
                value: 1.05,
              },
              {
                name: "时间",
                value: 1.04,
              },
              {
                name: "大家",
                value: 1.03,
              },
              {
                name: "一线工作者",
                value: 1.02,
              },
              {
                name: "央视",
                value: 1.01,
              },
              {
                name: "医疗",
                value: 1.0,
              },
              {
                name: "在家",
                value: 0.98,
              },
              {
                name: "开学",
                value: 0.96,
              },
              {
                name: "放舱",
                value: 0.95,
              },
              {
                name: "救治",
                value: 0.94,
              },
              {
                name: "战役",
                value: 0.92,
              },
              {
                name: "核酸检测",
                value: 0.91,
              },
              {
                name: "卫健委",
                value: 0.88,
              },
              {
                name: "火神山",
                value: 0.87,
              },
              {
                name: "美国",
                value: 0.86,
              },
              {
                name: "消毒",
                value: 0.85,
              },
              {
                name: "乘客",
                value: 0.84,
              },
              {
                name: "留学生",
                value: 0.83,
              },
              {
                name: "英雄回归",
                value: 0.82,
              },
              {
                name: "境外输入",
                value: 0.8,
              },
              {
                name: "塞尔维亚",
                value: 0.79,
              },
              {
                name: "马云",
                value: 0.78,
              },
              {
                name: "大学生返校",
                value: 0.76,
              },
              {
                name: "高三",
                value: 0.75,
              },
              {
                name: "高考",
                value: 0.74,
              },
              {
                name: "高考延期",
                value: 0.73,
              },
              {
                name: "高三开学",
                value: 0.72,
              },
              {
                name: "初三",
                value: 0.71,
              },
              {
                name: "小学",
                value: 0.68,
              },
              {
                name: "李兰娟",
                value: 0.65,
              },
              {
                name: "钟南山",
                value: 0.64,
              },
              {
                name: "拐点",
                value: 0.63,
              },
              {
                name: "疫情",
                value: 0.62,
              },
              {
                name: "地图",
                value: 0.61,
              },
              {
                name: "舆情",
                value: 0.6,
              },
              {
                name: "脱贫",
                value: 0.59,
              },
              {
                name: "江苏",
                value: 0.58,
              },
              {
                name: "安徽",
                value: 0.57,
              },
              {
                name: "电影",
                value: 0.56,
              },
              {
                name: "隔离",
                value: 0.55,
              },
              {
                name: "意大利",
                value: 0.54,
              },
              {
                name: "塞尔维亚",
                value: 0.53,
              },
              {
                name: "英国",
                value: 0.52,
              },
              {
                name: "退税",
                value: 0.51,
              },
              {
                name: "大学生开学",
                value: 0.5,
              },
              {
                name: "英国首相",
                value: 0.49,
              },
              {
                name: "日本",
                value: 0.48,
              },
              {
                name: "韩国",
                value: 0.47,
              },
              {
                name: "西藏",
                value: 0.46,
              },
              {
                name: "南京开学",
                value: 0.45,
              },
              {
                name: "宿管阿姨",
                value: 0.44,
              },
            ],
          },
        ],
      });
    },
    initChart4() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option4.xAxis.data.push(this.plan_table[i].xxx);
        //大修金额总计
        this.option4.series[0].data.push(this.plan_table[i].d);
        //中修金额
        this.option4.series[1].data.push(this.plan_table[i].z);
        //预防性养护金额合计
        this.option4.series[2].data.push(this.plan_table[i].y);
        //金额总计
        this.option4.series[3].data.push(this.plan_table[i].sum);
        //Y轴最大值的设置：向上取整并家500
        this.option4.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
    },
    // initChart5() {
    //   this.myChart5 = this.$echarts.init(document.getElementById("chart5"));
    //   // 指定图表的配置项和数据
    //   let option = this.option;
    //   // 使用刚指定的配置项和数据显示图表。
    //   this.myChart5.setOption(option);
    // },
    initChart5() {
      var myChart = echarts.init(document.getElementById("chart5"));
      myChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          data: this.chart5.xdata,
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            data: this.chart5.ydata,
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
    //   this.myChart5 && this.myChart5.resize();
    // },
    wordCloudInti(wrapEl, data) {
      let myChart = echarts.init(wrapEl);
      var option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            name: "热词",
            type: "wordCloud",
            sizeRange: [10, 35],
            rotationRange: [-20, 20],
            shape: "circle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            gridSize: 7,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 4,
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
    initChart7() {
      var myChart = echarts.init(document.getElementById("chart7"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 1,
              
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
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
#salary {
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
// /deep/.mapboxgl-ctrl-attrib-inner{
//   a{
//     color: transparent;
//   }
// }
</style>
