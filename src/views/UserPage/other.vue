<template>
  <v-card>
    <v-tabs
        v-model="tab"
        flat
        class="rounded-0"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">收费管理</v-tab>

      <v-tab href="#tab-2">报修管理</v-tab>

      <v-tab href="#tab-3">公告管理</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="rounded-0">
      <v-tab-item
          v-for="i in 3"
          :key="i"
          :value="'tab-' + i"
      >
        <charge v-if="i===1"></charge>
        <fix v-else-if="i===2"></fix>
        <poster v-else></poster>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import fix from "@/views/UserPage/fix";
import poster from "@/views/UserPage/poster";
import charge from "@/views/UserPage/charge";
export default {
  created() {
this.tab = window.sessionStorage.getItem("other")
  },
  name: "other",
  data(){
    return {
      tab:"tab-1",
    }
  },
  destroyed() {
    window.sessionStorage.setItem("other","tab-1")
  },
  components: {
    fix,
    poster,
    charge,
  },
}
</script>

<style scoped>

</style>