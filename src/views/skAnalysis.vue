<template>
  <div id="feelings">
    <div id="map" />
    <div class="main">
      <div class="right">
        <div class="mutual">
          <el-row :gutter="20">
            <el-col :span="8"><span>空间尺度:</span></el-col>
            <el-col :span="16">
              <div class="grid-content bg-specially">
                <div class="tab">
                  <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><span>时间尺度:</span></el-col>
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
            <el-col :span="12"><el-button>开始分析</el-button></el-col>
            <el-col :span="12"><el-button>重置选择</el-button> </el-col>
          </el-row>
        </div>
      </div>
      <div class="part">
        <el-menu>
          <el-row>
            <el-col :span="12">
              <el-menu-item
                style="padding: 1%"
                index="1"
                @click="showmap(1)"
                :class="index === 1 ? 'active' : ''"
                plain
              >
                <i class="fa fa-plane"></i
                ><span class="tab" slot="title">标准差椭圆分析</span>
              </el-menu-item></el-col
            >
            <el-col :span="12">
              <el-menu-item
                index="2"
                @click="showmap(2)"
                :class="index === 2 ? 'active' : ''"
                plain
              >
                <i class="fa fa-globe"></i
                ><span class="tab" slot="title">分级图</span>
              </el-menu-item>
            </el-col></el-row
          ><el-row>
            <el-col :span="12">
              <el-menu-item
                index="3"
                @click="showmap(3)"
                :class="index === 3 ? 'active' : ''"
                plain
              >
                <i class="fa fa-thermometer-3"></i
                ><span class="tab" slot="title">热力图</span>
              </el-menu-item></el-col
            >
            <el-col :span="12">
              <el-menu-item
                index="4"
                @click="showmap(4)"
                :class="index === 4 ? 'active' : ''"
                plain
              >
                <i class="fa fa-plane"></i
                ><span class="tab" slot="title">时序图</span>
              </el-menu-item>
            </el-col></el-row
          >
        </el-menu>
      </div>
      <div class="bottom">
        <span>当前地图： </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "skAnalysis",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "省份",
        },
        {
          value: "选项2",
          label: "城市",
        },
      ],
      value: "",
      value1: "",
    };
  },
  mounted() {
    this.initmap();
    this.showmap(1);
  },
  methods: {
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
    // showmap(value) {
    //   console.log(value);
    //   this.activeClass = value;
    //   if (value === 1) this.comp = "pointgather";
    //   else if (value === 2) this.comp = "gradedcolormap";
    //   else if (value === 3) this.comp = "heatmap";
    //   else if (value === 4) this.comp = "timemap";
    //   else if (value === 5) this.comp = "multimap";
    //   else if (value === 6) this.comp = "locmap";
    //   //   else if (value === 3) this.comp = "density";
    // },
  },
};
</script>
<style>
.el-picker-panel {
  background: #0a1c2cce;
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
.el-month-table td.next-year,
.el-month-table td.prev-year {
  color: #909399;
}
.el-month-table th {
  color: #fff;
}
.el-date-range-picker__header {
  color: #fff;
}
.el-month-table td.in-range div,
.el-month-table td.in-range div:hover,
.el-month-table.is-week-mode .el-month-table__row.current div,
.el-month-table.is-week-mode .el-month-table__row:hover div {
  background-color: #3eb7c738;
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
.el-month-table td.end-date .cell, .el-month-table td.start-date .cell{
  background-color: #112b42;
}
</style>
<style lang="less" scoped>
#feelings {
  position: fixed;
  width: 100%;
  height: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.main {
  height: 92%;
  width: 23%;
  position: absolute;
  z-index: 100;
  top: 1%;
  right: 0.2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("../assets/img/fq/ptbg1.png") no-repeat;
  background-size: 100% 100%;
  background-color: #04111d94;
  border-radius: 20px;
  .right {
    height: 30%;
    width: 94%;
    margin-top: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: flex-start;
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
    /deep/.el-button {
      // background: rgba(11, 176, 241, 0.493);
      background: url("../assets/img/fq/wggl_tab.png");
      background-size: 100% 100%;
      border: none;
      color: #ffffff;
      // padding: 12px 20px;
      font-size: 14px;
      border-radius: 5px;
    }
  }
  .part {
    width: 100%;
    height: 20%;
    .el-menu {
      background-color: transparent;
      .el-menu-item.is-active {
        color: #1edaeb;
      }
      .fa {
        font-size: 14pt;
        padding-right: 5px;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        background-color: transparent;
        .tab {
          color: #1edaeb;
        }
      }
      .tab {
        color: #fff;
        font-size: 12pt;
      }
    }
  }
  .bottom {
    width: 94%;
    height: 20%;
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
      text-indent: 2em; //文字缩进2字符
      line-height: 18pt;
      text-align: left;
      color: #fff;
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
// /deep/.el-button {
//   // background: rgba(11, 176, 241, 0.493);
//   background: url("../assets/img/fq/wggl_tab.png");
//   background-size: 100% 100%;
//   border: none;
//   color: #ffffff;
//   // padding: 12px 20px;
//   font-size: 14px;
//   border-radius: 5px;
// }
/deep/.el-button:focus,
.el-button:hover {
  color: #1edaeb;
}
</style>
