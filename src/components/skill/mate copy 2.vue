<template>
  <div id="mate">
    <div id="map"></div>
    <div class="control">
      <div style="padding-top: 10px">
        <el-button id="button1">取消聚类</el-button>
      </div>
      <div style="padding-top: 10px">
        <el-button id="button2">执行聚类</el-button>
      </div>
    </div>
    <div class="my-class"></div>
    <transition name="fade">
      <loading v-if="isLoading" :state="state"></loading>
    </transition>
    <!-- <div class="mapcontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div> -->
    <div class="right">
      <div class="he">
        <div class="prompt">
          <span
            >请您输入个人技能和城市进行技能-职位匹配，
            注意：技能为必选项，且技能词输入不能超过三个。
          </span>
        </div>
        <div class="mutual">
          <el-row :gutter="20">
            <el-col :span="8"><span>个人技能:</span></el-col>
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
            <el-col :span="8"><span>城市选择:</span></el-col>
            <el-col :span="16">
              <div class="grid-content bg-specially">
                <div class="tab">
                  <el-input v-model="input1" placeholder=" 输入内容"></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-button @click="mate()">开始匹配</el-button></el-col
            >
            <el-col :span="12"
              ><el-button @click="clear()">重置选择</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="main">
        <div class="title"><span>职位匹配结果</span></div>
        <div class="table">
          <div class="tablehrader">
            <ul class="uititle">
              <li class="title">
                <span class="company">公司名称</span>
                <span class="position">职位名称</span>
                <span class="location">定位</span>
              </li>
            </ul>
          </div>
          <div class="srrollcontent">
            <vue-seamless-scroll :data="listData" :class-option="defaultOption">
              <ul class="ul-scoll">
                <li
                  class="li-scoll"
                  v-for="(item, index) in listData"
                  :key="index"
                >
                  <div :title="item.company" class="gongsi">
                    {{ item.company }}
                  </div>
                  <div class="zhiwei">{{ item.position }}</div>
                  <div
                    class="dingwei"
                    @click="flyToLocation(item.x,item.y)"
                  >
                    定位
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
          <!-- <el-table
            ref="interfaceTable"
            :data="tableCityData"
            stripe
            highlight-current-row
            class="“customer-table”"
          >
            <el-table-column
              prop="company"
              label="公司名称"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位名称"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="detail" label="定位" width="60">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click.native.stop="flyToLocation(scope.row.x, scope.row.y)"
                  >定位</el-button
                >
              </template>
            </el-table-column>
          </el-table> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Bus from "../assets/js/bus.js";
