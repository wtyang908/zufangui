<template>
  <div class="app-container">





    <div class="house-list" v-if="isShow">
      <el-row :gutter="20" v-for="(collect, index) in collectList" :key="index" >
        <el-col :xs="24" :sm="8" :md="6" :lg="4">
          <img class="house-img" :src="'/dev-api' + collect.house.houseImage" alt="">
        </el-col>
        <el-col :xs="24" :sm="16" :md="18" :lg="20">
          <div class="house-info">
            <div class="house-content">
              <h3 class="house-title">地址：{{ collect.house.houseProvinceAddress }}{{ collect.house.houseCityAddress }}{{ collect.house.houseAddress }}</h3>
              <div class="house-desc">具体描述：{{ collect.house.houseDesc }}</div>
              <div class="house-owner">房东：{{ collect.house.houseOwnerName }}</div>
              <div class="house-price">价格：{{ collect.house.housePrice }}元/天</div>
            </div>
            <div class="house-action">
              <el-button type="primary" size="small" @click="handleHousedetail(collect.house.id)"  v-hasPermi="['system:house:query']">查看详情</el-button>
              <el-button
                type="primary" size="small"
                @click="handleDelete(collect.id)"
                v-hasPermi="['system:collect:remove']"
              >删除</el-button>
            </div>

          </div>
        </el-col>
      </el-row>


    </div>















  </div>
</template>

<script>
import { listCollect, getCollect, delCollect, addCollect, updateCollect } from "@/api/system/collect";
import {getHouse, listHouse} from "@/api/system/house";

export default {
  name: "Collect",
  data() {
    return {
      isShow:false ,
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
      // 我的收藏表格数据
      collectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: this.$store.state.user.userId,
        houseId: null,
        createdDate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        houseId: [
          { required: true, message: "房屋id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  computed: {

  },
  methods: {

    //根据房屋id查询房屋具体信息
    getHouseList() {

    },





    /** 查询我的收藏列表 */
    getList() {
      this.loading = true;
      listCollect(this.queryParams).then(response => {
        this.collectList = response.rows;
        this.collectList.forEach(collect=>{
            getHouse(collect.houseId).then(res=>{
              // collect.house=res.data;
              const house=res.data;
              const images = house.houseImage.split(',');
              house.houseImage = images[0];
              this.$set(collect,'house',house);
            })
          }
        );
        this.total = response.total;
        this.loading = false;
        this.isShow=true;
        console.log(this.collectList);
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
        userId: null,
        houseId: null,
        createdDate: null
      };
      this.resetForm("form");
    },
    /** 删除按钮操作 */
    handleDelete(ids) {
      this.$modal.confirm('是否确认删除我的收藏编号为"' + ids + '"的数据项？').then(function() {
        return delCollect(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    handleHousedetail(id){
      const ids = id;
      this.$router.push({path:'/housedetail',query:{id:ids}})
    },

  }
};
</script>

<style>
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
</style>
