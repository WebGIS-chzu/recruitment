<template>
  <div class="mate">
    <div class="left">
      <div class="hd">
        <span>热门职位技能匹配关系图</span>
      </div>
      <div class="Chart1" id="chart1" ref="chartdata"></div>
    </div>
    <div class="right">
      <div class="mutual">
        <el-row :gutter="20">
          <el-col :span="8"><span>空间范围:</span></el-col>
          <el-col :span="16">
            <div class="grid-content bg-specially">
              <div class="tab">
                <el-input
                  v-model="input1"
                  placeholder=" 输入内容(具体省份或城市)"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>时间范围:</span></el-col>
          <el-col :span="16">
            <div class="grid-content bg-specially">
              <div class="tab">
                <el-date-picker
                  v-model="value1"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份"
                >
                </el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><span>职位选择:</span></el-col>
          <el-col :span="16">
            <div class="grid-content bg-specially">
              <div class="tab">
                <el-input
                  v-model="input"
                  placeholder=" 输入内容或点击标签"
                ></el-input>
                <div class="labelcontent">
                  <span>输入示例:</span>
                  <div
                    class="chooselabel"
                    v-for="(item, i) in labellist"
                    :key="i"
                    @click="getLabel(item.name)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12"
            ><el-button @click="skanalysis()">开始分析</el-button></el-col
          >
          <el-col :span="12"
            ><el-button @click="clear()">重置选择</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="pt pt2">
          <div class="hd">
            <span>热门技能词云</span>
          </div>
          <div id="chart2" ref="cloudEl"></div>
        </div>
        <div class="pt pt3">
          <div class="hd">
            <span>热门技能月变化图</span>
          </div>
          <div id="chart3" ref="Chart3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import css from"../../assets/css/time.css"
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
export default {
  name: "analyse",
  components: {
    wordcloud,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "省级",
        },
        {
          value: "选项2",
          label: "市级",
        },
      ],
      labellist: [
        { id: 1, name: "GIS开发工程师" },
        { id: 2, name: "web前端工程师" },
        { id: 3, name: "数据库开发工程师" },
        { id: 4, name: "后端开发工程师" },
        { id: 5, name: "前端开发工程师" },
      ],
      input: "",
      input1: "",
      value1: "",
      value: "",
      cloudData: [
        { value: 2000, name: "JavaScript" },
        { value: 1800, name: "VUE" },
        { value: 1200, name: "ArcGIS" },
        { value: 1000, name: "SQL" },
        { value: 900, name: "CSS" },
        { value: 880, name: "Python" },
        { value: 750, name: "MySQL" },
        { value: 630, name: "WebGIS" },
        { value: 610, name: "ArcGIS Server" },
        { value: 600, name: "C++" },
        { value: 543, name: "算法开发" },
        { value: 523, name: "Mapbox" },
        { value: 510, name: "三维GIS" },
        { value: 500, name: "二次开发" },
        { value: 500, name: "GIS软件" },
        { value: 490, name: "数据处理" },
        { value: 490, name: "遥感解译" },
        { value: 490, name: "测量" },
        { value: 430, name: "Envi" },
        { value: 430, name: "Office" },
        { value: 380, name: "外业" },
        { value: 380, name: "android" },
        { value: 340, name: "postgresql" },
        { value: 280, name: "GIS API开发" },
        { value: 260, name: "Spark" },
        { value: 200, name: "可视化" },
        { value: 200, name: "数据分析" },
        { value: 100, name: "Echarts" },
        { value: 50, name: "数据库应用" },
        { value: 40, name: "VS Code" },
        { value: 25, name: "Oracle" },
        { value: 13, name: "CASS" },
      ],
      giscloudData: [
        { value: 1800, name: "ArcGIS" },
        { value: 1200, name: "JavaScript" },
        { value: 1000, name: "SuperMap" },
        { value: 900, name: "WebGIS" },
        { value: 700, name: "CSS" },
        { value: 680, name: "C++" },
        { value: 650, name: "MySQL" },
        { value: 630, name: "SQL" },
        { value: 610, name: "ArcGIS Server" },
        { value: 600, name: "Python" },
        { value: 543, name: "C#" },
        { value: 523, name: "Mapbox" },
        { value: 510, name: "三维GIS" },
        { value: 500, name: "ArcGIS Engine" },
        { value: 500, name: "GIS软件" },
        { value: 490, name: "Html" },
        { value: 490, name: "GeoServer" },
        { value: 490, name: "C#.NET" },
        { value: 430, name: "Oracle" },
        { value: 430, name: "二次开发" },
        { value: 380, name: "JQuery" },
        { value: 380, name: "百度API" },
        { value: 340, name: "postgresql" },
        { value: 280, name: "GIS API开发" },
        { value: 260, name: "Spark" },
        { value: 200, name: "TOMCAT" },
        { value: 200, name: "MongoDB" },
        { value: 100, name: "Spring MVC" },
        { value: 50, name: "GIS开源库" },
        { value: 40, name: "VS Code" },
        { value: 25, name: "OpenLayers" },
        { value: 13, name: "Linux" },
      ],
      option3: {
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
          left: "center",
          top: "top",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#1e90ff", // 图例文字颜色
          },
          data: ["vue", "WebGIS", "JavaScript", "ArcGIS"],
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
            name: "",
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
          top: "20%",
          left: "10%",
          right: "5%",
          bottom: "12%",
        },
        series: [
          {
            type: "line",
            name: "vue",
            data: [],
          },
          {
            type: "line",
            name: "WebGIS",
            data: [],
          },
          {
            type: "line",
            name: "JavaScript",
            data: [],
          },
          {
            type: "line",
            name: "ArcGIS",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          mouth: "11",
          vue: "194",
          JavaScript: "156",
          z: "380",
          y: "50",
          sum: "1000",
        },
        {
          mouth: "12",
          vue: "548",
          JavaScript: "934",
          z: "420",
          y: "150",
          sum: "1000",
        },
        {
          mouth: "1",
          vue: "313",
          JavaScript: "502",
          z: "400",
          y: "250",
          sum: "1000",
        },
        {
          mouth: "2",
          vue: "829",
          JavaScript: "1274",
          z: "450",
          y: "350",
          sum: "1000",
        },
        {
          mouth: "3",
          vue: "900",
          JavaScript: "1420",
          z: "500",
          y: "320",
          sum: "1000",
        },
      ],
    };
  },
  mounted() {
    this.showct1();
    this.initChart3();
    let myChart3 = this.$echarts.init(this.$refs.Chart3);
    myChart3.setOption(this.option3);
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    // this.chartdataInti(this.$refs.chartdata, this.allchartdata);
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f6981a4;color:#FFF;";
    },
    getLabel(val) {
      let label = val;
      this.input = this.input + label + "、";
    },
    initChart3() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option3.xAxis.data.push(this.plan_table[i].mouth);
        //vue总计
        this.option3.series[0].data.push(this.plan_table[i].vue);
        //JavaScript
        this.option3.series[1].data.push(this.plan_table[i].JavaScript);
        //预防性养护金额合计
        this.option3.series[2].data.push(this.plan_table[i].z);
        //金额总计
        this.option3.series[3].data.push(this.plan_table[i].y);
        //Y轴最大值的设置：向上取整并家500
        this.option3.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
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
    showct11() {
      let myChart = echarts.init(document.getElementById("chart1"));
      var baseName = "GIS开发工程师";
      var option;
      // var chartData = {
      //   GIS开发工程师: [
      //     "算法研究",
      //     "JavaScript",
      //     "前端框架",
      //     "数据库技术",
      //     "HTML/CSS(3)/JS",
      //     "QT",
      //     "PHP",
      //     "jsp",
      //     "Android",
      //     "SQL",
      //     "ArcGIS",
      //     "ArcMap",
      //     "JavaEE",
      //     "CASS",
      //     "AutoCAD",
      //     "二次开发",
      //     "OpenLayers",
      //     "地图前端",
      //     "ENVI",
      //     "遥感技术",
      //     "QGIS",
      //     ".net/C#",
      //     "PostGIS",
      //     "Cesium",
      //     "Oracle",
      //     "MySQL",
      //     "MapGIS",
      //     "软件开发能力",
      //     "技术方案",
      //     "Spring框架技术",
      //     "ArcGIS Server",
      //     "GeoServer",
      //     "mapbox",
      //     "Leaflet",
      //     "GIS软件",
      //   ],
      // };
      var chartData = {
        WebGIS: [],
        ArcGIS: [],
        算法研究: [],
        JavaScript: [],
        前端框架: [],
        数据库技术: [],
        "HTML/CSS(3)/JS": [],
        QT: [],
        PHP: [],
        jsp: [],
        Android: [],
        SQL: [],
        SuperMap: [],
        ArcMap: [],
        JavaEE: [],
        CASS: [],
        AutoCAD: [],
        二次开发: [],
        OpenLayers: [],
        地图前端: [],
        ENVI: [],
        遥感技术: [],
        QGIS: [],
        ".net/C#": [],
        PostGIS: [],
        Cesium: [],
        Oracle: [],
        MySQL: [],
        MapGIS: [],
        软件开发能力: [],
        百度API: [],
        Spring框架技术: [],
        "ArcGIS Server": [],
        GeoServer: [],
        mapbox: [],
        Leaflet: [],
        GIS软件: [],
        "ArcGIS Engine": [],
        PostgreSQL: [],
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
              { itemStyle: { normal: { color: "#0055ff" } } },
              { itemStyle: { normal: { color: "#74af96" } } },
              { itemStyle: { normal: { color: "#ff55ff" } } },
              { itemStyle: { normal: { color: "#e26691" } } },
              { itemStyle: { normal: { color: "#004e66" } } },
              { itemStyle: { normal: { color: "#587498" } } },
              { itemStyle: { normal: { color: "#3DC7BE" } } },
              { itemStyle: { normal: { color: "#ffaa7f" } } },
              { itemStyle: { normal: { color: "#80bd9e" } } },
              { itemStyle: { normal: { color: "#0055ff" } } },
              { itemStyle: { normal: { color: "#74af96" } } },
              { itemStyle: { normal: { color: "#ff55ff" } } },
              { itemStyle: { normal: { color: "#e26691" } } },
              { itemStyle: { normal: { color: "#004e66" } } },
              { itemStyle: { normal: { color: "#587498" } } },
              { itemStyle: { normal: { color: "#3DC7BE" } } },
              { itemStyle: { normal: { color: "#ffaa7f" } } },
              { itemStyle: { normal: { color: "#80bd9e" } } },
              { itemStyle: { normal: { color: "#004e60" } } },
              { itemStyle: { normal: { color: "#587490" } } },
              { itemStyle: { normal: { color: "#3DC7B0" } } },
              { itemStyle: { normal: { color: "#ffaa70" } } },
              { itemStyle: { normal: { color: "#80bd90" } } },
            ],
            data: datas,
            links: lines,
            lineStyle: { normal: { opacity: 0.9, width: 1, curveness: 0 } },
          },
        ],
      };
      myChart.setOption(option);
    },
    skanalysis() {
      if (this.input == "GIS开发工程师、") {
        this.showct11();
        this.wordCloudInti(this.$refs.cloudEl, this.giscloudData);
      } else {
        this.showct1();
        this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
      }
    },
    clear() {
      this.input = "";
      this.input1 = "";
      this.value1 = "";
      this.showct1();
      this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
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
.el-date-range-picker__content.is-left {
  border-right: 1px solid #909399da;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #909399;
}
.el-date-table th {
  color: #fff;
}
.el-date-range-picker__header {
  color: #fff;
}
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #4a8faabd;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #3eb7c738;
}
.el-picker-panel__icon-btn {
  color: #fff;
}
.el-select-dropdown {
  background-color: #0d1f30;
}
.el-select-dropdown__item {
  color: #fff;
}
.el-date-editor .el-range-separator {
  width: 10%;
  color: #fff;
}
</style>
<style lang="less" scoped>
// @import "../../assets/css/time.less";
.mate {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .left {
    height: 92%;
    width: 68%;
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
.right {
  height: 93%;
  width: 32%;
  float: left;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  .mutual {
    display: flex;
    flex: 1;
    float: left;
    flex-direction: column;
    justify-content: center;
    width: 98%;
    color: #fff;
    margin: 3% 0%;
    background: linear-gradient(#1edaeb) left top no-repeat,
      linear-gradient(#1edaeb) left top no-repeat,
      linear-gradient(#1edaeb) right top no-repeat,
      linear-gradient(#1edaeb) right top no-repeat,
      linear-gradient(#1edaeb) left bottom no-repeat,
      linear-gradient(#1edaeb) left bottom no-repeat,
      linear-gradient(#1edaeb) right bottom no-repeat,
      linear-gradient(#1edaeb) right bottom no-repeat;
    //linear-gradient(to left, #f00, #f00) right bottom no-repeat;//四个角的边框 to left 代表颜色渐变的方向
    background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
    .grid-content {
      border-radius: 4px;
      min-height: 42px;
    }
    .bg-specially {
      height: 100%;
      // width: 60%;
      .labelcontent {
        display: flex;
        width: 100%;
        padding: 2% 0%;
        line-height: 25px;
        flex-wrap: wrap;
        > span {
          font-size: 10pt;
          color: #c5d4e6;
          // margin-left: -19%;
        }
        .chooselabel {
          background: #8ae5e54a;
          margin-left: 2%;
          margin-bottom: 1%;
          border: 1px solid #ffffff40;
          font-size: 8pt;
          text-align: center;
          line-height: 25px;
          border-radius: 5px;
          cursor: pointer;
          // margin: 1% 1% 1% 1% ;
        }
      }
    }
    .tab {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      > span {
        position: absolute;
        top: 64%;
        left: 39%;
        color: #a7c7c7f0;
        font-size: 10pt;
      }
      /deep/.el-input {
        line-height: 32px;
      }
      /deep/.el-input__inner {
        background: #c3e3e72b;
        border-radius: 4px;
        border: 1px solid #3eb7c738;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: rgba(220, 225, 227, 0.96);
        font-size: inherit;
        height: 32px;
        // line-height: 90px;
        width: 100%;
        padding: 0px;
        // margin-top: 2%;
      }
      /deep/.el-range-editor .el-range-input {
        height: 28px;
        justify-items: center;
        background: #c3e3e72b;
        border-radius: 4px;
        border: 1px solid #3eb7c738;
        color: #fff;
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    flex: 1.3;
    float: left;
    .hd {
      background-size: 12% 50%;
      span {
        margin-left: 13%;
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
  // .pt1 {
  //   flex: 1;
  // }
  // .pt4 {
  //   flex: 1;
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  //   width: 100%;
  // }
}

.el-picker-panel {
  margin-top: 12px;
  color: #fff;
  background: #000;
  border: none;
}
/deep/.el-date-range-picker__content.is-left {
  border-right: none;
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
/deep/.el-row {
  width: 100%;
  color: #fff;
  font-size: 12pt;
  text-align: center;
  flex-direction: row;
  // margin-left: 0% !important;
  // margin-right: 0% !important;
  // margin-bottom: 0px;
  margin-bottom: 2%;
  &:last-child {
    margin-bottom: 0;
  }
}
/deep/.el-col {
  border-radius: 4px;
  padding-left: 0% !important;
  padding-right: 0% !important;
}
/deep/.el-button {
  // background: rgba(11, 176, 241, 0.493);
  background: url("../../assets/img/fq/wggl_tab.png");
  background-size: 100% 100%;
  border: none;
  color: #ffffff;
  // padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
}
/deep/.el-button:focus,
.el-button:hover {
  color: #1edaeb;
}
</style>