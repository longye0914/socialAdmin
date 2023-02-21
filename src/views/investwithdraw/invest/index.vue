<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.id" size="mini" placeholder="输入UID" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.username" size="mini" placeholder="输入昵称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.phone" size="mini" placeholder="输入手机号查询" />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="userCustomdate"
            style="width: 280px"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="充值起始日期"
            end-placeholder="充值截至日期"
            value-format="yyyy-MM-dd"
            align="center"
            @change="getCustomUserList"
          />
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.investtype" placeholder="充值类型" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-button size="mini" style="background-color: #9B9B9B;color: #FFFFFF;" @click.native="reset">{{ $t('button.reset') }}</el-button>
          <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="search">{{ $t('button.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column label="UID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="充值金额">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="充值时间">
        <template slot-scope="scope">
          {{ scope.row.paymenttime }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-sizes="[5]"
      :page-size="listQuery.limit"
      :total="total"
      :current-page.sync="listQuery.page"
      @size-change="changeSize"
      @current-change="fetchPage"
      @prev-click="fetchPrev"
      @next-click="fetchNext"
    />
  </div>
</template>

<script src="./investMon.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common";
</style>

