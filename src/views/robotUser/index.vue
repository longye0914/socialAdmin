<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <!--        <el-col :span="4">-->
        <!--          <el-input v-model="listQuery.mobile" size="mini" placeholder="手机号"></el-input>-->
        <!--        </el-col>-->
        <!--        <el-col :span="4">-->
        <!--          <el-input v-model="listQuery.nickName" size="mini"  placeholder="昵称"></el-input>-->
        <!--        </el-col>-->
        <el-col :span="3">
          <el-input v-model="listQuery.id" size="mini" placeholder="输入UID" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.username" size="mini" placeholder="输入昵称" />
        </el-col>
        <el-col :span="6">
          <el-button size="mini" style="background-color: #9B9B9B;color: #FFFFFF;" @click.native="reset">{{ $t('button.reset') }}</el-button>
          <el-button size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="search">{{ $t('button.search') }}</el-button>
        </el-col>
        <el-col :span="6" style="margin-left: 60px;">
          <el-button v-permission="['/mgr/add']" size="mini" style="background-color: #262626;color: #FFFFFF;" @click.native="add">创建机器人</el-button>
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
      <el-table-column label="被聊天数">
        <template slot-scope="scope">
          视频 {{ scope.row.videonum }}  语音 {{ scope.row.voicenum }}
        </template>
      </el-table-column>
      <el-table-column label="被呼数">
        <template slot-scope="scope">
          {{ scope.row.totalbuy }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope" :span="6">
          <el-button type="text" size="mini" @click.native="goToDetail(scope.row.id)">查看</el-button>
          <el-button v-if="0 === scope.row.userstatus" type="text" size="mini" @click.native="hiddenUser(scope.row)">下架机器人</el-button>
          <el-button v-else type="text" size="mini" @click.native="cancelHiddenUser(scope.row)">上架机器人</el-button>
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
            <template size="mini" style="alignment: center">头像</template>
          </el-col>
          <el-row style="margin: 10px">
            <el-upload
              v-if="!addheadpic"
              v-model="addheadpic"
              class="upload-demo"
              drag
              :action="form.userpic"
              :before-upload="handleBeforeUpload"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">头像上传</div>
            </el-upload>
            <el-image v-else :src="addheadpic" style="width: 300px; height: 200px" /></el-row>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">昵称</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.username" minlength="1" placeholder="输入昵称" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">出生日期</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.birthday" minlength="1" placeholder="输入日期 格式 xxxx-xx-xx" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">身高</template>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.bodylength" minlength="1" placeholder="输入身高" size="mini" style="width: 200px;" />
          </el-col>
          <el-col :span="4" style="margin-left: 70px;margin-top: 5px;">
            <template size="mini" style="alignment: center">cm</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">城市</template>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.path" minlength="1" placeholder="输入城市名" size="mini" style="width: 300px;" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">标签</template>
          </el-col>
          <el-col :span="16" style="margin-left: 0px;">
            <!-- 已选标签 -->
            <div v-if="conditions.length">
              <span class="not-active" @click="clearCondition"><span>

                <el-tag
                  v-for="(condition, index) in conditions"
                  :key="condition.id"
                  type="primary"
                  :closable="true"
                  style="margin-bottom: 5px;"
                  size="small"
                  :disable-transitions="true"
                  @close="removeCondition(condition, index)"
                  @click="removeCondition(condition, index)"
                >
                  {{ condition.name }}
                </el-tag>
              </span></span></div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <!-- 待选标签 -->
          <div v-for="(category, categoryIndex) in categories" :key="category.id" style="margin-left: 50px;margin-top: 2px;">
            <!-- 分类  -->
            <span class="not-active">{{ category.name }}：</span>

            <!--              <template>-->
            <!--                <span v-if="category.count"class="not-active" @click="clearCategory(category, categoryIndex)"> 不限</span>-->
            <!--                <my-tag v-else>不限</my-tag>-->
            <!--              </template>-->

            <!-- 标签  -->
            <template v-for="(child, childIndex) in category.children">
              <my-tag v-if="child.active" class="active" :closable="true" @click-child="clickChild(category, categoryIndex, child, childIndex)">
                {{ child.name }}
              </my-tag>
              <span v-else class="not-active" @click="clickChild(category, categoryIndex, child, childIndex)">{{ child.name }}</span>
            </template>
          </div>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
            <template size="mini" style="alignment: center">个人简介</template>
          </el-col>
          <el-col :span="8">
            <el-input
              v-model="form.myselfintro"
              placeholder="输入简介，最多120字"
              size="mini"
              type="textarea"
              :rows="5"
              maxlength="120"
              show-word-limit
              style="width: 300px"
            />
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 160px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="nextStep(form)">下一步</el-button>
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
      :title="formTitle2"
      :visible.sync="formVisible2"
      width="40%"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;color: #848484;font-weight: 600;margin-top: 40px;">
            <template size="mini" style="alignment: center;">照片上传</template>
          </el-col>
          <el-col :span="14">
            <div class="recommand-wrap">
              <ul ref="cont" class="cont">
                <li v-for="item of dataList" :key="item" class="cont-item">
                  <div class="cont-img">
                    <img class="img" :src="item" :alt="item">
                  </div>
                  <div class="cont-price" @click="deletePicture(item)">
                    <span>删除</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="3" style="margin-left: 0px;margin-top: 30px;">
            <!--            accept=".png, .jpg, .jpeg, .png"-->
            <el-upload
              v-model="form.userpic"
              style="height: 30px;width: 60px"
              :accept="'image/*'"
              :action="form.userpic"
              :before-upload="handleBeforeUpload2"
              :on-success="handleUploadSuccess2"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text" style="color: #22A2F2">上传</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 60px;color: #848484;font-weight: 600;margin-top: 40px;">
            <template size="mini" style="alignment: center">添加语音</template>
          </el-col>
          <el-col :span="14">
            <div class="recomvoice-wrap">
              <ul ref="cont" class="cont">
                <li v-for="item of dataVoicelist" :key="item" class="cont-item">
                  <audio style="height: 37px;width: 100px;" :src="item" controls="controls" @canplay="getDuration" />
                  <!--                  <div style="height: 30px;width: 70px;margin: 5px">-->
                  <!--                    <img style="height: 30px;width: 70px;margin: 5px" class="img" src="img/icon_addvoicebg.png" :alt="item">-->
                  <!--                  </div>-->
                  <div class="cont-price" @click="deleteVoice(item)">
                    <span>删除</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
          <!--      accept=".mp3, .MP3, , .aac"    -->
          <el-col :span="3" style="margin-top: 30px;">
            <el-upload
              v-model="form.userpic"
              style="height: 30px;width: 60px;"
              :action="form.userpic"
              :accept="'audio/*'"
              :before-upload="handleBeforeUpload3"
              :on-success="handleUploadSuccess3"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text" style="color: #22A2F2">上传</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 40px;">
          <el-col :span="6" style="margin-left: 60px;color: #848484;font-weight: 600;">
            <el-form-item label="视频接单" prop="status">
              <el-switch
                v-model="form.videosetflag"
                on-color="#00A854"
                on-text="视频接单"
                :active-value="1"
                :inactive-value="0"
                off-color="#F04134"
                off-text="非默认"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 90px;color: #848484;font-weight: 600;margin-top: 10px;">
            <el-select v-model="form.videoset" size="mini" placeholder="视频接单">
              <el-option
                v-for="item in optionsVideo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" style="margin-left: 60px;color: #848484;font-weight: 600;">
            <el-form-item label="语音接单" prop="status">
              <el-switch
                v-model="form.voicesetflag"
                on-color="#00A854"
                on-text="语音接单"
                :active-value="1"
                :inactive-value="0"
                off-color="#F04134"
                off-text="非默认"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 90px;color: #848484;font-weight: 400;margin-top: 10px;">
            <el-select v-model="form.voiceset" size="mini" placeholder="语音接单">
              <el-option
                v-for="item in optionsVoice"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" style="margin-left: 60px;color: #848484;font-weight: 600;">
            <el-form-item label="聊天付费" prop="status">
              <el-switch
                v-model="form.priimsetflag"
                on-color="#00A854"
                on-text="聊天付费"
                :active-value="1"
                :inactive-value="0"
                off-color="#F04134"
                off-text="非默认"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 90px;color: #848484;font-weight: 600;margin-top: 10px;">
            <el-select v-model="form.priimset" size="mini" placeholder="聊天付费">
              <el-option
                v-for="item in optionsPriim"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <!--        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="视频接单" prop="status">
              <el-switch
                v-model="showDefaulthead"
                on-color="#00A854"
                on-text="视频接单"
                on-value="1"
                off-color="#F04134"
                off-text="非默认"
                off-value="0"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.videoset" minlength="1" placeholder="输入金额100-500整百数" size="mini" style="width: 200px;" />
          </el-col>
          <el-col :span="4" style="margin-left: 70px;margin-top: 5px;">
            <template size="mini" style="alignment: center">B</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="语音接单" prop="status">
              <el-switch
                v-model="showDefaulthead"
                on-color="#00A854"
                on-text="语音接单"
                on-value="1"
                off-color="#F04134"
                off-text="非默认"
                off-value="0"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.voiceset" minlength="1" placeholder="输入金额100-500整百数" size="mini" style="width: 200px;" />
          </el-col>
          <el-col :span="4" style="margin-left: 70px;margin-top: 5px;">
            <template size="mini" style="alignment: center">B</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="聊天付费" prop="status">
              <el-switch
                v-model="showDefaulthead"
                on-color="#00A854"
                on-text="聊天付费"
                on-value="1"
                off-color="#F04134"
                off-text="非默认"
                off-value="0"
                @change="changeSwitch"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.priimset" minlength="1" placeholder="输入金额100-500整百数" size="mini" style="width: 200px;" />
          </el-col>
          <el-col :span="4" style="margin-left: 70px;margin-top: 5px;">
            <template size="mini" style="alignment: center">B</template>
          </el-col>
        </el-row>-->
        <el-form-item>
          <el-col :span="6" style="margin-left: 60px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="preStep">上一步</el-button>
          </el-col>
          <el-col :span="6" style="margin-left: 0px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="addSave">完成创建</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="cancelSave2">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./robotUser.js">
// 简单封装一个公用组件
Vue.component('my-tag', {
  methods: {
    clickChild() {
      this.$emit('click-child')
    }
  },
  template: "<el-tag v-bind='$attrs' style='color: #97a8be;' v-on='$listeners' effect='dark' size='small' :disable-transitions='true' @click='clickChild' @close='clickChild'></el-tag>"
})
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common";
  .active {
    //display: table-header-group;
    font-size: 16px;
    border-color: #97a8be;
    border-radius: 10px;
    background-color: #1e6abc;
    padding: 3px;
    margin-bottom: 5px;
    margin-left: 3px;
    color: #FFFFFF;
  }
  .not-active {
    display: inline-block;
    font-size: 12px;
    margin-bottom: 5px;
    margin-left: 3px;
  }

  span {
    margin: 0 2px;
  }

  .recommand-wrap {
    height:80px;
    width: 100%;
    .cont {
      list-style: none;
      overflow-x: scroll;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
      .cont-item {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 60px;
        .cont-img {
          overflow: hidden;
          width: 60px;
          height: 60px;
          .img {
            width: 60px;
            height: 60px;
            margin: 10px;
          }
        }
        .cont-price {
          alignment: center;
          margin-top: 5px;
          .price {
            color: #ff8300;
          }
        }
      }
    }
  }
  .recomvoice-wrap {
    height:50px;
    width: 100%;
    .cont {
      list-style: none;
      overflow-x: scroll;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
      .cont-item {
        position: relative;
        display: inline-block;
        width: 110px;
        height: 37px;
        .cont-img {
          overflow: hidden;
          width: 60px;
          height: 60px;
          .img {
            width: 60px;
            height: 60px;
            margin: 10px;
          }
        }
        .cont-price {
          alignment: center;
          margin-top: 5px;
          .price {
            color: #ff8300;
          }
        }
      }
    }
  }
</style>

