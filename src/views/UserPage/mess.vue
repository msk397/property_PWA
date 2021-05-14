<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :loading="load"
        multi-sort
        :search="search"
        loading-text="Waiting"
    >
      <template v-slot:no-data>
        暂无员工记录
      </template>
      <template v-slot:no-results>
        无匹配记录
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>员工管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          <v-spacer/>

          <v-btn
              color="primary"
              class="mb-2 elevation-5"
              @click="dialog = true"
          >添加员工</v-btn>

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
                          v-model="editedItem.admin_loginname"
                          label="用户名*"
                          v-if="editedIndex === -1"
                          required
                          :error-messages="loginErrors"
                          @input="$v.editedItem.admin_loginname.$touch()"
                          @blur="$v.editedItem.admin_loginname.$touch()"
                          counter="20"
                      ></v-text-field>
                      <v-text-field
                          v-model="editedItem.admin_loginname"
                          label="用户名*"
                          disabled
                          v-if="editedIndex !== -1"
                      ></v-text-field>
                    </v-col>

                    <v-spacer/>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="editedItem.admin_realname"
                          label="姓名*"
                          required
                          :error-messages="nameErrors"
                          @input="$v.editedItem.admin_realname.$touch()"
                          @blur="$v.editedItem.admin_realname.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="editedItem.admin_phone"
                          label="联系方式*"
                          required
                          counter="11"
                          :error-messages="phoneErrors"
                          @input="$v.editedItem.admin_phone.$touch()"
                          @blur="$v.editedItem.admin_phone.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-text-field
                          label="住址*"
                          v-model="editedItem.admin_addr"
                          required
                          :error-messages="addrErrors"
                          @input="$v.editedItem.admin_addr.$touch()"
                          @blur="$v.editedItem.admin_addr.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-spacer/>
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
        </v-toolbar>
      </template>
      <!-- 这里是action里面的图标   -->
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom :open-delay="300"><template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" class="elevation-5 ma-2" @click="editItem(item)">
            <v-icon small v-bind="attrs" v-on="on" >mdi-pencil</v-icon>
          </v-btn>
        </template><span>修改信息</span>
        </v-tooltip>
        <v-tooltip bottom :open-delay="300"><template v-slot:activator="{ on, attrs }">
          <v-btn icon color="deep-orange" class="elevation-5 ma-1" @click="postItem(item)">
            <v-icon small v-bind="attrs" v-on="on" >{{mdiSend}}</v-icon>
          </v-btn>
        </template><span>发送通知</span>
        </v-tooltip>
          <v-tooltip bottom :open-delay="300"><template v-slot:activator="{ on, attrs }">
            <v-btn icon color="error" class="elevation-5 ma-2" @click="deleteItem(item)">
              <v-icon small v-bind="attrs" v-on="on" >mdi-delete</v-icon>
            </v-btn>
          </template><span>删 除</span>
          </v-tooltip>
      </template>

    </v-data-table>

    <v-dialog v-model="dialoglog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">发送通知</span>
        </v-card-title>
        <v-card-text>
            <v-container>
              <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                    v-model="editedItem.admin_realname"
                    label="姓名*"
                    required
                    disabled
                ></v-text-field>
              </v-col>
                <v-spacer/>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                      v-model="title"
                      label="标题*"
                      required
                      counter="20"
                      :error-messages="titleErrors"
                      @input="$v.title.$touch()"
                      @blur="$v.title.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                  v-model="log_log"
                  label="通知详情*"
                  counter="100"
                  required
                  outlined
                  auto-grow
                  clearable
                  rows="3"
                  clear-icon="mdi-close-circle"
                  :error-messages="logErrors"
                  @input="$v.log_log.$touch()"
                  @blur="$v.log_log.$touch()"
              ></v-textarea>
            </v-col>
            <small>带*为必填项</small>
            </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="closelog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="savelog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="200px">
      <v-card>
        <v-card-title class="headline">警告</v-card-title>
        <v-card-text>确定要删除该信息吗?</v-card-text>
        <v-card-actions>
          <v-spacer/>
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
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="setpass">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required,maxLength,minLength,alphaNum,numeric} from 'vuelidate/lib/validators'
import { mdiSend } from '@mdi/js'
export default {
  data: () => ({
    url: process.env.VUE_APP_API,
    load:true,
    mdiSend:mdiSend,
    mess:"",bar:false,resetbar:false,
    reset:false,
    resetpass:'pass',
    timeChoose:false,
    modal: false,
    name: window.sessionStorage.getItem('name'),
    search:"",
    dialog: false,
    dialoglog:false,
    dialogDelete: false,
    headers: [
      {text: '姓名', align: 'start', value: 'admin_realname'},
      { text: '用户名', value: 'admin_loginname'},
      { text: '联系方式', value: 'admin_phone',sortable: false},
      { text: '住址', value: 'admin_addr',sortable: false},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    log_log:null,
    title:null,
    editedItem: {admin_addr:'', admin_loginname:'', admin_realname:'', admin_phone:''},
    defaultItem: {admin_addr:'', admin_loginname:'', admin_realname:'', admin_phone:''},
  }),
  mixins: [validationMixin],
  validations: {
    editedItem:{
      admin_loginname:{required,maxLength:maxLength(20),alphaNum},
      admin_realname:{required,maxLength:maxLength(10)},
      admin_addr:{required},
      admin_phone:{required,minLength:minLength(11),maxLength:maxLength(11),numeric},
    },
    title:{required,maxLength:maxLength(20)},
    log_log:{required,maxLength:maxLength(100)},
  },
  computed: {
    loginErrors () {
      const errors = []
      if (!this.$v.editedItem.admin_loginname.$dirty) return errors
      !this.$v.editedItem.admin_loginname.maxLength && errors.push('用户名不可多于50个字符')
      !this.$v.editedItem.admin_loginname.alphaNum && errors.push('用户名仅支持字母与数字')
      !this.$v.editedItem.admin_loginname.required && errors.push('用户名不可为空')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.editedItem.admin_realname.$dirty) return errors
      !this.$v.editedItem.admin_realname.maxLength && errors.push('姓名不可超过10个字符')
      !this.$v.editedItem.admin_realname.required && errors.push('姓名不可为空')
      return errors
    },
    addrErrors() {
      const errors = []
      if (!this.$v.editedItem.admin_addr.$dirty) return errors
      !this.$v.editedItem.admin_addr.required && errors.push('住址不可为空')
      return errors
    },
    phoneErrors(){
      const errors = []
      if (!this.$v.editedItem.admin_phone.$dirty) return errors
      !this.$v.editedItem.admin_phone.maxLength && errors.push('请输入11位格式手机号')
      !this.$v.editedItem.admin_phone.minLength && errors.push('请输入11位格式手机号')
      !this.$v.editedItem.admin_phone.numeric && errors.push('手机号仅支持数字输入')
      !this.$v.editedItem.admin_phone.required && errors.push('手机号不可为空')
      return errors
    },
    logErrors () {
      const errors = []
      if (!this.$v.log_log.$dirty) return errors
      !this.$v.log_log.maxLength && errors.push('通知不可超过100个字符')
      !this.$v.log_log.required && errors.push('通知不可为空')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('标题不可超过20个字符')
      !this.$v.title.required && errors.push('标题不可为空')
      return errors
    },
    formTitle () {return this.editedIndex === -1 ? '添加员工信息' : '编辑员工信息'},
    newPass () {return this.resetpass},

  },

  watch: {
    dialog (val) {val || this.close()},
    dialogDelete (val) {val || this.closeDelete()},
  },

  created () {this.initialize()},

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
      this.axios.get(this.url+'user/queryadmin')
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
      var mess={'admin_id':this.editedItem.admin_id,'admin_realname':this.editedItem.admin_realname}
      this.axios.post(this.url+'user/resetPass', JSON.stringify(mess))
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

    postItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialoglog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      var  mess = {'login':this.editedItem.admin_loginname}
      this.axios.post(this.url+'user/DelAdmin', JSON.stringify(mess)).then(res=>{
        this.mess = res.data
      },res=>{
        this.mess = res
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
    closelog () {
      this.dialoglog = false
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
    savelog(){
      if(this.$v.log_log.$invalid||this.$v.log_log.$error||this.$v.title.$invalid||this.$v.title.$error){
        this.$v.$touch()
      }
      else{
          var mess = this.editedItem
        delete mess.admin_addr
        delete mess.admin_phone
        delete mess.admin_loginname
        mess['log_log'] = this.log_log
        mess['title'] = this.title
        this.axios.post(this.url+'user/addlog', JSON.stringify(mess))
            .then(res=>{
              this.mess =res.data+this.editedItem.admin_realname+"管理员"
              this.bar = true
              this.closelog()
              this.$v.$reset()
            },res=>{
              console.log(res);
            })

      }
    },

    /*缴费信息保存*/
    save () {
      if(this.$v.editedItem.admin_realname.$invalid||this.$v.editedItem.admin_realname.$error||
          this.$v.editedItem.admin_addr.$invalid||this.$v.editedItem.admin_addr.$error||
          this.$v.editedItem.admin_phone.$invalid||this.$v.editedItem.admin_phone.$error
      ){
        this.$v.$touch()
      }
      else{
        if (this.editedIndex > -1) {
          /*修改*/
          this.axios.post(this.url+'user/changeAdminMess', JSON.stringify(this.editedItem))
              .then(res=>{
                  this.mess =res.data
                  this.bar = true
                  this.initialize()
                  this.close()
                  this.$v.$reset()
              },res=>{
                console.log(res);
              })
        }
        else {
          /*增加*/
          var mess = this.editedItem
          delete  mess.cust_addr
          delete  mess.cust_id
          this.axios.post(this.url+'user/AddAdmin', JSON.stringify(mess))
              .then(res => {
                var mass = res.data
                if(mass ==="用户名重复请重新设置"){
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