<template>
  <div id="anChorUser" class="dashboard-container">
    <el-row :gutter="30" style="alignment: center">
      <el-col :span="10" style="background-color: #FFFFFF;padding: 15px;margin-left: 20px;height: 380px;width: 580px;margin-right: 10px;margin-top: 5px;">
        <el-row :gutter="12">
          <el-col :span="3" style="margin-left: 10px;">
            <template>
              <el-avatar :src="selRow.userpic" />
            </template>
          </el-col>
          <el-col :span="5" style="margin-left: 0px;font-size: 15px;font-weight: 600;margin-top: 10px;color: #000000;">
            <template style="alignment: left;">{{ selRow.username }}</template>
          </el-col>
          <el-col :span="5" style="margin-left: 80px;margin-top: 5px;alignment: right;">
            <el-button v-if="0 === selRow.userstatus" size="mini" style="background-color: #C34155;color: #FFFFFF;" @click.native="hiddenUserAnch(selRow)">下架机器人</el-button>
            <el-button v-else size="mini" style="background-color: #C34155;color: #FFFFFF;" @click.native="cancelHiddenUserAnch(selRow)">上架机器人</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center;">UID</template>
          </el-col>
          <el-col :span="6" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center;">{{ selRow.id }}</template>
          </el-col>
          <el-col :span="4" style="margin-left: 10px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">被喜欢数</template>
          </el-col>
          <el-col :span="2" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.likedcount }}</template>
          </el-col>
          <el-col :span="4" style="margin-left: 10px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">被呼叫数</template>
          </el-col>
          <el-col :span="2" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.likedcount }}</template>
          </el-col>
        </el-row>
        <el-row style="height: 1px;width: 300px;background-color: #E5E5E5;margin-left: 10px;" />
        <el-row :gutter="12">
          <el-col :span="4" style="margin-left: 20px;font-size: 15px;font-weight: 600;color: #000000;">
            <template style="alignment: left;">基本资料</template>
          </el-col>
          <el-col :span="3" style="color: #00000000;font-weight: 400;font-size: 14px;background-color: #00000000">
            <el-form size="mini" style="background-color: #00000000;color: #22A2F2;" @click.native="editBaseinfo(selRow)">编辑资料</el-form>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="4" style="margin-left: 20px;font-size: 14px;font-weight: 400;color: #848484;">
            <template style="alignment: center;">质量级别</template>
          </el-col>
          <el-col :span="2" style="font-size: 14px;font-weight: 600;color: #000000;">
            <template style="alignment: center;">{{ selRow.quvalue }}</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">出生日期</template>
          </el-col>
          <el-col :span="5" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.birthday }}</template>
          </el-col>
          <el-col :span="3" style="margin-left: 0px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">身高</template>
          </el-col>
          <el-col :span="3" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.bodylength }}</template>
          </el-col>
          <el-col :span="3" style="margin-left: 10px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">城市</template>
          </el-col>
          <el-col :span="3" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.path }}</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">标签</template>
          </el-col>
          <el-col :span="16" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.signinfo }}</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">个人介绍</template>
          </el-col>
          <el-col :span="16" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.myselfintro }}</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">语音</template>
          </el-col>
          <el-col :span="3" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ voicetotal }}</template>
          </el-col>
          <el-col :span="5" style="color: #00000000;font-weight: 400;font-size: 14px;background-color: #00000000">
            <el-form size="mini" style="background-color: #00000000;color: #22A2F2;" @click.native="voiceDialog(selRow)">点击播放</el-form>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">照片</template>
          </el-col>
          <el-col :span="3" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ picturetotal }}</template>
          </el-col>
          <el-col :span="5" style="color: #00000000;font-weight: 400;font-size: 14px;background-color: #00000000">
            <el-form size="mini" style="background-color: #00000000;color: #22A2F2;" @click.native="pictureDialog">点击查看大图</el-form>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" style="background-color: #FFFFFF;padding: 10px;margin-left: 5px;margin-top: 5px;height: 380px;">
        <el-row :gutter="12" style="margin-top: 10px;">
          <el-col :span="8" style="margin-left: 10px;color: #000000;font-weight: 400;font-size: 18px;">
            <template style="alignment: center">接单及收益信息</template>
          </el-col>
          <el-col :span="5" style="color: #00000000;font-weight: 400;font-size: 14px;background-color: #00000000">
            <el-form size="mini" style="background-color: #00000000;color: #22A2F2;" @click.native="editOrderinfo(selRow)">编辑资料</el-form>
          </el-col>
        </el-row>
        <el-row style="height: 1px;width: 300px;background-color: #E5E5E5;margin-left: 10px;" />
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">视频接单</template>
          </el-col>
          <el-col :span="2" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template v-if="0 === selRow.videosetflag" style="alignment: center">关</template>
            <template v-else style="alignment: center">开</template>
          </el-col>
          <el-col :span="4" style="margin-left: 0px;color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.videoset }}</template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="margin-left: 20px;color: #848484;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">语音接单</template>
          </el-col>
          <el-col :span="2" style="color: #171717;font-weight: 400;font-size: 14px;">
            <template v-if="0 === selRow.voicesetflag" style="alignment: center">关</template>
            <template v-else style="alignment: center">开</template>
          </el-col>
          <el-col :span="4" style="margin-left: 0px;color: #171717;font-weight: 400;font-size: 14px;">
            <template style="alignment: center">{{ selRow.voiceset }} </template>
          </el-col>
        </el-row>
        <el-row style="background-color: #F4F4F4;padding: 20px;margin: 10px;">
          <el-row :gutter="12">
            <el-col :span="3" style="margin-left: 0px;color: #848484;font-weight: 400;font-size: 14px;">
              <template style="alignment: center">累计收益</template>
            </el-col>
            <el-col :span="4" style="margin-left: 10px;color: #171717;font-weight: 400;font-size: 14px;">
              <template style="alignment: center">{{ selRow.tianmon + '   ' + selRow.tianticket }}</template>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" style="color: #00000000;font-weight: 400;font-size: 14px;margin-left: 0px;background-color: #00000000">
              <el-form size="mini" style="background-color: #00000000;color: #22A2F2;" @click.native="dealDetail">查看交易明细</el-form>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="alignment: center;background-color: #FFFFFF;padding: 20px;margin-left: 5px;margin-right: 5px;margin-bottom: 5px;">
      <el-row :gutter="12">
        <el-col :span="4" style="margin-left: 0px;margin-top: 5px;color: #000000;font-size: 18px;font-weight: 400;">
          <template style="alignment: center">通话记录</template>
        </el-col>
      </el-row>
      <el-row style="height: 1px;width: 300px;background-color: #E5E5E5;margin-left: 0px;" />
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
        <el-table-column label="最近聊天时间">
          <template slot-scope="scope">
            {{ scope.row.create_time }}
          </template>
        </el-table-column>
        <template>
          <el-table-column label="聊天对象ID">
            <template slot-scope="scope">
              {{ scope.row.user_id }}
            </template>
          </el-table-column>
          <el-table-column label="聊天收益合计">
            <template slot-scope="scope">
              {{ scope.row.singlemon }}
            </template>
          </el-table-column>
          <el-table-column label="聊天发起">
            <template slot-scope="scope">
              {{ 0 === scope.row.calltype ? '语音' : '视频' }}
            </template>
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
      <el-row /></el-row>
    <el-dialog
      :key="timer"
      center
      :append-to-body="true"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formTitle"
      :visible.sync="formVisible"
      width="40%"
    >
      <el-form ref="formDeal" :model="formDeal" :rules="rules">
        <el-table
          :data="deallist"
          border
          fit
          highlight-current-row
          @current-change="handleQCurrentChange"
        >
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>
          <el-table-column label="交易类型">
            <template slot-scope="scope">
              {{ 0 === scope.row.dealtype ? '聊天' : (1 === scope.row.dealtype) ? '语音' : (2 === scope.row.dealtype) ? '视频' : '提现' }}
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              {{ (3 === scope.row.dealtype) ? ('-' + scope.row.dealmon) : ('+' + scope.row.dealmon) }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :page-sizes="[6]"
          :page-size="listDealQuery.limit"
          :total="dealtotal"
          :current-page.sync="listDealQuery.page"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext"
        />
      </el-form>
    </el-dialog>
    <el-dialog
      :key="timer"
      center
      :append-to-body="true"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formBaseEdTitle"
      :visible.sync="formBaseEdVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row size="mini">
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">用户昵称</template>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.username" minlength="1" placeholder="输入用户昵称" size="mini" style="width: 300px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 5px;">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">质量级别</template>
            </el-col>
            <el-col :span="6">
              <el-select v-model="form.quvalue" size="mini" placeholder="质量级别">
                <el-option
                  v-for="item in optionsQu"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">出生日期</template>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.birthday" minlength="1" placeholder="输入出生日期" size="mini" style="width: 300px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">身高</template>
            </el-col>
            <el-col :span="6">
              <el-input v-model="form.bodylength" minlength="1" placeholder="输入身高" size="mini" style="width: 280px;" />
            </el-col>
            <el-col :span="2" style="margin-left: 160px;margin-top: 5px;">
              <template size="mini" style="alignment: center">cm</template>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">城市</template>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.path" minlength="1" placeholder="输入城市" size="mini" style="width: 300px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">标签</template>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.signinfo" minlength="1" placeholder="输入标签" size="mini" style="width: 300px;" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
              <template size="mini" style="alignment: center">个人介绍</template>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.myselfintro" minlength="1" placeholder="输入个人介绍" size="mini" style="width: 300px;" />
            </el-col>
          </el-row>
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 100px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="modifyBaseinfo">{{ $t('button.submit') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="formBaseEdVisible = false">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :key="timer"
      center
      :append-to-body="true"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formOrderEdTitle"
      :visible.sync="formOrderEdVisible"
      width="40%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row size="mini">
          <el-row :gutter="20">
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
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
            <el-col :span="6" style="margin-left: 90px;margin-top: 10px;">
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
            <el-col :span="4" style="margin-left: 60px;margin-top: 5px;">
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
            <el-col :span="6" style="margin-left: 90px;margin-top: 10px;">
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
        </el-row>
        <el-form-item>
          <el-col :span="6" style="margin-left: 100px;">
            <el-button type="primary" size="mini" style="background-color: #B441C3;color: #FFFFFF" @click="modifyOrderSet">{{ $t('button.submit') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" style="background-color: #848484;color: #FFFFFF" @click.native="formOrderEdVisible = false">{{ $t('button.cancel') }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :key="timer"
      center
      :append-to-body="true"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :title="formVoiceTitle"
      :visible.sync="formVoiceVisible"
      width="26%"
    >
      <el-form ref="formVoice" :model="formVoice">
        <el-table
          fit
          :data="voicelist"
          highlight-current-row
          @current-change="handleQCurrentChange"
        >
          <el-table-column>
            <template slot-scope="scope">
              <audio :src="scope.row.url" controls="controls" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="formPictureVisible"
      width="0%"
      :show-close="false"
      style="background-color: #000000;"
    >
      <el-row :span="5" style="margin-top: 0px;margin-left: 160px;">
        <template style="color: #FFFFFF;width: 100px;">{{ (n + 1) + '/' + picturelist.length }}</template>
      </el-row>
      <el-row :gutter="0" style="width: 450px;">
        <el-col :span="2" style="margin-top: 140px;">
          <!-- 左箭头 -->
          <a class="left" @click="prev">
            <img src="img/icon_leftback.png" style="width: 20px;height: 35px;">
          </a>
        </el-col>
        <el-col :span="8">
          <img v-for="(item,index) in picturelist" v-show="n===index" :key="index" :src="item.url" style="height: 340px;width: 260px;object-fit: cover;alignment: center;">
        </el-col>
        <el-col :span="2" style="margin-left: 120px;margin-top: 140px;">
          <!-- 右箭头 -->
          <a class="right" @click="next">
            <img src="img/icon_rightback.png" style="width: 20px;height: 35px;">
          </a>
        </el-col>
      </el-row>
      <el-row :span="5" style="margin-top: 0px;margin-left: 160px;">
        <a @click="formPictureVisible = false">
          <img src="img/icon_close.png" style="width: 15px;height: 15px;">
        </a>
      </el-row>
    </el-dialog>
  </div>
</template>
<script src="./robotUserDetail.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-row{
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.dashboard {

  &-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    background-color: #E0E1E2;
  }
  &-text {
    font-size: 14px;
    line-height: 20px;
    padding-bottom:0px;
    font-weight: bold;
  }
  &-titletext {
    font-size: 12px;
    line-height: 14px;
    padding-bottom:10px;
    color: #001528;
  }
  &-titletext3 {
    font-size: 12px;
    line-height: 14px;
    padding-bottom:10px;
    color: #ff4d51;
  }
  &-titletext2 {
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
  }
}
.echarts{
  width: 100%;
  height: 100%;
}
.box-card{
  height:108px;
}
.chart{
  height: 350px;
}
.section{
  padding:0px;
  background-color: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
}

.box-card > div >div > .svg-icon {
  width: 4em;
  height: 4em;
  color:#34bfa3;
}
.card-panel-text{
  padding-top:10px;
  font-size:16px;
  color:gray;
}
.card-panel-num{
  padding-top:10px;
  font-size:20px;
  font-weight: bold;
}
#app{
  width: 500px;
  height: 300px;
  margin: 30px auto;
  background-color: #ddd;
}
#app ul{
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
}
#app ul li{
  display: inline-block;
  padding:0 10px;
  color:#fff;
}
#app .active{
  background:#eeeeee;
  color: #eee;
}
.tabCon{
  padding: 0px;
  background-color: #FFFFFF;
}
</style>
