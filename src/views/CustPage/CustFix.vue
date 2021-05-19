<template>
  <v-card outlined class="pa-4 elevation-5">
    <div class="d-flex align-center justify-space-between">
      <div class="text-h6">
        已提交的维修记录
      </div>
      <v-spacer/>
      <v-dialog
          v-model="dialog"
          max-width="300px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              class="mb-2  elevation-5"
              v-bind="attrs"
              v-on="on"
          >
            报 修
          </v-btn>
        </template>
        <v-card ref="form">
          <v-card-title>
            <span class="headline">添加报修记录</span>
          </v-card-title>

          <v-card-text>
            <v-container>
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
    </div>

    <template>
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
      </v-data-table>

    </template>

  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {maxLength, required,} from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    savelog:{required,maxLength:maxLength(50)},
  },
  data: () => ({
    url: process.env.VUE_APP_API,
    load:true,
    bar1:false,dialog:false,
    fixheader: [
      { text: '详 情',align: 'start', value: 'fix_log',sortable: false},
      { text: '报修时间', value: 'fix_startime'},
      { text: '维修时间', value: 'fix_endtime'},
      { text: '维修状态', value: 'fix_status'},
    ],
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
        var mess = {"log":this.savelog,"login":this.name,"time":new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)}
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