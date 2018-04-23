<template>
  <v-card>
    <v-card-title class="headline">
      Atributos da safra
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
        name: { text: 'Nome da safra', status: 1, value: 'Safra 2017q3' },
        areaprod: { text: 'Área de café em produção (ha)', status: 1, value: 1124.56 },
        precomed: { text: 'Preço médio de terra nua (R$/ha)', status: 4, value: 3124.56 },
        prodtotal: { text: 'Produção total da safra (Sc)', status: 4, value: 3124.56 },
        precovenda: { text: 'Preço de venda ou preço do café em estoque', status: 4, value: 3124.56 },
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
    background-color: #00b0ff;
  }

  .status2 {
    background-color: #00b0ff;
  }

  .status3 {
    background-color: #00b0ff;
  }

  .status4 {
    background-color: #00b0ff;
  }
</style>
