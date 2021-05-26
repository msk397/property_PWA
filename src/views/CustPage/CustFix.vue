<template>
  <div><v-card class="rounded-0">
      <v-data-table
          :headers="fixheader"
          :items="fix"
          :items-per-page="5"
          class="elevation-24"
          :loading = "load"
          loading-text="Loading... Please wait"
      >
        <template v-slot:item.fix_status="{item }">
          <v-chip :color="getColor(item.fix_status)" dark  class="elevation-5" outlined >{{ item.fix_status}}</v-chip>
        </template>
        <template v-slot:no-data>
          暂无报修记录
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn  v-if="item.fix_status!=='未处理'" icon color="primary" class="elevation-5 ma-2" @click="timelineItem(item)">
            <v-icon small  >{{mdiTimelineTextOutline}}</v-icon>
          </v-btn>
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
                报修
              </v-btn>
            </v-toolbar>
          <v-dialog
              v-model="dialog"
              max-width="300px"
          >
            <v-card ref="form">
              <v-card-title>
                <span class="headline">添加报修记录</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-col>
                    <v-select
                        :items="memo"
                        label="类型"
                        v-model="memo_sort"
                    ></v-select>
                  </v-col>
                  <v-row>
                    <v-textarea
                        outlined
                        auto-grow
                        clearable
                        clear-icon="mdi-close-circle"
                        v-model="savelog"
                        label="详 情*"
                        counter="50"
                        required
                        :error-messages="logErrors"
                        @input="$v.savelog.$touch()"
                        @blur="$v.savelog.$touch()"
                    ></v-textarea>
                    <v-spacer/>
                  </v-row>
                  <small>带*为必填项</small>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"

                >
                  取 消
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  报 修
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog class="rounded-0" v-model="dialogfixlog" max-width="520px">
            <v-card  class="rounded-0">
              <v-card-title>
                <span class="headline">查看维修过程记录</span>
              </v-card-title>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                    v-if="queryend === true"
                >
                  <v-timeline-item
                      v-for="(item, i) in tl"
                      :key="i"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <v-row>
                          <strong>{{ item.title }}</strong>
                        </v-row>
                        @{{ item.time }}
                      </div>
                      <div>{{ item.log }}</div>
                      <v-img
                          :src="item.pic"
                          contain
                          max-height="200"
                      >
                      </v-img>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                <v-progress-circular
                    indeterminate
                    color="primary"
                    v-else
                ></v-progress-circular>
              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" text @click="closefixlog">
                  关 闭
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    <v-card-title/>
    <v-card-title/>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {maxLength, required,} from 'vuelidate/lib/validators'
import {mdiTimelineTextOutline} from '@mdi/js'
export default {
  mixins: [validationMixin],
  validations: {
    savelog:{required,maxLength:maxLength(50)},
  },
  data: () => ({
    queryend:false,
    search:"",
    dialogfixlog:false,
    mdiTimelineTextOutline:mdiTimelineTextOutline,
    memo_sort:'电',
    memo:['电','水','燃气','网络'],
    url: process.env.VUE_APP_API,
    load:true,
    bar1:false,dialog:false,
    fixheader: [
      { text: '详 情',align: 'start', value: 'fix_log',sortable: false},
      { text: '报修时间', value: 'fix_startime'},
      { text: '维修时间', value: 'fix_endtime'},
      { text: '维修状态', value: 'fix_status'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    tl:[],
    chart: false,
    fix:[],
    mess:"",
    login:window.localStorage.getItem('loginname'),
    name:window.localStorage.getItem('name'),
    savelog:'',
  }),
  mounted() {
    this.chart = true;
  },
  created () {
    this.initialize()
  },
  computed: {
    logErrors () {
      const errors = []
      if (!this.$v.savelog.$dirty) return errors
      !this.$v.savelog.required && errors.push('详情不可为空')
      !this.$v.savelog.maxLength && errors.push('详情不可超过50个字符')
      return errors
    },
  },
  methods: {
    timelineItem(item){
      this.dialogfixlog = true
      var mess = {'id':item.fix_id}
      this.axios.post(this.url+'userFix/queryFixlog',JSON.stringify(mess))
          .then(res => {
            this.tl=res.data;
            this.loadin=!this.loadin;
            this.queryend = true
          },res => {
            console.log(res);
          })
    },
    closefixlog(){
      this.dialogfixlog = false
      this.tl=null
    },
    getColor (calories) {
      if (calories === "已处理") return 'primary'
      else return 'red'
    },
    initialize() {
      this.load = true
      var mess = {"login":this.login}
      this.axios.post(this.url+'cust/fix',JSON.stringify(mess))
          .then(res => {
            this.fix = res.data
          }, res => {
            console.log(res);
          })
      this.load = false
    },
    close () {
      this.dialog = false
      this.savelog=""
      this.$v.savelog.$reset()
    },
    save () {
      if(this.$v.savelog.$invalid||this.$v.savelog.$error){
        this.$v.savelog.$touch()
      }
      else{
        var mess = {"log":this.savelog,"login":this.name,"fix_sort":this.memo_sort,
          "time":new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)}
        this.axios.post(this.url+'cust/AddFix', JSON.stringify(mess))
        this.mess = "报修成功"
        this.bar1 = true
        this.initialize()
        this.close()
        this.$v.savelog.$reset()
      }
    },
  },
};
</script>

<style scoped>

</style>