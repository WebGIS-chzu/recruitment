<template>
  <div class="com-pointgather">
    <div id="map"></div>
    <!-- <iframe
      src="./static/timemap copy.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe> -->
    <div class="control">
      <div style="padding-top: 10px">
        <el-button id="button1">取消聚类</el-button>
      </div>
      <div style="padding-top: 10px">
        <el-button id="button2">执行聚类</el-button>
      </div>
    </div>

    <div class="my-class"></div>
  </div>
</template>
<script>
import testjson from "../../assets/json/平均薪资热力图.json";
const mapboxgl = require("mapbox-gl");
export default {
  name: "skillpointgather",
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
        center: [116, 33],
        zoom: 3.5,
      });
      document.getElementById("button2").addEventListener("click", () => {
        map.setLayoutProperty("points", "visibility", "none");
        map.setLayoutProperty("clusters", "visibility", "visible");
        map.setLayoutProperty("cluster-count", "visibility", "visible");
        map.setLayoutProperty("unclustered-point", "visibility", "visible");
        map.fitBounds([
          [90, 45], // 边界的西南角
          [120, 20], // 边界的东北角
        ]);
      });
      document.getElementById("button1").addEventListener("click", () => {
        map.setLayoutProperty("points", "visibility", "visible");
        map.setLayoutProperty("clusters", "visibility", "none");
        map.setLayoutProperty("cluster-count", "visibility", "none");
        map.setLayoutProperty("unclustered-point", "visibility", "none");
        map.addSource("earthquake", {
          type: "geojson",
          data: testjson,
          // data.data,//将上面的换成我所需要的
          // cluster: true,
          // clusterMaxZoom: 14, //最大缩放到群集点
          // clusterRadius: 50 // 每一组点的半径（=50）
        });
        map.addLayer({
          id: "points",
          type: "circle",
          source: "earthquake",
          paint: {
            "circle-color": "#080",
            "circle-radius": 3,
          },
        });
      });
      map.on("load", function () {
        // 从GeoJSON数据添加一个新的源并设置“cluster”选项为true。GL-JS将把point_count属性添加到源数据中。
        map.addSource("earthquakes", {
          type: "geojson",
          data: testjson,
          // data.data,//将上面的换成我所需要的
          cluster: true,
          clusterMaxZoom: 14, //最大缩放到群集点
          clusterRadius: 50, // 每一组点的半径（=50）
        });
        // 外围有数字的圆圈，加晕染
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "earthquakes",
          filter: ["has", "point_count"],
          paint: {
            //*蓝色，当点数小于100时为20px圆
            //*点计数在100到750之间时为黄色，21px圆
            //*点计数大于或等于750时为22像素的粉红色圆圈
            "circle-color": [
              "step",
              ["get", "point_count"],
              "rgba(81, 187, 214, 0.8)",
              100,
              "rgba(241, 240, 117, 0.8)",
              750,
              "rgba(242, 140, 177, 0.8)",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20, //蓝色，当点数小于100时为20px圆
              100, //对应上面circle-color 数字，意思为100以内
              21, //点计数在100到750之间时为黄色，21px圆
              750, //对应上面circle-color 数字，意思为750以内
              22, //点计数大于或等于750时为22像素的粉红色圆圈
            ],
            // 这个是外边框的颜色 circle-stroke-color这个对应了上面circle-color
            "circle-stroke-color": [
              "step",
              ["get", "point_count"],
              "rgba(81, 187, 214, 0.2)",
              100,
              "rgba(241, 240, 117, 0.2)",
              750,
              "rgba(242, 140, 177, 0.2)",
            ],
            // 这个是外边框晕染的范围
            "circle-stroke-width": [
              "step",
              ["get", "point_count"],
              5, //蓝色晕染长度，当点数小于100时为5px晕染
              100, //对应上面circle-color 数字，意思为100以内
              6, //点计数在100到750之间时为黄色，6px晕染
              750, //对应上面circle-color 数字，意思为750以内
              7, //点计数大于或等于750时为7px像素的粉红色晕染
            ],
          },
        });
        //聚合图圆圈中的数字
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "earthquakes",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          // 添加这个就可以改变圆圈内字样式，这里我改变了他的颜色
          paint: {
            "text-color": "#000000", //字体文本色号16进制颜色码
            "text-opacity": 1, //不透明度最高为1
          },
        });
        // 聚合图中没有数字的显示小圆点
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "earthquakes",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#F0E68C",
            "circle-radius": 6,
            // "circle-stroke-width": 1,
            // "circle-stroke-color": "#fff"
          },
        });
        map.on("load", () => {
          jsonCallback;
        });
        function jsonCallback(err, data) {
          if (err) {
            throw err;
          }
          data.features = data.features.map((d) => {
            d.properties.month = new Date(d.properties.time).getMonth();
            // d.properties.coordinates = new location(d.properties.geometry).getElementById("coordinates");
            return d;
          });
        }
        map.on("click", "unclustered-point", (e) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const name = e.features[0].properties.name;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup().setLngLat(coordinates).setHTML(name).addTo(map);
        });
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on("mouseenter", "unclustered-point", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "unclustered-point", () => {
          map.getCanvas().style.cursor = "";
        });
        // 单击时检查群集
        map.on("click", "clusters", function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          var clusterId = features[0].properties.cluster_id;
          map
            .getSource("earthquakes")
            .getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.com-pointgather {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  background: transparent;
  .control {
    position: absolute;
    left: 60%;
    top: 8%;
    width: 14%;
    height: 38%; // #button1 {
    //   background: url("../../assets/img/框.png");
    //   z-index: 9999;
    // }
    // #button2 {
    //   z-index: 9999;
    // }
  }
}

/deep/.el-button {
  background: url("../../assets/img/fq/wggl_tab.png");
  background-size: 100% 100%; // background: #24bff390;
  border: 0px solid #d80d4a;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
}

/deep/.el-button:focus,
.el-button:hover {
  color: #75f8ed;
  border-color: #c6e2ff; // background-color: #ecf5ff;
}

.mapboxgl-popup {
  max-width: 200px;
}
</style>