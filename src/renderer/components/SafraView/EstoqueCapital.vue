<template>
  <v-card>
    <v-card-title class="headline">
      Estoque de capital da safra
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">

          <v-flex xs4 v-for="i in indicadores">
            <v-card :class="'status' + i.status">
              <b>{{i.text}}</b><br /><span class="indicator">{{i.value}}</span>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      indicadores: {
        terra: { text: 'Estoque de capital em terra (R$)', status: 0, value: 'Safra 2017q3' },
        lavouras: { text: 'Estoque de capital em lavouras (R$)', status: 1, value: 1124.56 },
        maquinas: { text: 'Estoque de capital em máquinas (R$)', status: 4, value: 3124.56 },
        benfeitorias: { text: 'Estoque de capital em benfeitorias (R$)', status: 4, value: 3124.56 },
      }
    }
  }
}
</script>

<style scoped>
  .indicator {
    font-size:41px;
  }

  .status1 {
    background-color: #F08080;
  }

  .status2 {
    background-color: #FFEC8B;
  }

  .status3 {

  }

  .status4 {
    background-color: #98FB98;
  }
</style>
