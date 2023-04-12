<template>
  <div class="app-container">




    <!--    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">-->
    <!--      <el-table-column type="selection" width="55" align="center" />-->
    <!--      <el-table-column label="订单id" align="center" prop="id" />-->
    <!--      <el-table-column label="房间ID" align="center" prop="roomId" />-->
    <!--      <el-table-column label="租客ID" align="center" prop="tenantId" />-->
    <!--      <el-table-column label="租客名" align="center" prop="tenantName" />-->
    <!--      <el-table-column label="起始时间" align="center" prop="startDate" width="180">-->
    <!--        <template slot-scope="scope">-->
    <!--          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="结束时间" align="center" prop="endDate" width="180">-->
    <!--        <template slot-scope="scope">-->
    <!--          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="审核状态" align="center" prop="checkOpion" />-->
    <!--      <el-table-column label="审核者ID" align="center" prop="checkerId" />-->
    <!--      <el-table-column label="审核者姓名" align="center" prop="checkerName" />-->
    <!--      <el-table-column label="审核时间" align="center" prop="checkDate" width="180">-->
    <!--        <template slot-scope="scope">-->
    <!--          <span>{{ parseTime(scope.row.checkDate, '{y}-{m}-{d}') }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="yes：已退租，no：没退租" align="center" prop="isHistory" />-->
    <!--      <el-table-column label="价格" align="center" prop="price" />-->
    <!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="text"-->
    <!--            icon="el-icon-edit"-->
    <!--            @click="handleUpdate(scope.row)"-->
    <!--            v-hasPermi="['system:order:edit']"-->
    <!--          >修改</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="text"-->
    <!--            icon="el-icon-delete"-->
    <!--            @click="handleDelete(scope.row)"-->
    <!--            v-hasPermi="['system:order:remove']"-->
    <!--          >删除</el-button>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->

    <el-table :data="orderList" style="width: 100%">
      <el-table-column label="订单信息" align="center">
        <el-table-column label="订单ID" align="center" prop="id" />
        <el-table-column label="房间ID" align="center" prop="roomId" />
        <el-table-column label="租客ID" align="center" prop="tenantId" />
        <el-table-column label="租客名" align="center" prop="tenantName" />
      </el-table-column>
      <el-table-column label="租赁信息" align="center">
        <el-table-column label="起始时间" align="center" prop="startDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" prop="endDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否退租" align="center" prop="isHistory" />
        <el-table-column label="价格" align="center" prop="price" />
      </el-table-column>
      <el-table-column label="审核信息" align="center">
        <el-table-column label="审核状态" align="center" prop="checkOpion" />
        <el-table-column label="审核者ID" align="center" prop="checkerId" />
        <el-table-column label="审核者姓名" align="center" prop="checkerName" />
        <el-table-column label="审核时间" align="center" prop="checkDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.checkDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:order:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>








    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="房间ID" prop="roomId">
          <el-input v-model="form.roomId" placeholder="请输入房间ID" />
        </el-form-item>
        <el-form-item label="租客ID" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租客ID" />
        </el-form-item>
        <el-form-item label="租客名" prop="tenantName">
          <el-input v-model="form.tenantName" placeholder="请输入租客名" />
        </el-form-item>
        <el-form-item label="起始时间" prop="startDate">
          <el-date-picker clearable
                          v-model="form.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker clearable
                          v-model="form.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态" prop="checkOpion">
          <el-input v-model="form.checkOpion" placeholder="请输入审核状态" disabled="true" />
        </el-form-item>
        <el-form-item label="审核者ID" prop="checkerId">
          <el-input v-model="form.checkerId" placeholder="请输入审核者ID" disabled="true"/>
        </el-form-item>
        <el-form-item label="审核者姓名" prop="checkerName">
          <el-input v-model="form.checkerName" placeholder="请输入审核者姓名" disabled="true"/>
        </el-form-item>
        <el-form-item label="审核时间" prop="checkDate">
          <el-date-picker clearable
                          v-model="form.checkDate"
                          type="date"
                          disabled="true"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="租房状态" prop="isHistory">
          <el-input v-model="form.isHistory" placeholder="请输入是：已退租，否：没退租" disabled="true" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  getCheckIdNameAndDate,
  getTenantId
} from "@/api/system/order";


export default {
  name: "Order",
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
      total: 0,
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      ten : {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roomId: null,
        tenantId:  this.$store.state.user.userId,
        tenantName: null,
        startDate: null,
        endDate: null,
        checkOpion: null,
        checkerId: null,
        checkerName: null,
        checkDate: null,
        isHistory: null,
        price: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        roomId: [
          { required: true, message: "房间ID不能为空", trigger: "blur" }
        ],
        tenantId: [
          { required: true, message: "租客ID不能为空", trigger: "blur" }
        ],
        tenantName: [
          { required: true, message: "租客名不能为空", trigger: "blur" }
        ],
        isHistory: [
          { required: true, message: "yes：已退租，no：没退租不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getCheckIdNameAndDate1();
  },
  computed:{

  },
  methods: {
    /** 获取审核员id，姓名和时间 */
    getCheckIdNameAndDate1(){
      getCheckIdNameAndDate().then((res) => {
        this.order = res.data;
      });
    },

    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        roomId: null,
        tenantId:  this.$store.state.user.userId,
        tenantName: null,
        startDate: null,
        endDate: null,
        checkOpion: null,
        checkerId: null,
        checkerName: null,
        checkDate: null,
        isHistory: null,
        price: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.form.checkOpion=this.order.checkOpion;
        this.form.checkerId=this.order.checkerId;
        this.form.checkDate=this.order.checkDate;
        this.form.checkerName=this.order.checkerName;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除订单编号为"' + ids + '"的数据项？').then(function() {
        return delOrder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/order/export', {
        ...this.queryParams
      }, `order_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style>
.orders {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-item {
  width: 100%;
  margin-bottom: 10px;
}

.order-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

.order-info > * {
  flex: 1;
  margin-right: 10px;
}

.order-info > *:last-child {
  margin-right: 0;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.actions > * {
  margin-right: 5px;
}

.actions > *:last-child {
  margin-right: 0;
}

</style>
