<template>
  <div class="app-container">


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd3"
          v-hasPermi="['system:comments:add']"
        >新增评论</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList35"></right-toolbar>
    </el-row>

    <el-row>
      <div style="margin: 5px auto; width: 100%">
        <span style="text-align: left; font-size: 20px; font-weight: bold;">评论列表</span>
        <div v-if="commentsListByHouseId.length == 0" style="text-align: left; font-size: 16px; font-weight: bold; margin-left: 20px; margin-top: 20px;">暂无评论，期待您的评论~</div>
        <div v-else v-for="item in commentsListByHouseId" :key="item.id">
          <div style="display: flex; margin-top: 20px;">
            <div style="width: 50px">
              <img :src="'/dev-api' + item.avatar" class="commentAvatar">
            </div>
            <div style="flex: 1; margin-left: 10px;">
              <div>{{ item.nickName }}</div>
              <div style="color: #666; margin-top: 5px;">{{ item.content }}</div>
              <div style="color: #999; font-size: 12px; margin-top: 5px;">{{ item.createTime }}</div>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate3(item.id)"
                v-hasPermi="['system:comments:edit']"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete3(item.id)"
                v-hasPermi="['system:comments:remove']"
              >删除</el-button>


              <!-- 多级回复 -->
              <div style="text-align: right;">
                <el-button type="text" @click=" showReplyBox(item.id)">查看回复</el-button>
              </div>
              <div v-for="reply in item.replyCommentList" :key="reply.id">
                <div style="display: flex;">
                  <div style="width: 50px">
                    <img :src="'/dev-api' + reply.avatar" class="commentAvatar">
                  </div>
                  <div style="flex: 1; margin-left: 10px; margin-bottom: 5px">
                    <div>
                      <!--                      <span style="cursor: pointer" @click="showReplyBox(reply.id)">{{ reply.userName }} 回复 </span>-->
                      <span>{{ reply.userName }} 回复 </span>
                      <span style="color: cornflowerblue">@{{ reply.toUserName}}</span>
                    </div>
                    <div style="color: #666; margin-top: 5px;">{{ reply.content }}</div>
                    <div style="color: #999; font-size: 12px; margin-top: 5px;">{{ reply.createTime }}</div>
                  </div>
                </div>
              </div>


              <div v-show="replyInfo.showReplyBox && replyInfo.id == item.id">
                <el-input type="textarea" placeholder="请输入回复~"  v-model.lazy="replyContent"></el-input>
                <div style="text-align: right; margin: 5px 0;">
                  <el-button type="primary" @click="shutReplyBox">取消</el-button>
                  <el-button type="primary" @click="submitReply(item.id, item.userId)">提交</el-button>
                </div>
              </div>

            </div>
          </div>
          <el-divider style="height: 1px"></el-divider>


        </div>
      </div>
    </el-row>






    <pagination
      v-show="total3>0"
      :total="total3"
      :page.sync="queryParams3.pageNum"
      :limit.sync="queryParams3.pageSize"
      @pagination="getList3"
    />

    <!-- 添加或修改房屋评论对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form3" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form3.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="房屋id" prop="houseId">
          <el-input v-model="form3.houseId" placeholder="请输入房屋id" />
        </el-form-item>
        <el-form-item label="评论内容">
          <editor v-model="form3.content" :min-height="192"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel3">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listComments,
  getComments,
  delComments,
  addComments,
  updateComments,
  listCommentsByHouseId
} from "@/api/system/comments";
import {addReply, selectHouseReplyByCommentId} from "@/api/system/reply";

export default {
  name: "Comments",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total3: 0,
      // 房屋评论表格数据
      commentsList: [],
      commentsListByHouseId: [],
      replyContent: '',
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams3: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        houseId: null,
        content: null,
      },
      // 表单参数
      form3: {},
      // 表单校验
      rules: {
      },
      replyInfo: {
        id: null,
        showReplyBox: false
      },
    };
  },
  mounted() {
    this.getList3();
  },
  created() {
    this.getList35();
  },
  methods: {

    getList3(){
      listCommentsByHouseId('551').then((res) => {
        this.commentsListByHouseId=res.data;
        this.commentsListByHouseId.forEach(comments=>{
          selectHouseReplyByCommentId(comments.id).then(res=>{
            comments.replyCommentList=res.data;
            console.log(comments.replyCommentList);
          })
        });
      })
    },
    showReplyBox(id) {
      this.replyInfo.id = id;
      this.replyInfo.showReplyBox = true;
    },
    shutReplyBox() {
      this.replyInfo.showReplyBox = false;
      this.replyContent = '';
    },
    submitReply(id, toUserId){
      const data = {
        userId: this.$store.state.user.userId,
        houseId: 1,
        commentId: id,
        toUserId: toUserId,
        content: this.replyContent
      }
      addReply(data).then(res=>{
         this.replyContent = '';
          this.getList3();
      })
    },

    /** 查询房屋评论列表 */
    getList35() {
      this.loading = true;
      listComments(this.queryParams3).then(response => {
        this.commentsList = response.rows;
        this.total3 = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel3() {
      this.open = false;
      this.reset3();
    },
    // 表单重置
    reset3() {
      this.form3 = {
        id: null,
        userId: null,
        houseId: null,
        content: null,
        createTime: null
      };
      this.resetForm("form");
    },

    /** 新增按钮操作 */
    handleAdd3() {
      this.reset3();
      this.open = true;
      this.title = "添加房屋评论";
    },
    /** 修改按钮操作 */
    handleUpdate3(id) {
      this.reset3();
      getComments(id).then(response => {
        this.form3 = response.data;
        this.open = true;
        this.title = "修改房屋评论";
      });
    },
    /** 提交按钮 */
    submitForm3() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form3.id != null) {
            updateComments(this.form3).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addComments(this.form3).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete3(id) {
      const ids = id;
      this.$modal.confirm('是否确认删除房屋评论编号为"' + ids + '"的数据项？').then(function() {
        return delComments(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
  }
};
</script>


<style lang="scss" scoped>
.container {
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bgCol {
  width: 1050px;
  height: 450px;
  margin: 0 auto;
}
.coverImg-container {
  border-radius: 4px;
  width: 1050px;
  height: 450px;
  margin-top: 40px;
  text-align: center;
}
.bg-purple {
  background: #FFFFFF;
  border-radius: 5px;
}
.bg-trans {
  background: rgba(255,255,255,0.6);
  //background-color: #cccccc;
  //opacity: 60%;
}
.row-bg {
  padding: 10px 0;
  background-color: #FFFFFF;
}
.row-title {
  margin-top: -85px;
}
.headRight {
  margin-left: 330px;
  margin-top: 40px;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.commentAvatar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 20px;
}
.el-icon-star-off {
  transform: scale(1.2);
}
.el-icon-star-on {
  color: #ff9900;
  transform: scale(1.2);
}
.el-rate {
  transform: scale(1.1);
}
.el-divider {
  margin: 5px 0;
  background-color: #cccccc;
}
</style>
