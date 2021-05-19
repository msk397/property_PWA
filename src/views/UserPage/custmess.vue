<template>
  <div>
    <v-card class="rounded-0">
  <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="3"
      :loading="load"
      multi-sort
      :search="search"
      loading-text="Waiting"
  >
    <template v-slot:no-data>暂无业主记录</template>
    <template v-slot:no-results>无匹配记录</template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="查询相关信息" single-line hide-details></v-text-field>
        <v-spacer/>
        <v-btn
            color="primary"
            class="mb-2 elevation-5"
            @click="dialog = true"
        >
          添加信息
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.cust_loginname"
                        label="用户名*"
                        v-if="editedIndex === -1"
                        required
                        :error-messages="loginErrors"
                        @input="$v.editedItem.cust_loginname.$touch()"
                        @blur="$v.editedItem.cust_loginname.$touch()"
                        counter="20"
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.cust_loginname"
                        label="用户名*"
                        disabled
                        v-if="editedIndex !== -1"
                    ></v-text-field>
                  </v-col>

                  <v-spacer></v-spacer>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.cust_name"
                        label="姓名*"
                        required
                        :error-messages="nameErrors"
                        @input="$v.editedItem.cust_name.$touch()"
                        @blur="$v.editedItem.cust_name.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>

                  <v-row>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-select
                          :items="floor"
                          label="楼号"
                        v-model="editedItem.cust_floor"
                      ></v-select>
                    </v-col>

                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-select
                          :items="unit"
                          label="单元"
                          v-model="editedItem.cust_unit"
                      ></v-select>
                    </v-col>

                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-text-field
                          label="门牌号*"
                          v-model="editedItem.cust_door"
                          required
                          :error-messages="doorErrors"
                          @input="$v.editedItem.cust_door.$touch()"
                          @blur="$v.editedItem.cust_door.$touch()"
                      ></v-text-field>
                    </v-col>

                  </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.cust_phone"
                        label="联系方式*"
                        required
                        counter="11"
                        :error-messages="phoneErrors"
                        @input="$v.editedItem.cust_phone.$touch()"
                        @blur="$v.editedItem.cust_phone.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="4">
                      <v-btn
                          v-if="editedIndex !== -1"
                          depressed
                          color="error"
                          @click="resetbar = true"
                      >重置密码</v-btn>
                    </v-col>
                  </v-row>
                <small>带*为必填项</small>
              </v-container>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="200px">
          <v-card>
            <v-card-title class="headline">警告</v-card-title>
            <v-card-text>确定要删除该信息吗?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="reset" max-width="200px"  overlay-opacity="0">
          <v-card>
            <v-card-title class="headline">确认密码</v-card-title>
            <v-card-text>{{newPass}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="setpass">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- 这里是action里面的图标   -->
    <template v-slot:item.actions="{ item }">

        <v-btn icon color="primary" class="elevation-5 ma-2" @click="editItem(item)">
          <v-icon small  >mdi-pencil</v-icon>
        </v-btn>


        <v-btn icon color="error" class="elevation-5 ma-1" @click="deleteItem(item)">
          <v-icon small >mdi-delete</v-icon>
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
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        top
        v-model="resetbar"
    >
      确定要重置密码吗？
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="resetPassConfirm"
        >
          确定
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
import { required,maxLength,minLength,alphaNum,numeric} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    /*    nowDate:new Date().toLocaleDateString(),*/
    url: process.env.VUE_APP_API,
    load:true,
    mess:"",bar:false,resetbar:false,
    floor:['1','2','3','4','5','6','7','8'],
    reset:false,
    resetpass:'pass',
    unit:['A','B','C'],
    timeChoose:false,
    modal: false,
    name: window.localStorage.getItem('name'),
    search:"",
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: '姓名', align: 'start', value: 'cust_name'},
      { text: '用户名', value: 'cust_loginname',sortable: false},
      { text: '联系方式', value: 'cust_phone' },
      { text: '门牌号', value: 'cust_addr'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    custname: [],
    editedIndex: -1,
    editedItem: {cust_addr:'', cust_floor:'', cust_unit:'', cust_door:'',
      cust_loginname:'', cust_name:'', cust_id:'', cust_phone:'',},
    defaultItem: {cust_addr:'', cust_floor:'1', cust_unit:'A', cust_door:'',
      cust_loginname:'', cust_name:'', cust_id:'', cust_phone:'',},
  }),
  mixins: [validationMixin],
  validations: {
    editedItem:{
      cust_loginname:{required,maxLength:maxLength(20),alphaNum},
      cust_name:{required,maxLength:maxLength(10)},
      cust_phone:{required,minLength:minLength(11),maxLength:maxLength(11),numeric},
      cust_door:{required,minLength:minLength(3),maxLength:maxLength(4),numeric}
    }
  },
  computed: {
    loginErrors () {
      const errors = []
      if (!this.$v.editedItem.cust_loginname.$dirty) return errors
      !this.$v.editedItem.cust_loginname.maxLength && errors.push('用户名不可多于50个字符')
      !this.$v.editedItem.cust_loginname.alphaNum && errors.push('用户名仅支持字母与数字')
      !this.$v.editedItem.cust_loginname.required && errors.push('用户名不可为空')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.editedItem.cust_name.$dirty) return errors
      !this.$v.editedItem.cust_name.maxLength && errors.push('姓名不可超过10个字符')
      !this.$v.editedItem.cust_name.required && errors.push('姓名不可为空')
      return errors
    },
    doorErrors(){
      const errors = []
      if (!this.$v.editedItem.cust_door.$dirty) return errors
      !this.$v.editedItem.cust_door.maxLength && errors.push('请输入正确格式的门牌号')
      !this.$v.editedItem.cust_door.minLength && errors.push('请输入正确格式的门牌号')
      !this.$v.editedItem.cust_door.numeric && errors.push('门牌号仅支持数字')
      !this.$v.editedItem.cust_door.required && errors.push('门牌号不可为空')
      return errors
    },
    phoneErrors(){
      const errors = []
      if (!this.$v.editedItem.cust_phone.$dirty) return errors
      !this.$v.editedItem.cust_phone.maxLength && errors.push('请输入11位格式手机号')
      !this.$v.editedItem.cust_phone.minLength && errors.push('请输入11位格式手机号')
      !this.$v.editedItem.cust_phone.numeric && errors.push('手机号仅支持数字输入')
      !this.$v.editedItem.cust_phone.required && errors.push('手机号不可为空')
      return errors
    },
    formTitle () {return this.editedIndex === -1 ? '添加信息' : '编辑信息'},
    newPass () {return this.resetpass},

  },

  watch: {
    dialog (val) {val || this.close()},
    dialogDelete (val) {val || this.closeDelete()},
  },

  created () {
    this.initialize()
  },

  methods: {
    allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,
    setpass(){
      this.reset = false
      this.resetpass='pass'
    },
    initialize () {
      this.load = true
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.axios.get(this.url+'userCust/queryCust')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
      this.load = false
    },

    resetPassConfirm(){
      this.resetbar = false
      var mess={'id':this.editedItem.cust_id , 'name':this.editedItem.cust_name}
      this.axios.post(this.url+'userCust/resetPass', JSON.stringify(mess))
          .then(res => {
            this.resetpass = res.data;
          },res => {
            console.log(res);
          })
      this.mess = "密码重置成功"
      this.bar = true
      this.reset = true
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
      var  mess = {'id':this.editedItem.cust_id}
      this.axios.post(this.url+'userCust/DelCust', JSON.stringify(mess)).then(res=>{
        this.mess =res.data
      },res=>{
        console.log(res);
      })
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
        this.axios.post(this.url+'userCust/changeCustMess', JSON.stringify(this.editedItem))
          .then(res=>{
            var mass = res.data
            if(mass ==="该地址已有业主，请重新设置"||mass === "姓名重复，请重新设置"){
              this.mess = mass
              this.bar = true
            }
            else{
              this.mess =mass
              this.bar = true
              this.initialize()
              this.close()
              this.$v.$reset()
            }
          },res=>{
            console.log(res);
          })
      } else {
        /*增加*/
        var mess = this.editedItem
        delete  mess.cust_addr
        delete  mess.cust_id
        this.axios.post(this.url+'userCust/AddCust', JSON.stringify(mess))
            .then(res => {
              var mass = res.data
              if(mass ==="用户名重复请重新设置"||mass ==="该地址已有业主，请重新设置"){
                this.mess = mass
                this.bar = true
              }
              else{
                this.resetpass = res.data;
                this.mess = "添加成功"
                this.bar = true
                this.reset = true
                this.initialize()
                this.close()
                this.$v.$reset()
              }

            },res => {
              console.log(res);
            })

      }

      }
    },
  },
}
</script>