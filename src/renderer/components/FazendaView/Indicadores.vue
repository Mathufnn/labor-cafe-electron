<template>
  <v-card>
    <v-card-title class="headline">
      Indicadores
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
        rendabruta: { text: 'RENDA BRUTA', status: 1, value: 1124.56 },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO', status: 3, value: 123.0 },
        cot: { text: 'CUSTO OPERACIONAL TOTAL', status: 4, value: 3124.56 },
        ct: { text: 'CUSTO TOTAL', status: 3, value: 'R$ ' + 21000 },
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 2, value: 500 },
        producao: { text: 'PRODUÇÃO', status: 1, value: 'R$ ' + 21000 }
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
