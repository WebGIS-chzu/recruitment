<template>
  <div id="vocation">
    <!-- <iframe
      src="./static/cluster.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe> -->
    <!-- <div id="map" /> -->
    <div class="left">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>招聘数据总览</span>
        </div>
        <div class="countdata">
          <div class="datasource">
            <div class="leftpt">数据源:</div>
            <div class="rightpt">
              <el-checkbox v-model="checked">前程无忧</el-checkbox>
              <el-checkbox v-model="checked1">智联招聘</el-checkbox>
              <el-checkbox v-model="checked2">英才网</el-checkbox>
            </div>
          </div>
          <div class="count">
            <div class="total">
              <div class="title">招聘数</div>
              <div class="d"><span>15711</span></div>
            </div>
            <div class="company">
              <div class="title">公司数</div>
              <div class="d"><span>10212</span></div>
            </div>
            <div class="position">
              <div class="title">职位数</div>
              <div class="d"><span>10005</span></div>
            </div>
          </div>
          <div v-show="timedisplay" class="time">
            <div class="title">时间范围:</div>
            <el-row>
              <el-col :span="12">
                <el-date-picker
                  v-model="json.STime"
                  type="date"
                  placeholder="选择开始日期"
                  :picker-options="STime"
                />
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="json.ETime"
                  type="date"
                  placeholder="选择结束日期"
                  :picker-options="ETime"
                />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>全国热门职位统计</span>
        </div>
        <div class="row1chartcontent" id="chart3"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>职位综合能力词云</span>
        </div>
        <div class="row1chartcontent">
          <word3D
            :height="word3Dheight"
            :width="word3Dwidth"
            :data="wordcloudchina"
          >
          </word3D>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- <div class="map">-->
      <div class="col-content">
        <div class="row2title">
          <div class="imgBK"></div>
          <span>城市热门职位月变化</span>
        </div>
        <div class="row1chartcontent" id="chart4" ref="Chart4"></div>
      </div>
    </div>
    <div class="right">
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>公司类型职位统计</span>
        </div>
        <div class="row1chartcontent" id="chart5"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>城市热门职位统计</span>
        </div>
        <div class="row1chartcontent" id="chart6"></div>
      </div>
      <div class="col-content">
        <div class="row1title">
          <div class="imgBK"></div>
          <span>行业职位统计</span>
        </div>
        <div class="row1chartcontent" id="chart7"></div>
      </div>
    </div>
    <selectRegion />
    <mapcom />
    <!-- <wordcloud3D /> -->
  </div>
</template>

