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
        <el-col :span="3">
          <el-select v-model="listQuery.orstatus" placeholder="接单状态" size="mini">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.userstatus" placeholder="用户状态" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="listQuery.qustatus" placeholder="质量级别" size="mini">
            <el-option
              v-for="item in options2"
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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-date-picker
            v-model="userCustomdate"
            style="width: 280px"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="注册起始日期"
            end-placeholder="注册截至日期"
            value-format="yyyy-MM-dd"
            align="center"
            @change="getCustomUserList"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="userCustomlogindate"
            style="width: 280px"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="登陆起始日期"
            end-placeholder="登陆截至日期"
            value-format="yyyy-MM-dd"
            align="center"
            @change="getCustomLoginUserList"
          />
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
      <el-table-column label="接单状态">
        <template slot-scope="scope">
          {{ 0 === scope.row.orstatus ? '正常' : ( 2 === scope.row.orstatus) ? '未接单' : '禁止接单' }}
        </template>
      </el-table-column>
      <el-table-column label="通话数">
        <template slot-scope="scope">
          视频 {{ scope.row.videonum }}  语音 {{ scope.row.voicenum }}
        </template>
      </el-table-column>
      <el-table-column label="质量级别">
        <template slot-scope="scope">
          {{ scope.row.quvalue }}
        </template>
      </el-table-column>
      <el-table-column label="被喜欢数">
        <template slot-scope="scope">
          {{ scope.row.totalbuy }}
        </template>
      </el-table-column>
      <el-table-column label="累计收益">
        <template slot-scope="scope">
          {{ scope.row.totalMoney }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          {{ 0 === scope.row.userstatus ? '正常' : '屏蔽' }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="最近登陆">
        <template slot-scope="scope">
          {{ scope.row.lastLoginTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope" :span="6">
          <el-button type="text" size="mini" @click.native="goToDetail(scope.row.id)">详情</el-button>
          <el-button v-if="0 === scope.row.userstatus" type="text" size="mini" @click.native="hiddenUserAnch(scope.row)">屏蔽</el-button>
          <el-button v-else type="text" size="mini" @click.native="cancelHiddenUserAnch(scope.row)">取消屏蔽</el-button>
          <el-button v-if="0 === scope.row.orstatus" type="text" size="mini" @click.native="hiddenUserOrder(scope.row)">禁止接单</el-button>
          <el-button v-else type="text" size="mini" @click.native="cancelHiddenUserOrder(scope.row)">恢复接单</el-button>
        </el-row>
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

<script src="./anchorUser.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common";
</style>

