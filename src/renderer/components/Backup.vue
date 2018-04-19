<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Fazer backup
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                informações sobre o backupera
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn block color="info" large  v-on:click="dobackup">REALIZAR BACKUP</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { remote } from 'electron'


export default {
  data: () => ({
  }),
  methods:{
    dobackup: () => {
      remote.dialog.showSaveDialog({title: 'Selecione local para salvar arquivo de backup',defaultPath: 'backup_labor_cafe.json'}, function(filename){
        // :(
        alert(filename);
      });
    }
  }
}
</script>

<style scoped>

</style>
