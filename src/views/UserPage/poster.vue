<template>
  <div >
  <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :loading="load"
      multi-sort
      :search="search"
      loading-text="Waiting"
  >
    <template v-slot:no-data>暂无公告记录</template>
    <template v-slot:no-results>无匹配记录</template>
    <!--  颜色  -->
    <template v-slot:item.status="{item }">
      <v-chip
          :color="getColor(item.status)"
          dark
          outlined
      >
        {{ item.status}}
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>公告管理</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer/>
        <v-btn
            color="primary"
            class="mb-2 elevation-5"
            @click="dialog = true"
        >
          {{ addTitle }}
        </v-btn>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
          <v-card>
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
                    <!-- ==-1 为添加                   -->
                    <v-text-field
                        v-model="name"
                        label="发布人员"
                        v-if="editedIndex === -1"
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.admin_name"
                        label="发布人员"
                        v-if="editedIndex !== -1"
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        v-model="editedItem.poster_title"
                        label="标题*"
                        :counter="30"
                        required
                        :error-messages="titleErrors"
                        @input="$v.editedItem.poster_title.$touch()"
                        @blur="$v.editedItem.poster_title.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-menu
                        ref="dialogtimer"
                        v-model="modal"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.poster_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.poster_date"
                            label="发布日期"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem.poster_date"
                          no-title
                          locale="zh-cn"
                          scrollable
                          :allowed-dates="allowedDates"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogtimer.save(editedItem.poster_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-spacer></v-spacer>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-menu
                        ref="menu"
                        v-model="timeChoose"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.poster_time"
                        transition="scale-transition"
                        offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.poster_time"
                            label="发布时间"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            bottom
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          scrollable
                          v-if="timeChoose"
                          v-model="editedItem.poster_time"
                          format="24hr"

                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="timeChoose = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editedItem.poster_time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-menu
                          ref="dialog_timer"
                          v-model="modal1"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.poster_enddate"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="editedItem.poster_enddate"
                              label="截止日期"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="editedItem.poster_enddate"
                            no-title
                            locale="zh-cn"
                            scrollable
                            :allowed-dates="allowedDates"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                              text
                              color="primary"
                              @click="modal1 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog_timer.save(editedItem.poster_enddate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-menu
                          ref="menu1"
                          v-model="timeChoose1"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.poster_endtime"
                          transition="scale-transition"
                          offset-x
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="editedItem.poster_endtime"
                              label="截止时间"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              bottom
                          ></v-text-field>
                        </template>
                        <v-time-picker
                            scrollable
                            v-if="timeChoose1"
                            v-model="editedItem.poster_endtime"
                            format="24hr"

                        >
                          <v-spacer></v-spacer>
                          <v-btn
                              text
                              color="primary"
                              @click="timeChoose1 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                              text
                              color="primary"
                              @click="$refs.menu1.save(editedItem.poster_endtime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-menu>
                    </v-col>
                    </v-row>

                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        v-model="editedItem.poster_log"
                        label="公告详情*"
                        counter="500"
                        required
                        outlined
                        auto-grow
                        clearable
                        rows="9"
                        row-height="30"
                        clear-icon="mdi-close-circle"
                        :error-messages="logErrors"
                        @input="$v.editedItem.poster_log.$touch()"
                        @blur="$v.editedItem.poster_log.$touch()"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="200px"  overlay-opacity="0">
          <v-card>
            <v-card-title class="headline">警告</v-card-title>
            <v-card-text>确定要删除该公告吗?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
        <v-btn icon color="error" class="elevation-5 ma-1" @click="deleteItem(item)">
        <v-icon small v-bind="attrs" v-on="on" >mdi-delete</v-icon>
        </v-btn>
      </template><span>删 除</span>
      </v-tooltip>
    </template>

  </v-data-table>
    <v-snackbar
        top
        v-model="bar"
        :timeout="5000"
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    editedItem:{
      poster_title:{required, maxLength: maxLength(30)},
      poster_log:{required,maxLength:maxLength(500)},
    }
  },

  computed: {
    formTitle () {return this.editedIndex === -1 ? '提交公告申请' : '编辑公告'},
    addTitle () {return this.id === '0' ? '添加公告' : '申请公告'},
    titleErrors () {
      const errors = []
      if (!this.$v.editedItem.poster_title.$dirty) return errors
      !this.$v.editedItem.poster_title.maxLength && errors.push('标题不可超过30个字符')
      !this.$v.editedItem.poster_title.required && errors.push('标题不可为空')
      return errors
    },
    logErrors () {
      const errors = []
      if (!this.$v.editedItem.poster_log.$dirty) return errors
      !this.$v.editedItem.poster_log.maxLength && errors.push('正文不可超过500个字符')
      !this.$v.editedItem.poster_log.required && errors.push('正文不可为空')
      return errors
    },
  },

  methods: {
    allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,

    getColor (calories) {
      if (calories === "已发布") return 'primary'
      else return 'red'
    },

    initialize () {
      this.load = true
      this.axios.get(this.url+'userPoster/queryPoster')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
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
      const  mess = {'poster_id':this.editedItem.poster_id}
      this.axios.post(this.url+'userPoster/DelPoster', JSON.stringify(mess))
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
          this.axios.post(this.url+'userPoster/changePoster', JSON.stringify(this.editedItem)).then(res => {
            this.mess = res.data["mess"]
            this.bar = true
            if(this.mess==="修改成功"){
              this.initialize()
              this.close()
            }
          },res => {
            console.log(res);
          })
        } else {
          /*增加*/
            const  mess = this.editedItem
            mess.admin_loginname = this.login
            this.axios.post(this.url+'userPoster/AddPoster', JSON.stringify(mess)).then(res => {
              this.mess = res.data["mess"]
              this.bar = true
              if(this.mess==="添加成功"){
                this.initialize()
                this.close()
              }
            },res => {
              console.log(res);
            })
        }
        this.$v.$reset()
      }
    },
  },

  data: () => ({
    url: process.env.VUE_APP_API,
    load:true,
    id:window.sessionStorage.getItem("identity"),
    mess:"",
    timeChoose1:false,
    modal1: false,
    timeChoose:false,
    modal: false,
    name: window.sessionStorage.getItem('name'),
    login: window.sessionStorage.getItem('loginname'),
    search:"",
    sortBy:"time",
    sortDesc:false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: '标题', align: 'start', value: 'poster_title',sortable: false,width:150},
      { text: '发布时间', value: 'time' },
      { text: '截止时间', value: 'endtime' },
      { text: '公告详情', value: 'poster_log',sortable: false,width:500},
      { text: '是否已发布', value: 'status'},
      { text: '发布人', value: 'admin_name'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [], custname: [], editedIndex: -1,
    editedItem: {poster_id:'', admin_name:'', poster_log:'', poster_date:'', poster_time:'', poster_title:'',
      poster_enddate:'', poster_endtime:'',
    },
    defaultItem: {poster_id:'', admin_name:'', poster_log:'',
      poster_date:new Date().toJSON().substring(0, 10),
      poster_time:new Date().toTimeString().substring(0,5),
      poster_enddate:new Date().toJSON().substring(0, 10),
      poster_endtime:new Date().toTimeString().substring(0,5), poster_title:'',
    },
    bar:false,
  }),
  watch: {
    dialog (val) {val || this.close()},
    dialogDelete (val) {val || this.closeDelete()},
  },created () {this.initialize()},
}
</script>