<script>
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
import request from "@/utils/request";
// const mapboxgl = require("mapbox-gl");
import SelectRegion from "../../components/cityselect/newselectRegion.vue";
import word3D from "../../components/wordcloud3D.vue";
import mapcom from "../../components/mapcom.vue";
import eventBum from "../../components/cityselect/EvebtBus";
export default {
  name: "vocation",
  components: {
    wordcloud,
    SelectRegion,
    mapcom,
    word3D,
  },
  data() {
    return {
      json: {
        STime: new Date("2021-10-31"),
        ETime: new Date("2022-03-31"),
        space: "",
        Type: "",
        c: 0,
      },
      checked: true,
      checked1: true,
      checked2: true,
      timedisplay: true,
      STime: {
        disabledDate: (time) => {
          if (this.json.ETime !== "") {
            return (
              time.getTime() < new Date("2021-01-01") ||
              time.getTime() > this.json.ETime
            );
          } else {
            return time.getTime() < new Date("2021-01-01");
          }
        },
      },
      ETime: {
        disabledDate: (time) => {
          return (
            time.getTime() < this.json.STime ||
            time.getTime() < new Date("2021-01-01") ||
            time.getTime() > new Date("2022-04-31")
          );
        },
      },
      selectcity: {
        name: "中国",
        level: 0,
      },
      chart5: {
        xdata: [],
        ydata: [],
      },
      chart7: {
        xdata: [],
        ydata: [],
      },
      word3Dheight: 200,
      word3Dwidth: 300,
      wordcloudchina: [
        { value: 1800, name: "学习创新" },
        { value: 1500, name: "团体合作" },
        { value: 1200, name: "表达沟通" },
        { value: 1100, name: "独立工作" },
        { value: 1000, name: "执行" },
        { value: 850, name: "成品控制" },
        { value: 930, name: "技术教学" },
        { value: 710, name: "观察力" },
        { value: 700, name: "抗压" },
        { value: 643, name: "熟悉法律法规" },
        { value: 623, name: "善于深入思考" },
        { value: 600, name: "积极向上" },
        { value: 550, name: "乐于助人" },
        { value: 500, name: "发现问题" },
        { value: 490, name: "解决问题" },
        { value: 490, name: "好学" },
        { value: 430, name: "好相处" },
        { value: 430, name: "努力" },
        { value: 430, name: "善良" },
        { value: 380, name: "乐观" },
        { value: 380, name: "优秀" },
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
          data: [
            "前端开发工程师",
            "GIS开发工程师",
            "数据库开发工程师",
            "后端开发工程师",
          ],
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
            name: "前端开发工程师",
            data: [],
          },
          {
            type: "line",
            name: "GIS开发工程师",
            data: [],
          },
          {
            type: "line",
            name: "数据库开发工程师",
            data: [],
          },
          {
            type: "line",
            name: "后端开发工程师",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          mouth: "11",
          a: "394",
          b: "356",
          c: "300",
          d: "250",
          sum: "1000",
        },
        {
          mouth: "12",
          a: "548",
          b: "934",
          c: "400",
          d: "350",
          sum: "1000",
        },
        {
          mouth: "1",
          a: "413",
          b: "502",
          c: "310",
          d: "300",
          sum: "1000",
        },
        {
          mouth: "2",
          a: "829",
          b: "1274",
          c: "550",
          d: "450",
          sum: "1000",
        },
        {
          mouth: "3",
          a: "900",
          b: "1420",
          c: "500",
          d: "550",
          sum: "1000",
        },
      ],
    };
  },
  mounted() {
    // this.initmap();
    // this.initChart5();
    // this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    this.initChart3();
    this.initChart4();
    let myChart4 = this.$echarts.init(this.$refs.Chart4);
    myChart4.setOption(this.option4);
    // this.initChart1();
    this.initChart6();
    // this.initChart7();
    this.posData();
    eventBum.$on("json", (json) => {
      console.log(json);
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      if (this.selectcity.name == "南京市") {
        request.post("/api/data/posCount", { city: "南京" }).then((res) => {
          for (var i = 0; i < res.data.company.length; i++) {
            this.chart5.xdata[i] = res.data.company[i].name;
            this.chart5.ydata[i] = res.data.company[i].value;
          }
          for (var i = 0; i < res.data.industry.length; i++) {
            this.chart7.xdata[i] = res.data.industry[i].name;
            this.chart7.ydata[i] = res.data.industry[i].value;
          }
          this.initChart5();
          this.initChart7();
        });
      }
    });
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
  },
  methods: {
    // initmap() {
    // this.$mapboxgl.accessToken =
    //   "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
    // var map = new this.$mapboxgl.Map({
    //   container: "map",
    //   style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
    //   center: [105, 35],
    //   zoom: 3.5,
    // });
    // },
    // typeData() {
    //   request.post("/api/data/education", { city: "全国" }).then((res) => {
    //     this.chart3 = res.data.skill;
    //     this.chart5 = res.data.company;
    //     this.chart7 = res.data.job;
    //     console.log(this.chart3);
    //     this.initChart3();
    //     this.initChart5();
    //     this.initChart7();
    //   });
    // },
    posData() {
      request.post("/api/data/posCount", { city: "全国" }).then((res) => {
        for (var i = 0; i < res.data.company.length; i++) {
          this.chart5.xdata[i] = res.data.company[i].name;
          this.chart5.ydata[i] = res.data.company[i].value;
        }
        for (var i = 0; i < res.data.industry.length; i++) {
          this.chart7.xdata[i] = res.data.industry[i].name;
          this.chart7.ydata[i] = res.data.industry[i].value;
        }
        this.initChart5();
        this.initChart7();
      });
    },
    initChart7() {
      var myChart = echarts.init(document.getElementById("chart7"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "15%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.chart7.xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：个",
            scale: true,
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        axisLabel: {
          interval: 0,
          formatter: function (value) {
            // debugger;
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 2; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于3,
              for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.chart7.ydata,
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
    initChart3() {
      let myChart = this.$echarts.init(document.getElementById("chart3"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: [
            "前端开发工程师",
            "Web前端开发工程师",
            "数据库工程师",
            "GIS开发工程师",
            "后端开发工程师",
            "测绘工程师",
          ],
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              // debugger;
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 4; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            },
          },
        },
        grid: {
          top: "15%",
          left: "15%",
          right: "5%",
          bottom: "22%",
        },
        yAxis: {
          type: "value",
          name: "单位：个",
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
            data: [1926, 1589, 552, 221, 181, 358],
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
    initChart4() {
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
    // initChart1() {
    //   var myChart = echarts.init(document.getElementById("chart1"));
    //   myChart.setOption({
    //     grid: {
    //       height: "60%",
    //       width: "83%",
    //       top: "15%",
    //       right: "7%",
    //       left: "10%",
    //     },
    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //         },
    //       },
    //       axisLabel: {
    //         interval: 0,
    //         formatter: function (value) {
    // debugger;
    //           var ret = ""; //拼接加\n返回的类目项
    //           var maxLength = 4; //每项显示文字个数
    //           var valLength = value.length; //X轴类目项的文字个数
    //           var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
    //           if (rowN > 1) {
    //             //如果类目项的文字大于3,
    //             for (var i = 0; i < rowN; i++) {
    //               var temp = ""; //每次截取的字符串
    //               var start = i * maxLength; //开始截取的位置
    //               var end = start + maxLength; //结束截取的位置
    //               //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
    //               temp = value.substring(start, end) + "\n";
    //               ret += temp; //凭借最终的字符串
    //             }
    //             return ret;
    //           } else {
    //             return value;
    //           }
    //         },
    //       },
    //       data: [
    //         "前端开发工程师",
    //         "Web前端开发工程师",
    //         "数据库工程师",
    //         "GIS开发工程师",
    //         "测绘工程师",
    //         "后端开发工程师",
    //       ],
    //     },
    //     yAxis: {
    //       type: "value",
    //       name:"单位：个",
    //       splitLine: { show: false },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //         },
    //       },
    //     },
    //     // dataZoom: [
    //     //   {
    //     //     show: true,
    //     //     realtime: true,
    //     //     height: 24, //这里可以设置dataZoom的尺寸
    //     //     bottom: 8, //滚动体距离底部的距离
    //     //     start: 0, //初始化时，滑动条宽度开始标度
    //     //     end: 50, //初始化时，滑动条宽度结束标度
    //     //   },
    //     //   {
    //     //     type: "inside", //内置滑动，随鼠标滚轮展示
    //     //     realtime: true,
    //     //     start: 0,
    //     //     end: 50,
    //     //   },
    //     // ],

    //     series: [
    //       {
    //         data: [820, 932, 901, 934, 901, 934],
    //         type: "line",
    //         areaStyle: {
    //           color: "rgb(115, 215, 228)",
    //         },
    //         lineStyle: {
    //           color: "rgb(115, 215, 228)",
    //         },
    //       },
    //     ],
    //   });
    // },
    // handleResize() {
    //   this.myChart5 && this.myChart5.resize();
    // },
    initChart5() {
      var myChart = echarts.init(document.getElementById("chart5"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: this.chart5.xdata,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "15%",
          bottom: "10%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          name: "单位：个",
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
            data: this.chart5.ydata,
            type: "line",
            lineStyle: {
              color: "rgb(115, 215, 228)",
            },
          },
        ],
      });
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
    initChart6() {
      var myChart = echarts.init(document.getElementById("chart6"));
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
      const days = [
        "前端开发",
        "web前端",
        "数据库开发",
        "后端开发",
        "测绘工程师",
      ];

      // prettier-ignore
      const data = [[0,0,112],[0,1,113],[0,2,121],[0,3,122],[0,4,120],[0,5,121],[0,6,113],[0,7,115],[0,8,121],[0,9,112],[0,10,111],[0,11,122],[0,12,112],[0,13,111],[0,14,110],[0,15,102],[0,16,111],[0,17,114],[0,18,105],[0,19,103],[0,20,100],[0,21,91],[0,22,92],[0,23,101],[1,0,117],[1,1,106],[1,2,98],[1,3,95],[1,4,98],[1,5,96],[1,6,97],[1,7,98],[1,8,95],[1,9,97],[1,10,97],[1,11,105],[1,12,96],[1,13,96],[1,14,99],[1,15,110],[1,16,96],[1,17,97],[1,18,98],[1,19,102],[1,20,95],[1,21,105],[1,22,97],[1,23,98],[2,0,81],[2,1,89],[2,2,42],[2,3,56],[2,4,58],[2,5,77],[2,6,65],[2,7,52],[2,8,56],[2,9,58],[2,10,75],[2,11,65],[2,12,44],[2,13,54],[2,14,58],[2,15,62],[2,16,65],[2,17,59],[2,18,57],[2,19,65],[2,20,71],[2,21,54],[2,22,52],[2,23,48],[3,0,57],[3,1,53],[3,2,50],[3,3,60],[3,4,50],[3,5,50],[3,6,60],[3,7,50],[3,8,51],[3,9,50],[3,10,55],[3,11,54],[3,12,57],[3,13,54],[3,14,53],[3,15,52],[3,16,59],[3,17,65],[3,18,65],[3,19,60],[3,20,56],[3,21,54],[3,22,54],[3,23,61],[4,0,22],[4,1,32],[4,2,30],[4,3,32],[4,4,41],[4,5,31],[4,6,31],[4,7,30],[4,8,41],[4,9,32],[4,10,41],[4,11,32],[4,12,32],[4,13,32],[4,14,31],[4,15,31],[4,16,41],[4,17,41],[4,18,32],[4,19,32],[4,20,32],[4,21,31],[4,22,32],[4,23,40],]
    .map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });
      myChart.setOption({
        tooltip: {
          position: "top",
        },
        grid: {
          height: "60%",
          width: "80%",
          top: "5%",
          right: "2%",
          left: "18%",
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
          min: 30,
          max: 120,
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
<style>
.el-picker-panel {
  background: #0d1f30;
  border: 1px solid #4a8faabd;
  font-size: 8pt;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  color: #fff;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #909399;
}
</style>
<style scoped lang="less">
#vocation {
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
    z-index: 3;
    float: left;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    background: url("../../assets/img/fq/ptbg3.png");
    background-size: 100% 100%;
    .countdata {
      height: 85%;
      width: 100%;
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      .datasource {
        height: 13%;
        width: 100%;
        display: flex;
        .leftpt {
          margin-left: 2%;
          color: #fff;
          width: 18%;
        }
      }
      .count {
        height: 60%;
        width: 90%;
        margin: 2% 0%;
        display: flex;
        float: left;
        .total {
          height: 100%;
          width: 27%;
          margin-right: 8%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat;
          background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
          align-items: center;
          .title {
            color: #44c5db;
          }
          span {
            color: #44c5db;
          }
        }
        .company {
          height: 100%;
          width: 27%;
          margin-right: 8%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat;
          background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
          align-items: center;
          .title {
            color: #61ccbe;
          }
          span {
            color: #61ccbe;
          }
        }
        .position {
          height: 100%;
          width: 27%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) left top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) right top no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) left bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat,
            linear-gradient(#1edaeb) right bottom no-repeat;
          background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
          align-items: center;
          .title {
            color: #4c8de2;
          }
          span {
            color: #4c8de2;
          }
        }
        .title {
          height: 15%;
          width: 90%;
          margin: 5% 0%;
          align-items: center;
          font-size: 12pt;
        }
        .d {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 75%;
          width: 85%;
          background: url("../../assets/img/fq/bg6.png");
          background-size: 100% 100%;
        }
      }
      .time {
        height: 25%;
        width: 100%;
        display: flex;
        float: left;
        align-items: center;
        .title {
          margin-left: 2%;
          color: #fff;
          width: 20%;
        }
        .el-row {
          width: 77%;
          .el-date-editor.el-input {
            width: 135px !important;
          }
          /deep/.el-input__inner {
            height: 28px;
            justify-items: center;
            background: #2899a871;
            border-radius: 4px;
            border: 1px solid #3eb7c738;
            color: #fff;
          }
          /deep/.el-input__icon {
            line-height: 28px;
          }
        }
      }
    }
  }
  .main {
    height: 33.3%;
    width: 46.8%;
    position: absolute;
    float: left;
    bottom: 0%;
    left: 28.1%;
    z-index: 2;
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
    z-index: 2;
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
// #map {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// }

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