<template>
  <div class="com-gradedcolormap">
    <div id="map"></div>
    <div class="map-overlay" id="features">
      <!-- <h2>游客满意度平均值</h2> -->
      <div id="pd">
        <p>Hover over a state!</p>
      </div>
    </div>
    <div class="map-overlay" id="legend">
      <div id="state-legend" class="state-legend">
        <h4>图例</h4>
        <h5>招聘信息发布数</h5>
        <div><span style="background-color: #317695"></span>5个</div>
        <br />
        <div><span style="background-color: #409695"></span>10个</div>
        <br />
        <div><span style="background-color: #4575b4"></span>100个</div>
        <br />
        <div><span style="background-color: #74add1"></span>200个</div>
        <br />
        <div><span style="background-color: #e0f3f8"></span>500个</div>
        <br />
        <div><span style="background-color: #ffffbf"></span>1000个</div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import chinajson from "../../assets/json/china.json";
const mapboxgl = require("mapbox-gl");
export default {
  name: "gradedcolormap",
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [108.82, 33.17],
        zoom: 3.5,
      });
      map.on("load", function () {
        map.addSource("fillSourceID", {
          type: "geojson" /* geojson类型资源 */,
          data: chinajson /* geojson数据 */,
        });
        map.addLayer({
          id: "fillID",
          type: "fill" /* fill类型一般用来表示一个面，一般较大 */,
          source: "fillSourceID",
          paint: {
            "fill-color": {
              property: "confirmed", // this will be your density property form you geojson
              stops: [
                [5, "#317695"],
                [10, "#409695"],
                [100, "#4575b4"],
                [200, "#74add1"],
                [500, "#e0f3f8"],
                [1000, "#ffffbf"],
              ],
            },
            "fill-opacity": 0.7 /* 透明度 */,
          },
        });
        // const layers = ["不满意", "不太满意", "比较满意", "满意", "非常满意"];
        // const colors = ["#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C"];

        //添加数据
        // const legend = document.getElementById("legend");
        // layers.forEach((layer, i) => {
        //   const color = colors[i];
        //   const item = document.createElement("div");
        //   const key = document.createElement("span");
        //   key.className = "legend-key";
        //   key.style.backgroundColor = color;

        //   const value = document.createElement("span");
        //   value.innerHTML = `${layer}`;
        //   item.appendChild(key);
        //   item.appendChild(value);
        //   legend.appendChild(item);
        // });
        // change info window on hover
        map.on("mousemove", (event) => {
          const states = map.queryRenderedFeatures(event.point, {
            layers: ["fillID"],
          });
          document.getElementById("pd").innerHTML = states.length
            ? `<p style="color: #cfedff;font-size:14pt;padding: 5%;float: left;    margin-right: 3%;">企业分布</p>
            <p id="toppart" style="color: #cfedff;position: absolute;
    margin-left: 5%;
    margin-top: 24%;"</p>
            ${states[0].properties.name}:
            <p id="bottompart" style="color: #41ff5c;
    margin-top: 26%;
    margin-left: 44%;
    position: absolute;"><strong><em>${states[0].properties.confirmed}</em></strong></p>`
            : `<p>没有数据</p>`;
        });
      });
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-gradedcolormap {
  height: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.map-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}

body {
  margin: 0;
  padding: 0;
}

h2 {
  color: #cfedff;
  margin: 10px;
  font-size: 18px;
}

.map-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}
#toppart {
  color: #cfedff;
}
#bottompart {
  color: #cfedff;
}
#pd {
  p,
  h3 {
    color: #cfedff;
    margin: 10px;
  }
}
#features {
  background: url("../../assets/img/fq/zp.png") no-repeat;
  background-size: 100% 100%;
  top: 0.5%;
  left: 28%;
  height: 10%;
  width: 10%;
}

#legend {
  padding: 10px;
  // background-color: rgba(33, 83, 124, 0.384);
  background: url("../../assets/img/fq/zp.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  height: 28%;
  margin-bottom: 3.5%;
  margin-right: 0.5%;
  width: 9%;
  right: 25%;
  bottom: 31%;
}
.state-legend {
  background-color: transparent;
  border-radius: 3px;
  bottom: 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 0px;
  position: absolute;
  right: 0px;
  z-index: 1;
  height: 100%;
  width: 100%;
}
.state-legend h4 {
  color: #73fdff;
  margin: 7% 0;
  font-size: 13pt;
}
.state-legend h5 {
  color: #fff;
  margin-bottom: 5%;
  font-size: 10pt;
}
.state-legend div {
  margin-left: 20%;
  float: left;
  // line-height: 40px;
  // margin-left: 15%;
  color: #fff;
}
.state-legend div span {
  color: #fff;
  display: inline-block;
  height: 14px;
  margin-right: 5px;
  // margin-left: 10%;
  width: 30px;
}
</style>