<template>
  <!-- 主页 -->
  <div class="dashboard-editor-container">
    <!-- 3个统计模块+1个时间显示 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- 线图 -->
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import {staffPatients, deptPatients, totalPatients} from '@/api/charts'

const lineChartData = {
  newVisitis: {
    dateOfSevenDays: [],
    numOfPatients: [0, 0, 0, 0, 0, 0, 0]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  created() {
    this.getEarlySevenDays();
    staffPatients(this.$store.getters.id).then(res => {
      this.lineChartData = res.data
      this.lineChartData.label = 2
    })
  },
  methods: {
    totalPatients() {
      totalPatients().then(res => {
        this.lineChartData = res.data
        this.lineChartData.label = 1
      })
    },
    staffPatients() {
      staffPatients(this.$store.getters.id).then(res => {
        this.lineChartData = res.data
        this.lineChartData.label = 2
      })
    },
    deptPatients() {
      deptPatients(this.$store.getters.deptId).then(res => {
        this.lineChartData = res.data
        this.lineChartData.label = 3
      })
    },
    handleSetLineChartData(type) {
      if (type === 'personpatient') {
        this.staffPatients()
      } else if (type === 'deptpatient') {
        this.deptPatients()
      } else if (type === 'allpatient') {
        this.totalPatients()
      } else {

      }
      //this.lineChartData = lineChartData[type]
    },
    getEarlySevenDays() {
      let days = [];
      for (let i = 0; i <= 24 * 6; i += 24) {		//今天加上前6天
        let dateItem = new Date(Date.now() - i * 60 * 60 * 1000);	//使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        let y = dateItem.getFullYear();	//获取年份
        let m = dateItem.getMonth() + 1;	//获取月份js月份从0开始，需要+1
        let d = dateItem.getDate();	//获取日期
        m = this.addDate0(m);	//给为单数的月份补零
        d = this.addDate0(d);	//给为单数的日期补零
        let valueItem = y + '-' + m + '-' + d;	//组合
        days.push(valueItem);	//添加至数组
      }
      console.log('最近七天日期：', days);
      this.lineChartData.dateOfSevenDays = days.reverse();
    },

    //给日期加0
    addDate0(time) {
      if (time.toString().length == 1) {
        time = '0' + time.toString();
      }
      return time;
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
