<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="房屋id" prop="houseId">
        <el-input
          v-model="queryParams.houseId"
          placeholder="请输入房屋id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="床" prop="bed">
        <el-select v-model="queryParams.bed" placeholder="请选择床" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="无线网络" prop="internet">
        <el-select v-model="queryParams.internet" placeholder="请选择无线网络" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电视" prop="tv">
        <el-select v-model="queryParams.tv" placeholder="请选择电视" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="冰箱" prop="fridge">
        <el-select v-model="queryParams.fridge" placeholder="请选择冰箱" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="洗衣机" prop="washingMachine">
        <el-select v-model="queryParams.washingMachine" placeholder="请选择洗衣机" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="空调" prop="airConditioner">
        <el-select v-model="queryParams.airConditioner" placeholder="请选择空调" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="热水器" prop="waterHeater">
        <el-select v-model="queryParams.waterHeater" placeholder="请选择热水器" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="厨房" prop="cooking">
        <el-select v-model="queryParams.cooking" placeholder="请选择厨房" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="沙发" prop="sofa">
        <el-select v-model="queryParams.sofa" placeholder="请选择沙发" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="橱柜" prop="wardrobe">
        <el-select v-model="queryParams.wardrobe" placeholder="请选择橱柜" clearable>
          <el-option
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:facilities:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:facilities:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:facilities:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:facilities:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="facilitiesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="房屋设备id" align="center" prop="id" />
      <el-table-column label="房屋id" align="center" prop="houseId">
        <template slot-scope="scope">
          {{scope.row.houseId}}
          <dict-tag :options="dict.type.sys_job_group" :value="scope.row.houseId"/>
        </template>
      </el-table-column>
      <el-table-column label="床" align="center" prop="bed">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.bed"/>
        </template>
      </el-table-column>
      <el-table-column label="无线网络" align="center" prop="internet">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.internet"/>
        </template>
      </el-table-column>
      <el-table-column label="电视" align="center" prop="tv">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.tv"/>
        </template>
      </el-table-column>
      <el-table-column label="冰箱" align="center" prop="fridge">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.fridge"/>
        </template>
      </el-table-column>
      <el-table-column label="洗衣机" align="center" prop="washingMachine">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.washingMachine"/>
        </template>
      </el-table-column>
      <el-table-column label="空调" align="center" prop="airConditioner">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.airConditioner"/>
        </template>
      </el-table-column>
      <el-table-column label="热水器" align="center" prop="waterHeater">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.waterHeater"/>
        </template>
      </el-table-column>
      <el-table-column label="厨房" align="center" prop="cooking">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.cooking"/>
        </template>
      </el-table-column>
      <el-table-column label="沙发" align="center" prop="sofa">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.sofa"/>
        </template>
      </el-table-column>
      <el-table-column label="橱柜" align="center" prop="wardrobe">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.facility_posses" :value="scope.row.wardrobe"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:facilities:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:facilities:remove']"
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

    <!-- 添加或修改房屋设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="房屋id" prop="houseId">
          <el-input v-model="form.houseId" placeholder="请输入房屋id" />
        </el-form-item>
        <el-form-item label="床" prop="bed">
          <el-radio-group v-model="form.bed">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="无线网络" prop="internet">
          <el-radio-group v-model="form.internet">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电视" prop="tv">
          <el-radio-group v-model="form.tv">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="冰箱" prop="fridge">
          <el-radio-group v-model="form.fridge">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="洗衣机" prop="washingMachine">
          <el-radio-group v-model="form.washingMachine">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="空调" prop="airConditioner">
          <el-radio-group v-model="form.airConditioner">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="热水器" prop="waterHeater">
          <el-radio-group v-model="form.waterHeater">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="厨房" prop="cooking">
          <el-radio-group v-model="form.cooking">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="沙发" prop="sofa">
          <el-radio-group v-model="form.sofa">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="橱柜" prop="wardrobe">
          <el-radio-group v-model="form.wardrobe">
            <el-radio
              v-for="dict in dict.type.facility_posses"
              :key="dict.value"
              :label="parseInt(dict.value)"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listFacilities, getFacilities, delFacilities, addFacilities, updateFacilities } from "@/api/system/facilities";

export default {
  name: "Facilities",
  dicts: ['facility_posses'],
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
      // 房屋设备表格数据
      facilitiesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        houseId: null,
        bed: null,
        internet: null,
        tv: null,
        fridge: null,
        washingMachine: null,
        airConditioner: null,
        waterHeater: null,
        cooking: null,
        sofa: null,
        wardrobe: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询房屋设备列表 */
    getList() {
      this.loading = true;
      listFacilities(this.queryParams).then(response => {
        this.facilitiesList = response.rows;
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
        houseId: null,
        bed: null,
        internet: null,
        tv: null,
        fridge: null,
        washingMachine: null,
        airConditioner: null,
        waterHeater: null,
        cooking: null,
        sofa: null,
        wardrobe: null
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
      this.title = "添加房屋设备";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFacilities(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改房屋设备";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFacilities(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFacilities(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除房屋设备编号为"' + ids + '"的数据项？').then(function() {
        return delFacilities(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/facilities/export', {
        ...this.queryParams
      }, `facilities_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
