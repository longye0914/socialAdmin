<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-col :span="5">
            <el-input v-model="listQuery.content" size="mini" placeholder="输入关键词查询" />
          </el-col>
          <el-col :span="10" style="margin-left: 30px;">
            <el-button size="mini" style="background-color: #9B9B9B;color: #FFFFFF;" @click.native="reset">{{ $t('button.reset') }}</el-button>
            <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="search">{{ $t('button.search') }}</el-button>
          </el-col>
          <el-col :span="6" style="margin-left: 60px;">
            <el-button v-permission="['/mgr/add']" size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="add">添加话术</el-button>
          </el-col>
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
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="话术">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope" :span="12">
          <el-button type="text" size="mini" @click.native="editItem(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click.native="deleteItem(scope.row)">删除</el-button>
        </el-row>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-sizes="[3]"
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
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">话术内容</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.content" minlength="1" placeholder="输入话术内容，少于50字" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="addOfficeNotice">{{ $t('button.add') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelNotice">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      center
      :title="formModiTitle"
      :visible.sync="formModiVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">话术内容</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.content" minlength="1" placeholder="输入话术内容，少于50字" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="modifyItem(form)">{{ $t('button.submit') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelModifyNotice">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./chatcommwords.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common.scss";
</style>

