<template>
  <div>
    <v-card class="rounded-0">
  <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="3"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :loading="load"
      multi-sort
      :search="search"
  >
<!--  颜色  -->
    <template v-slot:item.charge_status="{item }">
      <v-chip
          :color="getColor(item.charge_status)"
          dark
          outlined
      >
        {{ item.charge_status}}
      </v-chip>
    </template>
    <template v-slot:no-data>
      暂无缴费记录
    </template>
    <template v-slot:no-results>
      无匹配记录
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="查询相关信息"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer/>
        <v-btn
            color="primary"
            class="mb-2 elevation-5"
            @click="dialog = true"
        >
          添加缴费项目
        </v-btn>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card ref="form">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-select
                        :items="custname"
                        label="姓名"
                        v-if="editedIndex === -1"
                        v-model="editedItem.cust_name"
                        required
                        :error-messages="nameErrors"
                        @input="$v.editedItem.cust_name.$touch()"
                        @blur="$v.editedItem.cust_name.$touch()"
                    ></v-select>
                    <v-text-field
                        v-model="editedItem.cust_name"
                        label="姓名"
                         v-if="editedIndex !== -1"
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.charge_cost"
                        label="金额（元）*"
                        required
                        :error-messages="costErrors"
                        @input="$v.editedItem.charge_cost.$touch()"
                        @blur="$v.editedItem.charge_cost.$touch()"
                        type="number"
                        step="0.1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                        ref="dialog_timer"
                        v-model="modal"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.charge_ddl"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="editedItem.charge_ddl"
                          label="截止时间"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="editedItem.charge_ddl"
                        no-title
                        locale="zh-cn"
                        scrollable
                        :allowed-dates="allowedDates"
                    >
                      <v-spacer/>
                      <v-btn
                          text
                          color="primary"
                          @click="modal = false"
                      >
                        取 消
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog_timer.save(editedItem.charge_ddl)"
                      >
                        确 定
                      </v-btn>
                    </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="memo"
                        label="类型"
                        v-model="editedItem.charge_memo"
                    ></v-select>
                  </v-col>
                  <v-spacer/>
                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-if="editedIndex !== -1"
                        v-model="editedItem.status"
                        label="是否已缴费"
                    ></v-switch>
                  </v-col>
                </v-row>
                <small>带*为必填项</small>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                关 闭
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                保 存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="200px"  overlay-opacity="0">
          <v-card>
            <v-card-title class="headline">警告</v-card-title>
            <v-card-text>确 定要删除本条缴费记录吗?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取 消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确 定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
<!-- 这里是action里面的图标   -->
    <template v-slot:item.actions="{ item }">
        <v-btn icon color="primary" class="elevation-5 ma-2" @click="editItem(item)">
          <v-icon small >mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" class="elevation-5 ma-1" @click="deleteItem(item)">
          <v-icon small >mdi-delete</v-icon>
        </v-btn>
      <v-btn v-if="item.charge_status==='未缴费'" icon color="error" class="elevation-5 ma-1" @click="moneyalert(item)">
        <v-icon small >{{mdiSend}}</v-icon>
      </v-btn>
    </template>
  </v-data-table>
    <v-snackbar
        top
        v-model="bar"
        :timeout="3000"
    >
      {{ mess }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="bar = false"
        >
          关 闭
        </v-btn>
      </template>
    </v-snackbar>
      <v-card-title/>
      <v-card-title/>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required,decimal,minValue } from 'vuelidate/lib/validators'
import {mdiSend} from "@mdi/js";
export default {
  mixins: [validationMixin],
  validations: {
    editedItem:{
      charge_cost:{required, decimal,minValue:minValue(0.01)},
      cust_name:{required},
    }
  },
  data: () => ({
    mdiSend:mdiSend,
    page:1,
    pageCount:0,
    url: process.env.VUE_APP_API,
    load:true,
    mess:"",bar:false,
    modal: false, search:"", sortBy:"charge_status", sortDesc:true, dialog: false, dialogDelete: false,
    headers: [
      {text: '业主姓名', align: 'start', value: 'cust_name',},
      { text: '地址', value: 'cust_addr' },
      { text: '缴费状态', value: 'charge_status' },
      { text: '缴费单生成时间', value: 'charge_time' },
      { text: '应缴金额（元）', value: 'charge_cost'},
      { text: '截止日期', value: 'charge_ddl' },
      { text: '类型', value: 'charge_memo'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [], custname: [], memo:['电费','水费','燃气费','暖气费','物业费','其他费用'], editedIndex: -1,
    editedItem: {cust_name: '', charge_status: '', charge_cost: '', charge_ddl: '', charge_memo:"", status:false,},
    defaultItem: {cust_name:'', charge_status:false, charge_cost: '', charge_ddl: new Date().toJSON().substring(0, 10),
      charge_memo:'电费', status: false,},
  }),

  computed: {
    formTitle () {return this.editedIndex === -1 ? '添加缴费项目' : '编辑缴费项目'},
    costErrors () {
      const errors = []
      if (!this.$v.editedItem.charge_cost.$dirty) return errors
      !this.$v.editedItem.charge_cost.minValue && errors.push('不可小于0.01元')
      !this.$v.editedItem.charge_cost.decimal && errors.push('金额只能为数字')
      !this.$v.editedItem.charge_cost.required && errors.push('金额不可为空')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.editedItem.cust_name.$dirty) return errors
      !this.$v.editedItem.cust_name.required && errors.push('请选择业主姓名')
      return errors
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },
  methods: {
    moneyalert(item){
      item['name'] = item.cust_name
      delete item.charge_status
      delete item.charge_time
      delete item.cust_addr
      delete item.cust_name
      delete item.status
      console.log(item)
      this.axios.post(this.url+'user/moneyalert', JSON.stringify(item))
          .then(res => {
            this.mess = res.data["mess"]
            this.bar = true
            this.initialize()
          },res => {
            console.log(res);
          })
    },
    allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,

    getColor (calories) {
      if (calories === "已缴费") return 'primary'
      else return 'red'
    },

    initialize () {
      this.load=true
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.axios.get(this.url+'userCharge/queryUserCharge')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
      this.axios.get(this.url+'userCharge/queryCustName')
          .then(res => {
            this.custname=res.data;
          },res => {
            console.log(res);
          })
      this.load = false
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.axios.post(this.url+'userCharge/DelCharge', JSON.stringify(this.editedItem))
      this.mess = "删除成功"
      this.bar = true
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$v.$reset()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
/*缴费信息保存*/
    save () {
      if(this.$v.$invalid||this.$v.$error){
        this.$v.$touch()
      }
      else{
        if (this.editedIndex > -1) {
          /*修改*/
          this.axios.post(this.url+'userCharge/changeCharge', JSON.stringify(this.editedItem))
          this.mess = "修改成功"
          this.bar = true
        } else {
          /*增加*/
          this.axios.post(this.url+'userCharge/AddCharge', JSON.stringify(this.editedItem))
          this.mess = "添加缴费记录成功"
          this.bar = true
        }
        this.initialize()
        this.close()
        this.$v.$reset()
      }
    },
  },
}
</script>