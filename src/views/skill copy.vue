<template>
  <div class="skill">
    <div class="left">
      <!-- <div class="pt pt1"> -->
        <div class="hd">
          <span>123</span>
        </div>
        <div id="Chart1"></div>
      <!-- </div> -->
    </div>

    <div class="right">
      <div class="pt pt4">
        <div class="hd">
          <span>123</span>
        </div>
      </div>
      <div class="pt pt5">
        <div class="hd">
          <span>123</span>
        </div>
      </div>
      <div class="pt pt6">
        <div class="hd">
          <span>123</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const mapboxgl = require("mapbox-gl");
import echarts from "echarts";
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
  name: "skill",
  data() {
    return {};
  },
  mounted() {
    // this.initmap();
    let myChart1 = echarts.init(document.getElementById("Chart1"));
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
            { value: 10, itemStyle: { normal: { color: "#00ff7f" } } },
            { itemStyle: { normal: { color: "#0055ff" } } },
            { itemStyle: { normal: { color: "#ffaa00" } } },
            { itemStyle: { normal: { color: "#ff55ff" } } },
            { itemStyle: { normal: { color: "#e26691" } } },
            { itemStyle: { normal: { color: "#79dae2" } } },
            { itemStyle: { normal: { color: "#2fffff" } } },
            { itemStyle: { normal: { color: "#aaff7f" } } },
            { itemStyle: { normal: { color: "#ffaa7f" } } },
            { itemStyle: { normal: { color: "#fab452" } } },
          ],
          data: datas,
          links: lines,
          lineStyle: { normal: { opacity: 0.9, width: 1, curveness: 0 } },
        },
      ],
    };
    myChart1.setOption(option);
  },
  methods: {
    // initmap() {
    //   this.$mapboxgl.accessToken =
    //     "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
    //   this.map = new mapboxgl.Map({
    //     container: "map",
    //     style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
    //     center: [105, 35],
    //     zoom: 3.5,
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.skill {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .left {
    // position: absolute;
    // top: 0px;
    // left: 0px;
    height: 92%;
    width: 60%;
    display: flex;
    margin: 10px;
    // .pt1 {
    //   width: 100%;
    //   height: 100%;

    // }
    #Chart1 {
      width: 100%;
      height: 100%;
    }
  }
}

.right {
  // position: absolute;
  // top: 0px;
  // right: 0px;
  height: 92%;
  width: 32%;
  float: left;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.pt {
  flex: 1;
  width: 100%;
  height: 100%;
  // margin: 10px 0px 0px 10px;
  background: url(../assets/img/pt/ptbg.png) no-repeat;
  background-size: 100% 100%;
  .hd {
    display: flex;
    width: 65%;
    margin: 10px;
    height: 28px;
    background: url(../assets/img/pt/pt_title1.png) no-repeat;
    background-size: 100% 100%;
    span {
      margin-left: 32px;
      line-height: 30px;
      font-size: 18px;
      color: #fff;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #38e9e0,
        0 0 70px #0cf3f3;
    }
  }
}
</style>