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
      loading-text="Waiting"
  >
    <template v-slot:no-data>暂无维修记录</template>
    <template v-slot:no-results>无匹配记录</template>
    <!--  颜色  -->
    <template v-slot:item.fix_status="{item }">
      <v-chip :color="getColor(item.fix_status)" dark outlined>{{ item.fix_status}}</v-chip>
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
        <v-dialog v-model="dialog" max-width="520px">
          <v-card>
            <v-card-title>
              <span class="headline">编辑缴费项目</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.cust_name"
                        label="业主姓名"
                        disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.admin_name"
                        label="经手人"
                        disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-switch
                        v-model="editedItem.status"
                        label="是否已维修"
                        @change="switchfix"
                    ></v-switch>
                  </v-col>

                  <v-col cols="8" sm="8" md="8">
                        <v-text-field
                            v-model="editedItem.fix_startime"
                            label="生成时间"
                            prepend-icon="mdi-calendar"
                            readonly
                        ></v-text-field>
                  </v-col>

                  <v-col cols="8" sm="8" md="8">
                    <v-text-field
                        v-model="editedItem.fix_endtime"
                        label="维修时间"
                        prepend-icon="mdi-calendar"
                        readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="10" sm="10" md="10">
                    <v-textarea
                        outlined
                        v-model="editedItem.fix_log"
                        label="维修详情"
                        rows="3"
                        counter="50"
                        required
                        :error-messages="logErrors"
                        @input="$v.editedItem.fix_log.$touch()"
                        @blur="$v.editedItem.fix_log.$touch()"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <small>带*为必填项</small>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>

              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="200px"  overlay-opacity="0">
          <v-card>
            <v-card-title class="headline">警告</v-card-title>
            <v-card-text>确定要删除本条维修记录吗?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- 这里是action里面的图标   -->
    <template v-slot:item.actions="{ item }">

        <v-btn icon color="primary" class="elevation-5 ma-2" @click="editItem(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" class="elevation-5 ma-1" @click="deleteItem(item)">
          <v-icon small  >mdi-delete</v-icon>
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
      <v-card-title/>
      <v-card-title/>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required,maxLength} from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    editedItem:{
      fix_log:{required,maxLength:maxLength(200)},
    }
  },
  data: () => ({
    url: process.env.VUE_APP_API,
    load:true,
    mess:"",bar:false,
    modal: false,
    search:"",
    sortBy:"fix_startime",
    sortDesc:false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '业主姓名', align: 'start', value: 'cust_name',},
      { text: '地址', value: 'cust_addr' },
       { text: '维修状态', value: 'fix_status' },
      { text: '生成时间', value: 'fix_startime' },
      { text: '完成时间', value: 'fix_endtime' },
      { text: '维修详情', value: 'fix_log' },
      { text: '处理人', value: 'admin_name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {admin_login:'', cust_name: '', fix_endtime:'', fix_id:'',
      fix_log:'', fix_startime:'', fix_status:'', admin_id:'', admin_name:'', status:false,
    },
    defaultItem: {admin_login:'', cust_name: '', fix_endtime:'', fix_id:'', fix_log:'',
      fix_startime:'', fix_status:'', admin_id:'', admin_name:'', status:false,
    },
  }),

  computed: {
    logErrors () {
      const errors = []
      if (!this.$v.editedItem.fix_log.$dirty) return errors
      !this.$v.editedItem.fix_log.maxLength && errors.push('详情要少于50个字符')
      !this.$v.editedItem.fix_log.required && errors.push('详情不可为空')
      return errors
    },
  },

  watch: {
    dialog (val) {val || this.close()},
    dialogDelete (val) {val || this.closeDelete()},
  },

  created () {this.initialize()},

  methods: {
    allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,

    getColor (calories) {
      if (calories === "已处理") return 'primary'
      else return 'red'
    },

    initialize () {
      this.load = true
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.axios.get(this.url+'userFix/queryUserFix')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
      this.load = false
    },

    switchfix(){
      if(!this.editedItem.status){
        this.editedItem.admin_name = ''
        this.editedItem.fix_endtime = ''
      }else{
        this.editedItem.admin_name = window.localStorage.getItem('name')
        this.editedItem.fix_endtime = new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
      }
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
      var delfix = {'id':this.editedItem.fix_id}
      this.axios.post(this.url+'userFix/DelFix', JSON.stringify(delfix))
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
    save () {
      if(this.$v.$invalid||this.$v.$error){
        this.$v.$touch()
      }
      else {
        var mess = this.editedItem
        if (mess.admin_id === 'null') {mess.admin_login = window.localStorage.getItem('loginname')}
        delete mess.fix_status
        delete mess.admin_name
        delete mess.admin_id
        this.axios.post(this.url+'userFix/changeFix', JSON.stringify(mess))
        this.mess = "修改成功"
        this.bar = true
        this.initialize()
        this.close()
      }
    },
  },
}
</script>