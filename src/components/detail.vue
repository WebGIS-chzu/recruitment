<template>
  <div class="details">
    <div class="he">
      <div class="other">
        <div class="title">
          <div class="imgBK"></div>
          <span>公司信息</span>
        </div>
        <div class="content">
          <div class="png"></div>
          <div class="vocation">
            <el-row :gutter="20">
              <el-col :span="8"><span>公司名称:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.company }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>公司类型:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.type }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>公司规模:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.size }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>行业领域:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.industry }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>工作地区:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.region }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>公司福利:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.treat }}
                </div></el-col
              >
            </el-row>
          </div>
        </div>
      </div>
      <div class="others">
        <div class="title">
          <div class="imgBK"></div>
          <span>招聘要求</span>
          <div class="revert" @click="revert"></div>
        </div>
        <div class="content">
          <div class="png"></div>
          <div class="vocation">
            <el-row :gutter="20">
              <el-col :span="8"><span>职位名称:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.position }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>学历要求:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.education }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>工作经验:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.experience }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>工作地点:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.address }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>职位薪资:</span></el-col>
              <el-col :span="16"
                ><div class="detail">
                  {{ detailData.salarySe }}
                </div></el-col
              >
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8"><span>发布时间:</span></el-col>
              <el-col :span="16">
                <div class="detail">
                  {{ detailData.time }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="title">
        <div class="imgBK"></div>
        <span>公司介绍</span>
      </div>
      <div class="in" porp="introduce">{{ detailData.introduce }}</div>
    </div>
    <div class="foot">
      <div class="title">
        <div class="imgBK"></div>
        <span>任职要求</span>
      </div>
      <div class="re" porp="requirement">{{ detailData.requirement }}</div>
    </div>
  </div>
</template>

<script>
import global from "@/components/global";
import request from "@/utils/request";
import Bus from "../assets/js/bus.js";
import Vue from "vue";
export default {
  name: "detail",
  //  props: {
  //   // show: {
  //   //   type: Boolean,
  //   //   default: false,
  //   // },
  //   detailData: {
  //     type: Array,
  //     default: "",
  //   },
  // },
  data() {
    return {
      detailData: [],
      try: "",
    };
  },
  created() {
    this.try = this.$route.params.a;
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      request
        .post("/api/data/queryAll", {
          code: this.try,
        })
        .then((res) => {
          console.log(res.data);
          this.detailData = res.data[0];
          console.log(this.detailData);
          this.$forceUpdate();
        });
    },
    revert() {
      this.$router.push({ name: "query" });
    },
  },
};
</script>

<style lang="less" scoped>
.details {
  // position: fixed;
  height: calc(100% - 45px);
  width: 100%;
  display: flex;
  flex-direction: column;
  .he {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1.5;
    padding: 0% 2% 2% 2%;
    .imgBK {
      width: 6.5%;
      height: 26.5%;
    }
    .other {
      height: 100%;
      width: 50%;
      flex-direction: row;
      flex-wrap: nowrap;
      // background: url("../assets/img/fq/bg-1.png") no-repeat;
      // background-size: 100% 100%;
      .png {
        height: 100%;
        width: 45%;
        background: url("../assets/img/fq/company.jpg") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
      }
    }
    .others {
      height: 100%;
      width: 50%;
      flex-direction: row;
      flex-wrap: nowrap;
      .png {
        height: 100%;
        width: 45%;
        background: url("../assets/img/fq/company1.jpeg") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
      }
      .revert {
        height: 40%;
        width: 3%;
        right: 0%;
        margin-left: 78%;
        background: url("../assets/img/fq/clear.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .middle {
    // height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0% 2% 2% 2%;
    .imgBK {
      width: 3.2%;
      height: 40%;
    }
    .in {
      width: 100%;
      height: 80%;
      padding: 1%;
      color: #fff;
      text-align: left;
      text-indent: 2em;
      line-height: 18pt;
    }
  }
  .foot {
    // height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0% 2% 2% 2%;
    .imgBK {
      width: 3.2%;
      height: 40%;
    }
    .re {
      width: 100%;
      height: 80%;
      padding: 1%;
      color: #fff;
      text-align: left;
      text-indent: 2em; //文字缩进2字符
      line-height: 18pt;
    }
  }
  .title {
    height: 20%;
    width: 100%;
    text-align: left;
    font-size: 14pt;
    display: flex;
    align-items: center;
    .imgBK {
      background: url(../assets/img/pt/pt_title.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .content {
    height: 80%;
    width: 100%;
    display: flex;
    .png {
      width: 45%;
      height: 100%;
    }
    .vocation {
      margin-left: 3%;
      width: 45%;
      height: 100%;
    }
  }
  .el-row {
    padding-bottom: 2.5%;
    .el-col {
      color: #fff;
      text-align: left;
    }
  }

  span {
    color: #fff;
  }
}
</style>
