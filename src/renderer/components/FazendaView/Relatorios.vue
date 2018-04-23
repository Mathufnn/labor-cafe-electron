<template>
  <v-card>
    <v-card-title class="headline">
      Relatórios
      <v-tooltip right>
        <v-btn small color="info" slot="activator" v-on:click="gerarelatorio" ><v-icon center dark>description</v-icon>  GERAR RELATÓRIO</v-btn>
        <span>Gerar Relatório PDF</span>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <v-flex>
        lorem ipsum
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    view: true,
  }),
  methods: {
    gerarelatorio: function() {
      //inserir código para gerar relatorio em pdf
    },
  }
 }
</script>

<style scoped>

</style>
