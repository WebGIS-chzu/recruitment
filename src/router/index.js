import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(Router)
export default new Router({
  routes: [

    {
      path: "/",
      name: "Login",
      component: Login,
      meta: {
        keepAlive: false //
      }
    },
   
    {
      path: "/skill",
      name: "skill",
      component: () => import("@/views/skill"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/ArcMap",
      name: "ArcMap",
      component: () => import("@/views/spacetime/index"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("@/views/statistics"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/skAnalysis",
      name: "skAnalysis",
      component: () => import("@/views/skAnalysis"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/query",
      name: "query",
      component: () => import("@/views/query"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/thememap",
      name: "thememap",
      component: () => import("@/views/thememap"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/salary",
      name: "salary",
      component: () => import("@/views/datapanel/salarystatistics"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/education",
      name: "education",
      component: () => import("@/views/datapanel/educationstatistics"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/experience",
      name: "experience",
      component: () => import("@/views/datapanel/workexperience"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/aggregation",
      name: "aggregation",
      component: () => import("@/views/thematicmap/pointaggregation"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/sequential",
      name: "sequential",
      component: () => import("@/views/thematicmap/sequential"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/graded",
      name: "graded",
      component: () => import("@/views/thematicmap/gradedcolor"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/flow",
      name: "flow",
      component: () => import("@/views/thematicmap/personnelflow"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/thermodynamic",
      name: "thermodynamic",
      component: () => import("@/views/thematicmap/thermodynamic"),
      meta: {
        keepAlive: true //
      }
    },
    {
      path: "/factor",
      name: "factor",
      component: () => import("@/views/thematicmap/factorstatistics"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/components/detail"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/details",
      name: "details",
      component: () => import("@/components/details"),
      meta: {
        keepAlive: true
      }
    },
  ]
})
