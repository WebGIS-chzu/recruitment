<template>
  <div id="mate">
    <!-- <div id="map">
      <button type="button" id="backbutton1">执行聚类</button>
      <button type="button" id="backbutton2">取消聚类</button>
    </div> -->
    <iframe
      src="./static/mate.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe>
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
          <el-table
            ref="interfaceTable"
            height="315"
            :data="tableCityData"
            stripe
            highlight-current-row
            @row-click="clickData"
            :cell-style="{ padding: '8px 0' }"
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
                  @click.stop="flyToLocation(scope.row.x, scope.row.y)"
                  >定位</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hotdata from "../../assets/json/平均薪资热力图.json";
// import Bus from "../assets/js/bus.js";
import request from "../../utils/request";
import loading from "../../components/loading.vue";
// import skillpointgather from "../../components/thememap/skillpointgather.vue";
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
// import echarts from "echarts";
const mapboxgl = require("mapbox-gl");
export default {
  name: "mate",
  components: {
    loading,
    wordcloud,
    // skillpointgather,
    //组件
  },
  data() {
    return {
      //动画加载
      state: "",
      isLoading: false,
      //地图切换
      // index: 1,
      // comp: "skillpointgather",
      isShow: true,
      code: null,
      x: null,
      y: null,
      //示例
      labellist: [
        { id: 1, name: "WebGIS" },
        { id: 2, name: "ArcGIS" },
        { id: 3, name: "SQLSever" },
      ],
      input: "",
      input1: "",
      tableCityData: [],
    };
  },
  mounted() {
    // this.initmap();
  },
  methods: {
    // initmap() {
    //   var that = this;
    //   this.$mapboxgl.accessToken =
    //     "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
    //   this.map = new mapboxgl.Map({
    //     container: "map",
    //     style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
    //     center: [105, 35],
    //     zoom: 3.5,
    //     Flyto: true,
    //   });
    // },
    infinitScroll() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.interfaceTable;
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper;
      divData.onmouseover = function () {
        clearInterval(t);
      }; //鼠标移入，停止滚动
      divData.onmouseout = function () {
        start();
      }; //鼠标移出，继续滚动

      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      let t;
      function start() {
        // 数据少于表格高度停止滚动
        if (divData.clientHeight >= divData.scrollHeight) {
          return;
        }
        t = setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 5;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0;
          }
        }, 100);
      }
      start();
    },
    sendMessage() {
      this.iframe.postMessage({ x: this.x, y: this.y }, "*");
      // console.log(x, y);
    },
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    clickData(row) {
      console.log(row);
      var val = row.id;
      this.$router.push({ name: "details", params: { a: row.id } });
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.intPageSize + index + 1;
    },
    flyToLocation(x, y) {
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
          this.tableCityData = res.data;
          if (this.tableCityData != null) {
            this.isLoading = false;
          }
          this.$nextTick(() => {
            this.infinitScroll();
          });
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

<style lang="less" scoped>
#mate {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
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
/deep/.el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background-color: #3f5c6d2c;
  color: #fff;
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
/deep/.el-card__body {
  padding: 10px;
}
/deep/.el-overlay {
  background-color: rgba(255, 255, 255, 0.02);
}
/deep/.el-table,
.el-table__expanded-cell {
  background-color: #3f5c6d2c;
}
/deep/.el-table td.el-table__cell,
/deep/.el-table th.el-table__cell.is-leaf {
  border: transparent !important;
}
/deep/ .el-table .cell {
  text-align: center;
}
/deep/.el-table::before {
  background-color: transparent;
}
/deep/.el-table tbody tr:hover > td {
  background-color: #09e8f02c !important;
}
/deep/.el-table tr {
  background-color: #3f5c6d2c;
  color: #fff;
}
</style>
<style scoped>
/* #backbutton1 {
  z-index: 2;
  margin-top: 8%;
  margin-left: 68%;
  position: fixed;
  /* background-image: url("../static/img/wggl_tab.png");
      background-size: 100% 100%; */
/* background-color: transparent;
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
} */

/* #backbutton2 {
  position: fixed;
  z-index: 2;
  margin-top: 5%;
  margin-left: 68%;
  /* background-image: url("../static/img/wggl_tab.png");
      background-size: 100% 100%; */
/* background-color: transparent;
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
} */

/* .mapboxgl-popup {
  max-width: 200px;
} */
</style>