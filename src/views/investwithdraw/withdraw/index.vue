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
        <el-col :span="7">
          <el-date-picker
            v-model="userCustomdate"
            style="width: 280px"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="申请起始日期"
            end-placeholder="申请截至日期"
            value-format="yyyy-MM-dd"
            align="center"
            @change="getCustomUserList"
          />
        </el-col>
        <el-col :span="7">
          <el-button size="mini" style="background-color: #9B9B9B;color: #FFFFFF;" @click.native="reset">{{ $t('button.reset') }}</el-button>
          <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="applaypass">批量通过</el-button>
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
      @select="selListData"
      @current-change="handleCurrentChange"
      @select-all="selListData"
      @clearSelection="selListData"
    >

      <el-table-column label="全选" type="selection" />
      <!--      <template slot-scope="scope">-->
      <!--        <img src="img/iconnormal.png" style="width: 20px;height: 20px;margin-left: 10px;">-->
      <!--      </template>-->
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
      <el-table-column label="提现金额">
        <template slot-scope="scope">
          {{ scope.row.withdrawmon }}
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.alipyaccount }}
        </template>
      </el-table-column>
      <el-table-column label="账户名">
        <template slot-scope="scope">
          {{ scope.row.accountname }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row v-if="0 === scope.row.applystatus" slot-scope="scope" :span="6">
          <el-button type="text" size="mini" @click.native="passWithDrawItem(scope.row)">通过</el-button>
          <el-button type="text" size="mini" @click.native="refuseDialog(scope.row)">拒绝</el-button>
        </el-row>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          {{ scope.row.remark }}
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
    <el-dialog
      :key="timer"
      :append-to-body="true"
      center
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formTitle"
      :visible.sync="formVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input v-model="form.remark" minlength="1" placeholder="默认理由" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="sureRefuse(form.remark)">确认</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelRefuse">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./withdraw.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common";
</style>

