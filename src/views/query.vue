<template>
  <div class="query">
    <div id="map" />
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>
    <div class="cx">
      <el-input
        prefix-icon="el-icon-search"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
      /><el-button size="mini" id="button" @click="Search">查询</el-button>
    </div>
    <div class="charts"></div>
    <div class="table">
      <el-card shadow="hover" class="tebale_card">
        <el-table
          style="width: 100%; align: center"
          :row-style="getRowClass"
          :header-row-style="getRowClass"
          :header-cell-style="getRowClass"
          :data="tableData"
          :cell-style="{ padding: '2px 0' }"
          :height="getheight"
        >
          <el-table-column prop="time" label="发布日期" width="120">
          </el-table-column>
          <el-table-column
            prop="company"
            label="公司名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="position"
            label="岗位名称"
            width="210"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="region"
            label="工作地区"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column
          ><el-table-column
            prop="salarySe"
            label="薪资范围"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column
          ><el-table-column prop="x" label="x" v-if="false"> </el-table-column>
          <el-table-column prop="y" label="y" v-if="false"> </el-table-column>
          <el-table-column type="id" label="id" v-if="false"> </el-table-column>
          <el-table-column prop="education" label="学历要求" width="100">
          </el-table-column
          ><el-table-column prop="experience" label="工作经验" width="100">
          </el-table-column
          ><el-table-column prop="type" label="公司类型" width="120">
          </el-table-column
          ><el-table-column prop="size" label="公司规模" width="120">
          </el-table-column>
          <el-table-column prop="detail" label="详细信息" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click.native.stop="flyToLocation(scope.row.x, scope.row.y)"
                >定位</el-button
              >
              <el-button
                type="text"
                @click.native.stop="clickData(scope.row.id)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 5px 0px">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total ,prev, pager, next, jumper"
            :total="total"
            @click="Click"
            background
            small
          >
          </el-pagination>
        </div>
      </el-card>
      <!-- <poppage
        :show="show"
        :porpName="porpName"
        @hideModal="hideModal"
        @submit="submit"
      >
        <p>这里放弹窗的内容</p>
      </poppage> -->
    </div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import request from "../utils/request";
import loading from "../components/loading.vue";
// import poppage from "../components/poppage.vue";
import Bus from "../assets/js/bus.js";
import global from "../components/global";
export default {
  name: "query",
  components: { loading },

  data() {
    return {
      isLoading: true,
      tableData: [],
      getheight: "",
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 5,
      location: [],
      show: false,
      porpName: "",
      dataid: global.dataid,
      
    };
  },

  watch: {},

  created() {
    this.load();
    this.getHeight();
    // // 数组按矩阵思路, 变成转置矩阵
    // let matrixData = this.originData.map((row, i) => {
    //   let arr = [];
    //   for (let key in row) {
    //     arr.push(row[key]);
    //   }
    //   return arr;
    // });
    // // 加入标题拼接最终的数据
    // this.transData = matrixData[0].map((col, i) => {
    //   return [
    //     this.originTitle[i],
    //     ...matrixData.map((row) => {
    //       return row[i];
    //     }),
    //   ];
    // });
  },

  mounted() {
    //登录绑定事件
    window.addEventListener("keydown", this.keyDown);
    this.initmap();
  },

  methods: {
    hideModal() {
      // 取消弹窗回调
      this.show = false;
    },

    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    clickData(val) {
      this.dataid = val;
      // Bus.$emit('myevent',dataid);
      this.$router.push({ name: "detail", params: { a: val } });
      this.detailData = val.tableData;
    },
    // clickRow(val) {
    //   console.log(val);
    //   this.porpName = val.company;
    //   this.show = true;
    // },
    // showPop(val) {
    //   this.porpName = val.company;
    //   this.show = true;
    // },
    flyToLocation(x, y) {
      console.log(x, y);
      this.map.flyTo({
        center: [x, y], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#FFF;";
    },
    keyDown(e) {
      //如果是回车则执行查询方法
      if (e.keyCode == 13) {
        document.getElementById("button").click();
      }
    },
    getHeight() {
      this.getheight = window.innerHeight - 495 + "px";
    },
    //加载表格数据
    load() {
      request
        .post("/api/data/queryForm", {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          // search: this.search,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.jobInfos;
          this.total = res.data.total;
          if (this.tableData != null) {
            this.isLoading = false;
          }
        });
    },
    //获取当前页面数据
    Click() {
      request
        .post("/api/data/queryForm", {
          pageNum: this.currentPage,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.jobInfos;
          this.total = res.data.total;
        });
    },
    //查询
    Search() {
      request
        .post("/api/data/queryAny", {
          search: this.search,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data.jobInfos;
          this.total = res.data.total;
          console.log(this.tableData);
        });
    },
    handleCurrentChange(val) {
      //页码切换
      // console.log("当前页:${val}");
      // this.currentPage = val;
      this.currentPage = val;
      console.log(val);
      request
        .post("/api/data/queryForm", {
          pageNum: val,
          pageSize: this.pageSize,
        })
        .then((res) => {
          console.log(res, val);
          this.tableData = res.data.jobInfos;
          this.pageSize = res.data.pages;
        });
    },
    //分页方法（重点）
    // currentChangePage(list, currentPage) {
    //   let from = (currentPage - 1) * this.pageSize;
    //   let to = currentPage * this.pageSize;
    //   this.tableData = [];
    //   for (; from < to; from++) {
    //     if (list[from]) {
    //       this.tableData.push(list[from]);
    //     }
    //   }
    // },
    //获取详细信息
    // rowDbclick(row, column) {
    //   var id = row.ID;
    //   this.handleDetail(id);
    // },
    // handleDetail(row) {
    //   console.log(row);
    //   this.dialogData.company = row.company;
    //   this.dialogData.position = row.position;
    // },
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [105, 35],
        zoom: 3.5,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.query {
  position: fixed;
  height: 100%;
  width: 100%;
}
.cx {
  position: absolute;
  top: 10px;
  left: 0px;
  width: 20%;
  .el-input {
    width: 200px;
    margin-right: 20px;
    background-image: url("../assets/img/fq/bg9.png");
    background-size: 100% 100%;
  }
  .el-button {
    background-color: #225e81e3;
    border-color: #1edaeb;
    color: #fff;
  }
}
.charts {
  position: absolute;
  bottom: 6.5%;
  left: 0%;
  width: 20%;
  height: 60%;
  // background-color: #225e81e3;
}
.table {
  position: absolute;
  bottom: 6.5%;
  right: 0%;
  width: 80%;
  height: 40%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.tebale_card {
  // background: url("../assets/img/fq/bg7.png");
  // background-size: 100% 100%;
  // border: none;
  height: 100%;
  border-radius: 15px;
  background-color: #18608aad;
  border-color: #1edaeb;
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
/deep/.el-pagination__total,
/deep/.el-pagination__jump {
  color: #fff;
}
/deep/ .el-input--mini .el-input__inner {
  background-color: #3f5c6d2c;
  color: #fff;
  border: none;
}
/deep/.el-table tbody tr:hover > td {
  background-color: #09e8f02c !important;
}
/deep/.el-table tr {
  background-color: #3f5c6d2c;
  color: #fff;
}
/deep/ .el-pagination .el-pager li,
/deep/ .el-pagination .btn-prev,
/deep/ .el-pagination .btn-next {
  background-color: #00a2ff2c;
  color: #fff;
}
</style>