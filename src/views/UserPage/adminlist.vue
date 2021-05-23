<template>
  <v-card>
    <v-tabs
        v-model="tab"
        v-if="id === '0'"
        background-color="accent-1"
        flat
        class="rounded-0"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1" >管理事务</v-tab>

      <v-tab href="#tab-2" >公司概况</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="rounded-0" >
      <v-tab-item
          v-for="i in 2"
          :key="i"
          :value="'tab-' + i"
      >
        <UserDashboard v-if="i===1"></UserDashboard>
        <boss v-else></boss>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import UserDashboard from "@/views/UserPage/UserDashboard";
import boss from "@/views/UserPage/boss";
export default {
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
    boss,
    UserDashboard
  },
}
</script>

<style scoped>

</style>