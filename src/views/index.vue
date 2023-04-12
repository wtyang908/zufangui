<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="省级地址" prop="houseProvinceAddress">
        <el-input
          v-model="queryParams.houseProvinceAddress"
          placeholder="请输入房屋省级地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市级地址" prop="houseCityAddress">
        <el-input
          v-model="queryParams.houseCityAddress"
          placeholder="请输入房屋市级地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="具体地址" prop="houseAddress">
        <el-input
          v-model="queryParams.houseAddress"
          placeholder="请输入房屋具体地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="house-carousel">
      <h1 class="title1">热门导购</h1>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(house, index) in processedHouseList1" :key="index">
          <div class="house-item1">
            <img class="house-img1" :src="'/dev-api' + house.houseImage" alt="">
            <div class="house-info1">
              <h3 class="house-title1">地址：{{ house.houseProvinceAddress }}{{ house.houseCityAddress }}{{ house.houseAddress }}</h3>
              <div class="house-desc1">具体描述：{{ house.houseDesc }}</div>
              <div class="house-owner1">房东：{{ house.houseOwnerName }}</div>
              <div class="house-price1">价格：{{ house.housePrice }}元/天</div>
              <el-button class="house-btn1" type="primary"  @click="handledetail(house.id)"  v-hasPermi="['system:house:query']">查看详情</el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>




    <!--      <el-form-item label="房屋名称" prop="houseName">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.houseName"-->
    <!--          placeholder="请输入房屋名称"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="房屋描述" prop="houseDesc">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.houseDesc"-->
    <!--          placeholder="请输入房屋描述"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="房东ID" prop="houseOwnerId">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.houseOwnerId"-->
    <!--          placeholder="请输入房东ID"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="房东姓名" prop="houseOwnerName">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.houseOwnerName"-->
    <!--          placeholder="请输入房东姓名"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="房屋价格" prop="housePrice">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.housePrice"-->
    <!--          placeholder="请输入房屋价格"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="是否出租" prop="checkRent">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.checkRent"-->
    <!--          placeholder="请输入是否出租"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="房屋审核" prop="checkOpion">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.checkOpion"-->
    <!--          placeholder="请输入房屋审核"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="审核者ID" prop="checkerId">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.checkerId"-->
    <!--          placeholder="请输入审核者ID"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="审核者姓名" prop="checkerName">-->
    <!--        <el-input-->
    <!--          v-model="queryParams.checkerName"-->
    <!--          placeholder="请输入审核者姓名"-->
    <!--          clearable-->
    <!--          @keyup.enter.native="handleQuery"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="审核时间" prop="checkDate">-->
    <!--        <el-date-picker clearable-->
    <!--          v-model="queryParams.checkDate"-->
    <!--          type="date"-->
    <!--          value-format="yyyy-MM-dd"-->
    <!--          placeholder="请选择审核时间">-->
    <!--        </el-date-picker>-->
    <!--      </el-form-item>-->




    <!--    <el-table v-loading="loading" :data="houseList" @selection-change="handleSelectionChange">-->
    <!--      <el-table-column type="selection" width="55" align="center" />-->
    <h1 class="title1">所有房型展示</h1>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd "
          v-hasPermi="['system:house:add']"
        >新增</el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['system:house:edit']"-->
      <!--        >修改</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['system:house:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:house:export']"
        >导出</el-button>
      </el-col>
      <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    </el-row>
    <div class="house-list">
      <el-row :gutter="20" v-for="(house, index) in processedHouseList" :key="index" @selection-change="handleSelectionChange">
        <el-col :xs="24" :sm="8" :md="6" :lg="4">
          <img class="house-img" :src="'/dev-api' + house.houseImage" alt="">
        </el-col>
        <el-col :xs="24" :sm="16" :md="18" :lg="20">
          <div class="house-info">
            <div class="house-content">
              <h3 class="house-title">地址：{{ house.houseProvinceAddress }}{{ house.houseCityAddress }}{{ house.houseAddress }}</h3>
              <div class="house-desc">具体描述：{{ house.houseDesc }}</div>
              <div class="house-owner">房东：{{ house.houseOwnerName }}</div>
              <div class="house-price">价格：{{ house.housePrice }}元/天</div>
            </div>
            <div class="house-action">
              <el-button type="primary" size="small" @click="handledetail(house.id)"  v-hasPermi="['system:house:query']">查看详情</el-button>
            </div>
          </div>
        </el-col>
      </el-row>


    </div>
    <!--      <el-table-column label="房屋id" align="center" prop="id" />-->
    <!--      <el-table-column label="房屋省级地址" align="center" prop="houseProvinceAddress" />-->
    <!--      <el-table-column label="房屋市级地址" align="center" prop="houseCityAddress" />-->
    <!--      <el-table-column label="房屋具体地址" align="center" prop="houseAddress" />-->
    <!--      <el-table-column label="房屋名称" align="center" prop="houseName" />-->
    <!--      <el-table-column label="房屋描述" align="center" prop="houseDesc" />-->
    <!--      <el-table-column label="房屋照片" align="center" prop="houseImage" width="100">-->
    <!--        <template slot-scope="scope">-->
    <!--          <image-preview :src="scope.row.houseImage" :width="50" :height="50"/>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="房东ID" align="center" prop="houseOwnerId" />-->
    <!--      <el-table-column label="房东姓名" align="center" prop="houseOwnerName" />-->
    <!--      <el-table-column label="房屋价格" align="center" prop="housePrice" />-->
    <!--      <el-table-column label="是否出租" align="center" prop="checkRent" />-->
    <!--      <el-table-column label="房屋审核状态" align="center" prop="checkOpion" />-->
    <!--      <el-table-column label="审核者ID" align="center" prop="checkerId" />-->
    <!--      <el-table-column label="审核者姓名" align="center" prop="checkerName" />-->
    <!--      <el-table-column label="审核时间" align="center" prop="checkDate" width="180">-->
    <!--        <template slot-scope="scope">-->
    <!--          <span>{{ parseTime(scope.row.checkDate, '{y}-{m}-{d}') }}</span>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="text"-->
    <!--            icon="el-icon-edit"-->
    <!--            @click="handleUpdate(scope.row)"-->
    <!--            v-hasPermi="['system:house:edit']"-->
    <!--          >修改</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="text"-->
    <!--            icon="el-icon-delete"-->
    <!--            @click="handleDelete(scope.row)"-->
    <!--            v-hasPermi="['system:house:remove']"-->
    <!--          >删除</el-button>-->
    <!--          <el-button-->
    <!--            size="mini"-->
    <!--            type="text"-->
    <!--            icon="el-icon-detail"-->
    <!--            @click="handledetail(scope.row)"-->
    <!--            v-hasPermi="['system:house:query']"-->
    <!--          >查看详情</el-button>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改房屋管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="房屋省级地址" prop="houseProvinceAddress">
          <el-input v-model="form.houseProvinceAddress" placeholder="请输入房屋省级地址" />
        </el-form-item>
        <el-form-item label="房屋市级地址" prop="houseCityAddress">
          <el-input v-model="form.houseCityAddress" placeholder="请输入房屋市级地址" />
        </el-form-item>
        <el-form-item label="房屋具体地址" prop="houseAddress">
          <el-input v-model="form.houseAddress" placeholder="请输入房屋具体地址" />
        </el-form-item>
        <el-form-item label="房屋名称" prop="houseName">
          <el-input v-model="form.houseName" placeholder="请输入房屋名称" />
        </el-form-item>
        <el-form-item label="房屋描述" prop="houseDesc">
          <el-input v-model="form.houseDesc" placeholder="请输入房屋描述" />
        </el-form-item>
        <el-form-item label="房屋照片" prop="houseImage">
          <image-upload v-model="form.houseImage"/>
        </el-form-item>
        <el-form-item label="房东ID" prop="houseOwnerId">
          <el-input v-model="form.houseOwnerId" placeholder="请输入房东ID" />
        </el-form-item>
        <el-form-item label="房东姓名" prop="houseOwnerName">
          <el-input v-model="form.houseOwnerName" placeholder="请输入房东姓名" />
        </el-form-item>
        <el-form-item label="房屋价格" prop="housePrice">
          <el-input v-model="form.housePrice" placeholder="请输入房屋价格" />
        </el-form-item>
        <el-form-item label="是否出租" prop="checkRent">
          <el-input v-model="form.checkRent" placeholder="请输入是否出租" />
        </el-form-item>
        <el-form-item label="房屋审核" prop="checkOpion"  >
          <el-input v-model="form.checkOpion" placeholder="请输入房屋审核" disabled="true" />
        </el-form-item>
        <el-form-item label="审核者ID" prop="checkerId"  >
          <el-input v-model="form.checkerId" placeholder="请输入审核者ID" disabled="true"/>
        </el-form-item>
        <el-form-item label="审核者姓名" prop="checkerName"   >
          <el-input v-model="form.checkerName" placeholder="请输入审核者姓名" disabled="true"/>
        </el-form-item >
        <el-form-item label="审核时间" prop="checkDate"  >
          <el-date-picker clearable
                          v-model="form.checkDate"
                          type="date"
                          disabled="true"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择审核时间">
          </el-date-picker>
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
import { listHouse, getHouse, delHouse, addHouse, updateHouse ,getCheckIdNameAndDate } from "@/api/system/house";
export default {
  name: "House",
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
      // 房屋管理表格数据
      houseList: [],
      //热门房屋列表
      hostHouseList: [],
      house : {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        houseProvinceAddress: null,
        houseCityAddress: null,
        houseAddress: null,
        houseName: null,
        houseDesc: null,
        houseImage: null,
        houseOwnerId: null,
        houseOwnerName: null,
        housePrice: null,
        checkRent: null,
        checkOpion: null,
        checkerId: null,
        checkerName: null,
        checkDate: null
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
    this.getCheckIdNameAndDate1();
    this.getHouseDetail();
  },
  mounted() {
  },
  computed: {
    processedHouseList() {
      return this.houseList.map(house => {
        const images = house.houseImage.split(',');
        house.houseImage = images[0];
        return house;
      }).filter(house => house.checkRent !== '是' && house.checkOpion !== '否');
    },
    processedHouseList1() {
      return this.hostHouseList.map(house => {
        const images = house.houseImage.split(',');
        house.houseImage = images[0];
        return house;
      }).filter(house => house.checkRent !== '是' && house.checkOpion !== '否');
    },
  },
  methods: {
    // ,computed实现了
    // trimHouseImagePrefix(houseList) {
    //    for (let i = 0; i < houseList.length; i++) {
    //         const house = houseList[i];
    //          const images = house.houseImage.split(',');
    //          house.houseImage=images[0];
    //          alert(house.houseImage);
    //    }
    //  },
    getHouseDetail() {
      const id = 551
      getHouse(id).then((res) => {
        this.house=res.data;
        this.hostHouseList.push(this.house);
      });
    },
    /** 获取审核员id，姓名和时间 */
    getCheckIdNameAndDate1(){
      getCheckIdNameAndDate().then((res) => {
        this.house = res.data;
      });
    },
    /** 查询房屋管理列表 */
    getList() {
      this.loading = true;
      listHouse(this.queryParams).then(response => {
        this.houseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**删除已经出租和未审核的房屋,computed实现了 **/
    // deleteHouse(){
    //   // for (let i = 0; i < this.houseList.length; i++) {
    //   //   const house = this.houseList[i];
    //   //   if (house.checkRent=="是") {
    //   //     this.houseList.splice(i, 1);
    //   //     i--;
    //   //   }
    //   //   if(house.checkOpion=="否"){
    //   //     this.houseList.splice(i, 1);
    //   //     i--;
    //   //   }
    //   // }
    //   this.houseList = this.houseList.filter((house) => {
    //     return house.checkRent !== '是' && house.checkOpion !== '否';
    //   });
    // },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        houseProvinceAddress: null,
        houseCityAddress: null,
        houseAddress: null,
        houseName: null,
        houseDesc: null,
        houseImage: null,
        houseOwnerId: null,
        houseOwnerName: null,
        housePrice: null,
        checkRent:  '否',
        checkOpion: '否',
        checkerId: null,
        checkerName: null,
        checkDate: null
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
      this.title = "添加房屋管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHouse(id).then(response => {
        this.form = response.data;
        this.form.checkOpion= this.house.checkOpion;
        this.form.checkerId=this.house.checkerId;
        this.form.checkerName=this.house.checkerName;
        this.form.checkDate=this.house.checkDate;
        this.open = true;
        this.title = "修改房屋管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHouse(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHouse(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除房屋管理编号为"' + ids + '"的数据项？').then(function() {
        return delHouse(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/house/export', {
        ...this.queryParams
      }, `house_${new Date().getTime()}.xlsx`)
    },
    handledetail(id){
      const ids = id;
      this.$router.push({path:'/housedetail',query:{id:ids}})
    }
  }
};
</script>

<style scoped>
.house-list {
  margin-top: 20px;
}
.house-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.house-info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
.house-content {
  flex: 1;
}
.house-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.house-desc {
  margin-bottom: 10px;
}
.house-owner,
.house-price {
  margin-bottom: 5px;
}
.house-action {
  margin-left: 20px;
  align-self: center;
}
.house-carousel {
  width: 100%;
  height: 500px;
}
.house-item1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.house-img1 {
  width: 400px;
  height: 400px;
  object-fit: cover;
  margin-right: 20px;
}
.house-info1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.house-title1 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.house-desc1 {
  font-size: 16px;
  margin-bottom: 10px;
}
.house-owner1,
.house-price1 {
  font-size: 14px;
  margin-bottom: 5px;
}
.house-btn1 {
  margin-top: 10px;
}
.title 1{
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
</style>
