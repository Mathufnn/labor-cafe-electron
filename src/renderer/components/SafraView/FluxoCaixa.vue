<template>
  <v-card>
    <v-card-title class="headline">
      Fluxo de caixa da safra
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
        lucro: { text: 'Lucro (R$)', status: 1, value: '84993,00' },
        despesa: { text: 'Despesa (R$)', status: 2, value: '75903,00' },
        receita: { text: 'Receita (R$)', status: 4, value: '9090,00' },
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
