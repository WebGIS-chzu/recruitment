<template>
  <div class="mate">
    <div class="left">
      <div class="hd">
        <span>岗位技能匹配关系图</span>
      </div>
      <div class="Chart1" id="chart1"></div>
    </div>
    <div class="right">
      <div class="pt pt1">
        <div class="hd">
          <span>热门技能极差图</span>
        </div>
        <div id="chart2"></div>
      </div>
      <div class="main">
        <div class="pt pt2">
          <div class="hd">
            <span>城市-技能雷达图</span>
          </div>
          <div id="chart3"></div>
        </div>
        <div class="pt pt3">
          <div class="hd">
            <span>热门技能词云</span>
          </div>
          <div id="chart4" ref="cloudEl"></div>
        </div>
      </div>
      <div class="pt pt4">
        <div class="hd">
          <span>热门技能月变化图</span>
        </div>
        <div
          id="chart5"
          ref="Chart5"
          :style="{ width: '100%', height: '100%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// const mapboxgl = require("mapbox-gl");
import echarts from "echarts";
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
// import 'echarts/theme/macarons.js';
// import 'echarts-wordcloud/dist/echarts-wordcloud.js';
// import 'echarts-wordcloud/dist/echarts-wordcloud.min.js';
// import 'jquery/dist/jquery.min.js';
// let echarts = require("echarts/lib/echarts");
// require("echarts/lib/chart/graph");
// require("echarts/lib/component/force");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");
export default {
  name: "mate",
  components: {
    wordcloud,
  },
  data() {
    return {
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
      option5: {
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
  mounted() {
    this.showct1();
    this.showct2();
    this.showct3();
    this.showct4();
    this.initChart5();
    let myChart5 = this.$echarts.init(this.$refs.Chart5);
    myChart5.setOption(this.option5);
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    // this.fetchData1(1);
    // this.fetchData2(1);
    // this.loadList();
    // this.initmap();

    //自适应
    // myChart.setOption(option);
    // window.addEventListener("resize", function () {
    //   myChart.resize();
    // });
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f6981a4;color:#FFF;";
    },

    // fetchData1(ct1) {
    //   var code = JSON.stringify(ct1);
    //   console.log(code);
    //   request.post("/api//data/salaryRe", { code }).then((res) => {
    //     this.chartdata1 = res.data[ct1 - 1];
    //     console.log(res.data[ct1 - 1]);
    //     //解决 echarts动态渲染数据图形不生效问题:获取数据但不渲染，执行下一个循环才将数据渲染进echarts
    //     this.$nextTick(() => {
    //       this.showct1();
    //     });
    //   });
    // },
    // showct5() {
    //   let myChart = this.$echarts.init(this.$refs.Chart5);
    //   // let myChart5 = this.$echarts.init(document.getElementById("chart5"));
    //   myChart.setOption(this.option5);
    // },
    initChart5() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option5.xAxis.data.push(this.plan_table[i].xxx);
        //大修金额总计
        this.option5.series[0].data.push(this.plan_table[i].d);
        //中修金额
        this.option5.series[1].data.push(this.plan_table[i].z);
        //预防性养护金额合计
        this.option5.series[2].data.push(this.plan_table[i].y);
        //金额总计
        this.option5.series[3].data.push(this.plan_table[i].sum);
        //Y轴最大值的设置：向上取整并家500
        this.option5.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
    },
    showct2() {
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      myChart.setOption({
        title: {
          text: "    总评率随热词分布中,最高为肺炎,最低为症状",
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
                name: "肺炎",
                value: 9.06,
              },
              {
                name: "疫情",
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
    showct3() {
      var myChart = echarts.init(document.getElementById("chart3"));
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
              { text: "北京" },
              { text: "上海" },
              { text: "杭州" },
              { text: "深圳" },
              { text: "苏州" },
            ],
            center: ["55%", "60%"],
            radius: 50,
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
            data: [
              {
                value: [100, 8, 0.4, -80, 2000],
                name: "VUE",
              },
              {
                value: [60, 5, 0.3, -100, 1500],
                name: "AE开发",
                areaStyle: {
                  // color: "rgba(255, 228, 52, 0.6)",
                },
              },
              {
                value: [80, 6, 0.8, -10, 1800],
                name: "JS",
                areaStyle: {
                  // color: "rgba(255, 228, 52, 0.6)",
                },
              },
              {
                value: [60, 5, 0.3, -100, 1500],
                name: "三维GIS",
                areaStyle: {
                  // color: "rgba(255, 228, 52, 0.6)",
                },
              },
            ],
          },
        ],
      });
    },
    showct4() {
      // 绘制图表
      // var myChart = echarts.init(document.getElementById("chart4"));
      // myChart.setOption({
      //   tooltip: {
      //     trigger: "axis", //鼠标经过提示
      //     formatter: "{b0}:{c0}万", //单位
      //   },
      //   legend: {
      //     icon: "roundRect", //icon为圆角矩形
      //     data: ["样例1", "样例2", "样例3"],
      //     textStyle: {
      //       //图例文字的样式
      //       color: "#fff",
      //       fontSize: 16,
      //     },
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: [
      //       "无需",
      //       "在校/应届",
      //       "1年",
      //       "2年",
      //       "3-4年",
      //       "5-7年",
      //       "8-9年",
      //       "10年以上",
      //     ],
      //     axisLabel: {
      //       interval: 0,
      //     },
      //     axisLine: {
      //       //x轴文字颜色
      //       lineStyle: {
      //         color: "rgba(255, 255, 255, 0.5)",
      //       },
      //     },
      //   },
      //   yAxis: {
      //     type: "value",
      //     name: "单位：个",
      //     //坐标轴范围
      //     boundaryGap: ["0", "0.1"],
      //     axisLine: {
      //       //轴文字颜色
      //       lineStyle: {
      //         color: "rgba(255, 255, 255, 0.5)",
      //       },
      //     },
      //     //y轴刻度横线
      //     splitLine: {
      //       show: false,
      //     },
      //   },
      //   grid: {
      //     x: 50,
      //     y: 30,
      //     x2: 30,
      //     y2: 40,
      //   },
      //   series: [
      //     {
      //       type: "line",
      //       showBackground: true,
      //       // data: this.chartdata1,
      //       data: [820, 932, 901, 934, 1290, 1330, 1320, 2000],
      //       backgroundStyle: {
      //         color: "rgba(180, 180, 180, 0.1)",
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //             { offset: 0.2, color: "#44C0C1" },
      //             { offset: 1, color: "#1BFEFE" },
      //           ]),
      //         },
      //       },
      //       areaStyle: {
      //         normal: {
      //           //右，下，左，上
      //           color: new echarts.graphic.LinearGradient(
      //             0,
      //             0,
      //             0,
      //             1,
      //             [
      //               {
      //                 offset: 0,
      //                 color: "#1BFEFE",
      //               },
      //               {
      //                 offset: 1,
      //                 color: "rgba(207, 247, 255, 0.3)",
      //               },
      //             ],
      //             false
      //           ),
      //         },
      //       },
      //     },
      //   ],
      // });
    },
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
    showct1() {
      let myChart = echarts.init(document.getElementById("chart1"));
      var baseName = "网络招聘";
      var option;
      var chartData = {
        WebGIS工程师: [
          "算 法",
          "hadoop",
          "编程语言",
          "WebGIS",
          "C/C++",
          "gis",
          "HTML/CSS",
          "JS",
          "数据库",
          "ArcGIS API for JS",
          "ArcSDE",
          "Vue",
          ".net",
          "Bootstrap",
          "leaflet",
          "Java",
          "MapBox",
          "遥感",
          "JQuery",
          "SpringBoot",
          "JSP",
          "React",
          "SuperMap",
          "文档撰写",
          "沟通合作",
          "LayUI",
          "EasyUI",
          "CesiumJS",
          "发散思维",
          "Android/IOS",
          "解决方案",
          "Skyline",
          "熟悉软件使用",
        ],
        GIS开发工程师: [
          "算法研究",
          "JavaScript",
          "前端框架",
          "数据库技术",
          "HTML/CSS(3)/JS",
          "QT",
          "PHP",
          "jsp",
          "Android",
          "SQL",
          "ArcGIS",
          "ArcMap",
          "JavaEE",
          "CASS",
          "AutoCAD",
          "二次开发",
          "OpenLayers",
          "地图前端",
          "ENVI",
          "遥感技术",
          "QGIS",
          ".net/C#",
          "PostGIS",
          "Cesium",
          "Oracle",
          "MySQL",
          "MapGIS",
          "软件开发能力",
          "技术方案",
          "Spring框架技术",
          "ArcGIS Server",
          "GeoServer",
          "mapbox",
          "Leaflet",
          "GIS软件",
        ],
        "C++研发工程师": [
          "算法开发",
          "C++编程",
          "底层开发",
          "javascript",
          "webgis",
          "地理信息系统",
          "oracle",
          "mysql",
          "osg",
          "openGL",
          "Windows/Linux",
          "OGRE",
          "CAD",
          "arcgis系列产品",
          "gdal",
          "GIS软件使用能力",
          "主流前端技术",
          "vue/react/angular",
          "SQL server/MySQL/Oracle/mongoDB",
          "数据处理技术",
        ],
        Java开发工程师: [
          "java/javaEE",
          "GIS/地理信息",
          "DataBase技术",
          "MyBatis",
          "SpringMVC/SpringBoot",
          "bootstrap",
          "android/ios",
          "windows/Linux",
          "opengl",
          "html/CSS/js",
          "VS Code",
          "Jsp",
          "sql Server",
          "ORACLE",
          "MYSQL",
          "mongoDB",
          "TomCAT",
          "VUE",
          "argis/arcmap/arcserver/arcpy",
          "arcgis api",
          "开发技术强",
          "数据处理能力",
        ],
        测绘工程师: [
          "测量仪器",
          "数据处理",
          "地图制图",
          "cad",
          "ArcGIS/ArcMap/...",
          "规划",
          "外业",
          "工作认真,吃苦耐劳",
          "PS",
          "Cass",
          "数据入库",
          "经纬仪",
          "全站仪",
          "摄影测量",
          "航测",
          "土地资源管理",
          "地信",
          "Office",
          "遥 感",
          "RTK",
        ],
        三维GIS开发: [
          "三维GIS",
          "ArcGIS API开发",
          "cesium",
          "WebGL",
          "Echarts",
          "html",
          "css(3)",
          "Js",
          "Geoserver",
          "jquery",
          "算法",
          "Leafletjs",
          "ORACLE/MYSQL",
          "sql server/mongoDB/...",
          "软件应用与开发",
          "AE开发",
          "数据处理与入库",
        ],
        大数据分析: [
          "云计算/Hadoop",
          "数 据 库",
          "Spark",
          "Redis",
          "数据分析",
          " webgl",
          "git",
          "TensorFlow",
          "可视化",
          "postgresql",
        ],
        GIS制图: [
          "熟练地图前端",
          "三维",
          "arcgis api4.x",
          "arcmap",
          "supermap",
          "mapgis",
          "专题制图",
          "ArcGIS Pro",
          "ArcPy",
          "autocad",
          "前端",
          " Photoshop",
          "Erdas",
          "envi",
          "测量",
          "Qgis",
        ],
        GIS数据处理: [
          "gis软件",
          "python",
          "envi/erdas/遥感解译",
          "mapgis/qgis",
          "hadoop/spark",
          "数据库应用",
          "细心与效率",
        ],
        遥感工程师: [
          "遥感/遥感解译",
          "Envi",
          "ERDAS",
          "Arcmap",
          "qgis/mapgis",
          "摄影测量/航测",
          "数据编辑与处理",
          "arcpy",
          "Supermap",
          "JS API for ArcGIS",
          "IDL",
          "C++",
        ],
      };
      var datas = [
        {
          name: baseName || "",
          draggable: true,
        },
      ];
      var lines = [];
      var categoryIdx = 0;
      var keyIndex = 0;
      var dataIndex = 0;
      $.each(chartData, function (key, values) {
        keyIndex = dataIndex;
        datas.push({
          name: key,
          category: categoryIdx,
          draggable: true,
        });
        keyIndex++;
        dataIndex++;
        lines.push({
          source: 0,
          target: keyIndex,
          value: "",
        });
        $(values).each(function (idx, val) {
          datas.push({
            name: val,
            category: categoryIdx,
            draggable: true,
          });
          dataIndex++;
          lines.push({
            source: keyIndex,
            target: dataIndex,
            value: "",
          });
        });
        categoryIdx++;
      });
      var option = {
        // title: {
        //   // text: "岗位技能匹配关系图",
        //   left: "center",
        //   top: "2.5%",
        //   textStyle: { fontSize: 25 },
        // },
        tooltip: {},
        animationDurationUpdate: 2500,
        label: { normal: { show: true, textStyle: { fontSize: 12 } } },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 35,
            legendHoverLink: true,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: { fontSize: 12 },
              },
            },
            legend: { tooltip: { show: true } },
            force: { repulsion: 65 },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: { fontSize: 10 },
                formatter: "{c}",
              },
            },
            categories: [
              { value: 10, itemStyle: { normal: { color: "#0087cb" } } },
              { itemStyle: { normal: { color: "#0055ff" } } },
              { itemStyle: { normal: { color: "#74af96" } } },
              { itemStyle: { normal: { color: "#ff55ff" } } },
              { itemStyle: { normal: { color: "#e26691" } } },
              { itemStyle: { normal: { color: "#004e66" } } },
              { itemStyle: { normal: { color: "#587498" } } },
              { itemStyle: { normal: { color: "#3DC7BE" } } },
              { itemStyle: { normal: { color: "#ffaa7f" } } },
              { itemStyle: { normal: { color: "#80bd9e" } } },
            ],
            data: datas,
            links: lines,
            lineStyle: { normal: { opacity: 0.9, width: 1, curveness: 0 } },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.mate {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .left {
    // position: absolute;
    // top: 0px;
    // margin-left: 3%;
    height: 92%;
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 0.2% 1% 0% 3%;
    .hd {
      display: flex;
      width: 42%;
      margin: 0px 0px 10px 5px;
      height: 28px;
      background: url(../../assets/img/pt/pt_title.png) no-repeat;
      background-size: 11% 45%;
      background-position: 0% 50%;
      span {
        margin-left: 12%;
        line-height: 30px;
        font-size: 18px;
        color: #fff;
      }
    }
    #chart1 {
      width: 100%;
      height: calc(100% - 40px);
    }
  }
}
#chart2 {
  width: 100%;
  height: calc(100% - 24px);
}
#chart3 {
  width: 100%;
  height: calc(100% - 24px);
}
#chart4 {
  width: 100%;
  height: calc(100% - 24px);
}
#chart5 {
  width: 100%;
  height: calc(100% - 24px);
}
.right {
  height: 93%;
  width: 40%;
  float: left;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    flex: 1;
    float: left;
    .hd {
      background-size: 20% 50%;
      span {
        margin-left: 22%;
      }
    }
    .pt2 {
      flex: 1;
      height: 100%;
      width: 100%;
    }
    .pt3 {
      flex: 1;
    }
  }
  .pt1 {
    flex: 1;
  }
  .pt4 {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
.pt {
  width: 100%;
  height: 100%;
  // background: url(../../assets/img/pt/ptbg.png) no-repeat;
  background-size: 100% 100%;
  .hd {
    display: flex;
    width: 75%;
    margin: 0.5%;
    background: url(../../assets/img/pt/pt_title.png) no-repeat;
    background-size: 10% 50%;
    background-position: 0% 50%;
    span {
      margin-left: 11%;
      // line-height: 30px;
      font-size: 18px;
      color: #fff;
      // text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #38e9e0,
      //   0 0 70px #0cf3f3;
    }
  }
}
</style>