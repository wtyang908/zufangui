<template>
  <div class="app-container">


<!--    <h1>{{ this.$route.query.id }}</h1>-->
<!--    <h1>{{ this.house.data}}</h1>-->
<!--   <h1>{{ this.house.data.houseImage}}</h1>-->
<!--<h1>{{this.$store.state.user.name}}1111111</h1>-->



    <template>


      <div class="house-details">
        <div class="house-details-image">
          <image-preview :src="this.house.data.houseImage" :width="400" :height="400"/>
        </div>
        <div class="house-details-info">
          <h1 class="house-details-title">{{ this.house.data.houseDesc }}</h1>
          <el-divider class="house-details-divider"></el-divider>
          <div class="house-details-item">
            <span class="house-details-item-label">房屋id：</span>
            <span class="house-details-item-value">{{ this.house.data.id }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">房东姓名：</span>
            <span class="house-details-item-value">{{ this.house.data.houseOwnerName }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">房东ID：</span>
            <span class="house-details-item-value">{{ this.house.data.houseOwnerId }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">房屋价格：</span>
            <span class="house-details-item-value">{{ this.house.data.housePrice }} 元/天</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">是否出租：</span>
            <span class="house-details-item-value">{{ this.house.data.checkRent ? '是' : '否' }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">房屋审核：</span>
            <span class="house-details-item-value">{{ this.house.data.checkOpion }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">审核者姓名：</span>
            <span class="house-details-item-value">{{ this.house.data.checkerName }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">审核者ID：</span>
            <span class="house-details-item-value">{{ this.house.data.checkerId }}</span>
          </div>
          <div class="house-details-item">
            <span class="house-details-item-label">审核时间：</span>
            <span class="house-details-item-value">{{ this.house.data.checkDate }}</span>
          </div>
          <el-row :gutter="10" class="mb8" style="text-align:center">
            <el-row :gutter="10" class="mb8" style="text-align:center">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  size="medium"
                  @click="handleAdd"
                  style="font-size: 24px"
                >租房</el-button>
              </el-col>
            </el-row>


<!--            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
          </el-row>
        </div>
      </div>



<!--      <div>-->
<!--        <el-divider content-position="left">房屋id</el-divider>-->
<!--        <span>{{ this.house.data.id }}</span>-->
<!--        <el-divider content-position="left">房屋省级地址</el-divider>-->
<!--        <span>{{ this.house.data.houseProvinceAddress }}</span>-->
<!--        <el-divider content-position="left">房屋市级地址</el-divider>-->
<!--        <span>{{ this.house.data.houseCityAddress }}</span>-->
<!--        <el-divider content-position="left">房屋具体地址</el-divider>-->
<!--        <span>{{ this.house.data.houseAddress }}</span>-->
<!--        <el-divider content-position="left">房屋名称</el-divider>-->
<!--        <span>{{ this.house.data.houseDesc }}</span>-->
<!--        <el-divider content-position="left">房屋描述</el-divider>-->
<!--        <span>{{ this.house.data.houseAddress }}</span>-->
<!--        <el-divider content-position="left">房屋照片</el-divider>-->
<!--        <span><image-preview :src="this.house.data.houseImage" :width="50" :height="50"/></span>-->
<!--        <el-divider content-position="left">房东ID</el-divider>-->
<!--        <span>{{ this.house.data.houseOwnerId }}</span>-->
<!--        <el-divider content-position="left">房东姓名</el-divider>-->
<!--        <span>{{ this.house.data.houseOwnerName }}</span>-->
<!--        <el-divider content-position="left">房屋价格</el-divider>-->
<!--        <span>{{ this.house.data.housePrice }}</span>-->
<!--        <el-divider content-position="left">是否出租</el-divider>-->
<!--        <span>{{ this.house.data.checkRent }}</span>-->
<!--        <el-divider content-position="left">房屋审核</el-divider>-->
<!--        <span>{{ this.house.data.checkOpion }}</span>-->
<!--        <el-divider content-position="left">审核者ID</el-divider>-->
<!--        <span>{{ this.house.data.checkerId }}</span>-->
<!--        <el-divider content-position="left">审核者姓名</el-divider>-->
<!--        <span>{{ this.house.data.checkerName }}</span>-->
<!--        <el-divider content-position="left">审核时间</el-divider>-->
<!--        <span>{{ this.house.data.checkDate }}</span>-->


<!--      </div>-->

      <!--    房屋设备查看  -->


      <div v-if="this.facility.bed != null" style="display:flex; flex-direction:row; align-items:center; justify-content:center; margin:10px;">
        <div  style="text-align: left">
          <p style="margin-top:10px; font-size:24px;"> 房屋具体设备:</p>
        </div>
        <div style="margin:10px;">
          <div v-if="this.facility.bed === 1" style="text-align: center">
            <i class="el_icon_zzshafa" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">床</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">床</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.internet=== 1" style="text-align: center">
            <i class="el_icon_zzwuxianwangluo" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">无线网络</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">无线网络</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.tv === 1" style="text-align: center">
            <i class="el_icon_zzdianshiji" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">电视机</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">电视机</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.fridge === 1" style="text-align: center">
            <i class="el_icon_zzbingxiang" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">冰箱</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">冰箱</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.washingMachine === 1" style="text-align: center">
            <i class="el_icon_zzxiyiji" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">洗衣机</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">洗衣机</p>
          </div>
        </div>

        <div style=" margin:10px;">
          <div v-if="this.facility.airConditioner === 1" style="text-align: center">
            <i class="el_icon_zzkongtiao" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">空调</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">空调</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.waterHeater  === 1" style="text-align: center">
            <i class="el_icon_zzyinshuiji-" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">热水器</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">热水器</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.cooking  === 1" style="text-align: center">
            <i class="el_icon_zzchufangjiaju" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">厨房</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">厨房</p>
          </div>
        </div>


        <div style=" margin:10px;">
          <div v-if="this.facility.sofa === 1" style="text-align: center">
            <i class="el_icon_zzshafa" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">沙发</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">沙发</p>
          </div>
        </div>

        <div style="margin:10px;">
          <div v-if="this.facility.wardrobe === 1" style="text-align: center">
            <i class="el_icon_zzzhuangxiushangjia-" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">衣橱</p>
          </div>
          <div v-else style="text-align: center">
            <i class="el_icon_zzqingkong" style="font-size:50px;"></i>
            <p style="margin-top:10px; font-size:24px;">衣橱</p>
          </div>
        </div>

      </div>
      <div v-else style="text-align: center">

        <p style="margin-top:10px; font-size:24px;"> 房屋具体设备:</p>
        <p style="margin-top:10px; font-size:24px;"> 无数据来源</p>

        <div style="align-content: center">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd2"
          >新增设备信息</el-button>
        </el-col>
         </div>
      </div>



<!--      <div style="text-align: center;">-->
<!--        <p style="font-size: 30px; ">房屋具体图片展示</p>-->
<!--        <el-carousel :interval="5000" style="transform: scale(1.0);">-->
<!--          <el-carousel-item v-for="(image, index) in houseImages" :key="index">-->
<!--            <img :src="'/dev-api' + image" alt="" style="width: 400px; height: 400px;">-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--      </div>-->

      <div style="text-align: center; height: 500px" >
        <p style="font-size: 30px;">房屋具体图片展示</p>
        <el-carousel :interval="5000" style="transform: scale(1.0); height: 450px">
          <el-carousel-item v-for="(image, index) in houseImages" :key="index" >
            <img :src="'/dev-api' + image" alt="" style="width: 350px; height: 300px;">
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 地图展示 -->
      <span style="text-align: left; font-size: 20px; font-weight: bold;">房屋具体地址:{{ this.house.data.houseProvinceAddress }}{{ this.house.data.houseCityAddress }}{{ this.house.data.houseAddress }}</span>
      <template>
        <baidu-map class="map" :center=this.mapAddress :zoom="15" >
        </baidu-map>
      </template>

      <!-- 房屋评论 -->



      <el-row>
        <div style="margin: 5px auto; width: 100%">
          <span style="text-align: left; font-size: 20px; font-weight: bold;">评论列表</span>
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

                <!-- 多级回复,回复只能回复最开始的那条评论，即item.userId,因为我不知道咋做 -->
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
      <el-dialog :title="title" :visible.sync="open3" width="500px" append-to-body>
        <el-form ref="form" :model="form3" :rules="rules" label-width="80px">
<!--          <el-form-item label="用户id" prop="userId">-->
<!--            <el-input v-model="form3.userId" placeholder="请输入用户id" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="房屋id" prop="houseId">-->
<!--            <el-input v-model="form3.houseId" placeholder="请输入房屋id" />-->
<!--          </el-form-item>-->
          <el-form-item label="评论内容">
            <editor v-model="form3.content" :min-height="192"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm3">确 定</el-button>
          <el-button @click="cancel3">取 消</el-button>
        </div>
      </el-dialog>








<template>
  <!-- 添加或修改房屋设备对话框 -->
  <el-dialog  :visible.sync="open2" width="500px" append-to-body>
    <el-form ref="form" :model="form2"  label-width="80px">
<!--      <el-form-item label="房屋id" prop="houseId">-->
<!--        <el-input v-model="this.$route.query.id" placeholder="请输入房屋id" disabled="true"/>-->
<!--      </el-form-item>-->
      <el-form-item label="床" prop="bed">
        <el-radio-group v-model="form2.bed">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="无线网络" prop="internet">
        <el-radio-group v-model="form2.internet">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电视" prop="tv">
        <el-radio-group v-model="form2.tv">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="冰箱" prop="fridge">
        <el-radio-group v-model="form2.fridge">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="洗衣机" prop="washingMachine">
        <el-radio-group v-model="form2.washingMachine">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="空调" prop="airConditioner">
        <el-radio-group v-model="form2.airConditioner">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="热水器" prop="waterHeater">
        <el-radio-group v-model="form2.waterHeater">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="厨房" prop="cooking">
        <el-radio-group v-model="form2.cooking">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="沙发" prop="sofa">
        <el-radio-group v-model="form2.sofa">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="橱柜" prop="wardrobe">
        <el-radio-group v-model="form2.wardrobe">
          <el-radio
            v-for="dict in dict.type.facility_posses"
            :key="dict.value"
            :label="parseInt(dict.value)"
          >{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm2">确 定</el-button>
      <el-button @click="cancel2">取 消</el-button>
    </div>
  </el-dialog>
</template>



    </template>

    <!-- 添加或修改订单对话框,只能号主自己租 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
<!--        <el-form-item label="房间ID" prop="roomId" disabled="true">-->
<!--          <el-input v-model="form.roomId" placeholder="请输入房屋ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="租客ID" prop="tenantId">-->
<!--          <el-input v-model="form.tenantId" placeholder="请输入租客ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="租客名" prop="tenantName">-->
<!--          <el-input v-model="form.tenantName" placeholder="请输入租客名" />-->
<!--        </el-form-item>-->
        <el-form-item label="起始时间"  prop="startDate">
          <el-date-picker clearable
                          v-model="form.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"  prop="endDate" @change="showPrice">
          <el-date-picker clearable
                          v-model="form.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格" prop="price" >
          <el-input v-model="this.price1" placeholder="请输入价格" disabled="true" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>



<script>


import {   addFacilities, updateFacilities } from "@/api/system/facilities";
import { addOrder } from "@/api/system/order";
import { getHouse } from "@/api/system/house";
import {listFacilities} from "@/api/system/facilities";
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

  name: "Order",
  dicts: ['facility_posses'],
  data() {
    return {


      open2: false,
      open3: false,
      // 表单参数
      form2: {},
      // housedata : this.house.data,

      //房屋设施集合
      facilitiesList:[],
      //房屋设施
      facility: {},

      house: {},
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
      // 总条数
      total3: 0,
      // 订单表格数据
      orderList: [],
      // 房屋评论表格数据
      commentsList: [],
      commentsListByHouseId: [],
      replyContent: '',
      replyInfo: {
        id: null,
        showReplyBox: false
      },
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
      form3: {
        userId: null,
        houseId: null,
        content: null,
      },
      // 表单校验
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        houseId: this.$route.query.id,
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
      filePaths: [] ,// 定义一个名为filePaths的数组

      // 查询参数
      // queryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   roomId: null,
      //   tenantId: null,
      //   tenantName: null,
      //   startDate: null,R
      //   endDate: null,
      //   checkOpion: null,
      //   checkerId: null,
      //   checkerName: null,
      //   checkDate: null,
      //   isHistory: null,
      //   price: null
      // },
      // 表单参数
      form: {
        id: null,
        roomId:  this.$route.query.id,
        tenantId: null,
        tenantName: null,
        startDate: null,
        endDate: null,
        checkOpion: 0,
        checkerId: null,
        checkerName: null,
        checkDate: null,
        isHistory: 'no',
        price:this.price1
      },
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

  mounted() {
    this.getHouseDetail();
    this.getList();
    // this.splitFilePaths(this.house.data.houseImage);
    this.getList3();
  },
  created() {
    this.getList35();
  },
  computed:{
    price1(){
      const start = new Date(this.form.startDate).getTime();
      const end = new Date(this.form.endDate).getTime();
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24 ));
      const housePrice=this.house.data.housePrice;
      return housePrice*days;
    },
    houseImages() {
        const house = this.house.data;
        const imageArr = house.houseImage.split(',');
        return  imageArr;
    },
    //地图地址
    mapAddress(){
      return this.house.data.houseProvinceAddress + this.house.data.houseCityAddress + this.house.data.houseAddress
    },

  },

  methods: {

    /** 查询房屋设备列表 */

    // 取消按钮
    cancel2() {
      this.open2 = false;
      this.reset2();
    },
    // 表单重置
    reset2() {
      this.form2 = {
        id: null,
        houseId: this.$route.query.id,
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


    /** 新增按钮操作 */
    handleAdd2() {
      if(this.$store.state.user.name === this.house.data.houseOwnerName){
        this.reset2();
        this.open2 = true;
        this.title = "添加房屋设备";
      }else {
        alert("您没有增加的权限");
      }

    },

    /** 提交按钮 */
    submitForm2() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form2.id != null) {
            updateFacilities(this.form2).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open2 = false;
              this.getList();
            });
          } else {
            addFacilities(this.form2).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open2 = false;
              this.getList();
            });
          }
        }
      });
    },

    //分割图片地址
    splitFilePaths(str) {
      this.filePaths = str.split(","); // 将分解后的字符串赋值给filePaths数组
    },

    /** 查询房屋设备列表 */
    getList() {
      listFacilities(this.queryParams).then(response => {
        // 将响应数据赋值给 facilitiesList
        this.facilitiesList = response.rows;
        // 确保 facilitiesList 中有数据之后才能获取其中的元素
        if (this.facilitiesList.length > 0) {
          this.facility = this.facilitiesList[0];
        }
      }).catch(error => {
        console.log(error);
      });
    },


//显示房屋价格
    showPrice() {
      this.$nextTick(() => {
        this.form.price = this.price1;
      });
      this.form.price = this.price1;
    },

    getHouseDetail() {
      const id = this.$route.query.id;
      getHouse(id).then((res) => {
        this.house = res;
      });
    },

    // 取消按钮
    cancel1() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        roomId:  this.$route.query.id,
        tenantId: this.$store.state.user.userId,
        tenantName: this.$store.state.user.name,
        startDate: null,
        endDate: null,
        checkOpion: 0,
        checkerId: null,
        checkerName: null,
        checkDate: null,
        isHistory: 'no',
        price:null
          // ((Date.parse(form.startDate)/86400000)-(Date.parse(form.endDate)/86400000))*this.house.data.housePrice
      };
      this.resetForm("form");
    },


    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },

    /** 提交按钮 */
    submitForm1() {
      this.$refs["form"].validate(valid => {
        // if (valid) {
        //   if (this.form.id != null) {
        //     updateOrder(this.form).then(response => {
        //       this.$modal.msgSuccess("修改成功");
        //       this.open = false;
        //       this.getList();
        //     });
        //   } else {
        this.form.roomId=this.$route.query.id;
        this.form.tenantId=this.$store.state.user.userId;
        this.form.tenantName=this.$store.state.user.name;
        this.form.price=this.price1;
        addOrder(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
        //   }
        // }
      });
    },
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
      this.open3 = false;
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
      this.open3 = true;
      this.title = "添加房屋评论";
    },
    /** 修改按钮操作 */
    handleUpdate3(id) {
      this.reset3();
      getComments(id).then(response => {
        this.form3 = response.data;
        this.open3 = true;
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
              this.open3 = false;
              this.getList();
            });
          } else {
            this.form3.houseId = this.$route.query.id;
            this.form3.userId = this.$store.state.user.userId;
            addComments(this.form3).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open3 = false;
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

<style>
.house-details {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #fafafa, #ffffff);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.house-details-image {
  width: 50%;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.house-details-info {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
}

.house-details-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.house-details-divider {
  margin: 2rem 0;
}

.house-details-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
}

.house-details-item-label {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
}

.house-details-item-value {
  font-size: 1.2rem;
  font-weight: normal;
}
.map {
  width: 2000px;
  height: 500px;
}

.commentAvatar {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 20px;
}

</style>
