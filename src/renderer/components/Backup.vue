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
              <v-flex xs12 sm12>
                Você pode realizar backup para um arquivo com todos os dados já inseridos na aplicação.
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn v-if="!loading" block color="primary" large  v-on:click="dobackup">REALIZAR BACKUP</v-btn>
            <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="green"></v-progress-circular>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { remote } from 'electron'
import fs from 'fs'

export default {
  data: () => ({
    loading: false
  }),
  methods:{
    dobackup: function() {
      //por essa implementação, TODOS dados do banco de dados são armazenados na memória do computador antes de serem escritos no arquivo.
      //Eventualmente em um banco de dados com vários gigas (a ponto de ultrapassar a memória do computador da vítima) o programa iria crashar
      //suponhamos que nenhum banco de dados chegará a esse ponto. amém.

      remote.dialog.showSaveDialog({title: 'Selecione local para salvar arquivo de backup',defaultPath: 'backup_cafe.json'}, (filename) => {
        if(typeof filename == 'undefined') return;
        this.loading = true;
        this.$backend.dogetBackupData((data) => {
          fs.writeFile(filename, data, (err) => {
            if (err) remote.dialog.showErrorBox('Erro ao realizar o backup!', 'Não foi possível criar o arquivo no local.');
            else remote.dialog.showMessageBox({type:'info', title:'Backup realizado com sucesso!', message: 'O backup foi salvo no local escolhido com sucesso!'});
            this.loading = false;
          });
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
