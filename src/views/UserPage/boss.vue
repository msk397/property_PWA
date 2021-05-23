<template>
  <div class="px-4">
    <v-sheet color="transparent">

      <v-row>
        <v-col cols="12" lg="6" xl="7">
          <v-card class="pa-10" outlined>
            <div class="d-flex align-center justify-space-between">
                <div class="text-h6">
                  缴费统计
                </div>
            </div>

            <apexchart
                ref="chartline"
                v-if="chart"
                width="100%"
                height="500"
                class="mt-4"
                type="line"
                :options="optionsLine"
                id="vuechart-line"
            ></apexchart>
          </v-card>
        </v-col>

        <v-col cols="12" lg="6" xl="5">
          <v-card class="pa-10 fill-height" outlined>
            <div>

              <div class="text-h6">
                报修种类统计
              </div>
            </div>

            <apexchart
                ref="chartbar"
                v-if="chart"
                width="100%"
                height="500"
                class="mt-4"
                type="bar"
                :options="optionsBar"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    chart: false,
    url: process.env.VUE_APP_API,
    optionsLine: {
      theme: {
        mode: "light",
        palette: "palette2",
      },
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "vuechart-line",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 3,
          blur: 10,
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    optionsBar: {
      theme: {
        mode: "light",
        palette: "palette2",
      },
      noData: {
        text: '加载中。。。'
      },
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "vuechart-bar",
      },
    },
  }),
  mounted() {
    this.chart = true;
  },
  created() {
    this.init()
  },
  methods:{
    init(){
      this.axios.get(this.url+'user/queryfixsort')
          .then(res=>{
           this.$refs.chartbar.updateSeries([{
              data:res.data
            }])
      })
      this.axios.get(this.url+'user/querymoneybymonth')
          .then(res=>{
            this.$refs.chartline.updateSeries([{
              data:res.data
            }])
          })
    }
},
};
</script>