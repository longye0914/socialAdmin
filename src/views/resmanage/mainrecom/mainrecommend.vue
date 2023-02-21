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
        <el-col :span="4">
          <el-input v-model="listQuery.phone" size="mini" placeholder="输入手机号查询" />
        </el-col>
        <el-col :span="6">
          <el-button size="mini" style="background-color: #9B9B9B;color: #FFFFFF;" @click.native="reset">{{ $t('button.reset') }}</el-button>
          <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="search">{{ $t('button.search') }}</el-button>
        </el-col>
        <el-col :span="6" style="margin-left: 60px;">
          <el-button v-permission="['/mgr/add']" size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="add">添加主播</el-button>
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
      <el-table-column label="质量级别">
        <template slot-scope="scope">
          {{ scope.row.quvalue }}
        </template>
      </el-table-column>
      <el-table-column label="被喜欢数">
        <template slot-scope="scope">
          {{ scope.row.likednumber }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope" :span="6">
          <el-button type="text" size="mini" @click.native="goToDetail(scope.row.id)">查看</el-button>
          <el-button v-if="1 === scope.row.configtype" type="text" size="mini" @click.native="removeMainUser(scope.row)">移除</el-button>
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
        <el-row :gutter="20" style="margin-left: 50px;">
          <el-col :span="8">
            <el-input v-model="form.id" minlength="1" placeholder="输入主播ID/主播昵称/手机号" size="mini" style="width: 300px;" />
          </el-col>
          <el-col :span="3" style="margin-left: 160px;">
            <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="fetchQueryData(form.id)">{{ $t('button.search') }}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="height: 150px;">
          <el-table
            :data="querylist"
            border
            fit
            highlight-current-row
            @current-change="handleQCurrentChange"
          >
            <el-table-column label="搜索结果信息：">
              <template slot-scope="scope" style="alignment: center;justify-content: center">
                {{ 'UID：' + querylist[0].id + '     ' +'昵称：' + querylist[0].username }}
              </template>
            </el-table-column>
            <!--            <el-table-column slot-scope="scope" size="mini" label="昵称">-->
            <!--              <template>-->
            <!--                {{ querylist[0].username }}-->
            <!--              </template>-->
            <!--            </el-table-column>-->
          </el-table>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="addAnchorData(querylist[0].id)">{{ $t('button.add') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelAdd">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./mainrecom.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common";
</style>