import request from "../../utils/request";
import loading from "../../components/loading.vue";
// import skillpointgather from "../../components/thememap/skillpointgather.vue";
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import companyimage from "../../assets/img/company.png";
import heatMapData from "../../assets/json/heatMapData.json";
import testjson from "../../assets/json/point.json";
const mapboxgl = require("mapbox-gl");
export default {
  name: "mate",
  components: {
    loading,
    wordcloud,
    
    //组件
  },
  data() {
    return {
      //动画加载
      state: "",
      isLoading: false,
      //地图切换
      index: 1,
      comp: "skillpointgather",
      isShow: true,
      //示例
      labellist: [
        { id: 1, name: "WebGIS" },
        { id: 2, name: "ArcGIS" },
        { id: 3, name: "SQLSever" },
      ],
      input: "",
      input1: "",
      listData: [],
    };
  },
  mounted() {
    // this.load();
    this.initmap();
  },
  methods: {
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [108.82, 33.17],
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
        map.fitBounds([
          [90, 25], // 边界的西南角
          [130, 45], // 边界的东北角
        ]);

        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point1", // reference the data source
          layout: {
            "icon-image": "company", // reference the image
            "icon-size": 0.15,
          },
        });
      });
      map.on("load", function () {
        //从我们的GeoJSON数据中添加一个新的数据源，并设置
        // 'cluster'选项为true。GL-JS将向源数据添加point_count属性。
        map.addSource("sensicjson", {
          type: "geojson",
          //指向GeoJSON数据。这个例子显示了所有的M1.0+地震
          // 15年12月22日至16年1月21日。
          data: testjson,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, //每个集群点的半径(默认为50)
        });
        //添加数据
        map.loadImage(companyimage, (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage("company", image);
          map.addSource("point1", {
            type: "geojson",
            data: testjson,
          });
        });
        //添加圆形聚合图层
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "sensicjson",
          filter: ["has", "point_count"],
          paint: {
            //使用步骤表达式(https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            //用三个步骤实现三种类型的循环:
            // *蓝色，20px圆，点计数小于100
            // *黄色，30px的圆圈，点计数在100和750之间
            // *粉红色，40px的圆圈，当点数大于等于750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
          //"source-layer": "button2"
        });

        //添加数字图层
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "sensicjson",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          //"source-layer": "button2"
        });

        //添加未聚合图层
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "sensicjson",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
          //"source-layer": "button2"
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
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
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

        //检查集群单击（点击聚合图层地图级别中心点变化）
        map.on("click", "clusters", function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          var clusterId = features[0].properties.cluster_id;
          map
            .getSource("sensicjson")
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
    indexMethod(index) {
      return (this.currentPage - 1) * this.intPageSize + index + 1;
    },
    flyToLocation(x, y) {
      console.log(x, y);
      this.map.flyTo({
        center: [x, y], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
    getLabel(val) {
      let label = val;
      this.input = this.input + label + "、";
    },
    //更新数据动画
    refeashData() {
      this.state = "加载数据中......请稍后";
      console.log(111);
      (this.isLoading = true),
        // this.getrealtime();
        setTimeout(() => {
          this.isLoading = false;
        }, 1200);
    },
    mate() {
      if (this.input == "WebGIS、") {
        this.load();
      }
    },
    clear() {
      this.input = "";
    },
    load() {
      request
        .post("/api/data/skillPo", {
          city: "南京",
          skill: "WebGIS",
        })
        .then((res) => {
          console.log(res);
          this.listData = res.data;
          if (this.listData != null) {
            this.isLoading = false;
          }
          this.$forceUpdate();
        });
    },
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style scoped lang="less">
#mate {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  //   background: url("../assets/img/banner.png") no-repeat;
  //   background-size: 100% 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.mapcontent {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  .control {
    position: absolute;
    left: 60%;
    top: 8%;
    width: 14%;
    height: 38%; /deep/.el-button {
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
  }
}
.right {
  position: absolute;
  z-index: 100;
  top: 0.5%;
  height: 92%;
  width: 25%;
  margin-right: 0.2%;
  right: 0;
  background: url("../../assets/img/fq/ptbg1.png") no-repeat;
  background-position: 100% 10%;
  background-size: 100% 100%;
  background-color: #04111d94;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  .he {
    display: flex;
    height: 50%;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .prompt {
      display: flex;
      flex: 0.5;
      align-items: center;
      margin-top: 7%;
      width: 92%;
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
      span {
        padding: 5% 2%;
        // border: 1px solid #1edaeb;
        text-indent: 2em; //文字缩进2字符
        line-height: 18pt;
        text-align: left;
      }
    }
    .mutual {
      flex: 2;
      display: flex;
      flex-direction: column;
      width: 92%;
      margin-top: 4%;
      padding-top: 5%;
      // background: linear-gradient(#1edaeb) left top no-repeat,
      //   linear-gradient(#1edaeb) left top no-repeat,
      //   linear-gradient(#1edaeb) right top no-repeat,
      //   linear-gradient(#1edaeb) right top no-repeat,
      //   linear-gradient(#1edaeb) left bottom no-repeat,
      //   linear-gradient(#1edaeb) left bottom no-repeat,
      //   linear-gradient(#1edaeb) right bottom no-repeat,
      //   linear-gradient(#1edaeb) right bottom no-repeat;
      // //linear-gradient(to left, #f00, #f00) right bottom no-repeat;//四个角的边框 to left 代表颜色渐变的方向
      // background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
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
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
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
            border: 1px solid #ffffff40;
            font-size: 10pt;
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
          line-height: 30px;
        }
        /deep/.el-input__inner {
          left: 0%;
          position: relative;
          display: inline-block;
          -webkit-appearance: none;
          background: #c3e3e72b;
          border-radius: 4px;
          border: 1px solid #3eb7c738;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: rgba(220, 225, 227, 0.96);
          font-size: inherit;
          height: 30px;
          // line-height: 90px;
          width: 100%;
          padding: 0px;
          // margin-top: 2%;
        }
      }
    }
  }
  .main {
    display: flex;
    height: 50%;
    flex-direction: column;
    border-top: 1px solid #1edaeb;
    .title {
      margin-top: 1%;
      width: 100%;
      height: 7%;
      color: #fff;
      font-size: 13pt;
    }
    // .table {
    //   width: 100%;
    //   height: 90%;
    //   /deep/.el-button {
    //     border: none;
    //     color: rgb(30, 185, 247);
    //     // padding: 12px 20px;
    //     font-size: 14px;
    //     border-radius: 5px;
    //   }
    // }
    .table {
      height: 90%;
      width: 100%;
      .tablehrader {
        height: 8%;
        width: 100%;
        .uititle {
          height: 100%;
          background-image: linear-gradient(
            -180deg,
            #bdd9e017 1%,
            #9fdae5bb 100%
          ) !important;
          background: transparent;
          color: aliceblue;
          font-size: 12pt;
          .title {
            height: 100%;
            display: flex;
            font-size: 12pt;
            .company {
              height: 100%;
              width: 42%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .position {
              height: 100%;
              width: 42%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .location {
              height: 100%;
              width: 16%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .srrollcontent {
        height: 87%;
        width: 100%;
        color: aliceblue;
        font-size: 11pt;
        overflow: hidden;
        .ul-scoll {
          .li-scoll {
            list-style: none;
            display: flex;
            margin-bottom: 1.5%;
            cursor: pointer;
            line-height: 25px;
            .gongsi {
              white-space: nowrap;
              width: 42%;
              height: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: left;
              text-indent: 1em;
            }
            .zhiwei {
              width: 42%;
              overflow: hidden;
              white-space: nowrap;
            }
            .dingwei {
              width: 16%;
              overflow: hidden;
            }
          }
        }
      }
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
/deep/.el-table .el-table__header-wrapper tr th {
  background-image: linear-gradient(
    -180deg,
    #bdd9e017 1%,
    #9fdae5bb 100%
  ) !important;
  background: transparent;
  // color: rgb(255, 255, 255);
  border-bottom: 1px solid #1faacd;
}
// /deep/.el-table,
// .el-table__expanded-cell {
//   background-color: #3f5c6d2c;
// }
// /deep/.el-table td.el-table__cell,
// /deep/.el-table th.el-table__cell.is-leaf {
//   border: transparent !important;
// }
// /deep/ .el-table .cell {
//   text-align: center;
// }
// /deep/.el-table::before {
//   background-color: transparent !important;
// }
// /deep/.el-table tbody tr:hover > td {
//   background-color: #09e8f02c !important;
// }
</style>
