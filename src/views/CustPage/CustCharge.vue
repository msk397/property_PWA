<template>
  <div><v-card class="rounded-0">
      <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          :loading = "load"
          loading-text="加载中..."
      >
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" @click="paymoney(item)"  class="elevation-5">缴 费</v-btn>
        </template>
        <template v-slot:no-data>
          暂无待缴费信息
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>缴费详情</v-toolbar-title>
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
          </v-toolbar>
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
export default {
  mixins: [validationMixin],
  validations: {
    savelog:{required,maxLength:maxLength(50)},
  },
  data: () => ({
    search:"",
    url: process.env.VUE_APP_API,
    load:true,
    bar1:false,dialog:false,
    headers: [
      {text: '姓 名', align: 'start', value: 'name'},
      { text: '金 额', value: 'charge_cost'},
      { text: '类 型', value: 'charge_memo' },
      { text: '截止日期', value: 'charge_ddl'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    chart: false,
    desserts: [],
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
  methods: {
    getColor (calories) {
      if (calories === "已处理") return 'primary'
      else return 'red'
    },
    initialize() {
      this.load = true
      var mess = {"login":this.login}
      this.axios.post(this.url+'cust/money',JSON.stringify(mess))
          .then(res => {
            this.desserts = res.data
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
    paymoney(item){
      this.axios.post(this.url+'cust/paymoney', JSON.stringify(item))
          .then(res => {
            this.mess = res.data
            this.bar1 = true
            this.initialize()
          },res => {
            console.log(res);
          })
    },
  },
};
</script>

<style scoped>

</style>