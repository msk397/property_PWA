<template>
  <v-card>
    <v-tabs
        v-model="tab"
        background-color="accent-1"
        flat
        class="rounded-0"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-if="id==='0'" href="#tab-1" >员工管理</v-tab>
      <v-tab href="#tab-2" >业主信息</v-tab>
      <v-tab  href="#tab-3" >维修工人管理</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="rounded-0" >
      <v-tab-item
          v-for="i in 3"
          :key="i"
          :value="'tab-' + i"
      >
        <mess v-if="i===1"></mess>
        <custmess v-else-if="i===2"></custmess>
        <fixer v-else></fixer>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import mess from "@/views/UserPage/mess";
import custmess from "@/views/UserPage/custmess";
import fixer from "@/views/UserPage/fixer";
export default {
  name: "people",
  created() {
    this.tab = window.sessionStorage.getItem("cust")
  },
  data(){
    return {
      id :window.localStorage.getItem('identity'),
      tab: "tab-1",
    }
  },
  destroyed() {
    window.sessionStorage.setItem("cust","tab-1")
  },
  components: {
    fixer,
    mess,
    custmess,
  },
}
</script>

<style scoped>

</style>