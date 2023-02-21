<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.id" size="mini" placeholder="UID查询" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.username" size="mini" placeholder="昵称查询" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.callinfo" size="mini" placeholder="手机号查询" />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="userCustomdate"
            style="width: 280px"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="起始日期"
            end-placeholder="截至日期"
            value-format="yyyy-MM-dd"
            align="center"
            @change="getCustomUserList"
          />
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.state" placeholder="处理状态" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
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
      style="background-color: #E5E5E5;"
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
          {{ scope.row.callinfo }}
          <!--          <el-avatar :src="scope.row.phone" />-->
        </template>
      </el-table-column>
      <template>
        <el-table-column label="反馈内容">
          <template slot-scope="scope">
            {{ scope.row.data }}
          </template>
        </el-table-column>
        <el-table-column label="反馈时间">
          <template slot-scope="scope">
            {{ scope.row.create_time }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-row v-if="scope.row.state === 2" slot-scope="scope" :span="12">
            <el-button type="text" size="mini">已忽略</el-button>
          </el-row>
          <el-row v-else-if="scope.row.state === 1" slot-scope="scope" :span="12">
            <el-button type="text" size="mini">已处理</el-button>
          </el-row>
          <el-row v-else slot-scope="scope" :span="12">
            <el-button type="text" size="mini" @click.native="ignoreFeed(scope.row)">忽略</el-button>
            <el-button type="text" size="mini" @click.native="handleFeed(scope.row)">标记已处理</el-button>
          </el-row>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-sizes="[6]"
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

<script src="./feedback.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common.scss";
</style>
