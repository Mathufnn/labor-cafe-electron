<template>
  <v-card>
    <v-card-title class="headline">
      Relatórios
      <v-tooltip right>
          <v-btn small color="info" slot="activator" v-on:click="preview" ><v-icon center dark>description</v-icon>  GERAR RELATÓRIO</v-btn>
          <span>Gerar Relatório PDF</span>
          <v-card v-if="load">
            <img src="../../assets/preview.png" width="600px"/> <!-- selecionar outra imagem -->
            <v-card-actions>
              <v-spacer></v-spacer>

            </v-card-actions>
          </v-card>
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
import { BrowserWindow, remote } from 'electron'

export default {
  data: () => ({
    load: false,

  }),
  methods: {
    preview: function() {
      //inserir código para gerar relatorio em pdf
      this.load = !this.load;
    },
  }
 }
</script>

<style scoped>

</style>
