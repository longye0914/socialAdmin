<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="6" style="margin-left: 0px;">
          <el-button v-permission="['/mgr/add']" size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="add">添加轮播图</el-button>
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
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{ scope.row.sortid }}
        </template>
      </el-table-column>
      <el-table-column label="资源名">
        <template slot-scope="scope">
          {{ scope.row.resname }}
        </template>
      </el-table-column>
      <el-table-column label="资源图片">
        <template slot-scope="scope">
          <el-image v-if="null === scope.row.src || '' === scope.row.src" :src="scope.row.src" />
          <el-image v-else :src="scope.row.src" />
        </template>
      </el-table-column>
      <el-table-column label="跳转地址">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="被呼数">
        <template slot-scope="scope">
          {{ scope.row.totalbuy }}
        </template>
      </el-table-column>
      <el-table-column label="上架时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ 0 === scope.row.type ? '未上架' : (1 === scope.row.type) ? '上架中' : '已下架' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope" :span="6">
          <el-button type="text" size="mini" @click.native="editBanner(scope.row)">编辑</el-button>
          <el-button v-if="1 === scope.row.type" type="text" size="mini" @click.native="pushDownBanner(scope.row)">下架</el-button>
          <el-button v-else type="text" size="mini" @click.native="pushUpBanner(scope.row)">上架</el-button>
          <el-button v-if="0 === scope.row.type || 2 === scope.row.type" type="text" size="mini" @click.native="deleteBanner(scope.row)">删除</el-button>
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
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">资源名称</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.resname" minlength="1" placeholder="输入资源名 小于20字" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20" size="mini">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">跳转类型</template>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.isjump" placeholder="选择跳转类型" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                size="mini"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-left: 140px;">
          <el-col :span="6">
            <el-input v-model="form.url" minlength="1" placeholder="输入H5地址" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">资源图片</template>
          </el-col>
          <el-row style="margin: 10px">
            <el-upload
              v-if="!isShowInput"
              v-model="form.src"
              class="upload-demo"
              drag
              :action="form.src"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">上传轮播图</div>
            </el-upload>
            <el-image v-else style="height: 200px;width: 300px" :src="form.src" />
          </el-row>
        </el-row>
        <el-row :span="20">
          <el-col :span="4" style="margin-left: 30px;">
            <template size="mini" style="alignment: center">是否立即上架</template>
          </el-col>
          <el-radio-group v-model="form.type" style="margin-left: 20px;">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">展示排序</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.sortid" minlength="1" placeholder="" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <!--        <el-row :gutter="20">-->
        <!--          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">-->
        <!--            <template size="mini" style="alignment: center">展示排序</template>-->
        <!--          </el-col>-->
        <!--          <el-col :span="8">-->
        <!--            <el-select v-model="form.sortid" placeholder="选择序号" size="mini">-->
        <!--              <el-option-->
        <!--                v-for="item in optionsSort"-->
        <!--                :key="item.value"-->
        <!--                size="mini"-->
        <!--                :label="item.label"-->
        <!--                :value="item.value"-->
        <!--              />-->
        <!--            </el-select>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="addBannerReq(form)">确定添加</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelSave">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :key="timer"
      :append-to-body="true"
      center
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formModifyTitle"
      :visible.sync="formModifyVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">资源名称</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.resname" minlength="1" placeholder="输入资源名 小于20字" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">跳转类型</template>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.isjump" placeholder="选择跳转类型" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                size="mini"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-left: 140px;">
          <el-col :span="6">
            <el-input v-model="form.url" minlength="1" placeholder="输入H5地址" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">资源图片</template>
          </el-col>
          <el-row style="margin: 10px">
            <el-upload
              v-if="!isShowInput"
              v-model="form.src"
              class="upload-demo"
              drag
              :action="form.src"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">上传轮播图</div>
            </el-upload>
            <el-image v-else style="height: 200px;width: 300px" :src="form.src" />
          </el-row>
        </el-row>
        <el-row :span="20">
          <el-col :span="4" style="margin-left: 30px;">
            <template size="mini" style="alignment: center">是否立即上架</template>
          </el-col>
          <el-radio-group v-model="form.type" style="margin-left: 20px;">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">展示排序</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.sortid" minlength="1" placeholder="" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="modifyBannerReq(form)">确定添加</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelModifySave">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./bannermange.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common";
</style>

