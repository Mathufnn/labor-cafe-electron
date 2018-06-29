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
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Importar backup
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm12>
                Você pode importar um backup anterior que tenha feito.
                <br /><br /><br />
                <v-checkbox
                 label="Apagar dados atualmente inseridos"
                 v-model="deletaall"
               ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn v-if="!loading2" block color="primary" large  v-on:click="doimport">IMPORTAR BACKUP</v-btn>
            <v-progress-circular v-if="loading2" :size="70" :width="7" indeterminate color="green"></v-progress-circular>
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
    loading: false,
    loading2: false,
    deletaall: false,
  }),
  watch: {
    deletaall: function (newv, oldv) {
      if(newv){
        remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Todos os dados que estão atualmente cadastrados na aplicação serão APAGADOS para a importação dos dados novos que estão no backup que irá importar.\nVocê tem certeza que deseja fazer isso?',
                                      buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
                                        if(idx==1){
                                          this.deletaall=false;
                                        }
                                      });
      }
    }
  },
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
    },


    doimport: function() {
      remote.dialog.showOpenDialog({title: 'Selecione local do arquivo do backup', filters: [{name: 'Backup', extensions:['json']}] }, (filename) => {
        if(typeof filename == 'undefined') return;
        this.loading2 = true;
        fs.readFile(filename[0], (err, data) => {
          if (err) {
            remote.dialog.showErrorBox('Erro ao abrir arquivo!', 'Não foi possível abrir o arquivo.');
            return;
          }

          let i_obj;

          try {
            i_obj = JSON.parse(data);
          }
          catch(e) {
            this.loading2 = false;
            remote.dialog.showErrorBox('Arquivo inválido!', 'O arquivo é inválido!. 1');
            return;
          }

          if(typeof i_obj.Fazenda=='undefined' || typeof i_obj.Safra=='undefined' || typeof i_obj.Talhao=='undefined') {
            this.loading2 = false;
            remote.dialog.showErrorBox('Arquivo inválido!', 'O arquivo é inválido!. 2');
            return;
          }

          //async e suas desvantagens :(
          let ImportRoutine = () => {
            this.$backend.doimportBackup(i_obj, !this.deletaall, (deu) => {
              if (!deu) remote.dialog.showErrorBox('Erro ao importar o backup!', 'O backup não foi importado corretamente!');
              else remote.dialog.showMessageBox({type:'info', title:'Backup importado com sucesso!', message: 'O backup foi importado para a aplicação com sucesso!'});
              this.loading2 = false;
            });
          };

          //so apaga tudo depois de verificar se o backup é valido
          //de todos males menos esse ne. se nao o cara fica sem dado nenhum e sem importar o backup kkkkkkkkk
          if(this.deletaall){
            this.$backend.ClearEverything(() => ImportRoutine());
          } else ImportRoutine();

        });
      });
    }
  }
}
</script>

<style scoped>

</style>
