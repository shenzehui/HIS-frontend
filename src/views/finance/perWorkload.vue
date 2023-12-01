<template>
  <div>
    <div style="margin-top:40px;margin-left:20px">
      <el-form inline>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="starttime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="endtime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryPersonal">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table style="margin-left: 10px" :data="total" stripe border>
      <el-table-column label="医生姓名" prop="staffName"></el-table-column>
      <el-table-column label="科室" prop="deptName"></el-table-column>
      <el-table-column label="成药项目总费用" prop="medicineAmount"></el-table-column>
      <el-table-column label="成药项目总费用" prop="medicineAmount"></el-table-column>
      <el-table-column label="草药项目总费用" prop="herbalAmount"></el-table-column>
      <el-table-column label="检查项目总费用" prop="checkAmount"></el-table-column>
      <el-table-column label="检验项目总费用" prop="testAmount"></el-table-column>
      <el-table-column label="处置项目总费用" prop="dispositionAmount"></el-table-column>
      <el-table-column label="挂号总费用" prop="registrationAmount"></el-table-column>
      <el-table-column label="费用总计" prop="amount"></el-table-column>
      <el-table-column label="挂号数量" prop="registrationNum"></el-table-column>
      <el-table-column label="执行检查项目总费用" prop="registrationNum"></el-table-column>
      <el-table-column label="执行检查项目总费用" prop="excuteCheckAmount"></el-table-column>
      <el-table-column label="执行检查项目总费用" prop="excuteTestAmount"></el-table-column>
      <el-table-column label="执行非药品项目总费用" prop="excuteDispositionAmount"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import {queryPersonal} from '@/api/workload'
import {parseTime} from '@/utils'

export default {
  data() {
    return {
      starttime: '',
      endtime: '',
      total: []
    }
  },
  methods: {
    queryPersonal() {
      let data = {}
      data.startDatetime = parseTime(this.starttime)
      data.endDatetime = parseTime(this.endtime)
      data.staffId = this.$store.getters.id
      queryPersonal(data).then(res => {
        this.total = []
        this.total.push(res.data)
        console.log(res)
      })
    }
  }
}
</script>

